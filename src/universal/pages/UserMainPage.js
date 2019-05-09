// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Sidebar from 'universal/components/Sidebar/SidebarContainer';
import UserMainContainer from 'universal/components/UserMain/UserMainContainer';
import Header from 'universal/components/Header';
import Footer from 'universal/components/Footer';

export default class UserProfilePage extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<main id="page" className="page clearfix">
					<UserMainContainer 
						locationParams={this.props.match.params}
					/>
					<Sidebar
						locationParams={this.props.match.params}
						localionPath={this.props.match.path}
					/>
				</main>
			</div>
		);
	}
}

