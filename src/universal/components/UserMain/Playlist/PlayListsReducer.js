const initialState = {
  music: []
};

export default function playlistDataReducer(state = initialState, action) {
  
  switch(action.type) {
    case 'REQUEST_GET_PLAYLIST':
      return state;

    case 'REQUEST_GET_PLAYLIST_SUCCESS':
      let arr = action.payload.music;

      if(action.payload.page !== 1) {
        arr = state.music.concat(action.payload.music);
      }

      return Object.assign({}, state, { music: arr, hasNextPage: action.payload.hasNextPage });

    case 'REQUEST_GET_PLAYLIST_ERROR':
      return state;

    default:
      return state;
  }
}

