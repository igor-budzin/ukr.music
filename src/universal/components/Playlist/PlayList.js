import React, { Component } from 'react';
import MusicItem from './MusicItem';

export default class PlayList extends Component {
	render() {
		return (
			<div className="playlist clearfix">
				{
					this.props.playlist.map((music, index) => {
						return (
							<MusicItem
								key={index}
								singer={music.singer}
								song={music.song}
								time={music.duration}
								bgUrl={music.bgUrl}
							/>
						);
					})
				}
			</div>
		);
	}
}

