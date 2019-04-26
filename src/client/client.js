import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from '../universal/components/Auth/AuthActions.js';
import setAuthToken from '../universal/components/Auth/setAuthToken';
import { stringToBoolean } from 'universal/utils';
// Components
import App from './containers/AppContainer.js';
// Redux
import { Provider } from 'react-redux';
import createStore from '../universal/redux/createStore.js';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const store = createStore(history);

window.audioInstance = document.createElement('audio');
window.audioInstance.preload = 'auto';
window.audioInstance.volume = localStorage.getItem('volume') !== null ? parseFloat(localStorage.getItem('volume')) : 0.5;;
window.audioInstance.muted = localStorage.getItem('isMuted') !== null ? stringToBoolean(localStorage.getItem('isMuted')) : false;


if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded.userData));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

const renderApp = Component => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(App);

// Hot reload
if (module.hot) {
  module.hot.accept('./containers/AppContainer.js', () => {
    const nextApp = require('./containers/AppContainer.js');
    renderApp(nextApp);
  });
}

