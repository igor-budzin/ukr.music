const initialState = {
  randomPoll: null,
  pollList: []
};

export default function pollReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_RANDOM_POLL_REQUEST':
      return state;

    case 'GET_RANDOM_POLL_SUCCESS': console.log(action.payload)
      return Object.assign({},
        state,
        { randomPoll: action.payload }
      );

    case 'GET_RANDOM_POLL_ERROR':
      return state;

    default:
      return state;
  }
}

