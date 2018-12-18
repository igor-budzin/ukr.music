// Libraries
import React, { Component, Fragment } from 'react';

import Header from 'universal/components/Header/Header';

export default class NotFound extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<div className="page-container" style={{'textAlign': 'center'}}>
					<h1>404<br />Page Not Found :(</h1>
				</div>
			</Fragment>
		);
	}
}