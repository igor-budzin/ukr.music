// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import isEqual from 'lodash.isequal';
// Components
import Button from '../Commons/Button';

// Actions
// import * as AuthAction from './AuthActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarContainer extends Component {
	constructor(props, context) {
		super(props, context);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !isEqual(nextProps, this.props);
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
						this.props.userId !== this.props.locationParams.userId ?
						(<div className="sidebar-wrapper">
							<Button className="btn full">Підписатися</Button>
						</div>) :
						(<div className="sidebar-link">
							<Link to="/upload" className="link upload">Завантажити аудіозаписи</Link>
							<Link to="" className="link recommend">Рекомендації</Link>
							<Link to={`../followers/${this.props.userId}`} className="link follow">Слухаю їх</Link>
							<Link to="" className="link update">Оновлення</Link>
							<Link to="" className="link settings">Налаштування</Link>
						</div>)

					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		userId: state.AuthReducer.user.id
	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({}, dispatch);
}