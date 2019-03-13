const mongoose = require('mongoose');

const AudioModel = require('../models/Audio.model');
const UserModel = require('../models/user.model');

module.exports = (router) => {
	router.get('/get-music/:user', (req, res, next) => {
		UserModel.findById(req.params.user, 'audio', function(err, user) {
			if(err) throw err;
			console.log(user)

			AudioModel.find({ _id: { $in: user.audio } }, '_id link title artists duration picture').exec().then((result) => {
				res.json(result);
			});
		});
	});
}