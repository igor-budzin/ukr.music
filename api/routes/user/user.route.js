const controller = require('../../controllers/user.controller');

module.exports = router => {
  router
    .get('/user', controller.getAllUsers)
    // .get('/user/:id', controller.getUserData)
    // .get('/user/:id/audio/', controller.getUserAudio)
    // .get('/user/:id/audio/:audioId', controller.addAudioToUser)
    // .post('/user', controller.createUser)
    // .put('/user/:id', updateUser)
    // .delete('/user/:id', controller.deleteUser)
}