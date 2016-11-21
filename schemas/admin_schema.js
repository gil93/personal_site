var	mongoose = require( 'mongoose' ),
	admin_schema = new mongoose.Schema({

		id: mongoose.Schema.ObjectId,
		first_name: String,
		last_name: String,
		email: {

			type: String,
			required: true

		},
		password_hash: {

			type: String,
			required: true

		},
		pages: [{

			type: mongoose.Schema.ObjectId,
			ref: 'Page'

		}]

	})
;

module.exports = admin_schema;