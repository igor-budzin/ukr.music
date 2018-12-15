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
		super(props, context);

		this.state = {
			currentTime: 0,
			volume: 0.5,
			isMuted: false
		};
	}

	componentDidMount() {
		window.audioInstance.volume = this.state.volume;
		window.audioInstance.addEventListener('timeupdate', this.handleUpdateCurrentTime);
		window.audioInstance.addEventListener('ended', this.handleEndedAudio);
	}

	componentWillUnmount() {
		window.audioInstance.removeEventListener('timeupdate', this.handleUpdateCurrentTime);
		window.audioInstance.removeEventListener('ended', this.handleEndedAudio);
	}

	handleUpdateCurrentTime = () => {
		this.setState({
			currentTime: window.audioInstance.currentTime
		});
	};

	handleEndedAudio = () => {
		this.setState({
			currentTime: 0
		});
		this.props.pauseAudio();
	}

	handlePlayAudio = () => {
		if(this.props.currentMusic.link.length > 0) {
			this.props.playAudio();
		}
	};

	handlePauseAudio = () => {
		if(this.props.currentMusic.link.length > 0) {
			this.props.pauseAudio();
		}
	};

	handleChangeCurrentTime = (time) => {
		this.setState({
			currentTime: time
		}, () => {
			window.audioInstance.currentTime = time;
			if(!this.props.isPlaying) {
				this.handlePlayAudio();
			}
		});
	};

	handleChangeVolume = (volume) => {
		this.setState({
			volume
		});
		window.audioInstance.volume = volume;
	};

	handleMuteVolume = () => {
		this.setState({
			isMuted: !this.state.isMuted
		}, () => {
			window.audioInstance.muted = this.state.isMuted;
		});
	};

	render() {
		return (
			<MusicPlayer
				atrist={this.props.currentMusic.atrist}
				title={this.props.currentMusic.title}
				durationTime={this.props.currentMusic.duration}
				currentTime={this.state.currentTime}
				volume={this.state.volume}
				isPlaying={this.props.isPlaying}
				isMuted={this.state.isMuted}
				handlePlayAudio={this.handlePlayAudio}
				handlePauseAudio={this.handlePauseAudio}
				handleChangeCurrentTime={this.handleChangeCurrentTime}
				handleChangeVolume={this.handleChangeVolume}
				handleMuteVolume={this.handleMuteVolume}
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
