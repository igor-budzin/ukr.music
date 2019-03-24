const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String
	},
	login: {
		type: String
	},
	googleId: String,
	email: {
		type: String
	},
	photo: {
		type: String
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	audio: {
		type: []
	},
	follows: {
		type: []
	},
	followers: {
		type: []
	},
	artists: {
		type: []
	},
	playlist: {
		type: []
	}
});

UserSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this

    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

module.exports = mongoose.model('users', UserSchema);