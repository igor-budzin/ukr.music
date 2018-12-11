// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEqual from 'lodash.isequal';
// Components
import MusicPlayer from './MusicPlayer';
// Actions
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
class MusicPlayerContainer extends Component {
	constructor(props, context) {
		super(props, context)

		this.audio = new Audio();

		this.state = {
			currentTime: 0
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if(Object.keys(this.props.currentMusic).length === 0 &&
		 prevProps.currentMusic.link !== this.props.currentMusic.link) {
			this.audio.src = 'https://localhost:8080/api/get-music/' + this.props.currentMusic.link;
			this.props.setCurrentAudioAction(this.props.chosenAudio)
		}
		if(this.props.setIsPlaying) {
			this.audio.play();
			this.props.playAudioAction();
		}

		if(this.props.isPlaying) {
			this.audio.play();
			this.props.playAudioAction();
		}
		else {
			this.audio.pause();
			this.props.pauseAudioAction();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !isEqual(nextProps, this.props) && !isEqual(nextState, this.state);
	}

	render() {
		return (
			<MusicPlayer
				atrist={this.props.currentMusic.atrist}
				title={this.props.currentMusic.title}
				durationTime={this.props.currentMusic.durationTime}
				currentTime={this.state.currentTime}
			/>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		currentMusic: state.controlMusicReducer.currentMusic,
		isPlaying: state.controlMusicReducer.isPlaying
	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators(AudioActions, dispatch);
}

export default MusicPlayerContainer;
