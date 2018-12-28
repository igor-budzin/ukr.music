// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import axios from 'axios';
// Components
import MusicFilter from 'universal/components/MusicFilter';
import PlayList from 'universal/components/PlayList/PlayList';
import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
import SearchField from 'universal/components/SearchField';
// Actions
import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
export default class MyMusicListContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			audioCount: null
		};
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

		axios.get('https://localhost:8080/api/getUserData/' + this.props.userId).then((response) => {
			this.setState({
				audioCount: response.data
			});
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



				<div className="sidebar">
					<div className="counts sidebar-wrapper">
						<div className="col">
							<span className="text">Підписалось</span>
							<span className="count">122</span>
						</div>
						<div className="col">
							<span className="text">Аудіофайлів</span>
							<span className="count">{this.state.audioCount}</span>
						</div>
					</div>

					<div className="sidebar-wrapper">
						
					</div>

					<div className="sidebar-wrapper">
						<div className="sidebar-link">
							<Link to="/upload" className="link upload">Завантажити аудіозаписи</Link>
							<Link to="" className="link recommend">Рекомендації</Link>
							<Link to="" className="link update">Оновлення друзів</Link>
							<Link to="" className="link settings">Налаштування</Link>
						</div>
					</div>
					
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