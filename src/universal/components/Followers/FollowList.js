import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FollowList extends Component {

	// shouldComponentUpdate(nextProps) {
	// 	return this.props.playlist.length !== nextProps.playlist.length;
	// }

	render() {
		return (
			<div className="followlist">
				{
					this.props.follows.map(item => {
						return (
							<div key={item._id} className="clearfix" style={{"marginBottom": "20px"}}>
								<img src={item.avatar} alt={item.name} style={imgStyle} />
								<Link to={`/profile/${item._id}`}><span>{item.name}</span></Link><br />
								<span>треки: {item.audioCount}</span><br />
								<span>підписники: {item.followsCount}</span>
							</div>
						)
					})
				}
			</div>
		);
	}
}

const imgStyle = {
	float: 'left',
	width: '80px',
	height: '80px',
	marginRight: '20px'
}