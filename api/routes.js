const MysqlDBConnection = require('./MysqlDBConnection');
const multer = require('multer');
const NodeID3 = require('node-id3');
const Editor = require('id3-editor');
const fs = require('fs');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'files/audio')
	},
	filename: (req, file, cb) => {
		let fileName = Date.now() + '_' + file.originalname;

		const connection = MysqlDBConnection()();
		const sql = `INSERT INTO audio (link) VALUES ('${fileName}')`;

		connection.query(sql, (error, results, fields) => {
			if (error) { console.log(error) }
			connection.destroy();
		});

		cb(null, fileName);
		

	}
});
const upload = multer({storage: storage});

module.exports = (app, router) => {

	router.post('/upload-music', upload.array('files'), (req, res, next) => {
		res.send('OK');
		// console.log(req);
		// res.send('q111111')
		
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


