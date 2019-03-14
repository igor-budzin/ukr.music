const mongoose = require('mongoose');

const UserModel = require('../../models/user.model');
const AudioModel = require('../../models/Audio.model');

module.exports = router => {
  router.get('/removeAudioFromList', async (req, res) => {
    
    await UserModel
      .findOneAndUpdate({  })
  });
}