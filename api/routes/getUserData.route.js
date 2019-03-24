const mongoose = require('mongoose');
const UserModel = require('../models/user.model.js');

module.exports = (router) => {
	router.post('/getUserData', (req, res) => {
		if(!req.body.currentUserLogin || !req.body.userLogin) {
			res.status(500).send({ 'status': 'error' });
			return false;
		}

		UserModel
			.aggregate()
			.match({ login: req.body.userLogin })
			.project({
				login: '$login',
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
					.match({ login: req.body.currentUserLogin })
					.project({ follows: '$follows' })
					.match({ "follows": { '$in': [user[0].login] } })
					.project({ canFollowUser: { $size: "$follows" } })
					.exec((err, docs) => {
						if(err) {
							console.log(err);
							res.json({ 'status': 'error' });
						};

						user[0].canFollowUser = docs.length ? false : true
						res.json(user[0]);
					});
			});
	});
}