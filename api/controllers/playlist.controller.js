const mongoose = require('mongoose');

const User = require('../models/user.model.js');
const Playlist = require('../models/Playlist.model.js');

exports.createPlaylist = async (req, res, next) => {
  const { userName, title } = req.body;
  let userId;
  let playlistId = new mongoose.Types.ObjectId();

  await User
    .findOneAndUpdate({ name: userName }, { $push: { playlist: playlistId } })
    .then(response => { userId = response._id })
    .catch(err => next(err));

  const playlist = new Playlist({
    _id: playlistId,
    title,
    ownerId: userId,
    ownerName: userName
  });

  await playlist.save()
    .catch(err => next(err));

  res.json({ status: true });
};

exports.addToPlaylist = async (req, res, next) => {
  const { playlistId, audioId } = req.body;

  await Playlist
    .findOneAndUpdate({ _id: mongoose.Types.ObjectId(playlistId) }, { $push: { audio: audioId } })
    .then(response => res.json({ "status": true }))
    .catch(err => next(err));
};

exports.getPlaylists = async (req, res, next) => {
  const { userName } = req.query;
  let playlistArr = [];
  let data = {};

  const options = {
    select: '_id title',
    sort: { date: -1 },
    page: 1,
    limit: 100
  };

  await User
    .findOne({ name: userName }, 'playlist')
    .then(response => playlistArr = response.playlist)
    .catch(err => next(err));

  await Playlist
    .paginate({ ownerName: userName}, options)
    .then(response => {
      data.playlists = response.docs;
      res.json(data);
    })
};