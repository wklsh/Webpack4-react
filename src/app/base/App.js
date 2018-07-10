import React, { Component } from "react";
import { MainRoute } from "./Routes/MainRoute.js";

import Header from "ComponentsAlias/Header/Header.js";

import "./styles/index.scss";

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app">
				<Header />
				<div className="app__main">
					<MainRoute />
				</div>
			</div>
		);
	}
}
