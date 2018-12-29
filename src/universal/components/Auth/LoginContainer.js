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
export default class LoginContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			log_email: '',
			log_password: '',
			log_errors: {},
			redirect: false
		}
	}

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

		this.props.loginUser(user)
		.then(() => {
			this.setState({ redirect: true });
		});
	};

	render() {
		if(this.state.redirect) return <Redirect to={`/profile/${this.props.userId}`} />

		return (
			<div className="auth-wrapper">
				<div className="form-wrapper">
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
							<Button
								typeButton="submit"
								className="btn"
								isLoading={this.props.isLoginLoading}
							>
								Вхід
							</Button>
						</div>
						<div className="input-wrapper">
							<Link to="/register">Зареєструватись</Link>
							<Link to="/recovery-password" style={{"float": "right"}}>Забули пароль?</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		userId: state.AuthReducer.user.id,
		isLoginLoading: state.AuthReducer.isLoginLoading,
		errors: state.AuthReducer.errors
	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators(AuthAction, dispatch);
}