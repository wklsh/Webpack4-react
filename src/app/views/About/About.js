import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {hideHeader} from '../../redux/ui';

import './About.scss';

class About extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount(){
		// this.props.hideHeader(true);
	}

	render() {
		return (
			<section className="about">
				<h1>About</h1>
			</section>
		);
	}
}

const mapStateToProps = function(store) {
    return {
    	ui: store.ui
    }
}
const mapDispatchToProps = function(dispatch) {
  	return {
  		hideHeader: bindActionCreators(hideHeader, dispatch)
  	}
}
export default About = connect(mapStateToProps, mapDispatchToProps)(About);