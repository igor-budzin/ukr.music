const mongoose = require('mongoose');
const UserModel = require('../models/user.model.js');

module.exports = (router) => {
	router.post('/getUserData', (req, res) => {
		if(!req.body.currentUserID || !req.body.userID) {
			res.status(500).send({ 'status': 'error' });
			return false;
		}

		UserModel.aggregate()
			.match({ _id: mongoose.Types.ObjectId(req.body.userID) })
			.project({
				audioCount: { $size:"$audio" },
				followersCount: { $size:"$followers" }
			})
			.exec(function(err, user) {
				if(err) {
					console.log(err);
					res.json({ 'status': 'error' });
				}

				const id = mongoose.Types.ObjectId(req.body.userID);

				UserModel.aggregate([
					{ $match: { "_id": mongoose.Types.ObjectId(req.body.currentUserID) } },
					{ $project: { follows: '$follows' } },
					{ $match: { "follows": { '$in': [id] } } },
					{ $project: { canFollowUser: { $size: "$follows" } } },
				],  
				(err, docs) => {
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