import React from 'react';
import { connect } from 'react-redux';
import * as admin_actions from './../actions/admin';

@connect( store => {

	return {

		admin: store.admin

	}

})

export default class Layout extends React.Component {

	componentWillMount() {

		this.props.dispatch( admin_actions.get_admin() );

		// if ( ! this.props.signed_in )

	}

	render() {

		return null;

	}

}