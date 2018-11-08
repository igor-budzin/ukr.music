import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

import Header from './common/Header.js';

export default class NotFounded extends Component {

	render() {
		return (
			<div className="wrapper">
				<Header />
				<div id="page" className="page clearfix">
					<h2 className="section-title">Сторінку не знайдено</h2>
				</div>
			</div>
		)
	}
}
