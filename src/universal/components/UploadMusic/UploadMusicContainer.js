// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { formatBytes } from 'universal/utils';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import Select from 'react-select/lib/Async';
import axios from 'axios';
// Components
import Button from 'universal/components/Commons/Button';
// Actions
import * as uploadMusicActions from './uploadMusicActions';

const mapStateToProps = (state, props) => ({
	isUploading: state.uploadMusicReducer.isUploading,
	userId: state.AuthReducer.user.id,
	currentUserName: state.AuthReducer.user.name
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators(uploadMusicActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UploadMusicContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uploadedFiles: [],
			uploadType: 'user',
			uploadUserName: ''
		};
	}

	onDrop = (acceptedFiles, rejectedFiles) => {
		let arr = this.state.uploadedFiles;

		acceptedFiles.map((item) => {
			arr.push({
				name: item.name,
				size: item.size,
				file: item
			});
		});

		this.setState({uploadedFiles: arr});
	};

	filesUpload = () => {
		const data = new FormData();
		data.append('userId', this.props.userId);

		this.state.uploadedFiles.map((item) => {
			data.append("files", item.file);
		});
		// console.log(data);
		this.props.requestUploadMusic(data, (response) => {
			this.setState({uploadedFiles: []});

			if(response.status) {
				NotificationManager.success({
					message: 'Аудіофайли успішно завантажено'
				});
			}
			else {
				NotificationManager.error({
					title: 'Помилка',
					message: 'На жаль під час завантаження аудіофайлів сталася помилка',
					timeOut: 10000
				});
			}
		});
	};

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
					<div style={{marginBottom: '20px'}}>
						<p>Обмеження:</p>
						<ul>
							<li>Аудіофайл не повинен перевищувати 20 МБ і мусить бути в форматі MP3.</li>
							<li>Аудiофайл не повинен порушувати авторськi та суміжні права.</li>
							<li>Одночасно можна завантажити не більше 10 аудіофайлів.</li>
						</ul>
					</div>

					<div className="input-wrapper" style={{ width: '300px' }}>
						<label>Завантажити в:</label>
						<Select
							defaultOptions
							className="react-select-container"
							classNamePrefix="react-select"
							loadOptions={this.promiseOptions}
						/>
					</div>

					<div className="dropzone-wrapper">
						<form>
							<Dropzone
								className="dropzone"
								onDrop={this.onDrop}
								maxSize={20000000}
								accept="audio/mp3"
								disabled={this.props.isUploading}
							>
								<p>Щоб завантажити файл натисніть на синю зону або ж просто перетягніть на неї файл</p>
							</Dropzone>
						</form>
					</div>

					<div className="file-list">
						{
							files.map((item, index) => {
								return (
									<div key={index} className="item">
										{item.name} - <span>{formatBytes(item.size)}</span>
									</div>
								);
							})
						}
					</div>
					

					{
						files.length > 0 && (
							<Button
								isLoading={this.props.isUploading}
								className="upload"
								onClick={this.filesUpload}
							>
								Завантажити
							</Button>


						)
					}

				</div>

				<NotificationContainer />
			</Fragment>
		);
	}
}

const options = [
	{ label: 'item1', value: 'value1' },
	{ label: 'item2', value: 'value2' },
	{ label: 'item3', value: 'value3' }
]
