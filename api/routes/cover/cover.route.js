const controller = require('../../controllers/cover.controller');

module.exports = router => {
  router
    .get('/cover/playlist/:name', controller.getPlaylistCover)
    .get('/cover/audio/:name', controller.getAudioCover)
    .get('/cover/album/:name', controller.getAlbumCover)
    .get('/cover/artist/:name/:type', controller.getArtistCover)
}