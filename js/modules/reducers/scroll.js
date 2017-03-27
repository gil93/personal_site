export default ( state = {

	'homepage': {

		'panes': {

			'count': 4

		},
		'scrollY': 0,
		'scrollPanes': null,
		'scrollPanesContainer': null,
		'transitionend': ['webkitTransitionEnd', 'oTransitionEnd', 'otransitionend', 'MSTransitionEnd'],
		'scrolling': 'false'

	}

}, action ) => {

	var new_state = state;

	if ( action.type == 'set_panes' ) {

		var pane_count;

		new_state = {

			...state,
			'homepage': {

				'panes': {

					'count': pane_count

				},
				'scrollY': 0,
				'translateY': 0,
				'scrollPanes': null,
				'scrollPanesContainer': null,
				'transitionend': 'webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
				'scrolling': 'false'

			}
		}

	}

	return new_state;

}