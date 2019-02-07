// Libraries
import React, { Component, Fragment } from  'react';
import { Route, Redirect, Switch } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AnimatedSwitch } from 'react-router-transition';

import styles from 'universal/assets/styles/styles.scss';

// Routes
// For Development only
import * as RouteMap from '../routes/static.js';

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js';

const PrivateRoute = ({ component: Component, isAuthenticated: isAuthenticated, ...rest }) => {
	if(location.pathname !== '/login') {
		return (
			<Route {...rest} render={props => {
					return (
						isAuthenticated ?
						(<Component {...props} location={location} />) :
						(<Redirect to={{pathname: '/login', state: { from: props.location }}} />)
					)

				}}
			/>
		)
	}
	else return null;
}

@connect(mapStateToProps)
export default class Routes extends Component {
	render() {
		const { location } = this.props;
		return (
			<Fragment>
				<AnimatedSwitch
					atEnter={{ opacity: 0 }}
					atLeave={{ opacity: 0 }}
					atActive={{ opacity: 1 }}
					className="switch-wrapper"
				>
					<PrivateRoute exact location={location} path="/" component={RouteMap.HomePage} isAuthenticated={this.props.isAuthenticated} />
					<PrivateRoute exact location={location} path='/profile/:name' component={RouteMap.UserMainPage} isAuthenticated={this.props.isAuthenticated} />
					<PrivateRoute exact location={location} path='/upload/' component={RouteMap.UploadMusicPage} isAuthenticated={this.props.isAuthenticated} />
					<PrivateRoute exact location={location} path='/artist/:name' component={RouteMap.ArtistProfilePage} isAuthenticated={this.props.isAuthenticated} />
					<PrivateRoute exact location={location} path='/followers/:name' component={RouteMap.FollowListPage} isAuthenticated={this.props.isAuthenticated} />
					<PrivateRoute exact location={location} path='/settings' component={RouteMap.SettingsPage} isAuthenticated={this.props.isAuthenticated} />

					<Route exact location={location} path='/login' component={RouteMap.LoginPage} />
					<Route exact location={location} path='/register' component={RouteMap.RegisterPage} />
					<Route exact location={location} component={RouteMap.NotFoundPage} />
				</AnimatedSwitch>
			</Fragment>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		isAuthenticated: state.AuthReducer.isAuthenticated
	};
}
