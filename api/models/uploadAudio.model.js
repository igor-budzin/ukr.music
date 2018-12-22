const mongoose = require('mongoose');

const audioSchema = mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	userId: String,
	link: String,
	title: String,
	artists: String,
	album: String,
	year: {
		type: Number,
		min: 1970
	},
	genre: String,
	duration: Number,
	picture: String
});

module.exports = mongoose.model('Audio', audioSchema, 'audio');
