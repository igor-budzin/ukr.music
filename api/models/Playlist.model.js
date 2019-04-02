const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const playlistSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  cover: String,
  date: {
    type: Date,
    default: Date.now
  },
  audio: Array,
  privat: {
    type: Boolean,
    default: false
  }
});

playlistSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Playlist', playlistSchema, 'playlist');
