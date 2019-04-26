// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactModal from 'react-modal';
import axios from 'axios';
import { API_URL } from '../../../global.config';
// Components
import Button from 'universal/components/Commons/Button';
import MusicPlayerContainer from 'universal/components/Player/MusicPlayerContainer';
// Actions

const mapStateToProps = (state, props) => ({
	currentUserId: state.AuthReducer.user.id
});

const mapDispatchToProps = (dispatch, props) =>  bindActionCreators({}, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingstContainer extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			showModal: false,
			artistName: ''
		}
	}

	componentDidMount() {
		ReactModal.setAppElement(document.getElementById('root'));
	}

	handleOpenModal = (event) => {
		event.preventDefault();
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false, artistName: '' });
	};

	handleCreateArtist = () => {
		axios.post(`${API_URL}/artist`, {
			artistName: this.state.artistName,
			currentUserId: this.props.currentUserId
		})
		.then(response => {
			this.handleCloseModal();
			this.props.history.push(`/artist/${response.data.name}`); 
		})
		.catch(err => { console.log(err) })
	};

	render() {
		return (
			<Fragment>
				<h2 className="section-title">Налаштування</h2>

				<div className="container clearfix">
					<MusicPlayerContainer />
				</div>

				<div className="filter-hr"></div>

				<div className="content">

					<Tabs>
						<TabList className="section-links" style={{"marginBottom": "40px"}}>
							<Tab className="link" selectedClassName="active">Профіль</Tab>
							<Tab className="link" selectedClassName="active">Пароль</Tab>
							<Tab className="link" selectedClassName="active">Синхронізація</Tab>
						</TabList>
					
						<TabPanel>
							<div className="input-wrapper">
								<a className="orange" href="#" onClick={this.handleOpenModal}>Створити сторінку виконавця</a>
							</div>

							<ReactModal
								isOpen={this.state.showModal}
								onAfterOpen={this.handleOpenEditModal}
								className="modal edit-audio"
								overlayClassName="overlay"
							>
								<div className="title">
									Створення виконавця
									<div className="close" onClick={this.handleCloseModal}></div>
								</div>
									<div className="input-wrapper">
										<label htmlFor="artist-name">Назва виконавця</label>
										<input type="text" className="input" id="artist-name" onChange={e => this.setState({ artistName: e.target.value })} />
									</div>

									<div className="input-wrapper">
										<Button className="red" onClick={this.handleCreateArtist}>Створити</Button>
									</div>
							</ReactModal>
						</TabPanel>

						<TabPanel>
							Пароль
						</TabPanel>

						<TabPanel>
							Синхронізація
						</TabPanel>
					</Tabs>
				</div>

				<NotificationContainer />
			</Fragment>
		);
	}
}