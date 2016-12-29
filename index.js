var	express = require( 'express' ),
	morgan = require( 'morgan' ),
	mongoose = require( 'mongoose' ),
	body_parser = require( 'body-parser' ),
	jwt = require( 'jsonwebtoken' ),
	config = require( './config' ),
	api_routes = require( './routes/api_routes' )
;

var	app = express(),
	port = process.env.PORT || 8080
;

mongoose.connect( config.database );

config.init();

app.set( 'superSecret', config.secret );

app.use( body_parser.urlencoded( { extended: true } ) );

app.use( body_parser.json() );

app.use( morgan( 'dev' ) );

app.use( '/api', api_routes );

app.use( '/public/', express.static( __dirname + '/public/' ) );

app.get( '*', ( req, res ) => {

	res.sendFile( __dirname + '/index.html' );

});

app.listen( port );

console.log( 'Api running on ' + port );