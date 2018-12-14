// Libraries
import React, { Component, Fragment } from 'react';

import MyMusicListContainer from 'universal/components/MyMusicListContainer';
import Header from 'universal/components/Header';

class MyMusicListPage extends Component {
	render() {
		return (
			<div className="wrapper">
				<Header />
				<MyMusicListContainer />
			</div>
		);
	}
}

export default MyMusicListPage;
