const path =  require('path');

module.exports = (router) => {
	router.get('/albumCover/:link', (req, res) => {
		const filesPath = path.join(__dirname, '..', '..', '..', 'files', 'artist-album', req.params.link);
		res.sendFile(filesPath);
	});
}