const path = require('path');
const fs = require('fs');
const colors = require('colors');

const playlistCoverPath = path.resolve(__root, '..', '..', 'files', 'playlist-cover');
const audioCoverPath = path.resolve(__root, '..', '..', 'files', 'cover');
const albumCoverPath = path.resolve(__root, '..', '..', 'files', 'album-cover');
const artistHorizontalCoverPath = path.resolve(__root, '..', '..', 'files', 'artist-cover', 'horizontal');

exports.getPlaylistCover = (req, res, next) => {
  const filesPath = path.resolve(playlistCoverPath, req.params.name);
  res.sendFile(filesPath);
}

exports.getAudioCover = (req, res, next) => {
  const filePath = path.resolve(audioCoverPath, req.params.name);
  try {
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);

    readStream.pipe(res);
  }
  catch(err) {
    console.log(`error audio cover`.red);
    return res.json({ status: 'error' });
  }
}

exports.getAlbumCover = (req, res, next) => {
  const filePath = path.resolve(albumCoverPath, req.params.name);
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);

  readStream.pipe(res);
}

exports.getArtistCover = (req, res, next) => {
  let coverPath = '';

  switch(req.params.type) {
    case 'horizontal':
      coverPath = artistHorizontalCoverPath
    break;
  }
  const filePath = path.resolve(coverPath, req.params.name);
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);

  readStream.pipe(res);
}