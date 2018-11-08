import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import Header from './common/Header.js';

export default class Home extends Component {

	render() {
		return (
			<div className="wrapper">
				<Header />
				<div id="page" className="page clearfix">
					<h2 className="section-title">Головна</h2>
				</div>
			</div>
		)
	}
}
