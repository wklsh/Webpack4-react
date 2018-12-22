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

	// Lifecycle
	componentDidUpdate() {
		this.checkActiveOnMount();
	}

	/************************************************************
	 * Compare [to] prop with current location pathname.
	 * apply active class if both of them matches,
	 * and remove the active class if they do not.
	 *
	 * @return 		State update for [isItemActive]
	 ************************************************************/
	checkActiveOnMount = () => {
		// If URL matches with [to] prop
		if (this.props.location.pathname.indexOf(this.props.to) > -1) {
			if (!this.state.isItemActive) {
				this.setState({
					isItemActive: true
				});
			}
		}
		// If URL does NOT match with [to] prop
		else {
			if (this.state.isItemActive) {
				this.setState({
					isItemActive: false
				});
			}
		}
	};

	/*************************************************************************************
	 * OnClick handler-
	 * Function to be called upon every click on a NavLinkDelay item.
	 *
	 * @param  {Obj} evt	Contains event scope for any needed referrence
	 * @return      		Runs callback function (if exists) after specified delay
	 *************************************************************************************/
	handleLinkClick = (evt) => {
		this.props.onClick(evt); // Run onClick func

		// Re-route page after delay
		setTimeout(() => {
			this.props.onEnd(evt); // Run onEnd func
			this.props.history.push(this.props.to); // Redirect
		}, this.props.delay);
	};

	render() {
		return (
			<a
				style={{ cursor: "pointer" }}
				onClick={(evt) => this.handleLinkClick(evt)}
				className={`${this.props.className} ${this.state.isItemActive ? this.props.activeClassName : ""}`}
			>
				{this.props.children}
			</a>
		);
	}
}

export default withRouter(NavLinkDelay);
