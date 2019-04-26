const controller = require('../../controllers/artist.controller');
const passport = require('passport');

module.exports = router => {
  router
    .get('/artist', controller.getArtists)
    .get('/artist/:id', controller.getArtistData)
    .get('/artist/user/:id', controller.getArtistsByUser)
    .get('/artist/audio/:id', controller.getArtistAudio)
    .get('/artist/album/:id', controller.getArtistAlbum)
    .post('/artist', passport.authenticate('jwt', { session: false }), controller.createArtist)

    // .get('/playlist', controller.getPlaylists)
    // .get('/playlist/:id', controller.getPlaylistData)
    // .get('/playlist/audio/:id', controller.getPlaylistAudio)
    // .post('/playlist',passport.authenticate('jwt', { session: false }), controller.createPlaylist)
    // .put('/playlist', passport.authenticate('jwt', { session: false }), controller.addToPlaylist)
    // .delete('/playlist/:id', passport.authenticate('jwt', { session: false }), controller.deletePlaylist)
}