import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Async from "react-code-splitting";

const Landing = () => <Async load={import("AppAlias/views/Landing/Landing.js")} />;

// Main route
export const MainRoute = withRouter(({ location }) => {
	return (
		<Switch key={location.pathname} location={location}>
			<Route exact path="/" component={Landing} key="Landing" />
		</Switch>
	);
});
