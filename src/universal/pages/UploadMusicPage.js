// Libraries
import React, { Component, Fragment } from 'react';

import UploadMusicContainer from 'universal/components/UploadMusic/UploadMusicContainer';
import Header from 'universal/components/Header';

export default class UploadMusicPage extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<UploadMusicContainer />
			</div>
		);
	}
}