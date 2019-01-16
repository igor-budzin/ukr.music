const mongoose = require('mongoose');
const passport = require('passport');

const UserModel = require('../models/user.model.js');
const ArtistModel = require('../models/Artist.model.js');

module.exports = router => {
	router.post('/createArtist/', passport.authenticate('jwt', { session: false }), (req, res) => {
		if(req.body.currentUserID === undefined && req.body.artistName === undefined) return false;

		ArtistModel.findOne({ name: req.body.artistName }, '_id')
		.exec((err, doc) => {
			if(err) res.status(500).json({"status": "error"});

			if(doc === null) {
				const newArtist = new ArtistModel({
					_id: mongoose.Types.ObjectId(),
					name: req.body.artistName 
				});

				newArtist.save().then(artist => {
					UserModel.findByIdAndUpdate(
						{ _id: req.body.currentUserID },
						{ $addToSet: { artists: mongoose.Types.ObjectId(artist._id) } }
					)
					.exec((err, doc) => {
						if(err) res.status(500).json({"status": "error"});
						res.json(artist);
					})
				});
			}
			else {
				res.json({
					"status": "error",
					"message": 'Виконавець з таким ім\'я вже існує'
				});
			}
		});
	});
}
