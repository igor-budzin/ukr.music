// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import axios from 'axios';
// Components
import MusicFilter from 'universal/components/MusicFilter';
import PlayList from 'universal/components/PlayList/PlayList';
import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
// Actions
import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
class AuthContainer extends Component {
	constructor(props, context) {
		super(props, context)
	}

	handleAuthFacebook = () => {
		// const axiosInstance = axios.create({
		// 	baseURL: 'https://localhost:8080/api/',
		// 	headers: {
		// 		'Access-Control-Allow-Origin': '*',
		// 		"Access-Control-Allow-Methods": "POST, GET, PUT, UPDATE, OPTIONS",
		// 		'Content-Type': 'application/json',
		// 		withCredentials: true
		// 	}
		// });

		// axiosInstance.get('auth/facebook').then(() => {
		// 	console.log('handleAuthFacebook');
		// })
		window.location.href = 'https://localhost:8080/api/auth/facebook';
	};

	render() {
		return (
			<div className="auth-wrapper">
				<div className="form-wrapper">
					<div className="btn google">Авторизація через Google</div>
					<div className="btn facebook" onClick={this.handleAuthFacebook}>Авторизація через Facebook</div>
					<div className="btn telegram">Авторизація через Telegram</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		// playlist: state.getMusicReducer.music,
		// currentMusic: state.controlMusicReducer.currentMusic,
		// isPlaying: state.controlMusicReducer.isPlaying
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		// ...AudioActions,
		// getMusic: getMusicListAction
	}, dispatch);
}

export default AuthContainer;