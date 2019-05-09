const controller = require('../../controllers/artist.controller');
const passport = require('passport');

module.exports = router => {
  router
    .get('/artist', controller.getArtists)
    .get('/artist/:alias', controller.getArtistData)
    .get('/artist/user/:id', controller.getArtistsByUser)
    .get('/artist/audio/:alias', controller.getArtistAudio)
    .get('/artist/album/:alias', controller.getArtistAlbum)
    .post('/artist', passport.authenticate('jwt', { session: false }), controller.createArtist)
}