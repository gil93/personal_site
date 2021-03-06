import React from 'react';
import { connect } from 'react-redux';
import * as admin_actions from './../actions/admin';

@connect( store => {

	return {

		'admin': store.admin

	}

})

export default class Auth extends React.Component {

	constructor( props ) {

		super( props );

	}

	componentWillMount() {

		var props = this.props;

		if ( props.location.pathname.match( '/sign_out' ) !== null ) {

			props.dispatch({

				'type': 'logout_admin'

			})

			window.sessionStorage.token = undefined;

			props.router.push( '/sign_in' );

		} else {

			props.dispatch( admin_actions.get_admin() )

				.then( response => {

					props.dispatch({

						'type': 'get_admin_true',
						'admin': response.data

					});

					props.router.push( '/admin' );

				})

				.catch( response => {

					props.dispatch({

						'type': 'get_admin_false',
						'error': response

					});

				})
			;

		}

	}

	handleSubmit( e ) {

		e.preventDefault();

		var	props = this.props,
			form = e.target,
			inputs = form.getElementsByTagName( 'input' ),
			data = {}
		;

		for ( var i = 0; i < inputs.length; i++ ) {

			data[inputs[i].name] = inputs[i].value;

		}

		return props.dispatch( admin_actions.sign_in( data ) )

			.then( response => {

				props.dispatch({

					'type': 'sign_in_admin_true',
					'admin': response.data

				});

				window.sessionStorage.token = response.data.token;

				props.router.push( '/admin' );

			})

			.catch( response => {

				props.dispatch({

					'type': 'sign_in_admin_false',
					'error': response

				});

			})

		;

	}

	render() {

		if ( ! this.props.admin.signed_in && ! this.props.admin.signing_in ) {

			return <div className="form">

				<form onSubmit={ this.handleSubmit.bind( this ) } name="admin">

					<input type="email" name="email" placeholder="enter_email" />

					<input type="password" name="password" placeholder="enter_email" />

					<button type="submit">Submit</button>

				</form>

			</div>

		}

		return null;

	}

}