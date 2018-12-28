// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components

// Actions
// import * as AudioActions from 'universal/redux/actions/controlMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class SearchField extends Component {
	constructor(props, context) {
		super(props, context)
	}

	render() {
		return (
			<div className="search-wrapper">
				<input type="text" className="search-input" placeholder="Пошук..." />
				<button type="submit" className="submit-button"></button>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {

	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({}, dispatch);
}