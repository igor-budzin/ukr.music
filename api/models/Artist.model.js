const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
	_id: mongoose.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	coverLink: String,
	audio: [],
	followers: [],
	albums: []
});

module.exports = mongoose.model('artist', ArtistSchema);