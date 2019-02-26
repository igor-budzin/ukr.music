const mongoose = require('mongoose');

const UserModel = require('../models/user.model');
const AudioModel = require('../models/uploadAudio.model');

module.exports = (router) => {
	router.get('/getMusic/:name/:page', (req, res) => {
		const page = parseInt(req.params.page, 10);
		const data = {};
		const limit = 40;
		let countDocs = 0;

		const options = {
			select: '_id link title artists duration picture',
			page: page,
			limit,
			sort: { date: -1 }
		};

		UserModel.findOne({ name: req.params.name }, 'audio', function(err, user) {
			if(err) next(err);

			AudioModel
				.countDocuments({ _id: { $in: user.audio }})
				.then(count => {
					countDocs = count;

					AudioModel
						.paginate({ _id: { $in: user.audio }}, options)
						.then(result => {
							data.music = result.docs;
							data.hasNextPage = countDocs > page * limit;
							res.json(data);
						})
						.catch(err => next(err));
				})
				.catch(err => next(err));
		});
	});
}