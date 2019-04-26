// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Sidebar from 'universal/components/Sidebar/SidebarContainer';
import ContactContainer from 'universal/components/Contact/ContactContainer';
import Header from 'universal/components/Header';

export default class ContactPage extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <main id="page" className="page contact-page clearfix">
          <ContactContainer
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

