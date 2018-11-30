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

					fs.writeFile(__dirname + filesPath + fileName, buffer, (err) => {
						if (err) throw err;
						
						console.log('ok')
					});
				});
			});
		});

		Promise.all(promises).then(values => {
			setTimeout(() => {
				console.log("the end");
				res.send(JSON.stringify({status: "ok"}));
			}, 5000);
		});

		
	});









	router.get('/get-music', (req, res, next) => {
		const connection = MysqlDBConnection()();

		const sql = `SELECT link FROM audio`;

		connection.query(sql, (error, results, fields) => {
			if (error) { console.log(error) }

			const audioArr = [];
			const editor = new Editor();

			let promises = results.map((item) => {
				const audioObj = {};
				const fileBuffer = fs.readFileSync('./files/audio/' + item.link);

				return editor.load(fileBuffer).then(() => {
					audioObj.title = editor.get('title');
					audioObj.artists = editor.get('artists');
					audioObj.picture = editor.get('picture').data.toString('base64');
					return audioObj;
				});
			
			});

			Promise.all(promises).then(values => {
				console.log(values);
				res.json(values);
			});

			connection.destroy();
		});

		
	});

}


