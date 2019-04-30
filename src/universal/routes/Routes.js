// Libraries
import React, { Component, Fragment } from  'react';
import { Route, Redirect, Switch } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AnimatedSwitch } from 'react-router-transition';

import styles from 'universal/assets/styles/styles.scss';

// For Development only
import * as RouteMap from '../routes/static.js';
// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js';

const PrivateRoute = ({ component: Component, isAuthenticated, location, ...rest }) => {
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
  constructor(props, context) {
    super(props, context);

    this.state = {
      prevPath: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({ prevPath: this.props.location.pathname })
    }
  }

  render() {
    const { location, isAuthenticated } = this.props;
    return (
      <Fragment>
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <PrivateRoute exact path="/" component={RouteMap.HomePage} {...this.props} />
          <PrivateRoute exact path='/profile/:id' component={RouteMap.UserMainPage} {...this.props} />
          <PrivateRoute exact path='/upload' component={RouteMap.UploadMusicPage} {...this.props} />
          <PrivateRoute exact path='/followers/:id' component={RouteMap.FollowListPage} {...this.props} />
          <PrivateRoute exact path='/settings' component={RouteMap.SettingsPage} {...this.props} />
          <PrivateRoute exact path='/musiclist/:type' component={RouteMap.MusicListPage} {...this.props} />
          <PrivateRoute exact path='/playlist/:id' component={RouteMap.PlaylistViewPage} {...this.props} />
          <PrivateRoute exact path='/contact' component={RouteMap.ContactPage} {...this.props} />
          <PrivateRoute exact path='/artist/:id' component={RouteMap.ArtistProfilePage} {...this.props} />
          <PrivateRoute exact path='/artist/:mode/:id' component={RouteMap.ArtistProfilePage} {...this.props} />

          <Route exact path='/login' component={RouteMap.LoginPage} {...this.props} />
          <Route exact path='/register' component={RouteMap.RegisterPage} {...this.props} />
          <Route exact component={RouteMap.NotFoundPage} {...this.props} />
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
