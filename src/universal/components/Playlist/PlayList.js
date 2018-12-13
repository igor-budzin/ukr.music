import React, { Component } from 'react';
import MusicItem from './MusicItem';

export default class PlayList extends Component {

	// shouldComponentUpdate(nextProps) {
	// 	return this.props.playlist.length !== nextProps.playlist.length;
	// }

	render() {
		return (
			<div className="playlist clearfix">
				{
					this.props.playlist.map((music, index) => {
						return (
							<MusicItem
								handleChoseAudio={this.props.handleChoseAudio}
								isPlay={this.props.currentId === music.id && this.props.isPlaying}
								id={music.id}
								link={music.link}
								key={index + music.link}
								artist={music.artists}
								title={music.title}
								time={music.duration}
								bgUrl={music.picture}
								duration={music.duration}
							/>
						);
					})
				}
			</div>
		);
	}
}

