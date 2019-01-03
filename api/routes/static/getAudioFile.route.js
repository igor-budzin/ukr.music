const path = require('path')

module.exports = (router) => {
	router.get('/getAudioFile/:link', (req, res, next) => {
		const filesPath = path.join(__dirname, '..', '..', 'files', 'audio', req.params.link);
		res.sendFile(filesPath);
	});
}