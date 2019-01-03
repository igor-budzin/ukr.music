const mongoose = require('mongoose');

const UserModel = require('../models/user.model');
const AudioModel = require('../models/uploadAudio.model');

module.exports = (router) => {
	router.get('/getMusic/:user', (req, res) => {
		UserModel.findById(req.params.user, 'audio', function(err, user) {
			if(err) {
				res.json({ 'status': 'error' });
				return;
			}

			AudioModel.find({ _id: { $in: user.audio }}, '_id link title artists duration picture').exec().then((result) => {
				res.json(result);
			});
		});
	});
}