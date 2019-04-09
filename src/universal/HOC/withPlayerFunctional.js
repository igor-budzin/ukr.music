// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = state => ({
  currentMusic: state.controlMusicReducer.currentMusic,
  isPlaying: state.controlMusicReducer.isPlaying
});

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({ ...AudioActions }, dispatch);
};

export default function withPlayerFunctional(PassedComponent) {
  class WithPlayerFunctional extends Component {

    handleChoseAudio = (audioData, audioList) => {
      if(audioList === undefined) throw new Error('"audioList" is not defined');

      if(this.props.currentMusic.link.length === 0) {
        this.props.playAudio(audioData, audioList);
      }
      else {
        if(this.props.currentMusic.link === audioData.link) {
          if(this.props.isPlaying) {
            this.props.pauseAudio();
          }
          else {
            this.props.playAudio();
          }
        }
        else {
          this.props.playAudio(audioData, audioList);
        }
      }
    }

    render() {
      return (
        <PassedComponent
          {...this.props}
          handleChoseAudio={this.handleChoseAudio}
        />
      )
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithPlayerFunctional);
}




