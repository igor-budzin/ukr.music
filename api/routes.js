const MysqlDBConnection = require('./MysqlDBConnection');
const multer = require('multer');
const NodeID3 = require('node-id3');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'files/audio')
	},
	filename: (req, file, cb) => {
		// console.log(file);
		// const connection = MysqlDBConnection()();
		// 


		// const query = `INSERT INTO audio (name) VALUES ('${Date.now() + '_' + file.originalname}')`;

		// connection.query(query, (error, results, fields) => {
		// 	if (error) throw error;
			
		// 	connection.destroy();
		// });
		cb(null, Date.now() + '_' + file.originalname);
		let file2 = 'files/audio/1542206627112_Kalimba.mp3';
		let tags = NodeID3.read(Buffer.from(file2), (err, tags2) => {
			console.log('dddddddddddddddddddddddddddd');
			console.log(err)
			console.log(tags2)
		});
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

		const query = `SELECT * FROM audio`;

		connection.query(query, (error, results, fields) => {
			
			res.json(results);
			connection.destroy();
		});

		
	});

}


