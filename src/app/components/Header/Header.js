import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header className="header">
				<Link to="/">Landing</Link>
				<Link to="/page-two">Page two</Link>
			</header>
		);
	}
}

const mapStateToProps = function(store) {
	return {
		ui: store.ui
	};
};
export default (Header = connect(mapStateToProps)(Header));
