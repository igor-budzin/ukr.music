// Libraries
import React, { Component } from 'react';
// Components
import Sidebar from 'universal/components/Sidebar/SidebarContainer';
import FollowListContainer from 'universal/components/Followers/FollowListContainer';
import Header from 'universal/components/Header';

export default class FollowListPage extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<main id="page" className="page clearfix">
					<FollowListContainer 
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

