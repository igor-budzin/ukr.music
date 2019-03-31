import { 
  REQUEST_GET_MUSIC_LIST,
  REQUEST_GET_MUSIC_LIST_SUCCESS,
  REQUEST_GET_MUSIC_LIST_ERROR
} from '../consts';

const initialState = {
  music: []
};

export default function musicDataReducer(state = initialState, action) {
  switch(action.type) {
    case 'GET_MUSIC_LIST_REQUEST':
      return state;

    case 'GET_MUSIC_LIST_SUCCESS':
      const newState = Object.assign({}, state);
      newState.music = action.payload.music;
      return newState;

    case 'GET_MUSIC_LIST_ERROR':
      return state;

    default:
      return state;
  }
}

