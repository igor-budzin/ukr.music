// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
// Components

// Actions
import * as AuthAction from './AuthActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class AuthContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			reg_name: '',
			reg_email: '',
			reg_password: '',
			reg_password_confirm: '',
			reg_errors: {},
			
			log_email: '',
			log_password: '',
			log_errors: {}
		}
	}

	handleInputRegChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmitReg = (e) => {
		e.preventDefault();
		const user = {
			name: this.state.reg_name,
			email: this.state.reg_email,
			password: this.state.reg_password,
			password_confirm: this.state.reg_password_confirm
		}
		// console.log(user);
		this.props.registerUser(user);
	};

	handleInputLogChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	};

	handleSubmitLog = (e) => {
		e.preventDefault();
		const user = {
			email: this.state.log_email,
			password: this.state.log_password,
		}

		this.props.loginUser(user);
	};

	render() {
		return (
			<div className="auth-wrapper">
				<div className="form-wrapper">
					<h2>Рєстрація</h2>

					<form onSubmit={this.handleSubmitReg}>
						<div className="input-wrapper">
							<label htmlFor="reg-name">Логін:</label>
							<input
								name="reg_name"
								type="text"
								className="input"
								id="reg-name"
								onChange={this.handleInputRegChange}
								value={this.state.reg_name}
							/>
						</div>
						<div className="input-wrapper">
							<label htmlFor="reg-email">Email:</label>
							<input
								name="reg_email"
								type="text"
								className="input"
								id="reg-email"
								onChange={this.handleInputRegChange}
								value={this.state.reg_email}
							/>
						</div>
						<div className="input-wrapper">
							<label htmlFor="reg-password">Пароль:</label>
							<input
								name="reg_password"
								type="password"
								className="input"
								id="reg-password"
								onChange={this.handleInputRegChange}
								value={this.state.reg_password}
							/>
						</div>
						<div className="input-wrapper">
							<label htmlFor="reg-repassword">Пароль повторно:</label>
							<input
								name="reg_password_confirm"
								type="password"
								className="input"
								id="reg-repassword"
								onChange={this.handleInputRegChange}
								value={this.state.reg_password_confirm}
							/>
						</div>
						<div className="input-wrapper">
							<button type="submit" className="btn">Зареєструвати</button>
						</div>
					</form>

					<div className="divider">
						<span>або</span>
					</div>

					<h2>Авторизація</h2>

					<form onSubmit={this.handleSubmitLog}>
						<div className="input-wrapper">
							<label htmlFor="log-email">Email:</label>
							<input
								name="log_email"
								type="text"
								className="input"
								id="log-email"
								onChange={this.handleInputLogChange}
								value={this.state.log_email}
							/>
						</div>
						<div className="input-wrapper">
							<label htmlFor="log-password">Пароль:</label>
							<input
								name="log_password"
								type="password"
								className="input"
								id="log-password"
								onChange={this.handleInputLogChange}
								value={this.state.log_password}
							/>
						</div>
						<div className="input-wrapper">
							<button type="submit" className="btn">Вхід</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		// playlist: state.getMusicReducer.music,
		// currentMusic: state.controlMusicReducer.currentMusic,
		errors: state.AuthReducer.errors
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators(AuthAction, dispatch);
}



			// <div className="auth-wrapper">
			// 	<div className="form-wrapper">
			// 		<div className="btn google">Авторизація через Google</div>
			// 		<div className="btn facebook" onClick={this.handleAuthFacebook}>Авторизація через Facebook</div>
			// 		<div className="btn telegram">Авторизація через Telegram</div>
			// 	</div>
			// </div>