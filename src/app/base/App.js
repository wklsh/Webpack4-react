import React, {Component} from 'react';
import { Link, Match, Route } from 'react-router-dom';
import Routes from './Routes.js';

import './styles/index.scss';

import Header from '../components/Header/Header'

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app">
				<Header />
				<Link to="/">Home</Link>
				<Link to="about">About</Link>
				<div className="app__main">
					<Routes />
				</div>
			</div>
		);
	}
}

