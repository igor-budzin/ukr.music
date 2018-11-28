import React, { Component } from 'react';

export default class MusicItem extends Component {
	render() {
		const style ={
			"backgroundImage": "url(data:image/png;base64," + this.props.bgUrl + ")"
		};

		console.log(this.props.bgUrl);

		return (
			<div className="audio-row">
				<div className="audio-row-cover" style={style}>
					<div className="bg">
						<div className="bars">
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
							<div className="bar"></div>
						</div>
					</div>
				</div>
				<div className="audio-row-desc">
					<div className="singer"><a href="#">{this.props.artist}</a></div>
					<div className="song"><a href="#">{this.props.title}</a></div>
				</div>
				<div className="audio-row-time">{this.props.duration}</div>
			</div>
		);
	}
}

