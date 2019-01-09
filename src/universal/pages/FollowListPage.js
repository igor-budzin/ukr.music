// Libraries
import React, { Component } from 'react';

import FollowListContainer from 'universal/components/Followers/FollowListContainer';
import Header from 'universal/components/Header';

export default class FollowListPage extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<FollowListContainer locationParams={this.props.match} />
			</div>
		);
	}
}

