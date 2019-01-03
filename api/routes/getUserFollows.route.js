const mongoose = require('mongoose');
const passport = require('passport');

const UserModel = require('../models/user.model.js');
 
module.exports = (router) => {
	router.get('/getUserFollows/:user', passport.authenticate('jwt', { session: false }), (req, res) => {
		UserModel.findById(req.params.user, 'follows', (err, data) => {
			if(err) console.log(err);
			
			const ids = data.follows.map(function(el) { return mongoose.Types.ObjectId(el) });

			UserModel.aggregate([
				{ $match: { "_id": { "$in": ids } } },
				{
					$project: {
						_id: '$_id',
						name: '$name',
						avatar: '$avatar',
						audioCount: { $size:"$audio" },
						followsCount: { $size:"$follows" }
					}
				}
			],
			(err, docs) => {
				if(err) console.log(err);
				else {
					res.json(docs)
				}
			});
		});
	});
}