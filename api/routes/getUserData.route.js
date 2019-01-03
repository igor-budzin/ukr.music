const mongoose = require('mongoose');
const UserModel = require('../models/user.model.js');

module.exports = (router) => {
	router.post('/getUserData', (req, res) => {
		// UserModel.aggregate()
		// 	.match({ _id: mongoose.Types.ObjectId(req.body.userID) })
		// 	.project({
		// 		audioCount: { $size:"$audio" },
		// 		followersCount: { $size:"$followers" }
		// 	})
		// 	.exec(function(err, user) {
		// 		if(err) {
		// 			console.log(err);
		// 			res.json({ 'status': 'error' });
		// 		}

		// 		if(req.body.userID !== req.body.currentUserID) {
		// 			UserModel.findById(req.body.currentUserID, )
		// 		}
		// 		else res.json(user[0]);
		// 	});
		// 	
	
			UserModel.aggregate([
				{ $match: { "_id": mongoose.Types.ObjectId(req.body.currentUserID) } },
				{
					$project: {
						test: '$follows',
						foll: {[mongoose.Types.ObjectId(req.body.currentUserID)]: { $in: '$follows' }}
					}
				}
			],
			(err, docs) => {
				console.log(docs)
			});
		
	});
}