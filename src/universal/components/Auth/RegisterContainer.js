// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
// Components
import Button from '../Commons/Button';
// Actions
import * as AuthAction from './AuthActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class RegisterContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			reg_name: '',
			reg_email: '',
			reg_password: '',
			reg_password_confirm: '',
			reg_errors: {},
			redirect: false
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
		this.props.registerUser(user)
		.then(() => {
			this.setState({ redirect: true });
		});
	};

	render() {
		if(this.state.redirect) return <Redirect to='/login' />

		return (
			<div className="auth-wrapper">
				<div className="form-wrapper">
					<h2>Реєстрація</h2>

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
							<Button
								typeButton="submit"
								className="btn"
								isLoading={this.props.isRegisterLoading}
							>
								Зареєструватись
							</Button>
						</div>
						<div className="input-wrapper">
							<Link to="/login">Вже зареєстровані?</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		isRegisterLoading: state.AuthReducer.isRegisterLoading,
		errors: state.AuthReducer.errors
	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators(AuthAction, dispatch);
}