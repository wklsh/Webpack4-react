import React, { Component } from "react";

import "./ButtonLoader.scss";
import "./ButtonLoader-animations.scss";

export default class ButtonLoader extends Component {
	static defaultProps = {
		type: "submit",
		isLoading: false,
		isDisabled: false,
		onClick: () => {}
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { type, className, isDisabled, isLoading, onClick, children } = this.props;

		return (
			<button
				type={type}
				className={`buttonLoader__button ${className} ${isDisabled ? "is--disabled" : ""}`}
				onClick={onClick}
			>
				<div className={`buttonLoader__spinner ${isLoading ? "is--loading" : ""}`}>
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="34" width="34" viewBox="0 0 34 34">
						<circle cx="17" cy="17" r="10.5" strokeWidth="3" />
					</svg>
				</div>
				<p className={`buttonLoader__label ${isLoading ? "is--loading" : ""}`}>{children}</p>
			</button>
		);
	}
}
