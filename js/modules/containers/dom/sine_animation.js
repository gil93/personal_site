import SineCurve from './sine_curve';

export default class SineAnimation {

	constructor() {

		var svgs = document.getElementsByClassName( 'wave-svg' ),
			svg_objects = [],
			freq = 0.08,
			length = window.outerWidth,
			counter = 0
		;

		for ( var i = 0; i < svgs.length; i++ ) {

			var svg_object = new SineCurve( svgs[i], {

				'amp': Math.abs( ( svgs[i].getAttribute( 'height' ) / 2 ) - 15 ),
				'freq': freq,
				'length': length

			});

			if ( i !== svgs.length - 1 ) svg_object.set_color();

			svg_objects.push( svg_object );

		}

		function draw() {

			var c = ++counter / 20;

			for ( var i = 0; i < svg_objects.length; i++ ) svg_objects[i].animate_polygon( c );

			window.requestAnimationFrame( draw );

		}

		draw();

	}

}