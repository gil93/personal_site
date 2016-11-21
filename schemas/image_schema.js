var	mongoose = require( 'mongoose' ),
	image_schema = new mongoose.Schema({

		id: mongoose.Schema.ObjectId,
		file_name: {

			type: String,
			required: true

		},
		src: {

			type: String,
			required: true

		},
		image_type: {

			type: String,
			required: true

		}
	})
;

module.exports = image_schema;