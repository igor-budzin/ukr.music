const MysqlDBConnection = require('./MysqlDBConnection');
// const multer = require('multer');
const multipart = require('connect-multiparty');
const NodeID3 = require('node-id3');
const Editor = require('id3-editor');
const fs = require('fs');

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

					editor.load(buffer).then(() => {
						const title = editor.get('title') ? editor.get('title') : null;
						const artists = editor.get('artists') ? editor.get('artists') : null;
						const album = editor.get('album') ? editor.get('album') : null;
						const year = editor.get('year') ? editor.get('year') : null;
						const genre = editor.get('genre') ? editor.get('genre') : null;
						const picture = editor.get('picture') ? editor.get('picture').data.toString('base64') : null;

						const connection = MysqlDBConnection()();
 
						const sql = `INSERT INTO audio (link, title, artists, album, year, genre) 
									 VALUES ('${fileName}', '${title}', '${artists}', '${album}', '${year}', '${genre}')`;

						connection.query(sql, (error, results, fields) => {
							if (error) throw err;

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

		Promise.all(promises).then(values => {
			setTimeout(() => {
				console.log("the end");
				res.send(JSON.stringify({status: "true"}));
			}, 5000);
		});

		
	});


	router.get('/get-music', (req, res, next) => {
		const connection = MysqlDBConnection()();

		const sql = `SELECT link, artists, title FROM audio`;

		connection.query(sql, (error, results, fields) => {
			if (error) throw err;

			const audioArr = [];

			results.map((item) => {
				const obj = {};
				
				obj.link = item.link;
				obj.title = item.title;
				obj.artists = item.artists;

				audioArr.push(obj)
			});
			
			res.json(audioArr);

			connection.destroy();
		});

		
	});

}


