const mongoose = require('mongoose');

const UserModel = require('../../models/user.model');
const AudioModel = require('../../models/Audio.model');

module.exports = router => {
  router.get('/getMusicList', async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 30;
    const responseData = {};
    let countAudio = 0;
    let userAudio = [];

    const options = {
      select: '_id link title artists duration picture',
      sort: req.query.sortBy ? { [req.query.sortBy]: -1 } : { date: -1 },
      page,
      limit
    };

    if(req.query.userName !== undefined) {
      await UserModel
        .findOne({ name: req.query.userName }, 'audio')
        .then(user => { userAudio = user.audio; })
        .catch(err => next(err));

      await AudioModel
        .countDocuments({ _id: { $in: userAudio }})
        .then(count => { countAudio = count; })
        .catch(err => next(err));
    }

    AudioModel
      .paginate(userAudio.lenght > 0 ? { _id: { $in: userAudio }} : {}, options)
      .then(result => {
        responseData.music = result.docs;
        responseData.page = page;
        responseData.hasNextPage = countAudio > page * limit;
        res.json(responseData);
      })
      .catch(err => next(err));
  });
}