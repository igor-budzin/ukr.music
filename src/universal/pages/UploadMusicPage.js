// Libraries
import React, { Component, Fragment } from 'react';

import Sidebar from 'universal/components/Sidebar/SidebarContainer';
import UploadMusicContainer from 'universal/components/UploadMusic/UploadMusicContainer';
import Header from 'universal/components/Header';

export default class UploadMusicPage extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<main id="page" className="page upload-page clearfix">
					<UploadMusicContainer 
						locationParams={this.props.match.params}
					/>
					<Sidebar
						locationParams={this.props.match.params}
						localionPath={this.props.match.path}
					/>
				</main>
			</div>
		);
	}
}