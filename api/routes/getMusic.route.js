const mongoose = require('mongoose');

const UserModel = require('../models/user.model');
const AudioModel = require('../models/uploadAudio.model');

module.exports = (router) => {
	router.get('/getMusic/:name', (req, res) => {
		UserModel.findOne({ name: req.params.name }, 'audio', function(err, user) {
			if(err) {
				res.json({ 'status': 'error' });
			}

			AudioModel
				.find({ _id: { $in: user.audio }}, '_id link title artists duration picture')
				.sort({ date: -1 })
				.exec((err, result) => {
					if(err) {
						res.json({ 'status': 'error' });
					}

					res.json(result);
				});
		});
	});
}