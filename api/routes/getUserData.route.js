const mongoose = require('mongoose');
const UserModel = require('../models/user.model.js');

module.exports = (router) => {
	router.post('/getUserData', (req, res) => {
		if(!req.body.currentUserName || !req.body.userName) {
			res.status(500).send({ 'status': 'error' });
			return false;
		}

		UserModel.aggregate()
			.match({ name: req.body.userName })
			.project({
				name: '$name',
				audioCount: { $size:"$audio" },
				followersCount: { $size:"$followers" }
			})
			.exec(function(err, user) {
				if(err) {
					console.log(err);
					res.json({ 'status': 'error' });
				}

				UserModel
					.aggregate()
					.match({ name: req.body.currentUserName })
					.project({ follows: '$follows' })
					.match({ "follows": { '$in': [user[0]._id] } })
					.project({ canFollowUser: { $size: "$follows" } })
					.exec((err, docs) => {
						if(err) {
							console.log(err);
							res.json({ 'status': 'error' });
						};

						user[0].canFollowUser = docs[0] !== undefined ? false : true
						res.json(user[0]);
					});
			});
	});
}