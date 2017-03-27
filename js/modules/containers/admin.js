import React from 'react';
import { connect } from 'react-redux';
import * as admin_actions from './../actions/admin';

@connect( store => {

	return {

		'admin': store.admin

	}

})

export default class Admin extends React.Component {

	constructor( props ) {

		super( props );

	}

	componentWillMount() {

		var props = this.props;

		props.dispatch( admin_actions.get_admin() )

			.then( response => {

				props.dispatch({

					'type': 'get_admin_true',
					'admin': response.data

				});

			})

			.catch( response => {

				props.dispatch({

					'type': 'get_admin_false',
					'error': response

				});

				props.router.push( '/sign_in' );

			})
		;
	}

	render() {

		if ( this.props.admin.signed_in ) {

			return <h1>ADMIN :D</h1>

		}

		return null;

	}

}