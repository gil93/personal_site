var admin = require( './../schemas/admin_schema' ),
	mongoose = require( 'mongoose' )
;

module.exports = mongoose.model( 'Admin', admin );