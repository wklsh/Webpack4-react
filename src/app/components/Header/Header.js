import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.ui);
		if(this.props.ui[this.props.ui.length-1].hideHeader) return null;


		return (
			<header className="header">
				Header
			</header>
		);
	}
}

const mapStateToProps = function(store) {
    return {
    	ui: store.ui
    }
}
export default Header = connect(mapStateToProps)(Header)