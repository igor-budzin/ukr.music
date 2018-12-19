// Libraries
import React, { Component, Fragment } from  'react';
import { Route, Redirect, Switch } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from 'universal/assets/styles/styles.scss';

// Routes
// For Development only
import * as RouteMap from '../routes/static.js';

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
			props.isLogged ?
			(<Component {...props}/>) :
			(<Redirect to={{pathname: '/auth', state: { from: props.location }}} />)
		)}
	/>
)

@connect(mapStateToProps)
export default class Routes extends Component {
	render() {
		const { location } = this.props;
		return (
			<Fragment>
				<Switch>
					<PrivateRoute exact location={location} path="/" component={RouteMap.HomePage} {...this.props} />
					<PrivateRoute exact location={location} path='/music' component={RouteMap.MyMusicListPage} {...this.props} />
					<PrivateRoute exact location={location} path='/upload' component={RouteMap.UploadMusicPage} {...this.props} />
					<Route exact location={location} path='/auth' component={RouteMap.AuthPage} />
					<Route location={location} component={RouteMap.NotFoundPage} />
				</Switch>
			</Fragment>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		isLogged: state.AuthReducer.isLogged
	};
}
