var	restful = require( 'node-restful' ),
	image_schema = require( './../schemas/image_schema' )
;

var image = restful.model( 'Image', image_schema );

module.exports = image;
