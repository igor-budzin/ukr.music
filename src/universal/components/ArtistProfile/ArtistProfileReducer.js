
const initialState = {
  artist: {},
  artistAudioList: []
};

export default function ArtistProfileReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_ARTIST_DATA_REQUEST':
      return state;

    case 'GET_ARTIST_DATA_ERROR':
      return state;

    case 'GET_ARTIST_DATA_SUCCESS':
      return Object.assign({}, state, action.payload);

    case 'GET_ARTIST_AUDIO_LIST_REQUEST':
      return state;

    case 'GET_ARTIST_AUDIO_LIST_ERROR':
      return state;

    case 'GET_ARTIST_AUDIO_LIST_SUCCESS':
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}


