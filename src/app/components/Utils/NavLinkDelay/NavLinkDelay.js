import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class NavLinkDelay extends Component {
	static propTypes = {
		to: PropTypes.string.isRequired,
		delay: PropTypes.number,
		activeClassName: PropTypes.string,
		onClick: PropTypes.func,
		onEnd: PropTypes.func
	};

	static defaultProps = {
		delay: 0,
		activeClassName: "active",
		onClick: () => {},
		onEnd: () => {}
	};

	constructor(props) {
		super(props);

		this.state = {
			isItemActive: false
		};
	}

	// Lifecycle
	componentDidMount() {
		this.checkActiveOnMount();
	}

	// Check active
	checkActiveOnMount = () => {
		// Alias
		const currPathname = this.props.history.location.pathname;

		// Check current pathname with destination route.
		// If it is the same, apply active state.
		// Or else set it back to false
		if (currPathname.includes(this.props.to) && this.props.to != "/") {
			this.setState({
				isItemActive: true
			});
		} else {
			this.setState({
				isItemActive: false
			});
		}
	};

	// Handler
	handleLinkClick = (evt) => {
		// Only run the function if current pathname is not the same as destination route
		if (this.props.history.location.pathname != this.props.to) {
			this.props.onClick(evt); // Run onClick func

			// Re-route page after delay
			setTimeout(() => {
				this.props.onEnd(evt); // Run onEnd func
				this.props.history.push(this.props.to); // Redirect
			}, this.props.delay);
		}
	};

	render() {
		return (
			<a
				onClick={(evt) => this.handleLinkClick(evt, this.props.to)}
				className={`${this.props.className} ${this.state.isItemActive ? this.props.activeClassName : ""}`}
			>
				{this.props.children}
			</a>
		);
	}
}

export default withRouter(NavLinkDelay);
