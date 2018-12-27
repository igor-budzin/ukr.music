// Libraries
import React, { Component } from 'react';

import ArtistProfileContainer from 'universal/components/ArtistProfile/ArtistProfileContainer';
import Header from 'universal/components/Header';

export default class ArtistProfilePage extends Component {
	componentDidMount() {
		console.log(this.props)
	}
	render() {
		return (
			<div className="wrapper">
				<Header />
				<ArtistProfileContainer  />
			</div>
		);
	}
}

