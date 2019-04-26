const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
	_id: mongoose.Types.ObjectId,
	name: {
		type: String,
		required: true,
		unique: true
	},
	coverLink: String,
	facebookLink: String,
	instagramLink: String,
	soundcloudLink: String,
	youtubeLink: String,
	twitterLink: String,
	otherLink: [ String ],
	audio: [],
	followers: [],
	albums: [],
	ownerId: {
		type: Number,
		required: true
	}
}, { timestamps: true });

ArtistSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('Artist', ArtistSchema);