const multipart = require('connect-multiparty');
const Editor = require('id3-editor');
const mp3Duration = require('mp3-duration');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const AudioModel = require('../models/uploadAudio.model');

const multipartMiddleware = multipart();
const filesPath = '/../../files/audio/'; 

module.exports = (router) => {
	router.post('/upload-music', multipartMiddleware, (req, res, next) => {
		const filesArr = [];
		const editor = new Editor();

		if(req.files.files.length !== undefined) {
			req.files.files.map((item) => {
				filesArr.push(item);
			});
		}
		else {
			filesArr.push(req.files['files']);
		}

		let promises = filesArr.map((item) => {

			return new Promise((resolve, reject) => {
				fs.readFile(item.path, (err, data) => {
					if (err) throw err;

					const buffer = Buffer.from(data);
					const fileName = Date.now() + '_' + item.originalFilename.replace(/ /g, '_');

					mp3Duration(buffer, function (err, durationTime) {
						if (err) throw err;

						editor.load(buffer).then(() => {

							const audio = new AudioModel({
								_id: new mongoose.Types.ObjectId(),
								link: fileName,
								title: editor.get('title') ? editor.get('title') : item.originalFilename.replace('.mp3', ''),
								artists: editor.get('artists') ? editor.get('artists') : 'Невідомий виконавець',
								album: editor.get('album') ? editor.get('album') : null,
								year: editor.get('year') ? editor.get('year') : null,
								genre: editor.get('genre') ? editor.get('genre') : null,
								duration: durationTime,
								picture: editor.get('picture') ? editor.get('picture').data.toString('base64') : null
							});

							audio.save().then(result => {
								fs.writeFile(__dirname + filesPath + fileName, buffer, (err) => {
									if (err) throw err;
									resolve("ok");
								});
							})
							.catch(err => {
								console.log(err)
							});
						});

					});
				});
			});
		});

		Promise.all(promises).then(values => {
			setTimeout(() => {
				res.send(JSON.stringify({status: "true"}));
			}, 5000);
		});
	});
}