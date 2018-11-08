// Libraries
import React, { Component, Fragment } from 'react';

import AboutContainer from 'universal/containers/About/AboutContainer';
import Header from 'universal/components/Header/Header';

class AboutPage extends Component {
	render () {
		return (
			<Fragment>
				<Header />
				<AboutContainer />
			</Fragment>
		);
	}
}

export default AboutPage;
