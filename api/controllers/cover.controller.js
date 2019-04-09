const path =  require('path');
const playlistCoverFilesPath = path.resolve(__root, '..', '..', 'files', 'playlist-cover');

exports.getPlaylistCover = (req, res, next) => {
  const filesPath = path.resolve(playlistCoverFilesPath, req.params.name);
  res.sendFile(filesPath);
}