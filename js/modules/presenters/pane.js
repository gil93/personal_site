import React from 'react';

export default class Pane extends React.Component {

	constructor( props ) {

		super( props );

		this.index = props.index;
		this.nodes = [];
		this.createPane();

	}

	createPane() {

		var self = this,
			waves = <div className="wave-wrapper" key={1}>

				<div className="wave-container">

					<svg className="wave-svg" stroke="#000000" viewBox="0 0 30 100" preserveAspectRatio="none" height="100" width="200">

						<polygon fill="#000000"></polygon>

					</svg>

				</div>

			</div>
		;

		self.nodes.push( waves );

	}


	render() {

		var self = this,
			index = self.index,
			nodes = self.nodes
		;

		return <div className={ `scroll-pane section section-${( index )} row` } key={ `${( index )}` }>

			<div className="col-lg-12">

				{ nodes }

			</div>

		</div>

	}

}