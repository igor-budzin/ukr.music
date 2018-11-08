// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Icon } from 'antd';
import axios from 'axios';

@connect(mapStateToProps, mapDispatchToProps)
class AuthContainer extends Component {
	handleGoogleAuth = () => {
		window.location = 'https://localhost:8080/api/login/facebook';
		// axios.get('api/login/facebook')
		// .then((responce) => {
		// 	console.log(responce);
		// })
	}

	render() {
		return (
			<div className="auth-block">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
					</Form.Item>
					<Form.Item>
						<Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
					</Form.Item>
					<Form.Item>
						<Checkbox>Remember me</Checkbox>
						<a className="login-form-forgot" href="">Forgot password</a>
						<Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
						or <a href="">register now!</a>
					</Form.Item>
				</Form>

				<div className="divider"><span>or</span></div>

				<button className="facebook">
					<Icon type="facebook" />
					Facebook
				</button>
				<button className="google" onClick={this.handleGoogleAuth}>
					<Icon type="google" />
					Google
				</button>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {};
}

function mapDispatchToProps(dispatch, props) {
	return {};
}

export default AuthContainer;
