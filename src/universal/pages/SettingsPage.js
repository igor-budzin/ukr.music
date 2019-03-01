// Libraries
import React, { Component, Fragment } from 'react';
// Components
import Sidebar from 'universal/components/Sidebar/SidebarContainer';
import SettingsContainer from 'universal/components/Settings/SettingsContainer';
import Header from 'universal/components/Header';

export default class SettingsPage extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<main id="page" className="page settings-page clearfix">
					<SettingsContainer 
						locationParams={this.props.match.params}
						history={this.props.history}
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

