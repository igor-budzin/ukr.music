// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-rangeslider';
import { formatSeconds } from 'universal/utils';
import WebAudioWrapper from 'universal/WebAudioWrapper';
import isEqual from 'lodash.isequal';
// Components

// Actions
import { playMusicAction, pauseMusicAction } from 'universal/redux/actions/controlMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
class MusicPlayerContainer extends Component {
	constructor(props, context) {
		super(props, context)

		this.audio = new WebAudioWrapper();

		this.state = {
			durationTime: 400,
			currentTime: 0
		}
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return !isEqual(nextProps, this.props);
	// }

	componentDidUpdate = () => {
		// console.log(this.audio);
		if(this.props.currentStatus) {
			if(!this.props.loaded) {
				this.audio.loadAudio(this.props.currentMusic.link).then(() => {
					this.audio.startAudio();
				});
			}
			else {
				this.audio.startAudio();
			}
		}
		else {
			if(this.props.loaded) {
				this.audio.stopAudio();
				
			}
		}
	}

	// playMusic = () => {
	// 	this.props.playMusic();
	// 	// const audio = new WebAudioWrapper();
	// 	// audio.loadAudio(this.props.currentMusic.link).then(() => {
	// 	// 	audio.startAudio();
	// 	// });
		
	// }

	handleChange = (currentTime) => {
		this.setState({
			currentTime: currentTime
		})
	}

	render() {
		return (
			<div className="player">
				<div className="controls controls--play">
					<div className="btn prev"></div>
					{
						this.props.currentStatus ?
						<div className="btn pause" onClick={this.props.pauseMusic}></div> :
						<div className="btn play" onClick={this.props.playMusic}></div>
					}
					<div className="btn next"></div>
				</div>

				<div className="progress-bar">
					<div className="time">
						<span className="current">{formatSeconds(this.state.currentTime)}</span>
						<span> / </span>
						<span className="duration">{formatSeconds(this.state.durationTime)}</span>
					</div>
					<Slider
						tooltip={false}
						min={0}
						max={this.state.durationTime}
						step={0.2}
						value={this.state.currentTime}
						onChange={this.handleChange}
					/>
				</div>

				<div className="controls controls--more">
					<div className="btn repeat"></div>
					<div className="btn shuffle"></div>
					<div className="btn volume"></div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		currentMusic: state.controlMusicReducer.currentMusic,
		currentStatus: state.controlMusicReducer.currentStatus,
		loaded: state.controlMusicReducer.loaded
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		playMusic: playMusicAction,
		pauseMusic: pauseMusicAction
	}, dispatch);
}

export default MusicPlayerContainer;
