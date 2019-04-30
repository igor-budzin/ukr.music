import React, {Component, PropTypes} from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

// Redux
import { Provider } from 'react-redux';

// Components
import Routes from 'universal/routes/Routes.js';

class AppContainer extends Component {
  render() {
    const { history } = this.props;

    return (
      <ConnectedRouter history={history} >
        <Route render={({location}) => {
          return (<Routes location={location} />)
        }}/>
      </ConnectedRouter>
    );
  }
}

export default AppContainer;
