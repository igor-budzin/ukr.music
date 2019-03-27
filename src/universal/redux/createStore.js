import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import requestMiddleware from './middlewares/requestMiddleware.js'
import thunk from 'redux-thunk';
import { API_URL } from '../../global.config';

import * as Reducers from './reducers/index.js';

const suffix = {
  pendingSuffix: '_REQUEST',
  successSuffix: '_SUCCESS',
  errorSuffix: '_ERROR'
}

const request = requestMiddleware.withOptions(suffix, {
  baseUrl: `${API_URL}/`,
  withCredentials: true,
  header: { 
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': typeof localStorage === undefined ? null : localStorage.getItem('jwtToken')
  }
});

// const composeEnhancers = composeWithDevTools({
//   serialize: {
//    options: false
//   }
// });

export default (history) => {
  const store = createStore(combineReducers({
    ...Reducers,
    router: routerReducer
  }), composeWithDevTools(applyMiddleware(routerMiddleware(history), request, thunk, logger)));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducers = require('./reducers/index.js');
      const rootReducer = combineReducers({
        ...nextReducers,
        router: routerReducer
      });

      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
