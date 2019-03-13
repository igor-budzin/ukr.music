import { 
  REQUEST_GET_MUSIC_LIST,
  REQUEST_GET_MUSIC_LIST_SUCCESS,
  REQUEST_GET_MUSIC_LIST_ERROR
} from '../consts';

const initialState = {
  music: [],
  hasNextPage: false
};

export default function getMusicReducer(state = initialState, action) {
  switch(action.type) {
    case REQUEST_GET_MUSIC_LIST:
      return state;

    case REQUEST_GET_MUSIC_LIST_SUCCESS:
      let arr = action.payload.music;

      if(action.payload.page !== 1) {
        arr = state.music.concat(action.payload.music);
      }

      return Object.assign({}, state, { music: arr, hasNextPage: action.payload.hasNextPage });

    case REQUEST_GET_MUSIC_LIST_ERROR:
      return state;

    default:
      return state;
  }
}

