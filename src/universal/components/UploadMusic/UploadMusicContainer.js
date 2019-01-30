// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import Select from 'react-select/lib/Async';
import axios from 'axios';
// Components
import Button from 'universal/components/Commons/Button';
import UploaderContainer from './UploaderContainer';
// Actions
import * as uploadMusicActions from './uploadMusicActions';

const mapStateToProps = (state, props) => ({
	userId: state.AuthReducer.user.id,
	currentUserName: state.AuthReducer.user.name
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators(uploadMusicActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UploadMusicContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uploadType: 'user',
			uploadUserName: ''
		};
	}

	promiseOptions = inputValue => {
		return axios.get('https://localhost:8080/api/getArtistList', {
				params: {
					currentUserName: this.props.currentUserName
				}
			})
			.then(response => {
				const arr = response.data.artistList.map(item => {
					return {
						value: item.name,
						label: item.name
					}
				})
				arr.unshift({
					value: this.props.currentUserName,
					label: 'Свій плейлист'
				});
				return arr;
			});

	}

	render() {
		const files = this.state.uploadedFiles;
		return (
			<Fragment>
				<h2 className="section-title">Завантаження файлів</h2>

				<div className="content">
					<div className="input-wrapper" style={{ width: '300px' }}>
						<label>Завантажити в:</label>
						<Select
							defaultOptions
							className="react-select-container"
							classNamePrefix="react-select"
							loadOptions={this.promiseOptions}
						/>
					</div>

					<UploaderContainer />
				</div>

				<NotificationContainer />
			</Fragment>
		);
	}
}
