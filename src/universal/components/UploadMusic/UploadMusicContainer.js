// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { formatBytes } from 'universal/utils';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
// Components
import Button from 'universal/components/Commons/Button';
// Actions
import * as uploadMusicActions from './uploadMusicActions';

@connect(mapStateToProps, mapDispatchToProps)
class UploadMusicContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uploadedFiles: []
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

	render() {
		const files = this.state.uploadedFiles;
		return (
			<main id="page" className="page upload-page clearfix">
				<h2 className="section-title">Завантаження файлів</h2>

				<div className="content">
					<div>
						<p>Обмеження</p>
						<ul>
							<li>Аудіофайл не повинен перевищувати 20 МБ і мусить бути в форматі MP3.</li>
							<li>Аудiофайл не повинен порушувати авторськi та суміжні права.</li>
							<li>Одночасно можна завантажити не більше 10 аудіофайлів.</li>
						</ul>
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
			</main>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		isUploading: state.uploadMusicReducer.isUploading,
		userId: state.AuthReducer.user.id
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators(uploadMusicActions, dispatch);
}

export default UploadMusicContainer;
