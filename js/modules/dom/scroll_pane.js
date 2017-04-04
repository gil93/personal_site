export default class ScrollPane {

	constructor( count ) {

		this.scrollY = 0;
		this.scrollPanes = document.getElementsByClassName( 'scroll-pane' ),
		this.scrollPanesContainer = document.getElementsByClassName( 'scroll-panes-container' )[0],
		this.transitionend = [

			'webkitTransitionEnd',
			'oTransitionEnd',
			'otransitionend',
			'MSTransitionEnd'

		];
		this.scrolling = false;
		this.count = count;

	}

	handleScroll( e ) {

		var self = this;

		if ( self.scrolling == true ) return;

		if ( e.deltaY < 0 ) {

			if ( ( ( self.scrollY - 1 ) * -1 ) >= self.scrollPanes.length ) return;

			self.scrolling = true;

			self.scrollY = self.scrollY - 1;

		} else {

			if ( self.scrollY >= 0 ) return;

			self.scrolling = true;

			self.scrollY = self.scrollY + 1;

		}

		var translateY = self.scrollY / self.scrollPanes.length * 100;

		self.scrollPanesContainer.setAttribute( 'style',

			`-o-transform: translate3d(0px, ${translateY}%, 0px);
			-ms-transform: translate3d(0px, ${translateY}%, 0px);
			-moz-transform: translate3d(0px, ${translateY}%, 0px);
			-webkit-transform: translate3d(0px, ${translateY}%, 0px);
			transform: translate3d(0px, ${translateY}%, 0px);`

		);

		for ( var i = 0; i < self.transitionend.length; i++ ) {

			self.scrollPanesContainer.addEventListener( self.transitionend[i], function ( e ) {

				e.target.removeEventListener( e.type, () => {

					self.scrolling = false;

				});

				self.scrolling = false;

			});

		}

	}

}