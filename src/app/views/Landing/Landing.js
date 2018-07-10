import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { testAction, testAPI } from "ReduxAlias/test.js";

import "./Landing.scss";

class Landing extends Component {
	constructor(props) {
		super(props);
	}

	// Lifecycle
	componentWillMount() {
		//
		this.props.testAPI("singapore");
	}

	render() {
		return (
			<section className="Landing">
				<h1>Home</h1>
			</section>
		);
	}
}

const mapStateToProps = function(store) {
	return {
		test: store.test
	};
};

const mapDispatchToProps = function(dispatch) {
	return {
		testAction: bindActionCreators(testAction, dispatch),
		testAPI: bindActionCreators(testAPI, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Landing);
