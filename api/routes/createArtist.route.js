const mongoose = require('mongoose');
const passport = require('passport');

const UserModel = require('../models/user.model.js');
const ArtistModel = require('../models/Artist.model.js');

module.exports = router => {
	router.post('/createArtist/', passport.authenticate('jwt', { session: false }), (req, res) => {
		if(req.body.currentUserID === undefined && req.body.artistName === undefined) return false;

		const newArtist = new ArtistModel({
			_id: mongoose.Types.ObjectId(),
			name: req.body.artistName
		});

		newArtist.save().then(artist => {
			console.log(artist)
			res.json(artist)
		}); 
	});
}