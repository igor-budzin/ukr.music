import React, { Component } from 'react';
import MusicItem from './MusicItem';

export default class PlayList extends Component {

	// shouldComponentUpdate(nextProps) {
	// 	return this.props.playlist.length !== nextProps.playlist.length;
	// }

	render() {
		return (
			<div className="playlist">
				{
					this.props.playlist.map((music, index) => {
						return (
							<MusicItem
								handleChoseAudio={this.props.handleChoseAudio}
								handleEditAudio={this.props.handleEditAudio}
								isPlay={this.props.currentId === music._id && this.props.isPlaying}
								_id={music._id}
								link={music.link}
								key={index + music.link}
								artist={music.artists}
								title={music.title}
								time={music.duration}
								picture={music.picture}
								duration={music.duration}
							/>
						);
					})
				}
			</div>
		);
	}
}

