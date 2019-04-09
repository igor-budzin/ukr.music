const controller = require('../../controllers/cover.controller');

module.exports = router => {
  router
    .get('/cover/playlist/:name', controller.getPlaylistCover)
}