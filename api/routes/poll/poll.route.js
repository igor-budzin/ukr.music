const controller = require('../../controllers/poll.controller');
const passport = require('passport');

module.exports = router => {
  router
    .get('/poll', controller.getAllPolls)
    .get('/poll/random', controller.getRandomPoll)
    .post('/poll', controller.createPoll)
    .delete('/poll/:alias', controller.deletePoll)

}