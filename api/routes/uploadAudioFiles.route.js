const multiparty = require('multiparty');
const Editor = require('id3-editor');
const mp3Duration = require('mp3-duration');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const AWS = require('aws-sdk')

const AudioModel = require('../models/uploadAudio.model');
const UserModel = require('../models/user.model');

const awsConfig = require('../config/AWS.config');

const filesPath = path.resolve(__dirname, '..', '..', 'files', 'audio');

module.exports = (router, socket) => {
	router.post('/uploadAudioFiles', (req, res, next) => {

		let s3 = new AWS.S3({
			accessKeyId: awsConfig.accessKeyId,
			secretAccessKey: awsConfig.secretAccessKey
		});

		const form = new multiparty.Form();
		const editor = new Editor();

		form.on('error', function(err) {
			console.log('Проблема при парсингу вхідних даних: ', err.stack);
		});

		let progress = 0;
		let persent = 0;
		let fileName = '';
		let currentUserName = '';
		let currentUserID = '';

		form.on('progress', function(bytesReceived, bytesExpected) {
			persent = Math.round((bytesReceived / bytesExpected).toFixed(2) * 100);
			
			if(persent !== progress && persent % 2 === 0) {
				progress = persent;
				setTimeout(() => {
					socket.emit('uploadProgress', { progress, fileName, bytesReceived });
				}, 200);
			}
		});

		form.on('field', function(name, value) {
			switch(name) {
				case 'currentUserName':
					currentUserName = value;
				break;
				case 'currentUserID':
					currentUserID = value;
				break;
				case 'fileName':
					fileName = value;
				break;
			}
		});

		form.on('file', (name, file) => {
	
			fs.readFile(file.path, (err, buffer) => {
				if(err) console.log('Проблема при читанні файла з тимчасової папки: ', err);

				// const buffer = Buffer.from(data);
				const newFileName = Date.now() + '_' + file.originalFilename.replace(/ /g, '_');

				mp3Duration(buffer, function (err, durationTime) {
					if(err) console.log('Проблема при читанні тривалості файла: ', err);

					editor.load(buffer).then(() => {
						const audioID = new mongoose.Types.ObjectId();
						const coverName = editor.get('picture') ? file.originalFilename.replace('.mp3', '.jpg').replace(/ /g, '_') : null

						const audio = new AudioModel({
							_id: audioID,
							userId: currentUserID,
							link: newFileName,
							title: editor.get('title') ? editor.get('title') : file.originalFilename.replace('.mp3', ''),
							artists: editor.get('artists') ? editor.get('artists') : 'Невідомий виконавець',
							album: editor.get('album') ? editor.get('album') : null,
							year: editor.get('year') ? editor.get('year') : null,
							genre: editor.get('genre') ? editor.get('genre') : null,
							duration: durationTime,
							picture: coverName
						});

						audio.save().then(result => {
							UserModel.findOneAndUpdate(
								{ name: currentUserName },
								{ $push: { audio: audioID } },
								(error, success) => {
									if(error) throw error;

									s3.putObject({
										Bucket: awsConfig.audioBacketName,
										Key: newFileName,
										Body: buffer
									},
									error => {
										if(error) {
											console.log("Проблема під час завантаження файла на AWS: ", error);
										}
									});

									if(coverName) {
										s3.putObject({
											Bucket: awsConfig.audioCoverBacketName,
											Key: coverName,
											Body: editor.get('picture').data
										},
										error => {
											if(error) {
												console.log("Проблема під час завантаження файла на AWS: ", error);
											}
										});
									}
									
								}
							);
						})
						.catch(err => {
							console.log(err)
						});
					});

				});
			});
		
		});

		form.on('close', function() {
			res.send({ "status": "true" });
		});

		form.parse(req);

	});
}