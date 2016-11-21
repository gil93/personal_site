var	express = require( 'express' ),
	bcrypt = require( 'bcrypt' ),
	jwt = require( 'jsonwebtoken' ),
	admin_ctrl = require( './admin_controller' ),
	image_model = require( './../models/image' )
;

var	app = express();

image_model.methods( [ 'get', 'post', 'put', 'delete' ] );

image_model.before( 'post', function ( req, res, next ) {

	admin_ctrl.init( req, res, next ).get( '/validate' );

});

image_model.before( 'put', function ( req, res, next ) {

	admin_ctrl.init( req, res, next ).get( '/validate' );

});

image_model.before( 'delete', function ( req, res, next ) {

	admin_ctrl.init( req, res, next ).get( '/validate' );

});

module.exports = image_model;