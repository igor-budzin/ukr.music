import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EmptyPlayList extends Component {
	render() {
		return (
			<div className="playlist clearfix">
				<div className="empty-playlist">
					<p>
						У вашому плейлисті відсутні аудіозаписи<br />
						<b><Link to="/upload-music">Завантажте</Link></b><br />
						свій перший аудіозапис
					</p>
				</div>
			</div>
		);
	}
}

