const mongoose = require('mongoose');
const passport = require('passport');

const UserModel = require('../models/user.model.js');
const ArtistModel = require('../models/Artist.model.js');

module.exports = router => {
	router.get('/getArtistList', passport.authenticate('jwt', { session: false }), (req, res) => {
		UserModel
			.findOne({ name: req.query.currentUserName }, 'artists')
			.exec((err, user) => {

				ArtistModel
					.aggregate()
					.match({ name: { "$in": user.artists } })
					.project({ name: "$name" })
					.exec((err, docs) => {
						if(err) console.log(err)
						
						res.json({ "artistList": docs });
					});
			});
	});
}