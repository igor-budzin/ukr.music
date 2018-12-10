import { 
	CHOSE_MUSIC,
	PLAY_MUSIC,
	PAUSE_MUSIC,
	LOAD_MUSIC,
	LOAD_MUSIC_SUCCESS,
	LOAD_MUSIC_ERROR,
} from '../consts';

const initialState = {
	currentMusic: {},
	currentStatus: false,
	loaded: false,
	loadProcess: false,
	choseStatus: false
};

export default function controlMusicReducer(state = initialState, action) {
	console.log(state)
	switch(action.type) {
		case CHOSE_MUSIC:
			return Object.assign({}, state, { currentMusic: action.music });

		case PLAY_MUSIC:
			return Object.assign({}, state, { currentStatus: action.status });

		case PAUSE_MUSIC:
			return Object.assign({}, state, { currentStatus: action.status });

		case LOAD_MUSIC:
			return Object.assign({}, state, { loadProcess: action.loadProcess, loaded: action.loaded });

		case LOAD_MUSIC_SUCCESS:
			return Object.assign({}, state, { loadProcess: action.loadProcess, loaded: action.loaded });

		case LOAD_MUSIC_ERROR:
			return Object.assign({}, state, { loadProcess: action.loadProcess, loaded: action.loaded });

		default:
			return state;
	}
}

