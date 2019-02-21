// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stringToBoolean } from '../../utils';
// Components
import MusicPlayer from './MusicPlayer';
// Actions
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = state => ({
	currentMusic: state.controlMusicReducer.currentMusic,
	currentPlaylist: state.controlMusicReducer.currentPlaylist,
	isPlaying: state.controlMusicReducer.isPlaying
});

const mapDispatchToProps = dispatch => bindActionCreators(AudioActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
class MusicPlayerContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			currentTime: 0,
			volume: localStorage.getItem('volume') !== null ? parseFloat(localStorage.getItem('volume')) : 0.5,
			isMuted: localStorage.getItem('isMuted') !== null ? stringToBoolean(localStorage.getItem('isMuted')) : false,
			repeat: false
		};
	}

	componentDidMount() {
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
		this.handleNextAudio();
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
		const volumeValue = Math.round((volume) * 100) / 100;
		this.setState({
			volume: volumeValue
		});
		window.audioInstance.volume = volumeValue;
		localStorage.setItem('volume', volumeValue);
	};

	handleMuteVolume = () => {
		this.setState({
			isMuted: !this.state.isMuted
		}, () => {
			window.audioInstance.muted = this.state.isMuted;
			localStorage.setItem('isMuted', this.state.isMuted);
		});
	};

	handleNextAudio = () => {
		const { currentPlaylist, currentMusic } = this.props;
		
		const arrIndex = currentPlaylist.findIndex(elem => {
			return elem._id === currentMusic._id;
		});

		if(arrIndex !== -1 && arrIndex !== currentPlaylist.lenght - 1) {
			this.props.playAudio(currentPlaylist[arrIndex + 1]);
		}
		else this.props.pauseAudio();
	};

	handlePrevAudio = () => {
		const { currentPlaylist, currentMusic } = this.props;

		const arrIndex = currentPlaylist.findIndex(elem => {
			return elem._id === currentMusic._id;
		});

		if(arrIndex !== -1 && arrIndex !== 0) {
			this.props.playAudio(currentPlaylist[arrIndex - 1]);
		}
		else this.props.pauseAudio();
	};

	handleRepeat = () => {

	};

	render() {
		return (
			<MusicPlayer
				currentMusic={this.props.currentMusic}
				currentTime={this.state.currentTime}
				currentPlaylist={this.props.currentPlaylist}
				volume={this.state.volume}
				repeat={this.state.repeat}
				isPlaying={this.props.isPlaying}
				isMuted={this.state.isMuted}
				handlePlayAudio={this.handlePlayAudio}
				handlePauseAudio={this.handlePauseAudio}
				handleChangeCurrentTime={this.handleChangeCurrentTime}
				handleChangeVolume={this.handleChangeVolume}
				handleMuteVolume={this.handleMuteVolume}
				handleRepeat={this.handleRepeat}
				handleNextAudio={this.handleNextAudio}
				handlePrevAudio={this.handlePrevAudio}

			/>
		);
	}
}

export default MusicPlayerContainer;
