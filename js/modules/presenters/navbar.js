import React from 'react';
import ReactDOM from 'react-dom';

export default class Navbar extends React.Component {

	constructor( props ) {

		super( props );

	}

	render() {

		return <div>

			<nav>

				<ul>

					<li>Nav Element 1</li>

					<li>Nav Element 2</li>

					<li>Nav Element 3</li>

					<li>Nav Element 4</li>

					<li>Nav Element 5</li>

				</ul>

			</nav>

		</div>

	}

}