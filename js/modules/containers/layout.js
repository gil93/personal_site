import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as admin_actions from './../actions/admin';

@connect( store => {

	return {

		admin: store.admin

	}

})

export default class Layout extends React.Component {

	constructor( props ) {

		super( props );

	}

	render() {

		if ( this.props.admin.signed_in ) {

			return <div>

				<nav>

					<ul>

						<li>

							<a>Gil</a>

						</li>

						<li>

							<a>Gil</a>

						</li>

						<li>

							<a>Gil</a>

						</li>

						<li>

							<a>Gil</a>

						</li>

					</ul>

				</nav>

				<div>

					{ this.props.children }

				</div>

			</div>

		}

		return <div>

			{ this.props.children }

		</div>

	}

}