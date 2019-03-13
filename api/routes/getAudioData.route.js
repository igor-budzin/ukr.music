const mongoose = require('mongoose');
const AudioModel = require('../models/Audio.model');

module.exports = (router) => {
	router.post('/getAudioData', (req, res) => {
		AudioModel.findById(req.body.audioID, (err, docs) => {
			if(err) {
				console.log(err)
				res.status(500).json({"status": "error"})
			}
			res.json(docs)
		});

	});
}