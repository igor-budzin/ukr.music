import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';
import { formatSeconds } from 'universal/utils';
import { API_URL } from '../../../global.config';

export default class MusicItem extends Component {
	onClick = () => {
		this.props.handleChoseAudio({
			_id: this.props._id,
			link: this.props.link,
			title: this.props.title,
			artists: this.props.artist,
			duration: this.props.duration,
			picture: this.props.picture
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		// return !isEqual(nextProps, this.props);
		return this.props.isPlay !== nextProps.isPlay;
	}

	onEdit = event => {
		event.stopPropagation();
		this.props.handleEditAudio(this.props._id);
	}

	render() {
		let style = {};
		// if(this.props.picture) {
		// 	style = { "backgroundImage": `url(${API_URL}/getAudioCover/${this.props.picture})` };
		// }

		return (
			<div
				className={classNames('audio-row', (this.props.isPlay ? ' isPlay' : null), this.props.mini ? 'mini': null)}
				onClick={this.onClick}
				style={this.props.style ? this.props.style : {}}
			>
				<div className={classNames('audio-row-cover', this.props.picture ? null : 'empty')} style={style}>
					{
						this.props.isPlay && (
							<div className="bars">
								<div className="bar"></div>
								<div className="bar"></div>
								<div className="bar"></div>
								<div className="bar"></div>
								<div className="bar"></div>
							</div>
						)
					}
					<div className="bg"></div>
				</div>
				<div className="audio-row-desc">
					<div className="singer"><a href="javascript:void(0);">{this.props.artist}</a></div>
					<div className="song"><a href="javascript:void(0);">{this.props.title}</a></div>
				</div>
				<div className="audio-row-time">{formatSeconds(this.props.duration)}</div>
				<div className="audio-row-options">
					{
						typeof this.props.handleEditAudio === 'function' && (
							<div className="edit" title="Редагувати" onClick={this.onEdit}></div>
						)
					}
				</div>
			</div>
		);
	}
}

