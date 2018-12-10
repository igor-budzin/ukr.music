// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import MusicFilter from 'universal/components/MusicFilter';
import PlayList from 'universal/components/PlayList/PlayList';
import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
import MusicPlayerContainer from 'universal/containers/MusicPlayerContainer';
import isEqual from 'lodash.isequal';
// Actions
import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
import { choseMusicAction } from 'universal/redux/actions/controlMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
class MyMusicListContainer extends Component {
	componentDidMount() {
		this.props.getMusic();
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return !isEqual(nextProps.playlist, this.props.playlist);
	// }

	render() {
		return (
			<main id="page" className="page clearfix">
				<h2 className="section-title">Моя музика</h2>

				<div className="container clearfix">

					<MusicPlayerContainer />

					{/*<MusicFilter />*/}

				</div>

				<div className="filter-hr"></div>

				<div className="content">
					{
						this.props.playlist.length > 0 ?
						<PlayList
							playlist={this.props.playlist}
							handleChoseAudio={this.props.choseMusic}
						/> :
						<EmptyPlayList />
					}

					<br /><br /><br /><br /><br /><br /><br /><br />
				</div>
			</main>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		playlist: state.getMusicReducer.music
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		getMusic: getMusicListAction,
		choseMusic: choseMusicAction
	}, dispatch);
}

export default MyMusicListContainer;