// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'react-rangeslider';
import { formatSeconds } from 'universal/utils';

// Components
// import MusicFilter from 'universal/components/MusicFilter';
// import PlayList from 'universal/components/PlayList/PlayList';
// import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
// Actions
// import { getMusicAction } from 'universal/redux/actions/getMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
class MusicPlayerContainer extends Component {
	constructor (props, context) {
		super(props, context)

		this.state = {
			durationTime: 400,
			currentTime: 0
		}
	}

	componentDidMount() {
		

	}

	playMusic = () => {
		let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		// window.audio = new Audio();
		// audio.src = 'https://localhost:8080/api/get-music/' + this.props.currentMusic.link;
		// let source = audioCtx.createMediaElementSource(audio);
		// source.connect(audioCtx.destination);
		// source.start(0)

		fetch('https://localhost:8080/api/get-music/' + this.props.currentMusic.link)

		function fetch (url, resolve) {
		  var request = new XMLHttpRequest();
		  request.open('GET', url, true);
		  request.responseType = 'arraybuffer';
		  request.onload = function () { onSuccess(request) }
		  request.send()
		}

		function onSuccess (request) {
		  var audioData = request.response;
		  audioCtx.decodeAudioData(audioData, onBuffer, onDecodeBufferError)
		}

		function onBuffer (buffer) {
		  var source = audioCtx.createBufferSource();
		  source.buffer = buffer;
		  source.connect(audioCtx.destination);
		  source.start()
		}

		function onDecodeBufferError (e) {
		  console.log('Error decoding buffer: ' + e.message);
		  console.log(e);
		}

	}

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
					<div className="btn play" onClick={this.playMusic}></div>
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
		currentMusic: state.controlMusicReducer.currentMusic
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		// getMusic: getMusicAction
	}, dispatch);
}

export default MusicPlayerContainer;
