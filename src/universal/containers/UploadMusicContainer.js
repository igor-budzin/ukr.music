// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { formatBytes } from 'universal/utils';
// Components
// Actions
// import { getRoutesAction } from 'universal/redux/actions/getRoutesActions';

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
		console.log(acceptedFiles);
	}

	filesUpload = () => {
		const data = new FormData();

		this.state.uploadedFiles.map((item) => {
			data.append("files", item.file);
		});

		axios.post('https://localhost:8080/api/upload-music', data)

		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		});

		console.log(data.getAll('files'));
	}

	render() {
		const files = this.state.uploadedFiles;
		return (
			<main id="page" className="page clearfix">
				<h2 className="section-title">Завантаження файлів</h2>

				<div className="content">
					<div>
						<p>Обмеження</p>
						<ul>
							<li>Аудіофайл не повинен перевищувати 20 МБ і мусить бути в форматі MP3.</li>
							<li>Аудiофайл не повинен порушувати авторськi та суміжні права.</li>
							<li>Одночасно можна завантажитине більше 10 аудіофайлів.</li>
						</ul>
					</div>

					<div className="dropzone-wrapper">
						<form>
							<Dropzone className="dropzone" onDrop={this.onDrop} maxSize={20000000} accept="audio/mp3">
								<p>Щоб завантажити файл натисніть на синю зону або ж просто перетягніть на неї файл</p>
							</Dropzone>
						</form>
					</div>

					{
						files.map((item, index) => {
							return (
								<div key={index}>
									{item.name} - {formatBytes(item.size)}
								</div>
							);
						})
					}

					{
						files.length > 0 ?
						<button type="button" onClick={this.filesUpload}>Завантажити</button> :
						null
					}

					<br /><br /><br /><br /><br /><br /><br /><br />
				</div>
			</main>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		// routes: state.getRoutesReducer.routes
	};
}


function mapDispatchToProps(dispatch, props) {
	return bindActionCreators({
		// getRoutes: getRoutesAction
	}, dispatch);
}

export default UploadMusicContainer;
