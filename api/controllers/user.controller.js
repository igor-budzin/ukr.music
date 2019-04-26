const mongoose = require('mongoose');

const User = require('../models/user.model');
const Audio = require('../models/Audio.model');

/**
  GET /user
 */
exports.getAllUsers = (req, res, next) => {
  User
    .find()
    .then(result => res.json(result))
    .catch(next);
}

/**
  GET /user/:id/audio/:audioId
 */
exports.addAudioToUser = (req, res, next) => {
  const { id, audioId } = req.query;

  User
    .findOneAndUpdate(mongoose.Types.ObjectId(id), {
      $push: { audio: audioId }
    })
    .then(() => res.json({ status: true }))
    .catch(next);
}
