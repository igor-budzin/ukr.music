const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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
	picture: String,
	date: {
		type: Date,
		default: Date.now
	}
});

audioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Audio', audioSchema, 'audio');
