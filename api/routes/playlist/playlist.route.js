const controller = require('../../controllers/playlist.controller');
const passport = require('passport');

module.exports = router => {
  router
    .post('/playlist', passport.authenticate('jwt', { session: false }), controller.createPlaylist)
    .get('/playlist', controller.getPlaylists)
    .put('/playlist', passport.authenticate('jwt', { session: false }), controller.addToPlaylist)
    .delete('/playlist', passport.authenticate('jwt', { session: false }), () => {})
}