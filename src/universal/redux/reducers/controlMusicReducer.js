import * as consts from '../consts';

const initialState = {
	isPlaying: false,
	currentMusic: {
		_id: '',
		link: '',
		title: '',
		artists: '',
		duration: 0,
		picture: ''
	},
	currentPlaylist: []
};

export default function controlMusicReducer(state = initialState, action) {
	// console.log('controlMusicReducer')
	switch(action.type) {
		case consts.PLAY_NEW_AUDIO:
			return Object.assign({}, state, { isPlaying: true, currentMusic: action.currentMusic });

		case consts.PLAY_AUDIO:
			return Object.assign({}, state, { isPlaying: true });

		case consts.PAUSE_AUDIO:
			return Object.assign({}, state, { isPlaying: false });

		case consts.SET_CURRENT_PLAYLIST:
			return Object.assign({}, state, { currentPlaylist: action.playlist });

		default:
			return state;
	}
}

