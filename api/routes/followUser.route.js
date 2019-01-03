const mongoose = require('mongoose');
const passport = require('passport');

const UserModel = require('../models/user.model.js');

module.exports = (router) => {
	router.get('/followUser/:userID/:followID', passport.authenticate('jwt', { session: false }), (req, res) => {
		UserModel.findByIdAndUpdate(
			{ _id: req.params.userID },
			{ $push: { follows: mongoose.Types.ObjectId(req.params.followID) } }
		)
		.exec()
		.then(response => {
			UserModel.findByIdAndUpdate(
				{ _id: req.params.followID },
				{ $push: { followers: mongoose.Types.ObjectId(req.params.userID) } }
			)
			.exec()
			.then(response => res.status(200))
		});
	});
}