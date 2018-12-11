import * as consts from '../consts';

const initialState = {
	isPlaying: false,
	currentMusic: {}
};

export default function controlMusicReducer(state = initialState, action) {
	// console.log('controlMusicReducer')
	switch(action.type) {
		case consts.SET_CURRENT_MUSIC:
			return Object.assign({}, state, { currentMusic: action.currentMusic });

		case consts.PLAY_AUDIO:
			return Object.assign({}, state, { isPlaying: true });

		case consts.PAUSE_AUDIO:
			return Object.assign({}, state, { isPlaying: false })

		default:
			return state;
	}
}

