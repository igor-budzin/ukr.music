import React, { Component } from 'react';
import MusicItem from './MusicItem';

export default class PlayList extends Component {
	render() {
		console.log(this.props.playlist)
		return (
			<div className="playlist clearfix">
				{
					this.props.playlist.map((music, index) => {
						return (
							<MusicItem
								key={index}
								artist={music.artists[0]}
								title={music.title}
								time={music.duration}
								bgUrl={music.picture}
							/>
						);
					})
				}
			</div>
		);
	}
}

