import React from 'react';
import { connect } from 'react-redux';
import * as admin_actions from './../actions/scroll';
import anime from 'animejs';
import SineCurve from './dom/sine_curve';

@connect( store => {

	return {

		'scroll': store.scroll

	}

})

export default class Index extends React.Component {

	constructor( props ) {

		super( props );

	}

	componentDidMount() {

		var self = this;

		window.addEventListener( 'mousewheel', ( e ) => {

			self.handleScroll( e, self.getScrollProperties() );

		});

		self.sineAnimation();

	}

	componentWillUnmount() {

		var self = this;

	    window.removeEventListener( 'mousewheel', ( e ) => {

	    	self.handleScroll( e, self.getScrollProperties() );

	    });

	}

	getScrollProperties() {

		var self = this,
			homepage = self.props.scroll.homepage
		;

		return {

			'self': self,
			'scrolling': homepage.scrolling,
			'scrollY': homepage.scrollY,
			'scrollPanes': homepage.scrollPanes,
			'scrollPanesContainer': homepage.scrollPanesContainer,
			'transitionend': homepage.transitionend

		}

	}

	setScrollProperties( args ) {

		this.props.scroll.homepage.scrolling = args.scrolling;
		this.props.scroll.homepage.scrollY = args.scrollY;
		this.props.scroll.homepage.scrollPanes = args.scrollPanes;
		this.props.scroll.homepage.scrollPanesContainer = args.scrollPanesContainer;
		this.props.scroll.homepage.transitionend = args.transitionend;

	}

	sineAnimation() {

		var self = this,
			svgs = document.getElementsByClassName( 'wave-svg' ),
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

	handleScroll( e, args ) {

		var self = args.self,
			scrolling = args.scrolling,
			scrollY = args.scrollY,
			scrollPanes = args.scrollPanes,
			scrollPanesContainer = args.scrollPanesContainer,
			transitionend = args.transitionend
		;

		if ( scrolling == true ) return;

		if ( e.deltaY < 0 ) {

			if ( ( ( scrollY - 1 ) * -1 ) >= scrollPanes.length ) return;

			scrolling = true;

			scrollY = scrollY - 1;

		} else {

			if ( scrollY >= 0 ) return;

			scrolling = true;

			scrollY = scrollY + 1;

		}

		var translateY = scrollY / scrollPanes.length * 100;

		scrollPanesContainer.setAttribute( 'style',

			`-o-transform: translate3d(0px, ${translateY}%, 0px);
			-ms-transform: translate3d(0px, ${translateY}%, 0px);
			-moz-transform: translate3d(0px, ${translateY}%, 0px);
			-webkit-transform: translate3d(0px, ${translateY}%, 0px);
			transform: translate3d(0px, ${translateY}%, 0px);`

		);

		for ( var i = 0; i < transitionend.length; i++ ) {

			scrollPanesContainer.addEventListener( transitionend[i], function ( e ) {

				e.target.removeEventListener( e.type, self.not_scrolling );

				self.not_scrolling();

			});

		}

		self.setScrollProperties({

			'scrolling': scrolling,
			'scrollY': scrollY,
			'scrollPanes': scrollPanes,
			'scrollPanesContainer': scrollPanesContainer,
			'transitionend': transitionend

		});

	}

	not_scrolling() {

		this.props.scroll.homepage.scrolling = false;

	}

	createPanes() {

		var scrollPaneCount = this.props.scroll.homepage.panes.count,
			scrollPanes = []
		;

		for ( var i = 0; i < scrollPaneCount; i++ ) {

			if ( i == 0 ) {

				scrollPanes.push(

					<div className={ `section section-${( i + 1)} row` } key={ `${( i + 1 )}` }>

						<div className="waves col-lg-12">

							<div className="wave-wrapper">

								<div className="wave-container">

									<svg className="wave-svg" stroke="#000000" viewBox="0 0 30 100" preserveAspectRatio="none" height="100" width="200">

										<polygon fill="#000000"></polygon>

									</svg>

								</div>

							</div>

						</div>

						<div className="introduction col-lg-12">

							<div className="intro-wrapper">

								<p>Hi. I’m Gil, a Full-stack Web Developer based in Brooklyn, NY.</p>

							</div>

						</div>

					</div>

				);

				continue;

			}

			scrollPanes.push(

				<div className={ `section section-${( i + 1)} row` } key={ `${( i + 1 )}` }>

					<div className="col-lg-12">

						<div className="wave-wrapper">

							<div className="wave-container">

								<svg className="wave-svg" stroke="#000000" viewBox="0 0 30 100" preserveAspectRatio="none" height="100" width="200">

									<polygon fill="#000000"></polygon>

								</svg>

							</div>

						</div>

					</div>

				</div>

			);

		}

		this.props.scroll.homepage.scrollY = 0;
		this.props.scroll.homepage.scrollPanes = scrollPanes;

		return scrollPanes;

	}

	render() {

		return <div>

			<div className="homepage">

				<div className="sections-wrapper container-fluid">

					<div className="sections-container" ref= {

						( scrollPanesContainer ) => {

							this.props.scroll.homepage.scrollPanesContainer = scrollPanesContainer;

						}}>

						{ this.createPanes() }

					</div>

				</div>

			</div>

		</div>

	}

}