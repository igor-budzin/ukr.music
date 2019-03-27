import React from 'react';
import axios from 'axios';
import isEqual from 'lodash.isequal';

const withUserData = (PassedComponent) =>
	class WithUserData extends React.Component {
		state = {
			audioCount: 0,
			followersCount: 0,
			canFollowUser: null
		}


		componentDidMount() {
			axios.post('https://localhost:8080/api/getUserData', {
				currentUserID: this.props.userId,
				userID: this.props.locationParams.params.userId
			})
			.then((response) => {
				this.setState({
					audioCount: response.data.audioCount,
					followersCount: response.data.followersCount,
					canFollowUser: response.data.canFollowUser
				});
			});
		}

		render() {
			return (
				<PassedComponent
					{...this.props}
					audioCount={this.state.audioCount}
					followersCount={this.state.followersCount}
					canFollowUser={this.state.canFollowUser}
				/>
			)
		}
	}

export default withUserData;