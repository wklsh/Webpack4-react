import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {hideHeader} from '../../redux/ui';

import './Home.scss';

class Home extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount(){
		this.props.hideHeader(false);
	}

	render() {
		return (
			<section className="home">
				<h1>Home</h1>
				<div className="text-extra-bold">test</div>
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
export default Home = connect(mapStateToProps, mapDispatchToProps)(Home)