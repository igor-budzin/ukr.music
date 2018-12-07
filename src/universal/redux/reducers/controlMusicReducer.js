import { CHOSE_MUSIC } from '../consts';

const initialState = {
	currentMusic: {}
};

export default function controlMusicReducer(state = initialState, action) {
	switch(action.type) {
		case CHOSE_MUSIC:
			return {
				currentMusic: action.music
			};
		default:
			return state;
	}
}

