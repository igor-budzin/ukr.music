// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import ReactPlaceholder from 'react-placeholder';
import ReactModal from 'react-modal';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// Components
import MusicFilter from 'universal/components/MusicFilter';
import PlayList from 'universal/components/PlayList/PlayList';
import EmptyPlayList from 'universal/components/PlayList/EmptyPlayList';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
import SearchField from 'universal/components/SearchField';
import PlayLists from './PlayLists';
import Button from 'universal/components/Commons/Button';
import Select from 'universal/components/Commons/Select';
// Actions
import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = state => ({
	playlist: state.getMusicReducer.music,
	currentMusic: state.controlMusicReducer.currentMusic,
	currentPlaylist: state.controlMusicReducer,
	isPlaying: state.controlMusicReducer.isPlaying,
	currentUserName: state.AuthReducer.user.name,
	userId: state.AuthReducer.user.id,
	visibleUserName: state.visibleUserDataReducer.name,
	visibleUserID: state.visibleUserDataReducer._id
});

const mapDispatchToProps = dispatch =>  bindActionCreators({ ...AudioActions, getMusic: getMusicListAction }, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UserProfiletContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			audioListReady: false,
			audioDataReady: false,
			showModal: false,
			editField_Artist: '',
			editField_Title: '',
			editField_Genre: ''
		}
	}

	componentDidMount() {
		this.getPageData();
		ReactModal.setAppElement(document.getElementById('root'));
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.locationPath !== prevProps.locationPath
			|| this.props.locationParams.name !== prevProps.locationParams.name) {
			this.getPageData();
		}
	}

	getPageData = () => {
		this.props.getMusic(this.props.locationParams.name)
		.then(response => {
			this.setState({
				audioListReady: true
			});
		})
		.catch(error => {
			NotificationManager.error({
				title: 'Помилка',
				message: 'На жаль під час завантаження аудіофайлів сталася помилка',
				timeOut: 10000
			});
		})
	};

	handleChoseAudio = (audioData) => {
		if(this.props.currentMusic.link.length === 0) {
			this.props.playAudio(audioData, this.props.playlist);
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
				this.props.playAudio(audioData, this.props.playlist);
			}
		}
	};

	handleEditAudio = (id) => {
		this.setState({ showModal: true });
		axios.post('https://localhost:8080/api/getAudioData', {
			audioID: id
		})
		.then(response => {
			this.setState({
				audioDataReady: true,
				editField_Artist: response.data.artists,
				editField_Title: response.data.title,
				editField_Genre: response.data.genre
			});
		})
		
	}

	handleCloseModal = () => {
		this.setState({
			showModal: false,
			audioDataReady: false
		})
	}

	render() {
		return (
			<Fragment>
				<h2 className="section-title">
					{
						this.props.userId !== this.props.visibleUserID && this.props.visibleUserName ?
						this.props.visibleUserName : 'Моя музика'
					}
				</h2>

				<div className="container clearfix">

					<MusicPlayerContainer />

					{/*<MusicFilter />*/}

				</div>

				<div className="filter-hr"></div>

				<div className="content">

					<div style={{"margin": "0 0 30px 0"}}>
						<SearchField />
					</div>

					<Tabs>

					
						<TabList className="section-links" style={{"marginBottom": "40px"}}>
							<Tab className="link" selectedClassName="active">Треки</Tab>
							<Tab className="link" selectedClassName="active">Альбоми</Tab>
							<Tab className="link" selectedClassName="active">Плейлисти</Tab>
						</TabList>

						<TabPanel>
							<ReactPlaceholder showLoadingAnimation ready={this.state.audioListReady} customPlaceholder={musicLoader}>
								{
									this.props.playlist && this.props.playlist.length > 0 ?
									<PlayList
										currentId={this.props.currentMusic._id}
										playlist={this.props.playlist}
										handleChoseAudio={this.handleChoseAudio}
										handleEditAudio={this.handleEditAudio}
										isPlaying={this.props.isPlaying}
									/> :
									<EmptyPlayList />
								}
							</ReactPlaceholder>
						</TabPanel>

						<TabPanel>
							<div className="albums albums-list">
								<div className="album">
									<img src="https://localhost:8080/api/albumCover/MAXIMALISM.jpg" alt=""/>
									<div className="album-name">Perfection Is a Lie</div>
									<div className="album-year">2017</div>
								</div>
								<div className="album">
									<img src="https://localhost:8080/api/albumCover/epolets-album.jpg" alt=""/>
									<div className="album-name">Cold Altair</div>
									<div className="album-year">2014</div>
								</div>
								<div className="album">
									<img src="https://localhost:8080/api/albumCover/thehardkiss-album.jpg" alt=""/>
									<div className="album-name">Stones and Honey</div>
									<div className="album-year">2014</div>
								</div>
								<div className="album">
									<img src="https://localhost:8080/api/albumCover/ThePrettyReckless.jpg" alt=""/>
									<div className="album-name">Залізна ластівка</div>
									<div className="album-year">2018</div>
								</div>
								<div className="album">
									<img src="https://localhost:8080/api/albumCover/color-album.jpg" alt=""/>
									<div className="album-name">Lovers</div>
									<div className="album-year">2016</div>
								</div>
								<div className="album">
									<img src="https://localhost:8080/api/albumCover/mort-album.jpg" alt=""/>
									<div className="album-name">Stones and Honey</div>
									<div className="album-year">2015</div>
								</div>
							</div>
						</TabPanel>

						<TabPanel>
							<PlayLists />
						</TabPanel>
					</Tabs>

				</div>



					<ReactModal
						isOpen={this.state.showModal}
						onAfterOpen={this.handleOpenEditModal}
						className="modal edit-audio"
						overlayClassName="overlay"
					>
						<div className="title">
							Редагування аудіозапису
							<div className="close" onClick={this.handleCloseModal}></div>
						</div>

							<ReactPlaceholder showLoadingAnimation ready={this.state.audioDataReady} customPlaceholder={musicLoader}>
								<div>
									<div className="cover">
										<img src="https://localhost:8080/api/albumCover/MAXIMALISM.jpg" />
										<div className="edit"><span>змінити</span></div>
									</div>

									<div className="desc">
										<div className="input-wrapper">
											<label htmlFor="edit-artist">Виконавець</label>
											<input
												type="text"
												className="input"
												id="edit-artist"
												value={this.state.editField_Artist}
												onChange={e => this.setState({ editField_Artist: e.target.value })}
											/>
										</div>

										<div className="input-wrapper">
											<label htmlFor="edit-title">Назва</label>
											<input
												type="text"
												className="input"
												id="edit-title"
												value={this.state.editField_Title}
												onChange={e => this.setState({ editField_Title: e.target.value })}
											/>
										</div>

										<div className="input-wrapper">
											<label htmlFor="edit-genre">Жанр</label>
											<Select id="edit-genre" options={options} defaultValue="item 2" defaultLabel="2 Item">
											</Select>
										</div>

										<div className="input-wrapper">
											<Button className="red">Зберегти</Button>
										</div>
									</div>
								</div>
							</ReactPlaceholder>
					</ReactModal>

				<NotificationContainer />
			</Fragment>
		);
	}
}

const svgLoaderStyle = {
	left: '50%',
	top: '50%',
	marginTop: '40px',
	width: '240px',
	position: 'absolute',
	transform: 'translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)',
}

const musicLoader = (
	<div style={{position: 'relative'}}>
		<svg viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet" style={svgLoaderStyle}>
			<path stroke="#ff4838" id="outline" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" 
						d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
			<path id="outline-bg" opacity="0.5" fill="none" stroke="#ededed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" 
						d="				M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
		</svg>
	</div>
)

const options = [
	{value: 'item 1', label: '1 Item'},
	{value: 'item 2', label: '2 Item'},
	{value: 'item 3', label: '3 Item'},
	{value: 'item 4', label: '4 Item'},
	{value: 'item 1', label: '1 Item'},
	{value: 'item 1', label: '1 Item'},
	{value: 'item 1', label: '1 Item'}
];
