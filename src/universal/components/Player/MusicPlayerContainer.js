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


	componentDidUpdate(prevProps) {
		// console.log(prevProps, this.props)
		if(this.props.currentMusic.link) {
			console.log('прийшла лінка ' + this.props.chosenAudio.link);
			if(prevProps.chosenAudio.link !== this.props.chosenAudio.link) {
				console.log('1')
				this.playAudio(this.props.chosenAudio);
			}
			else {
				console.log('2 -')
				if(prevProps.isPlaying && !this.props.isPlaying) {
					console.log('3')
					this.pauseAudio();
				}
				else {
					console.log('4')
					this.playAudio(this.props.chosenAudio);
				}
			}
		}
		else {
			console.log('5')
			this.playAudio(this.props.chosenAudio);
		}












	}

	playAudio = (currentMusic) => {
		this.audio.src = 'https://localhost:8080/api/get-music/' + currentMusic.link;
		this.audio.play().then(() => {
			this.props.playAudioAction(currentMusic);
		});
	};

	pauseAudio = () => {
		this.props.pauseAudioAction();
		this.audio.play();
	};

	shouldComponentUpdate(nextProps) {
		if(Object.keys(this.props.currentMusic).length > 0 &&
			this.props.currentMusic.link === nextProps.currentMusic.link) {
			return false;
		}
		return true;
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
