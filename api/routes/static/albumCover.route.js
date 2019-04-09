const path =  require('path');

const albumCoverFilesPath = path.resolve(__root, '..', '..', 'files', 'album-cover');

module.exports = router => {
  router.get('/albumCover/:link', (req, res) => {
    const filesPath = path.resolve(albumCoverFilesPath, req.params.link);
    res.sendFile(filesPath);
  });
}