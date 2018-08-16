import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import reducers from "ReduxAlias/index.js";
import App from "BaseAlias/App.js";

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
const devTools =
	process.env.NODE_ENV == "development"
		? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		: "";

const store = createStore(reducers, devTools, compose(applyMiddleware(thunk)));

// ==========================================================================================
// Render
// ==========================================================================================
const sessionPersistor = persistStore(store, null, () => {
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
