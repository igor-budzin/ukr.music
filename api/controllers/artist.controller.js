const mongoose = require('mongoose');

const Artist = require('../models/Artist.model');
const Audio = require('../models/Audio.model');
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
    .then(result => artistArray = result.artists)
    .catch(err => next(err));

  await Artist
    .find({ alias: { $in: artistArray } })
    .then(result => res.json({ 'artistList': result ? result : [] }))
    .catch(next);
}

exports.getArtistData = (req, res, next) => {
  Artist
    .findOne({ alias: req.params.alias })
    .select('-audio -albums')
    .then(result => {
      if(result) return res.json({ artist: result });
      return res.status(204).end();
    })
    .catch(next);
}

exports.getArtistAudio = async (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 30;
  let audioArray = [];

  const options = {
    sortBy: req.query.sortBy ? { [req.query.sortBy]: -1 } : { date: -1 },
    page,
    limit
  };

  await Artist
    .findOne({ alias: req.params.alias })
    .select('audio')
    .then(result => {
      if(result.audio.length) {
        audioArray = result.audio.map(item => mongoose.Types.ObjectId(item))
      }
    })
    .catch(next);

  await Audio
    .paginate({ _id: { $in: audioArray } }, options)
    .then(result => res.json({ 'artistAudioList': result.docs }))
    .catch(next);
}

exports.getArtistAlbum = (req, res, next) => {
  
}

exports.createArtist = async (req, res, next) => {
  const { artistName, currentUserId } = req.body;
  const artistId = new mongoose.Types.ObjectId();

  const artistAlias = `${artistName.replace(/ /g, '_')}_${Date.now()}`;

  await User
    .findOneAndUpdate({ id: currentUserId }, { $push: { artists: artistAlias } })
    .catch(err => next(err));

  const artist = new Artist({
    _id: artistId,
    alias: artistAlias,
    name: artistName,
    ownerId: parseInt(currentUserId, 10)
  })

  await artist
    .save()
    .then(result => res.json({ status: true, artistAlias }))
    .catch(err => next(err));
}