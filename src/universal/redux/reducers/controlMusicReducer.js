import * as consts from '../consts';

const initialState = {
	isPlaying: false,
	currentMusic: {
		link: '',
		title: '',
		artist: '',
		duration: 0
	}
};

export default function controlMusicReducer(state = initialState, action) {
	// console.log('controlMusicReducer')
	switch(action.type) {
		case consts.PLAY_NEW_AUDIO:
			return Object.assign({}, state, { isPlaying: true, currentMusic: action.currentMusic });

		case consts.PLAY_AUDIO:
			return Object.assign({}, state, { isPlaying: true });

		case consts.PAUSE_AUDIO:
			return Object.assign({}, state, { isPlaying: false })

		default:
			return state;
	}
}

