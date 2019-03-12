// Libraries
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { formatBytes } from 'universal/utils';
import io from 'socket.io-client';
import { NotificationContainer, NotificationManager } from "react-light-notifications";
import { globlaConfig as config } from '../../../global.config';
// Components
import Button from 'universal/components/Commons/Button';
// Actions
import * as uploadMusicActions from './uploadMusicActions';

const mapStateToProps = (state, props) => ({
	isUploading: state.uploadMusicReducer.isUploading,
	currentUserName: state.AuthReducer.user.name,
	currentUserID: state.AuthReducer.user.id
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators(uploadMusicActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UploaderContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			uploadedCount: 0
		};
	}

	componentDidMount() {
		this.socket = io(`${config.protocol}://${config.host}:${config.apiPort}`);
		this.socket.on('uploadProgress', this.updateUploadProgress);
	}

	componentWillUnmount() {
		this.socket.disconnect();
	}

	handleDrop = (acceptedFiles, rejectedFiles) => {
		const arr = this.state.files;
		let count = 0;

		acceptedFiles.map(item => {
			count++;
			if(count <= 10) {
				arr.push({
					fileName: item.name,
					size: item.size,
					file: item,
					progress: 0,
					bytesReceived: 0,
					uploaded: false
				});
			}
		});

		this.setState({ files: arr });
	};

	hnadleUpload = () => {
		let uploadedCount = this.state.uploadedCount;

		for(let i = 0; i < this.state.files.length; i++) {
			const data = new FormData();

			data.append('fileName', this.state.files[i].fileName);
			data.append('currentUserID', this.props.currentUserID);
			data.append('currentUserName', this.props.currentUserName);
			data.append("files", this.state.files[i].file);

			this.props.requestUploadMusic(data, response => {
				uploadedCount++;

				if(uploadedCount === this.state.files.length) {
					this.setState({
						uploadedCount: 0,
						files: []
					});
					NotificationManager.success({
						message: 'аудіофайли успішно завантажені',
						timeOut: 5000
					});
				}
				else {
					this.setState({ uploadedCount });
				}
			});
		}
	};

	updateUploadProgress = data => {
		let arr = this.state.files;

		if(arr.length) {
			let arrIndex = arr.findIndex(item => item.fileName === data.fileName);
			arr[arrIndex].bytesReceived = data.bytesReceived;
			arr[arrIndex].progress = data.progress;
			if(data.progress == 100) arr[arrIndex].uploaded = true;

			this.setState({ files: arr });
		}
	};

	render() {
		const files = this.state.files;

		return (
			<div>
				<div className="file-list">
					{
						files.map((item, index) => {
							return (
								<div key={index} className="item">
									<span className="file-name">{item.fileName}</span>
									<span className="size">{formatBytes(item.bytesReceived)} / {formatBytes(item.size)}</span>

									<div className="progress">
										<div className="persent" style={{ width: `${item.progress}%` }}></div>
									</div>
								</div>
							);
						})
					}
				</div>

				<div className="dropzone-wrapper">
					<form>
						{
							(files.length <= 10 && !this.props.isUploading) && (
								<Dropzone
									className="dropzone"
									onDrop={this.handleDrop}
									maxSize={20000000}
									accept="audio/*"
									disabled={this.props.isUploading}
								/>
							)
						}
					</form>
				</div>

				{
					files.length > 0 && (
						<Button
							isLoading={this.props.isUploading}
							className="upload"
							onClick={this.hnadleUpload}
						>
							Завантажити
						</Button>
					)
				}
			</div>
		);
	}
}

