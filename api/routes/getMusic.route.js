const path = require('path')

module.exports = (app, router) => {
	router.get('/get-music/:link', (req, res, next) => {
		const filesPath = path.join(__dirname, '..', 'files', 'audio', req.params.link);
		res.sendFile(filesPath);
	});
}