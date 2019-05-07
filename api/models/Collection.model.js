const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  audio: {
    type: Array
  }

}, { timestamps: true });

CollectionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Collection', CollectionSchema);