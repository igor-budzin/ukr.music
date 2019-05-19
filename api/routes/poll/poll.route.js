const controller = require('../../controllers/poll.controller');
const passport = require('passport');

module.exports = router => {
  router
    .get('/poll', controller.getAllPolls)
    .get('/poll/random/:user', controller.getRandomPoll)
    .post('/poll', controller.createPoll)
    .post('/poll/vote', controller.pollVote)
    .delete('/poll/:alias', controller.deletePoll)
}