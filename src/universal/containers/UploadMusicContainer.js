// Libraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone'
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
		arr.push({
			name: acceptedFiles[0].name,
			size: acceptedFiles[0].size
		});
		this.setState({uploadedFiles: arr});
		console.log(acceptedFiles);
	}

	render() {
		return (
			<main id="page" className="page clearfix">
				<h2 className="section-title">Завантаження файлів</h2>

				<div className="content">
					<div>
						<p>Обмеження</p>
						<ul>
							<li>Аудіофайл не повинен перевищувати 20 МБ і мусить бути в форматі MP3.</li>
							<li>Аудiофайл не повинен порушувати авторськi та суміжні права.</li>
						</ul>
					</div>

					<div className="dropzone-wrapper">
						<Dropzone className="dropzone" onDrop={this.onDrop} maxSize={20000000} multiple={false} accept="audio/mp3">
							<p>Щоб завантажити файл натисніть на синю зону або ж просто перетягніть на неї файл</p>
						</Dropzone>
					</div>

					{
						this.state.uploadedFiles.map((item, index) => {
							return (
								<div key={index}>
									{item.name} - {item.size}
								</div>
							);
						})
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
