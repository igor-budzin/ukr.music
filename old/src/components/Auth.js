import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

export default class Auth extends Component {

	render() {
		return (
			<Fragment>
				<div className="auth-page-wrapper">
					<Link to="/" className="facebook-login-btn">Facebook</Link>
				</div>
			</Fragment>
		)
	}
}
