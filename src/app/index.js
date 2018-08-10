import React, { Component } from "react";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { persistStore, autoRehydrate, createPersistor } from "redux-persist";
import { localStorage } from "redux-persist/lib/storage";

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

const store = createStore(
	reducers,
	devTools,
	compose(
		applyMiddleware(thunk),
		autoRehydrate(),
		reduxReset()
	)
);

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
