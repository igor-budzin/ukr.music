const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	year: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	totalTime: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	totalTime: {
		type: String,
		required: true
	},
	imageLink: {
		type: String
	},
	artist: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('album', AlbumSchema);