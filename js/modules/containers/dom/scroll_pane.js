export default class ScrollPane {

	constructor() {

		this.scrollY = 0;
		this.scrollPanes = null;
		this.scrollPanesContainer = null;
		this.transitionend = [

			'webkitTransitionEnd',
			'oTransitionEnd',
			'otransitionend',
			'MSTransitionEnd'

		];
		this.scrolling = false;
		this.count = 4;

	}

}