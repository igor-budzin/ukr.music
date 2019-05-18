export function getRandomPoll(user) {
  return {
    typePrefix: 'GET_RANDOM_POLL',
    endpoint: '/poll/random',
    data: {  },
    handleSuccess: response => {
      if(typeof callback === 'function') callback(response);
    },
    handleError: error => {
      console.log('handleError');
      console.log(error);
    }
  }
}