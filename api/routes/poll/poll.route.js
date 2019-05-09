const controller = require('../../controllers/poll.controller');
const passport = require('passport');

module.exports = router => {
  router
    .get('/poll', controller.getAllPolls)
    .post('/poll', controller.createPoll)

}