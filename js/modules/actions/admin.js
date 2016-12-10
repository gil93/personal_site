import axios from 'axios';

export function get_admin() {

	return ( dispatch ) => {

		dispatch({

			'type': 'get_admin'

		});

		return axios.get( 'http://localhost:8080/api/validate', {

			headers: {

				'x-access-token': window.sessionStorage.token

			}

		});

	}

}

export function sign_in( data ) {

	return ( dispatch ) => {

		dispatch({

			'type': 'sign_in_admin'

		});

		return axios.post( 'http://localhost:8080/api/admin', data );

	}

}