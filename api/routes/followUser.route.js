const mongoose = require('mongoose');
const passport = require('passport');

const UserModel = require('../models/user.model.js');

module.exports = router => {
	router.get('/followUser/:currentUserName/:followUserName', passport.authenticate('jwt', { session: false }), (req, res) => {
		UserModel.findOneAndUpdate(
			{ name: req.params.currentUserName },
			{ $addToSet: { follows: req.params.followUserName } }
		)
		.exec()
		.then(response => {
			UserModel.findOneAndUpdate(
				{ name: req.params.followUserName },
				{ $addToSet: { followers: req.params.currentUserName } }
			)
			.exec()
			.then(response => res.status(200))
		});
	});
}