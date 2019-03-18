const path = require('path');
const AudioModel = require('../../models/Audio.model');

const audioFilesPath = path.resolve(__root, '..', '..', 'files', 'audio');

module.exports = router => {
  router.get('/getAudioFile/:link', async (req, res, next) => {

    await AudioModel
      .findOneAndUpdate({ link: req.params.link }, { $inc: {'listenCount': 1} })
      .catch(err => next(err));

    const filesPath = path.resolve(audioFilesPath, req.params.link);
    res.sendFile(filesPath);
  });
}
