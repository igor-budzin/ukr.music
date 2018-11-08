import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import NotFounded from './components/NotFounded';
import MusicContainer from './components/music/musicContainer';
import Auth from './components/Auth';
import './assets/styles.scss';

const history = createBrowserHistory();

const RouterInit = () => (
	<Router history={history}>
		<React.Fragment>
			<Route exact path="/" component={MusicContainer} />
			<Route exact path="/music" component={MusicContainer} />
			<Route path="/404" component={NotFounded} />
			<Route path="/auth" component={Auth} />
		</React.Fragment>
	</Router>
);

ReactDOM.render(
	<RouterInit />,
	document.getElementById('root')
);
