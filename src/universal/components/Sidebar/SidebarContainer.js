// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import isEqual from 'lodash.isequal';
// Components
import Button from '../Commons/Button';

// Actions
import * as FollowActions from '../Followers/followListActions';

const mapStateToProps = (state, props) => ({
	userId: state.AuthReducer.user.id
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators(FollowActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarContainer extends Component {
	constructor(props, context) {
		super(props, context);
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return !isEqual(nextProps, this.props);
	// }

	handleFollow = () => {
		console.log('handleFollow')
		this.props.followUser(this.props.userId, this.props.locationParams.userId);
	}

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
						this.props.userId !== this.props.locationParams.userId &&
						(<div className="sidebar-wrapper">
							<Button className="btn full" onClick={this.handleFollow}>Підписатися</Button>
						</div>)
					}

					<div className="sidebar-link">
						<Link to={`../profile/${this.props.userId}`} className="link my">Мої треки</Link>
						<Link to="/upload" className="link upload">Завантажити аудіозаписи</Link>
						<Link to="/recommend" className="link recommend">Рекомендації</Link>
						<Link to={`../followers/${this.props.userId}`} className="link follow">Слухаю їх</Link>
						<Link to="/update" className="link update">Оновлення</Link>
						<Link to="/settings" className="link settings">Налаштування</Link>
					</div>
				</div>
			</div>
		);
	}
}