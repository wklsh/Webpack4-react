import React, {Component} from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate, createPersistor } from 'redux-persist';
import { asyncSessionStorage, localStorage } from 'redux-persist/storages';

import reducers from './redux/';
import App from './base/App.js';


if (process.env.NODE_ENV == 'production') {
	// Enable offline mode
	const runtime = require('offline-plugin/runtime');

	runtime.install({
		onUpdateReady() {
			runtime.applyUpdate();
		},
		onUpdated() {
			window.location.reload();
		},
	});
}


const store = createStore(reducers, compose(applyMiddleware(thunk), autoRehydrate()));

const sessionPersistor = persistStore(store, {storage:localStorage, blacklist:['ui']}, () => {
	let basename = '/';
	ReactDOM.render(
		(
			<Provider store={store}>
				<BrowserRouter basename={basename}>
					<App />
				</BrowserRouter>
			</Provider>
		),
		document.body.appendChild(document.createElement('div'))
	)
});