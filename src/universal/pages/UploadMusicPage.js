// Libraries
import React, { Component, Fragment } from 'react';

import UploadMusicContainer from 'universal/containers/UploadMusicContainer';
import Header from 'universal/components/Header';

class UploadMusicPage extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<UploadMusicContainer />
			</div>
		);
	}
}

export default UploadMusicPage;
