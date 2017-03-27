import React from 'react';
import { connect } from 'react-redux';
import * as admin_actions from './../actions/scroll';
import anime from 'animejs';

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

			self.handleScroll( e, self );

		});

	}

	componentWillUnmount() {

		var self = this;

	    window.removeEventListener( 'mousewheel', ( e ) => {

	    	self.handleScroll( e, self );

	    });

	}

	handleScroll( e, self ) {

		if ( self.props.scroll.homepage.scrolling == true ) return;

		if ( e.deltaY < 0 ) {

			if ( ( ( self.props.scroll.homepage.scrollY - 1 ) * -1 ) >= self.props.scroll.homepage.scrollPanes.length ) return;

			self.props.scroll.homepage.scrolling = true;

			self.props.scroll.homepage.scrollY = self.props.scroll.homepage.scrollY - 1;

		} else {

			if ( self.props.scroll.homepage.scrollY >= 0 ) return;

			self.props.scroll.homepage.scrolling = true;

			self.props.scroll.homepage.scrollY = self.props.scroll.homepage.scrollY + 1;

		}

		var translateY = self.props.scroll.homepage.scrollY / self.props.scroll.homepage.scrollPanes.length * 100;

		self.props.scroll.homepage.scrollPanesContainer.setAttribute( 'style',

			`-o-transform: translate3d(0px, ${translateY}%, 0px);
			-ms-transform: translate3d(0px, ${translateY}%, 0px);
			-moz-transform: translate3d(0px, ${translateY}%, 0px);
			-webkit-transform: translate3d(0px, ${translateY}%, 0px);
			transform: translate3d(0px, ${translateY}%, 0px);`

		);

		for ( var i = 0; i < self.props.scroll.homepage.transitionend.length; i++ ) {

			self.props.scroll.homepage.scrollPanesContainer.addEventListener( self.props.scroll.homepage.transitionend[i], function ( e ) {

				e.target.removeEventListener( e.type, self.not_scrolling );

				self.not_scrolling();

			});

		}

	}

	not_scrolling() {

		this.props.scroll.homepage.scrolling = false;

	}

	createPanes() {

		var scrollPaneCount = this.props.scroll.homepage.panes.count,
			scrollPanes = []
		;

		for ( var i = 0; i < scrollPaneCount; i++ ) {

			scrollPanes.push(

				<div className={ `section section-${( i + 1)} row` } key={ `${( i + 1 )}` }>

					<div className="col-lg-12">

						<div class="wave-container">

							<svg viewBox="0 0 100 20">

								<defs>

							    	<pattern id="wave" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">

							    		<path id="wavePath" d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z" fill="#000000">

							        		<animateTransform attributeName="transform" type="translate" begin="0s" dur="1.5s" from="0,0" to="40,0" repeatCount="indefinite" />

							    		</path>

							    	</pattern>

								</defs>

								<polygon points="0,0 100,0 100,20 0,20" fill="url(#wave)"></polygon>

							</svg>

						</div>

					</div>

				</div>

			);

		}

		this.props.scroll.homepage.scrollY = 0;
		this.props.scroll.homepage.scrollPanes = scrollPanes;

		// anime({

		// 	targets: 'wave',


		// });

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