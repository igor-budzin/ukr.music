const initialState = {
  music: [],
  hasNextPage: false,
  audioCount: 0,
  title: '',
  privat: false,
  cover: ''
};

export default function playlistReducer(state = initialState, action) {
  
  switch(action.type) {
    case 'GET_PLAYLIST_AUDIO_REQUEST':
    case 'GET_PLAYLIST_DATA_REQUEST':
      return state;

    case 'GET_PLAYLIST_AUDIO_SUCCESS':
      let arr = action.payload.music;

      if(action.payload.page !== 1) {
        arr = state.music.concat(action.payload.music);
      }

      return Object.assign({}, state, {
        music: arr,
        hasNextPage: action.payload.hasNextPage
      });

    case 'GET_PLAYLIST_AUDIO_ERROR':
      return state;

    case 'GET_PLAYLIST_DATA_SUCCESS':
      return Object.assign({}, state, {
        _id: action.payload._id,
        audioCount: action.payload.audioCount,
        title: action.payload.title,
        privat: action.payload.privat,
        cover: action.payload.cover,
        duration: action.payload.duration
      });

    case 'GET_PLAYLIST_DATA_ERROR':
      return state;

    default:
      return state;
  }
}

