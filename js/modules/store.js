import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import admin_reducer from './reducers/admin';
import scroll_reducer from './reducers/scroll';

const reducers = combineReducers({

	'admin': admin_reducer,
	'scroll': scroll_reducer

});

const middle_ware = applyMiddleware( promise(), thunk, logger() );

const store = createStore( reducers, {}, middle_ware );

store.subscribe( () => {

	// console.log( 'store changed!' );
	// console.log( 'current state:' + JSON.stringify( store.getState() ) );

});

export default store;