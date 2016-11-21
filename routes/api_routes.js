var	express = require( 'express' ),
	restful = require( 'node-restful' ),
	mongoose = require( 'mongoose' ),
	admin_ctrl = require( './../controllers/admin_controller' ),
	images_ctrl = require( './../controllers/images_controller' )
;

var	app = express(),
	router = express.Router()
;

router.post( '/admin', ( req, res ) => {

	admin_ctrl.init( req, res ).post( '/admin' );

});

router.get( '/validate', ( req, res, next ) => {

	admin_ctrl.init( req, res, next ).get( '/validate' );

});

images_ctrl.register( router, '/images' );

module.exports = router;