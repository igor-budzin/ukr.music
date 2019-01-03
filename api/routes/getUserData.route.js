const mongoose = require('mongoose');
const UserModel = require('../models/user.model.js');

module.exports = (router, passport) => {
	router.get('/getUserData/:user', (req, res) => {
		UserModel.aggregate()
			.match({ _id: mongoose.Types.ObjectId(req.params.user) })
			.project({
				audioCount: { $size:"$audio" },
				followersCount: { $size:"$followers" }
			})
			.exec(function(err, user) {
				if(err) {
					console.log(err);
					res.json({ 'status': 'error' });
				}
				else res.json(user[0]);
			});
	});
}