import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import { formatSeconds } from 'universal/utils';
import classNames from 'classnames';
import isEqual from 'lodash.isequal';

export default class MusicPlayer extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return !isEqual(this.props, nextProps);
	}

	render() {
		return (
			<div className="player">
				<div className="cover" style={{"backgroundImage": "url(data:image/png;base64," + this.props.picture + ")"}}></div>
				<div className="controls controls--play">
					<div className="btn prev" onClick={this.props.handlePrevAudio}></div>
					{
						this.props.isPlaying ?
						<div className="btn pause" onClick={this.props.handlePauseAudio}></div> :
						<div className="btn play" onClick={this.props.handlePlayAudio}></div>
					}
					<div className="btn next" onClick={this.props.handleNextAudio}></div>
				</div>

				<div className="progress-bar">
					<div className="title">
						{`${this.props.atrists} - ${this.props.title}`}
					</div>
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
					<div
						className={classNames('btn', 'repeat')}
						onClick={this.props.handleRepeat}
					>
					</div>

					<div className="btn shuffle"></div>

					<div className={classNames('btn', 'volume', {'muted': this.props.isMuted})} onClick={this.props.handleMuteVolume}>
						<div className="volume-seeker" onClick={(e) => {e.stopPropagation()}}>
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
					<div className="btn playlist"></div>
				</div>
			</div>
		);
	}
}