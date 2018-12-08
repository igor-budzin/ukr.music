import { 
	CHOSE_MUSIC,
	PLAY_MUSIC,
	PAUSE_MUSIC
} from '../consts';

const initialState = {
	currentMusic: {},
	currentStatus: false,
	loaded: false
};

export default function controlMusicReducer(state = initialState, action) {
	switch(action.type) {
		case CHOSE_MUSIC:
			return Object.assign({}, initialState, { currentMusic: action.music, loaded: true });

		case PLAY_MUSIC:
			return Object.assign({}, state, { currentStatus: action.status });

		case PAUSE_MUSIC:
			return Object.assign({}, state, { currentStatus: action.status });

		default:
			return state;
	}
}

