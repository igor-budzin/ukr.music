const mongoose = require('mongoose');

const UserModel = require('../models/user.model');
const AudioModel = require('../models/uploadAudio.model');

module.exports = (router) => {
	router.get('/getMusic/:name/:offset', (req, res) => {
		console.log(req.params.offset)

		UserModel.findOne({ name: req.params.name }, 'audio', function(err, user) {
			if(err) {
				console.log(err)
				res.json({ 'status': 'error' });
			}

			const options = {
				offset: parseInt(req.params.offset, 10),
				limit: 10,
				sort: { date: -1 },
				select: '_id link title artists duration picture'
			};

			AudioModel
				.paginate({ _id: { $in: user.audio }}, options)
				.then(result => {
					res.json(result.docs);
				})
				.catch(err => {
					if(err) {
						console.log(err);
						res.json({ 'status': 'error' });
					}
				});
		});
	});
}