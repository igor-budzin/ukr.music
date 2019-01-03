const path =  require('path');

module.exports = (router) => {
	router.get('/image/:link', (req, res) => {
		const filesPath = path.join(__dirname, '..', '..', '..', 'files', 'image', req.params.link);
		res.sendFile(filesPath);
	});
}