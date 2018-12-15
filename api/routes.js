const MysqlDBConnection = require('./MysqlDBConnection');
const multipart = require('connect-multiparty');
const Editor = require('id3-editor');
const mp3Duration = require('mp3-duration');
const fs = require('fs');
const path = require('path');

const multipartMiddleware = multipart();
const filesPath = '/../files/audio/';


module.exports = (app, router) => {

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
							const title = editor.get('title') ? editor.get('title') : item.originalFilename.replace('.mp3', '');
							const artists = editor.get('artists') ? editor.get('artists') : 'Невідомий виконавець';
							const album = editor.get('album') ? editor.get('album') : null;
							const year = editor.get('year') ? editor.get('year') : null;
							const genre = editor.get('genre') ? editor.get('genre') : null;
							const duration = durationTime;
							const picture = editor.get('picture') ? editor.get('picture').data.toString('base64') : null;

							const connection = MysqlDBConnection()();
						
							const sql = `INSERT INTO audio (link, title, artists, album, year, genre, duration, picture) 
										 VALUES ('${fileName}', '${title}', '${artists}', '${album}', '${year}', '${genre}', '${duration}', '${picture}')`;

							connection.query(sql, (error, results, fields) => {
								if (error) throw error;

								fs.writeFile(__dirname + filesPath + fileName, buffer, (err) => {
									if (err) throw err;
									resolve("ok");
								});
								connection.destroy();
							});

							resolve("ok");
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


	router.get('/get-music', (req, res, next) => {
		const connection = MysqlDBConnection()();

		const sql = `SELECT id, link, artists, title, duration, picture FROM audio ORDER BY id DESC LIMIT 15`;

		connection.query(sql, (error, results, fields) => {
			if (error) throw err;

			const audioArr = [];

			results.map((item) => {
				const obj = {};
				
				obj.id = item.id;
				obj.link = item.link;
				obj.title = item.title;
				obj.artists = item.artists;
				obj.duration = item.duration;
				obj.picture = item.picture;

				audioArr.push(obj)
			});
			
			res.json(audioArr);

			connection.destroy();
		});

	});

	router.get('/get-music/:link', (req, res, next) => {
		const filesPath = path.join(__dirname, '..', 'files', 'audio', req.params.link);
		res.sendFile(filesPath);
	});

}


