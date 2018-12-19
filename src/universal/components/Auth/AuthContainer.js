// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
// Components

// Actions
import * as AuthAction from './AuthActions';

@connect(mapStateToProps, mapDispatchToProps)
class AuthContainer extends Component {
	constructor(props, context) {
		super(props, context)
	}

	handleAuthFacebook = () => {
		this.props.requestLogin();
	}

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
	return bindActionCreators(AuthAction, dispatch);
}

export default AuthContainer;