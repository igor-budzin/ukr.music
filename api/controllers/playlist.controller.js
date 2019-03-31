const mongoose = require('mongoose');

const User = require('../models/user.model');
const Playlist = require('../models/Playlist.model');
const Audio = require('../models/Audio.model');

exports.createPlaylist = async (req, res, next) => {
  const { userLogin, title } = req.body;
  let userId;
  let playlistId = new mongoose.Types.ObjectId();

  await User
    .findOneAndUpdate({ login: userLogin }, { $push: { playlist: playlistId } })
    .then(response => { userId = response._id })
    .catch(err => next(err));

  const playlist = new Playlist({
    _id: playlistId,
    title,
    ownerId: userId,
    ownerName: userLogin
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
  const { userLogin } = req.query;
  let playlistArr = [];
  let data = {};

  await Playlist
    .aggregate()
    .match({ ownerName: userLogin })
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
  const options = {};
  const responseData = {};


  await Playlist
    .findById(req.params.id)
    .then(response => playlist = response)
    .catch(err => next(err));

  if(playlist.audio.lenght > 0) {
    options = {
      select: '_id link title artists duration picture',
      sort: req.query.sortBy ? { [req.query.sortBy]: -1 } : { date: -1 },
      page,
      limit
    };
  }

  Audio
    .paginate({ _id: { $in: playlist.audio }}, options)
    .then(response => {
      responseData.music = response.docs;
      responseData.page = page;
      responseData.hasNextPage = playlist.audio.lenght > page * limit;
      res.json(responseData);
    })
    .catch(err => next(err));
}