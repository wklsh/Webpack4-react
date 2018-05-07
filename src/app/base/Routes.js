import React, {Component} from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Async from 'react-code-splitting'

import { scrollToTop } from './functions.js';

const Home = () => <Async load={import('../views/Home/Home.js')} />
const About = () => <Async load={import('../views/About/About.js')} />

const Routes = withRouter(({ location }) => {
	let pathsArray = location.pathname.split('/').filter(p => p!=='');
	let path = location.pathname;

	//filter through paths to disable transition animation when necessary
	switch(pathsArray[0]){
		case 'my-campaigns':
			path = 'my-campaigns';
		break;
	}

	return (
		<TransitionGroup>
			<CSSTransition key={path} timeout={300} classNames="transition__crossfade">
				<div className="transition__holder">
					<Switch>
						<Route exact path="/" component={Home} key="home" />
				    	<Route path="/about" component={About} key="about" />
				    </Switch>
		    	</div>
	    	</CSSTransition>
		</TransitionGroup>
	)
});
export default Routes;
