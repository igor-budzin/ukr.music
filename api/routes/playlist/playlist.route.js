const controller = require('../../controllers/playlist.controller');
const path = require('path');
const passport = require('passport');

module.exports = router => {
  router
    .get('/playlist', controller.getPlaylists)
    .get('/playlist/:id', controller.getPlaylistData)
    .get('/playlist/audio/:id', controller.getPlaylistAudio)
    .post('/playlist', controller.createPlaylist)
    .put('/playlist', controller.addToPlaylist)
    .delete('/playlist/:id', controller.deletePlaylist)
}