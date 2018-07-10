import React, { Component } from "react";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { persistStore, autoRehydrate, createPersistor } from "redux-persist";
import { asyncSessionStorage, localStorage } from "redux-persist/storages";

import reducers from "./redux/";
import App from "./base/App.js";

// ==========================================================================================
// Offline Mode:
// Enable offline mode
// ==========================================================================================
if (process.env.NODE_ENV == "production") {
	const runtime = require("offline-plugin/runtime");

	runtime.install({
		onUpdateReady() {
			runtime.applyUpdate();
		},
		onUpdated() {
			window.location.reload();
		}
	});
}

// ==========================================================================================
// Store:
// Check build environment, and enable redux devtools in dev
// ==========================================================================================
let store;
if (process.env.NODE_ENV == "development") {
	store = createStore(
		reducers,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		compose(
			applyMiddleware(thunk),
			autoRehydrate()
		)
	);
} else {
	store = createStore(
		reducers,
		compose(
			applyMiddleware(thunk),
			autoRehydrate()
		)
	);
}

// ==========================================================================================
// Render
// ==========================================================================================
const sessionPersistor = persistStore(store, { storage: localStorage, blacklist: [""] }, () => {
	let basename = "/";
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter basename={basename}>
				<App />
			</BrowserRouter>
		</Provider>,
		document.body.appendChild(document.querySelector("#appInit"))
	);
});
