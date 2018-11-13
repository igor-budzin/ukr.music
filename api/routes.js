const MysqlDBConnection = require('./MysqlDBConnection');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'files/audio')
	},
	filename: (req, file, cb) => {
		console.log(file);
		const connection = MysqlDBConnection()();

		const query = `INSERT INTO audio (name) VALUES ('${Date.now() + '_' + file.originalname}')`;

		connection.query(query, (error, results, fields) => {
			if (error) throw error;
			
			connection.destroy();
		});
		cb(null, Date.now() + '_' + file.originalname);
	}
});
const upload = multer({storage: storage});

module.exports = (app, router) => {

	router.post('/upload-music', upload.array('files'), (req, res, next) => {
		res.send('OK');
		// console.log(req);
		res.send('q111111')
		
	});

}


