// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import axios from 'axios';
// Components
import Button from 'universal/components/Commons/Button';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
import SearchField from 'universal/components/SearchField';
import SidebarContainer from 'universal/components/Sidebar/SidebarContainer';
import FollowList from 'universal/components/Followers/FollowList';
// Actions
import * as FollowListActions from './followListActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class FollowListContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			audioCount: null,
			followersCount: null,
			follows: []
		};
	}

	componentDidMount() {
		this.getPageData();
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.locationParams.userId !== prevProps.locationParams.userId) {
			this.getPageData();
		}
	}

	getPageData = () => {
		this.props.getFollows(this.props.locationParams.userId);
		const accessString = localStorage.getItem('jwtToken')
		axios.get('https://localhost:8080/api/getUserData/' + this.props.locationParams.userId)
		.then(response => {
			this.setState({
				audioCount: response.data.audioCount,
				followersCount: response.data.followersCount
			});
		});
	}

	render() {
		return (
			<main id="page" className="page clearfix">
				<h2 className="section-title">Підписники</h2>

				<div className="container clearfix">

					<MusicPlayerContainer />

				</div>

				<div className="filter-hr"></div>

				<div className="content">

					<div style={{"margin": "0 0 30px 0"}}>
						<SearchField />
					</div>

					<div className="section-links" style={{"marginBottom": "40px"}}>
						<a href="javascript:void(0)" className="link active">Підписаний</a>
						<a href="javascript:void(0)" className="link">Підписані на мене</a>
					</div>

					<FollowList follows={this.props.follows} />

				</div>

				<SidebarContainer
					audioCount={this.state.audioCount}
					followersCount={this.state.followersCount}
					locationParams={this.props.locationParams}
				/>
				<NotificationContainer />
			</main>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		follows: state.followsReducer.follows
	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators(FollowListActions, dispatch);
}