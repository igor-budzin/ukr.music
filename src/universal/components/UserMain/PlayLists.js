// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactModal from 'react-modal';
import axios from 'axios';
// Components
import Button from 'universal/components/Commons/Button';
import Select from 'universal/components/Commons/Select';
// Actions
// import { getMusicListAction } from 'universal/redux/actions/getMusicListActions';
// import * as AudioActions from 'universal/redux/actions/controlMusicActions';

const mapStateToProps = (state, props) => ({
	currentUserName: state.AuthReducer.user.name
});

const mapDispatchToProps = (dispatch, props) =>  bindActionCreators({}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UserProfiletContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			showModal: false,
			title: '',
			audioDataReady: false,
			modalAudioList: [],
			choosenModalAudioList: []
		}
	}

	componentDidMount() {
		ReactModal.setAppElement(document.getElementById('root'));
	}

	onOpenModal = () => {
		this.setState({ showModal: true });
	}

	onCloseModal = () => {
		this.setState({ showModal: false });
	}

	handleOpenEditModal = () => {
		axios.get('https://localhost:8080/api/getMusic/' + this.props.currentUserName)
		.then(response => {
			console.log(response)
			this.setState({
				audioDataReady: true,
				modalAudioList: response.data
			});
		})
	}

	onChooseAudioForPlaylist = (id) => {
		event.target.classList.toggle('active');

		const arr = this.state.choosenModalAudioList;
		const index = arr.indexOf(id);

		index !== -1 ? arr.splice(index, 1) : arr.push(id);

		this.setState({ choosenModalAudioList: arr });
	}

	handleCreatePlaylist = () => {
		console.log(this.state.choosenModalAudioList);
	}

	render() {
		return (
			<div className="play-lists">
				<div className="playlist" id="new-playlist" onClick={this.onOpenModal}>
					<div className="cover">
					</div>
					<div className="playlist-name">Новий список відтворення</div>
				</div>

				<div className="playlist">
					<div className="cover">
						<div className="bg"></div>
						<img src="https://localhost:8080/api/albumCover/thehardkiss-album.jpg" alt=""/>
					</div>
					<div className="playlist-name">Релакс</div>
				</div>

				<div className="playlist">
					<div className="cover">
						<div className="bg"></div>
						<img src="https://localhost:8080/api/albumCover/epolets-album.jpg" alt=""/>
					</div>
					<div className="playlist-name">Stones and Honey</div>
				</div>

				<div className="playlist">
					<div className="cover">
						<div className="bg"></div>
						<img src="https://localhost:8080/api/albumCover/color-album.jpg" alt=""/>
					</div>
					<div className="playlist-name">Stones and Honey</div>
				</div>



				<ReactModal
					isOpen={this.state.showModal}
					onAfterOpen={this.handleOpenEditModal}
					className="modal create-playlist"
					overlayClassName="overlay"
				>
					<div className="title">
						Створення плейлиста
						<div className="close" onClick={this.onCloseModal}></div>
					</div>

					<div>
						<div className="desc">
							<div className="input-wrapper">
								<label htmlFor="title">Назва</label>
								<input
									type="text"
									className="input"
									id="title"
									value={this.state.title}
									onChange={e => this.setState({ title: e.target.value })}
								/>
							</div>

							<div className="audio-list">
								{
									this.state.modalAudioList.map((audio, index) => {
										let style = {};
										if(audio.picture) {
											style = { "backgroundImage": "url(data:image/png;base64," + audio.picture + ")" };
										}

										return (
											<div className="audio-row mini" key={audio._id + index} onClick={this.onChooseAudioForPlaylist.bind(null, audio._id)}>
												<div className="audio-row-cover" style={style}>
													{
														audio.isPlay && (
															<div className="bars">
																<div className="bar"></div>
																<div className="bar"></div>
																<div className="bar"></div>
																<div className="bar"></div>
																<div className="bar"></div>
															</div>
														)
													}
													<div className="bg"></div>
												</div>
												<div className="audio-row-desc">
													<div className="singer">{audio.artists}</div>
													<div className="song">{audio.title}</div>
												</div>
											</div>
										);
									})
								}
							</div>

							<div className="input-wrapper">
								<Button className="red" onClick={this.handleCreatePlaylist}>Зберегти</Button>
							</div>
						</div>
					</div>
				</ReactModal>
			</div>
		);
	}
}
