const mongoose = require('mongoose');

const Artist = require('../models/Artist.model');
const User = require('../models/user.model');

exports.getArtists = (req, res, next) => {
  Artist
    .find()
    .then(result => res.json(result))
    .catch(err => next(err));
}

exports.getArtistsByUser = async (req, res, next) => {
  let artistArray = [];

  await User
    .findOne({ id: req.params.id }, 'artists')
    .then(result => {
      artistArray = result.artists.map(item => mongoose.Types.ObjectId(item))
    })
    .catch(err => next(err));

  await Artist
    .find({ _id: { $in: artistArray } })
    .then(result => res.json({ artistList: result }))
    .catch(next);
}

exports.getArtistData = (req, res, next) => {
  
}

exports.getArtistAudio = (req, res, next) => {
  
}

exports.getArtistAlbum = (req, res, next) => {
  
}

exports.createArtist = async (req, res, next) => {
  const { artistName, currentUserId } = req.body;
  const artistId = new mongoose.Types.ObjectId();

  await User
    .findOneAndUpdate({ id: currentUserId }, { $push: { artists: artistId } })
    .catch(err => next(err));

  const artist = new Artist({
    _id: artistId,
    name: artistName,
    ownerId: parseInt(currentUserId, 10)
  })

  await artist
    .save()
    .then(result => res.json({ status: true }))
    .catch(err => next(err));
}