import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import store from './store';
import Layout from './containers/layout';
import Admin from './containers/admin';
import Auth from './containers/auth';
import Index from './containers/index';

ReactDOM.render(

	<Provider store={store}>

		<Router history={browserHistory}>

			<Route path="/" component={Layout}>

				<IndexRoute component={Index} />

				<Route path="admin" component={Admin} />

				<Route path="sign_in" component={Auth} />

				<Route path="sign_out" component={Auth} />

			</Route>

		</Router>

	</Provider>

, document.getElementById( 'app' ) );