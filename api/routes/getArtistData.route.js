const mongoose = require('mongoose');
const passport = require('passport');

const ArtistModel = require('../models/Artist.model');
const UserModel = require('../models/user.model.js');

module.exports = router => {
	router.get('/getArtistData/', passport.authenticate('jwt', { session: false }), (req, res) => {
		ArtistModel
			.aggregate()
			.match({ name: req.query.artist })
			.project({
				name: '$name',
				coverLink: '$coverLink',
				audioCount: { $size:"$audio" },
				followersCount: { $size:"$followers" }
			})
			.exec((err, docs) => {
				if(err) res.status(500).json({ 'status': 'error' });
				res.json(docs[0]);
			});
	});
}