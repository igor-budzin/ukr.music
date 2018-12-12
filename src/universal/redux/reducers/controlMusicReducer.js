import * as consts from '../consts';

const initialState = {
	isPlaying: false,
	currentMusic: {}
};

export default function controlMusicReducer(state = initialState, action) {
	// console.log('controlMusicReducer')
	switch(action.type) {
		case consts.PLAY_AUDIO:
			return Object.assign({}, state, { isPlaying: true, currentMusic: action.currentMusic });

		case consts.PAUSE_AUDIO:
			return Object.assign({}, state, { isPlaying: false })

		default:
			return state;
	}
}

