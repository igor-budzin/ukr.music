// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { formatBytes } from 'universal/utils';
import io from 'socket.io-client';
// Components
import Button from 'universal/components/Commons/Button';
// Actions
import * as uploadMusicActions from './uploadMusicActions';

const mapStateToProps = (state, props) => ({
	isUploading: state.uploadMusicReducer.isUploading,
	currentUserName: state.AuthReducer.user.name
});

const mapDispatchToProps = (dispatch, props) => bindActionCreators(uploadMusicActions, dispatch);

@connect(mapStateToProps, mapDispatchToProps)
export default class UploaderContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			files: []
		};
	}

	onDrop = (acceptedFiles, rejectedFiles) => {
		let arr = this.state.files;

		acceptedFiles.map((item) => {
			arr.push({
				fileName: item.name,
				size: item.size,
				file: item,
				progress: 0,
				bytesReceived: 0
			});
		});

		this.setState({ files: arr });
	};

	filesUpload = () => {
		const socket = io('https://localhost:8080');

		for(let i = 0; i < this.state.files.length; i++) {
			const data = new FormData();

			data.append('userId', this.props.userId);
			data.append("files", this.state.files[i].file);

			this.props.requestUploadMusic(data, response => {

				console.log(response)
			});

			socket.on('uploadProgress', data => {
				let arr = this.state.files;

				let arrIndex = arr.findIndex(item => item.fileName === data.fileName);

				if(data.progress == 100) {
					arr.splice(arrIndex, 1);
				}
				else {
					arr[arrIndex].bytesReceived = data.bytesReceived;
					arr[arrIndex].progress = data.progress;
				}

				this.setState({
					files: arr
				})
			});
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
							<Dropzone
								className="dropzone"
								onDrop={this.onDrop}
								maxSize={20000000}
								accept="audio/mp3"
								disabled={this.props.isUploading}
							>
							</Dropzone>
						</form>
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
		);
	}
}

