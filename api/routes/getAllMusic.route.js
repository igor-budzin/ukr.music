const mongoose = require('mongoose');
const AudioModel = require('../models/uploadAudio.model');

module.exports = (app, router) => {
	router.get('/get-music', (req, res, next) => { 
		AudioModel.find({}, '_id link title artists duration picture').exec().then((result) => {
			res.json(result);
		});
	});
}