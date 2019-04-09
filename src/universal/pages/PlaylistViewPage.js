// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Sidebar from 'universal/components/Sidebar/SidebarContainer';
import PlaylistView from 'universal/components/PlaylistView/PlaylistView';
import Header from 'universal/components/Header';

export default class PlaylistViewPage extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <main id="page" className="page playlist-view__page clearfix">
          <PlaylistView
            {...this.props.match}
            {...this.props.location.state}
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

