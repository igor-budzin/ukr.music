// const multipart = require('connect-multiparty');
const multiparty = require('multiparty');
const Editor = require('id3-editor');
const mp3Duration = require('mp3-duration');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const AudioModel = require('../models/uploadAudio.model');
const UserModel = require('../models/user.model');

// const multipartMiddleware = multipart();
const filesPath = '/../../files/audio/'; 

module.exports = (router, socket) => {
	router.post('/uploadAudioFiles', (req, res, next) => {

		const form = new multiparty.Form();

		form.on('error', function(err) {
			console.log('Error parsing form: ' + err.stack);
		});

		let progress = 0;
		let persent = 0;
		let fileName = '';

		form.on('progress', function(bytesReceived, bytesExpected) {
			persent = Math.round((bytesReceived / bytesExpected).toFixed(2) * 100);

			if(persent !== progress) {
				progress = persent;
				socket.emit('uploadProgress', { progress, fileName, bytesReceived });
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

		form.on('close', function() {
			res.send({ "status": "true" });
		});

		form.parse(req);

	});
}