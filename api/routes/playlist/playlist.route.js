const controller = require('../../controllers/playlist.controller');
const passport = require('passport');

module.exports = router => {
  router
    .get('/playlist', controller.getPlaylists)
    .get('/playlist/:id', controller.getPlaylistData)
    .get('/playlist/audio/:id', controller.getPlaylistAudio)
    .post('/playlist', passport.authenticate('jwt', { session: false }), controller.createPlaylist)
    .put('/playlist', passport.authenticate('jwt', { session: false }), controller.addToPlaylist)
    .delete('/playlist', passport.authenticate('jwt', { session: false }), () => {})
}