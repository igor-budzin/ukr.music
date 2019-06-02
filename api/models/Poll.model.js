const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');

const PollSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  title: {
    type: String,
    maxlength: 200,
    required: true
  },
  alias: {
    type: String,
    required: true,
    unique: true
  },
  answer: [{
    audioId: String,
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  }],
  voters: Array,
  active: {
    type: Boolean,
    default: true
  },
  totalAnswersCount: {
    type: Number,
    default: 0
  }
});

PollSchema.plugin(mongoosePaginate);
PollSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('Poll', PollSchema);