const mongoose = require('mongoose');
const AudioModel = require('../models/uploadAudio.model');
const UserModel = require('../models/uploadAudio.model');

module.exports = (router) => {
	router.get('/get-music/:user', (req, res, next) => {
		// console.log(req.params.user);
		UserModel.find({ _id: req.params.user }).exec().then(result => {
			console.log(result)
		})
		// AudioModel.find({ _id: { $in: 'audio' } }, '_id link title artists duration picture').exec().then((result) => {
		// 	res.json(result);
		// });
	});
}