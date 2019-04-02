const mongoose = require('mongoose');
const autoIncremental = require('../utils/modelAutoInc');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: {
    type: Number
  },
  name: String,
  googleId: String,
  email: String,
  photo: String,
  avatar: String,
  date: {
    type: Date,
    default: Date.now
  },
  audio: Array,
  follows: Array,
  followers: Array,
  artists: Array,
  playlist: Array
});

UserSchema.pre('save', function(next) {
    autoIncremental(model, this, next);
    // model: The model const here below
    // this: The schema, the body of the document you wan to save
    // next: next fn to continue
});

UserSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
  const self = this

  self.findOne(condition, (err, result) => {
    return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
  })
}

const model = mongoose.model('users', UserSchema);
module.exports = model;