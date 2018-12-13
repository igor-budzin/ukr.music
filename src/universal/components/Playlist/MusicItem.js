import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import { formatSeconds } from 'universal/utils';

export default class MusicItem extends Component {
	onClick = () => {
		this.props.handleChoseAudio({
			id: this.props.id,
			link: this.props.link,
			artist: this.props.artist,
			title: this.props.title,
			duration: this.props.duration
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !isEqual(nextProps, this.props);
	}

	render() {
		let style = {};
		if(this.props.bgUrl) {
			style = { "backgroundImage": "url(data:image/png;base64," + this.props.bgUrl + ")" };
		}

		return (
			<div className={'audio-row' + (this.props.isPlay ? ' isPlay' : '')} onClick={this.onClick}>
				<div className="audio-row-cover" style={style}>
					{
						this.props.isPlay ? 
						<div className="bars">
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
						</div> : null
					}

				</div>
				<div className="audio-row-desc">
					<div className="singer"><a href="javascript:void(0);">{this.props.artist}</a></div>
					<div className="song"><a href="javascript:void(0);">{this.props.title}</a></div>
				</div>
				<div className="audio-row-time">{formatSeconds(this.props.duration)}</div>
			</div>
		);
	}
}

