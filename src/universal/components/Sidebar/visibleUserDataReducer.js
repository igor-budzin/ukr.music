import {
  REQUEST_GET_USERDATA,
  REQUEST_GET_USERDATA_SUCCESS,
  REQUEST_GET_USERDATA_ERROR,
} from '../../redux/consts';

const initialState = {
  audioCount: 0,
  followersCount: 0,
  canUserFollow: null,
  login: null,
  name: null,
  artistList: []
};

export default function visibleUserDataReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_GET_USERDATA: {
    return state;
  }

  case REQUEST_GET_USERDATA_SUCCESS: {
    return Object.assign({}, state, action.payload);
  }

  case REQUEST_GET_USERDATA_ERROR: {
    return state;
  }

  case 'GET_ARTIST_LIST_BY_USER_REQUEST':
    return state;

  case 'GET_ARTIST_LIST_BY_USER_SUCCESS':
    return Object.assign({}, state, action.payload);

  case 'GET_ARTIST_LIST_BY_USER_ERROR':
    return state;

  default:
    return state;
  }
}
