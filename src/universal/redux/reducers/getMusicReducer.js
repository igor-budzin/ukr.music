	import { 
	REQUEST_GET_MUSIC_LIST,
	REQUEST_GET_MUSIC_LIST_SUCCESS,
	REQUEST_GET_MUSIC_LIST_ERROR
} from '../consts';

const initialState = {
	music: []
};

export default function getMusicReducer(state = initialState, action) {
	const { music } = action;
	switch(action.type) {
		case REQUEST_GET_MUSIC_LIST:
			return {
				music: []
			};
		case REQUEST_GET_MUSIC_LIST_SUCCESS:
			return {
				music
			};
		case REQUEST_GET_MUSIC_LIST_ERROR:
			return {
				music
			};
		default:
			return state;
	}
}

