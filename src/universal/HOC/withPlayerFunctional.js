// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = state => ({
  playlist: state.getMusicReducer.music,
  currentMusic: state.controlMusicReducer.currentMusic,
  currentPlaylist: state.controlMusicReducer,
  isPlaying: state.controlMusicReducer.isPlaying,
  isLoading: state.controlMusicReducer.isLoading
});

const mapDispatchToProps = (dispatch, props) => {
  return bindActionCreators({ ...AudioActions }, dispatch);
};

export default function withPlayerFunctional(PassedComponent) {
  class WithPlayerFunctional extends Component {

    handleChoseAudio = audioData => {
      if(this.props.currentMusic.link.length === 0) {
        this.props.playAudio(audioData, this.props.playlist);
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
          this.props.playAudio(audioData, this.props.playlist);
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




