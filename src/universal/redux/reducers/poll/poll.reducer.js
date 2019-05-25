const initialState = {
  randomPoll: {},
  pollReady: true,
  pollList: [],
  voting: true
};

export default function pollReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_RANDOM_POLL_REQUEST':
      return Object.assign({},
        state,
        { pollReady: false }
      );

    case 'GET_RANDOM_POLL_SUCCESS':
      return Object.assign({},
        state,
        { randomPoll: action.payload },
        { pollReady: true }
      );

    case 'GET_RANDOM_POLL_ERROR':
      return Object.assign({},
        state,
        { pollReady: true }
      );

    case 'POLL_VOTE_REQUEST':
      return Object.assign({},
        state,
        { voting: true }
      );

    case 'POLL_VOTE_SUCCESS':
      return Object.assign({}, state,
        { voting: false },
        { randomPoll: action.payload }
      );

    case 'POLL_VOTE_ERROR':
      return Object.assign({},
        state,
        { voting: false }
      );

    default:
      return state;
  }
}

