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
								handleChooseAudio={this.props.handleChooseAudio}
								link={music.link}
								key={index + music.link}
								artist={music.artists}
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

