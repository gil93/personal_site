export default class SineCurve {

	constructor( svg, animate_props ) {

		this.svg = svg;
		this.polygon = svg.getElementsByTagName( 'polygon' )[0];
		this.amp = animate_props.amp;
		this.freq = animate_props.freq;
		this.length = animate_props.length;

	}

	get_color( svg ) {

		var this_section = this.svg.parentNode.parentNode.parentNode.parentNode,
			next_section = this_section.nextElementSibling,
			computed_color = window.getComputedStyle( next_section, null )
				.getPropertyValue( 'background-color' )
		;

		return computed_color;

	}

	set_color() {

		var self = this;

		self.svg.setAttribute( 'stroke', self.get_color() );

		self.polygon.setAttribute( 'fill', self.get_color() );

	}

	animate_polygon( count ) {

		var self = this;

		self.polygon.setAttribute( 'points', self.sine_calc( count ) );

	}

	sine_calc( count ) {

		console.log( this.amp );

		var self = this,
			points = [0, self.amp * 2],
			x = 0,
			y
		;

		while ( x++ <= self.length ) {

			y = Math.sin( x * self.freq + count );

			points.push( [ x, y * self.amp / 2 + self.amp / 2 ].join( ' ' ) );

		}

		points.push( [ self.length, self.amp * 2 ].join( ' ' ) );

		points.push( [ 0, self.amp * 2 ].join( ' ' ) );

		return points;

	}

}