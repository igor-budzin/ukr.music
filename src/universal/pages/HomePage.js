// Libraries
import React, { Component, Fragment } from 'react';

import HomeContainer from 'universal/components/Home/HomeContainer';
import Header from 'universal/components/Header';

export default class HomePage extends Component {
	render () {
		return (
			<div className="wrapper">
				<Header /> 
				<HomeContainer />
			</div>
		);
	}
}

