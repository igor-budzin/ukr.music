// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
// Components
import Button from 'universal/components/Commons/Button';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
// Actions


const mapStateToProps = (state, props) => ({
	userId: state.AuthReducer.user.id
});

const mapDispatchToProps = (dispatch, props) =>  bindActionCreators({}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingstContainer extends Component {
	constructor(props, context) {
		super(props, context);
	}


	render() {
		return (
			<Fragment>
				<h2 className="section-title">Налаштування</h2>

				<div className="container clearfix">

					<MusicPlayerContainer />

					{/*<MusicFilter />*/}

				</div>

				<div className="filter-hr"></div>

				<div className="content">

					<div className="section-links" style={{"marginBottom": "40px"}}>
						<a href="javascript:void(0)" className="link active">Профіль</a>
						<a href="javascript:void(0)" className="link">Пароль</a>
						<a href="javascript:void(0)" className="link">Синхронізація</a>
					</div>

				</div>

				<NotificationContainer />
			</Fragment>
		);
	}
}