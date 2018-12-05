// Libraries
import React, { Component, Fragment } from 'react';

import HomeContainer from 'universal/containers/HomeContainer';
import Header from 'universal/components/Header';

class HomePage extends Component {
	render () {
		return (
			<div className="wrapper">
				<Header /> 
				<HomeContainer />
			</div>
		);
	}
}

export default HomePage;
