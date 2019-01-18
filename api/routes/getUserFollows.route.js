const mongoose = require('mongoose');
const passport = require('passport');

const UserModel = require('../models/user.model.js');
 
module.exports = (router) => {
	router.get('/getUserFollows/:name', passport.authenticate('jwt', { session: false }), (req, res) => {
		if(!req.params.name) {
			res.json({ "status": "error" });
			return false;
		}

		UserModel.findOne({ name: req.params.name }, 'follows', (err, data) => {
			if(err) console.log(err);
		
			// const ids = data.follows.map(function(el) { return mongoose.Types.ObjectId(el) });
			console.log(data)
			UserModel.aggregate([
				{ $match: { name: { "$in": data.follows } } },
				{
					$project: {
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
					// console.log(docs)
					res.json(docs)
				}
			});
		});
	});
}