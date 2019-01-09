// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Sidebar from 'universal/components/Sidebar/SidebarContainer';
import UserProfiletContainer from 'universal/components/UserProfiletContainer';
import Header from 'universal/components/Header';

const mapStateToProps = (state, props) => ({
	follows: state.followsReducer.follows
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators({}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UserProfilePage extends Component {
	render() {
		console.log(this.props)
		return (
			<div className="wrapper">
				<Header />
				<main id="page" className="page clearfix">
					<UserProfiletContainer 
						locationParams={this.props.match.params}
					/>
					<Sidebar
						userId={'5c232fb8fec73903a896dd05'}
						locationParams={this.props.match.params}
						localionPath={this.props.match.path}
					/>
				</main>
			</div>
		);
	}
}

