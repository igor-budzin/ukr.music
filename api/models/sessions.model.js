const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
	lastAccess: {type: Date, default: Date.now},
	_sessionid:  "string",
	cookie: {}
});

SessionSchema.index({ "lastAccess": 1 }, { expireAfterSeconds: 60 * 60 * 24 })

export default mongoose.model('Sessions', SessionSchema)