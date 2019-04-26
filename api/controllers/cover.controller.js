const path = require('path');
const fs = require('fs');

const playlistCoverFilesPath = path.resolve(__root, '..', '..', 'files', 'playlist-cover');
const audioCoverFilesPath = path.resolve(__root, '..', '..', 'files', 'cover');
const albumCoverFilesPath = path.resolve(__root, '..', '..', 'files', 'album-cover');

exports.getPlaylistCover = (req, res, next) => {
  const filesPath = path.resolve(playlistCoverFilesPath, req.params.name);
  res.sendFile(filesPath);
}

exports.getAudioCover = (req, res, next) => {
  const filePath = path.resolve(audioCoverFilesPath, req.params.name);
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);

  readStream.pipe(res);
}

exports.getAlbumCover = (req, res, next) => {
  const filePath = path.resolve(albumCoverFilesPath, req.params.name);
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
      'Content-Type': 'image/jpeg',
      'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);

  readStream.pipe(res);
}