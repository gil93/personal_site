var	express = require( 'express' ),
	bcrypt = require( 'bcrypt' ),
	jwt = require( 'jsonwebtoken' ),
	admin_model = require( './../models/admin' )
;

var	app = express();

var routes = {

	'/admin': () => {

		return admin_model.findOne({

			email: this.req.body.email

		}, ( error, admin ) => {

			if ( error ) throw error;

			if ( ! admin ) {

				return this.res.status( '403' ).json({

					success: false,
					message: 'Authentication failed. User not found.'

				});

			} else if ( admin ) {

				bcrypt.compare( this.req.body.password, admin.password_hash, ( bcrypt_error, check ) => {

					if ( ! check  ) {

						return this.res.status( '403' ).json({

							success: false,
							message: 'Authentication failed. Wrong password.'

						});

					} else {

						var admin_secret = {

							_id: admin._id,
							email: admin.email,
							password: admin.password

						};

						var token = jwt.sign( admin_secret, this.req.app.get( 'superSecret' ), {

							expiresIn: 60 * 60 * 24 // 24 hours

						});

						return this.res.status( '200' ).json({

							success: true,
							message: 'Good!',
							token: token

						});

					}

				});

			}

		});

	},
	'/validate': () => {

		var token = this.req.headers['x-access-token'];

		if ( token ) {


			jwt.verify( token, this.req.app.get( 'superSecret' ), ( error, decoded ) => {

				if ( error ) {


					return this.res.status( 403 ).send({

						success: false,
						message: 'Failed to authenticate token.'

					});

				} else {

					this.req.decoded = decoded;
					return this.res.status( 200 ).send({

						success: true,
						message: 'Good!',
						id: decoded._id,
						email: decoded.email

					});

				}

			});

		} else {

			return this.res.status( 403 ).send({

				success: false,
				message: 'No token provided.'

			});

		}

	}

}

module.exports = {

	init: ( req, res, next ) => {

		this.req = req;

		this.res = res;

		this.next = next;

		this.post = ( route ) => {

			return routes[route].call( this );

		};
		this.get = ( route ) => {

			return routes[route].call( this );

		};

		return this;

	}

};