import { 
	REQUEST_GET_MUSIC_LIST,
	REQUEST_GET_MUSIC_LIST_SUCCESS,
	REQUEST_GET_MUSIC_LIST_ERROR
} from '../consts';

const initialState = {
	artistList: []
};

export default function artistListReducer(state = initialState, action) {
	switch(action.type) {
		case 'GET_ARTIST_LIST_REQUEST':
			return state;

		case 'GET_ARTIST_LIST_SUCCESS':
			const newState = Object.assign({}, state);
			newState.artistList = action.payload.artistList;
			return newState;

		case 'GET_ARTIST_LIST_ERROR':
			return state;

		default:
			return state;
	}
}

