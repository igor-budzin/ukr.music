const mongoose = require('mongoose');

const User = require('../models/user.model');
const Playlist = require('../models/Playlist.model');
const Audio = require('../models/Audio.model');

exports.createPlaylist = async (req, res, next) => {
  let { userId, title } = req.body;
  let playlistId = new mongoose.Types.ObjectId();

  await User
    .findOneAndUpdate({ id: userId }, { $push: { playlist: playlistId } })
    .then(response => { userId = response.id })
    .catch(err => next(err));

  const playlist = new Playlist({
    _id: playlistId,
    title,
    ownerId: userId
  });

  await playlist.save()
    .catch(err => next(err));

  res.json({ status: true });
};

exports.addToPlaylist = async (req, res, next) => {
  const { playlistId, audioId } = req.body;
  let durationTime = 0;

  await Audio
    .findOne({ _id: mongoose.Types.ObjectId(audioId) })
    .then(response => durationTime = response.duration)
    .catch(err => next(err));



  await Playlist
    .findOneAndUpdate({ _id: mongoose.Types.ObjectId(playlistId) }, { 
      $push: { audio: audioId },
      $inc: { duration: durationTime }
    })
    .then(response => res.json({ "status": true }))
    .catch(err => next(err));
};

exports.getPlaylists = async (req, res, next) => {
  const { userId } = req.query;
  let playlistArr = [];
  let data = {};

  await Playlist
    .aggregate()
    .match({ ownerId: userId })
    .project({
      title: '$title',
      cover: '$cover',
      audio: '$audio',
      audioCount: { $size:"$audio" }
    })
    .then(response => {
      res.json(response);
    })
    .catch(err => next(err));
};

exports.getPlaylistAudio = async (req, res, next) => {
  let playlist = {};
  let countAudio = 0;
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 30;
  const responseData = {};

  const options = {
     select: '_id link title artists duration picture',
     sort: req.query.sortBy ? { [req.query.sortBy]: -1 } : { date: 1 },
     page,
     limit
   };

  await Playlist
    .findById(req.params.id)
    .then(response => playlist = response)
    .catch(err => next(err));

  if(playlist.audio) {
    Audio
      .paginate({ _id: { $in: playlist.audio }}, options)
      .then(response => {
        res.json({
          music: response.docs,
          page,
          hasNextPage: playlist.audio.length > page * limit
        });
      })
      .catch(err => next(err));
  }
  else res.json([]);
}

exports.getPlaylistData = async (req, res, next) => {
  Playlist
    .findById(req.params.id)
    .then(response => {
      const { _id, title, privat, cover, duration } = response;
      const audioCount = response.audio.length;

      res.json({ _id, title, privat, cover, duration, audioCount });
    })
    .catch(err => next(err));
}