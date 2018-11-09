import React, { Component } from 'react';

import MusicItem from './MusicItem';

import playlist from './playlist.json';

export default class PlayList extends Component {
	render() {
		return (
			<div className="playlist clearfix">
				{
					playlist.map((music, index) => {
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

