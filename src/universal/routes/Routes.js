// Libraries
import React, { Component, Fragment } from  'react';
import { Route, Redirect, Switch } from 'react-router';

import styles from 'universal/assets/styles/styles.scss';

// Routes
// For Development only
import * as RouteMap from '../routes/static.js';

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js';

class Routes extends Component {
	render () {
		const { location } = this.props;

		return (
			<Fragment>
				<Switch>
					<Route exact location={location} path='/' component={RouteMap.HomePage} />
					<Route exact location={location} path='/music' component={RouteMap.MyMusicListPage} />
					<Route exact location={location} path='/upload' component={RouteMap.UploadMusicPage} />
					<Route component={RouteMap.NotFoundPage} />
				</Switch>
			</Fragment>
		);
	}
}

export default Routes;
