export default ( state = {

	'admin': {

		'message': null,
		'success': null,
		'token': null

	},
	'signing_in': false,
	'signed_in': false,
	'error': null

}, action ) => {

	var new_state = state;

	if ( action.type == 'get_admin' ) {

		new_state = {

			...state,
			'signing_in': true

		};

	} else if ( action.type == 'get_admin_false' ) {

		new_state = {

			...state,
			'signing_in': false,
			'error': action.error

		};

	} else if ( action.type == 'get_admin_true' ) {

		new_state = {

			...state,
			'signing_in': false,
			'signed_in': true,
			admin: action.admin

		};

	} else if ( action.type == 'sign_in_admin' ) {

		new_state = {

			...state,
			'signing_in': true

		};

	} else if ( action.type == 'sign_in_admin_false' ) {

		new_state = {

			...state,
			'signing_in': false,
			'error': action.error

		}

	} else if ( action.type == 'sign_in_admin_true' ) {

		new_state = {

			...state,
			'signing_in': false,
			'signed_in': true,
			admin: action.admin

		};

	} else if ( action.type == 'logout_admin' ) {

		new_state = {

			admin: {

				message: null,
				success: null,
				token: null

			},
			signing_in: false,
			signed_in: false,
			error: null

		}

	}

	return new_state;
}