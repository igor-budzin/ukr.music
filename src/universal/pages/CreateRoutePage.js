// Libraries
import React, { Component, Fragment } from 'react';

import CreateRouteContainer from 'universal/containers/CreateRoute/CreateRouteContainer';
import Header from 'universal/components/Header/Header';

class CreateRoutePage extends Component {
	render () {
		return (
			<Fragment>
				<Header />
				<CreateRouteContainer />
			</Fragment>
		);
	}
}

export default CreateRoutePage;
