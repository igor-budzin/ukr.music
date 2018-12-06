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
					<div className="btn play"></div>
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
		// playlist: state.getMusicReducer.music
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		// getMusic: getMusicAction
	}, dispatch);
}

export default MusicPlayerContainer;
