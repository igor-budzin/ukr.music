// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';

export default class ContactContainer extends Component {
  render() {
    return (
      <Fragment>
        <h2 className="section-title">
          Контакти
        </h2>

        <div className="container clearfix">
          <MusicPlayerContainer />
        </div>

        <div className="filter-hr"></div>

        <div className="content">
          Контакти
        </div>
      </Fragment>
    )
  }
}