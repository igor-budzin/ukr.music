import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import { formatSeconds } from 'universal/utils';
import classNames from 'classnames';
import isEqual from 'lodash.isequal';
import { API_URL } from '../../../global.config';
// Components
import PlayList from 'universal/components/AudioList/PlayList';

export default class MusicPlayer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			playlistOpen: false
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !isEqual(this.props, nextProps);
	}

	onOpenPlaylist = () => {
		this.setState({ playlistOpen: !this.state.playlistOpen });
	}

	render() {
		const { 
			_id,
			picture,
			artists,
			title,
			duration
		} = this.props.currentMusic;

		let style = {};
		if(picture) {
			style = { "backgroundImage": `url(${API_URL}/getAudioCover/${picture})` };
		}

		return (
			<div className="player">
				<div className={classNames('cover', picture ? null : 'empty')} style={style}></div>
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
						{`${artists} - ${title}`}
					</div>
					<div className="time">
						<span className="current">{formatSeconds(this.props.currentTime)}</span>
						<span> / </span>
						<span className="duration">{formatSeconds(duration)}</span>
					</div>
					<Slider
						tooltip={false}
						min={0}
						max={duration}
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
					<div className="btn playlist" onClick={this.onOpenPlaylist}>
						{
							this.state.playlistOpen && (
								<div className="playlist-wrapper">
									<div>
										<PlayList 
											mini={true}
											currentId={_id}
											playlist={this.props.currentPlaylist}
											handleChoseAudio={this.handleChoseAudio}
											handleEditAudio={this.handleEditAudio}
											isPlaying={this.props.isPlaying}
										/>
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		);
	}
}