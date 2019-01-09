// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import isEqual from 'lodash.isequal';
// Components
import MusicFilter from 'universal/components/MusicFilter';
import PlayList from 'universal/components/PlayList/PlayList';
import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
import SearchField from 'universal/components/SearchField';
import Button from 'universal/components/Commons/Button';
import SidebarContainer from 'universal/components/Sidebar/SidebarContainer';
import withUserData from 'universal/components/withUserData';
// Actions
import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class UserProfiletContainer extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.getPageData();
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.locationPath !== prevProps.locationPath
			|| this.props.locationParams.userId !== prevProps.locationParams.userId) {
			this.getPageData();
		}
	}

	getPageData = () => {
		this.props.getMusic(this.props.locationParams.userId, (response) => {
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
			<Fragment>
				<h2 className="section-title">Моя музика</h2>

				<div className="container clearfix">

					<MusicPlayerContainer />

					{/*<MusicFilter />*/}

				</div>

				<div className="filter-hr"></div>

				<div className="content">

					<div style={{"margin": "0 0 30px 0"}}>
						<SearchField />
					</div>

					<div className="section-links" style={{"marginBottom": "40px"}}>
						<a href="javascript:void(0)" className="link active">Треки</a>
						<a href="javascript:void(0)" className="link">Альбоми</a>
						<a href="javascript:void(0)" className="link">Плейлисти</a>
					</div>

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
				</div>
				<NotificationContainer />
			</Fragment>
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