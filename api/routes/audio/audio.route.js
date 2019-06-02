const controller = require('../../controllers/audio.controller');
const passport = require('passport');

module.exports = router => {
  router
    .get('/audio', controller.getAllAudio)
    .get('/audio/:id', controller.getAudio)
    .post('/audio/user', controller.addAudioToUser)
}