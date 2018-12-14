import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import { formatSeconds } from 'universal/utils';

export default class MusicPlayer extends Component {
	render() {
		return (
			<div className="player">
				<div className="controls controls--play">
					<div className="btn prev"></div>
					{
						this.props.isPlaying ?
						<div className="btn pause" onClick={this.props.handlePauseAudio}></div> :
						<div className="btn play" onClick={this.props.handlePlayAudio}></div>
					}
					<div className="btn next"></div>
				</div>

				<div className="progress-bar">
					<div className="time">
						<span className="current">{formatSeconds(this.props.currentTime)}</span>
						<span> / </span>
						<span className="duration">{formatSeconds(this.props.durationTime)}</span>
					</div>
					<Slider
						tooltip={false}
						min={0}
						max={this.props.durationTime}
						step={1}
						value={this.props.currentTime}
						onChange={this.props.handleChangeCurrentTime}
					/>
				</div>

				<div className="controls controls--more">
					<div className="btn repeat"></div>
					<div className="btn shuffle"></div>
					<div className="btn volume">
						<div className="volume-seeker">
							<Slider
								orientation="vertical"
								tooltip={false}
								min={0}
								max={1}
								step={0.02}
								value={this.props.volume}
								onChange={this.props.handleChangeVolume}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}