const mongoose = require('mongoose');

const AudioModel = require('../models/uploadAudio.model');
const ArtistModel = require('../models/Artist.model');

module.exports = (router) => {
	router.get('/getArtistMusicList', (req, res) => {
		ArtistModel
			.aggregate()
			.match({ name: req.query.name })
			.limit(parseInt(req.query.limit, 10))
			.skip(0)
			.project({
				audio: '$audio',
			})
			.exec((err, doc) => {
				if(err) console.log(err)

				AudioModel
					.find({ _id: { $in: doc[0].audio }}, '_id link title artists duration picture')
					.exec((err, audios) => {
						if(err) console.log(err);

						res.json(audios)
					})
			});
	});
}