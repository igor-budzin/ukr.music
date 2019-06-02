const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const audioSchema = mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	userId: String,
	link: String,
	title: String,
	artists: String,
	album: String,
	year: Number,
	genre: String,
	duration: Number,
	picture: String,
	date: {
		type: Date,
		default: Date.now
	},
	listenCount: {
		type: Number,
		default: 0,
	},
	addCount: {
		type: Number,
		default: 0,
	}
});

audioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Audio', audioSchema, 'audio');
