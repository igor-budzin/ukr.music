const mongoose = require('mongoose');
const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');

const User = require('../models/user.model');
const Playlist = require('../models/Playlist.model');
const Audio = require('../models/Audio.model');

const coverFilesPath = path.resolve(__root, '..', '..', 'files', 'playlist-cover');

exports.createPlaylist = async (req, res, next) => {
  let playlistId = new mongoose.Types.ObjectId();
  let currentUserId, title;
  let coverName = null;

  const form = new multiparty.Form();

  form.on('error', (err) => { 
    if(err) next(err);
  });


  form.on('field', (name, value) => {
    switch(name) {
      case 'currentUserId':
        currentUserId = value;
      break;

      case 'title':
        title = value;
      break;
    }
  });

  form.on('file', async (name, file) => {
    
    if(file.path) {
      const data = fs.readFileSync(file.path);

      const extArr = file.originalFilename.split('.');
      coverName = `${playlistId}.${extArr[extArr.length - 1]}`;

      fs.writeFileSync(path.resolve(coverFilesPath, coverName), data);
    }

  });

  form.on('close', async () => {
    await User
      .findOneAndUpdate({ id: currentUserId }, { $push: { playlist: playlistId } })
      .catch(next);

    const playlist = new Playlist({
      _id: playlistId,
      title,
      ownerId: currentUserId,
      cover: coverName
    });

    await playlist.save()
      .catch(next);

    res.send({ "status": "true" });
  });


  form.parse(req);

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
      duration: '$duration',
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
    .then(response => {
      playlist = response.audio.map(function(el) { return mongoose.Types.ObjectId(el) })
    })
    .catch(err => next(err));

  if(playlist) {
   await Audio
      // .find({ _id: { $in: playlist.audio }}, '_id link title artists duration picture')
      .paginate({ _id: { $in: playlist }}, options)
      .then(response => {
        console.log(response)
        res.json({
          music: response.docs,
          page,
          hasNextPage: playlist.length > page * limit
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

exports.deletePlaylist = (req, res, next) => {
  Playlist
    .deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then(response => {
      console.log(response)
      res.json({ status: true });
    })
    .catch(err => next(err));
}