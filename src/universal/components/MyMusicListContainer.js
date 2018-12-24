// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
// Components
import MusicFilter from 'universal/components/MusicFilter';
import PlayList from 'universal/components/PlayList/PlayList';
import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
// Actions
import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class MyMusicListContainer extends Component {
	constructor(props, context) {
		super(props, context)
	}

	componentDidMount() {
		this.props.getMusic(this.props.userId, (response) => {
			if(!response.status) {
				NotificationManager.error({
					title: 'Помилка',
					message: 'На жаль під час завантаження аудіофайлів сталася помилка',
					timeOut: 10000
				});
			}
		});
	}

	handleChoseAudio = (audioData) => {
		if(this.props.currentMusic.link.length === 0) {
			this.props.playAudio(audioData);
		}
		else {
			if(this.props.currentMusic.link === audioData.link) {
				if(this.props.isPlaying) {
					this.props.pauseAudio();
				}
				else {
					this.props.playAudio();
				}
			}
			else {
				this.props.playAudio(audioData);
			}
		}
	}

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
						this.props.playlist && this.props.playlist.length > 0 ?
						<PlayList
							currentId={this.props.currentMusic.id}
							playlist={this.props.playlist}
							handleChoseAudio={this.handleChoseAudio}
							isPlaying={this.props.isPlaying}
						/> :
						<EmptyPlayList />
					}

					<br /><br /><br /><br /><br /><br /><br /><br />
				</div>
				<div className="sidebar">
					<Link to="/upload" className="button-add-music">Завантажити аудіозаписи</Link>
				</div>
				<NotificationContainer />
			</main>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		playlist: state.getMusicReducer.music,
		currentMusic: state.controlMusicReducer.currentMusic,
		isPlaying: state.controlMusicReducer.isPlaying,
		userId: state.AuthReducer.user.id
	};
}

function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		...AudioActions,
		getMusic: getMusicListAction
	}, dispatch);
}