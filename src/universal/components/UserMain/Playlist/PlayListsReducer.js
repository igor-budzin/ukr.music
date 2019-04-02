const initialState = {
  music: [],
  hasNextPage: false,
  audioCount: 0,
  title: ''
};

export default function playlistReducer(state = initialState, action) {
  
  switch(action.type) {
    case 'REQUEST_GET_PLAYLIST_AUDIO':
    case 'REQUEST_GET_PLAYLIST_DATA':
      return state;

    case 'REQUEST_GET_PLAYLIST_AUDIO_SUCCESS':
      let arr = action.payload.music;

      if(action.payload.page !== 1) {
        arr = state.music.concat(action.payload.music);
      }

      return Object.assign({}, state, {
        music: arr,
        hasNextPage: action.payload.hasNextPage
      });

    case 'REQUEST_GET_PLAYLIST_AUDIO_ERROR':
      return state;

    case 'REQUEST_GET_PLAYLIST_DATA_SUCCESS':
      return Object.assign({}, state, {
        audioCount: action.payload.audioCount,
        title: action.payload.title
      });

    case 'REQUEST_GET_PLAYLIST_DATA_ERROR':
      return state;

    default:
      return state;
  }
}

