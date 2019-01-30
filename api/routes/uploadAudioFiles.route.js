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
			console.log('Error parsing form: ' + err.stack);
		});

		let progress = 0;
		let persent = 0;
		let fileName = '';

		form.on('progress', function(bytesReceived, bytesExpected) {
			persent = Math.round((bytesReceived / bytesExpected).toFixed(2) * 100);

			if(persent !== progress && persent % 2 === 0) {
				progress = persent;
				setTimeout(() => {
					socket.emit('uploadProgress', { progress, fileName, bytesReceived });
				}, 200);
			}
		});

		form.on('part', function(part) {
			if (!part.filename) {
				part.resume();
			}
			if (part.filename) {
				fileName = part.filename;
				part.resume();
			}
		});

		form.on('file', (name, file) => {

			fs.readFile(file.path, (err, data) => {
				if(err) console.log(err);

				const params = {
					Bucket: awsConfig.backetName,
					Key: file.originalFilename,
					Body: data
				};

				s3.putObject(params, function (error, pres) {
					if (error) {
						console.log("Error uploading data: ", error);
					} else {
						console.log("Successfully uploaded data to myBucket/myKey");
					}
				});
			});


			// console.log(name)
			// console.log(file)
			// console.log(filesPath)
		});

		form.on('close', function() {
			res.send({ "status": "true" });
		});

		form.parse(req);

	});
}