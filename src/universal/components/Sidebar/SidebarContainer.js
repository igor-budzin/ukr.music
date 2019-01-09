// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import axios from 'axios';
// Components
import Button from '../Commons/Button';

// Actions
import * as getUserDataActions from './getUserDataActions';

const mapStateToProps = (state, props) => ({
	currentUserId: state.AuthReducer.user.id
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators(getUserDataActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarContainer extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.getUserData(this.props.currentUserId, this.props.locationParams.userId);
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return !isEqual(nextProps, this.props);
	// }

	handleFollow = () => {
		this.props.followUser(this.props.userId, this.props.locationParams.userId);
	};

	handleUnfollow = () => {

	};

	render() {
		return (
			<div className="sidebar">
				<div className="counts sidebar-wrapper">
					<div className="col">
						<span className="text">Підписались</span>
						<span className="count">{this.props.followersCount}</span>
					</div>
					<div className="col">
						<span className="text">Аудіофайлів</span>
						<span className="count">{this.props.audioCount}</span>
					</div>
				</div>

				<div className="sidebar-wrapper">
					{
						this.props.currentUserId !== this.props.locationParams.userId &&
						(<div className="sidebar-wrapper">
							{
								this.props.canFollowUser ?
								<Button className="btn full blue" onClick={this.handleFollow}>Підписатися</Button> :
								<Button className="btn full red" onClick={this.handleUnfollow}>Відписатись</Button>
							}
						</div>)
					}

					<div className="sidebar-link">
						<Link to={`../profile/${this.props.currentUserId}`} className="link my">Мої треки</Link>
						<Link to="/upload" className="link upload">Завантажити аудіозаписи</Link>
						<Link to="/recommend" className="link recommend">Рекомендації</Link>
						<Link to={`../followers/${this.props.currentUserId}`} className="link follow">Слухаю їх</Link>
						<Link to="/update" className="link update">Оновлення</Link>
						<Link to="/settings" className="link settings">Налаштування</Link>
					</div>
				</div>
			</div>
		);
	}
}