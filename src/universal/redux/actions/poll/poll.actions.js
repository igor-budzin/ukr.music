export function getRandomPoll(user) {
  return {
    typePrefix: 'GET_RANDOM_POLL',
    endpoint: `poll/random/${user}`,
    data: { },
    handleSuccess: response => {
      if(typeof callback === 'function') callback(response);
    },
    handleError: error => {
      console.log('handleError');
      console.log(error);
    }
  }
}

export function pollVote(alias, answer, user, handleSuccess, handleError) {
  return {
    typePrefix: 'POLL_VOTE',
    method: 'post',
    endpoint: 'poll/vote',
    data: {
      alias,
      answer,
      user
    },
    handleSuccess: response => {
      if(typeof handleSuccess === 'function') handleSuccess(response);
    },
    handleError: error => {
      if(typeof handleError === 'function') handleError(error);
    }
  }
}