import React from 'react';
import { connect } from 'react-redux';
import * as index_actions from './../actions/index';
import SineAnimation from './../dom/sine_animation';
import ScrollPane from './../dom/scroll_pane';
import Pane from './../presenters/pane';

@connect( store => {

	return {

		'index': store.index

	}

})

export default class Index extends React.Component {

	constructor( props ) {

		super( props );

	}

	componentDidMount() {

		var self = this,
			scrollPane = new ScrollPane( self.props.index.paneCount )
		;

		window.addEventListener( 'mousewheel', ( e ) => {

			scrollPane.handleScroll( e );

		});

		new SineAnimation();

	}

	createPanes() {

		var panes = this.props.index.panes,
			paneCount = this.props.index.paneCount
		;

		for ( var i = 0; i < paneCount; i++ ) {

			if ( i == 0 ) {

				var first_pane = new Pane({ 'index': i + 1 });

				first_pane.nodes.push(

					<div className="introduction col-lg-12" key={ first_pane.nodes.length + 1 }>

						<div className="intro-wrapper">

							<p>Hi. I’m Gil, a Full-stack Web Developer based in Brooklyn, NY.</p>

						</div>

					</div>

				);

				panes.push( first_pane.render() );

				continue;

			}

			panes.push( new Pane({ 'index': i + 1 }).render() );

		}

		return panes;

	}

	render() {

		return <div>

			<div className="homepage">

				<div className="sections-wrapper container-fluid">

					<div className="scroll-panes-container sections-container">

						{ this.createPanes() }

					</div>

				</div>

			</div>

		</div>

	}

}