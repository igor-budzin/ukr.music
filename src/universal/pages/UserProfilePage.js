// Libraries
import React, { Component, Fragment } from 'react';

import UserProfiletContainer from 'universal/components/UserProfiletContainer';
import Header from 'universal/components/Header';

export default class UserProfilePage extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<UserProfiletContainer locationParams={this.props.match.params} />
			</div>
		);
	}
}

