// Libraries
import React, { Component, Fragment } from 'react';

import Header from 'universal/components/Header/Header';
import AuthContainer from 'universal/containers/Auth/AuthContainer';

class AuthPage extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<AuthContainer />
			</Fragment>
		);
	}
}

export default AuthPage;
