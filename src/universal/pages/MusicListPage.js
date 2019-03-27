// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Sidebar from 'universal/components/Sidebar/SidebarContainer';
import MusicListContainer from 'universal/components/MusicList/MusicListContainer';
import Header from 'universal/components/Header';

export default class MusicListPage extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <main id="page" className="page clearfix">
          <MusicListContainer 
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

