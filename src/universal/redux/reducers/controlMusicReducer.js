import * as consts from '../consts';

const initialState = {
	isPlaying: false,
	isLoading: false,
	currentMusic: {
		_id: '',
		link: '',
		title: '',
		artists: '',
		duration: 0,
		picture: ''
	},
	currentPlaylist: [],
};

export default function controlMusicReducer(state = initialState, action) {
	switch(action.type) {
		case consts.PLAY_NEW_AUDIO:
			return Object.assign({}, state, { isPlaying: true, isLoading: false });

		case consts.PLAY_AUDIO:
			return Object.assign({}, state, { isPlaying: true, isLoading: false });

		case consts.PAUSE_AUDIO:
			return Object.assign({}, state, { isPlaying: false, isLoading: false });

		case consts.SET_CURRENT_AUDIO:
			return Object.assign({}, state, { isPlaying: false, isLoading: true, currentMusic: action.currentMusic });

		case consts.SET_CURRENT_PLAYLIST:
			return Object.assign({}, state, { currentPlaylist: action.playlist });

		default:
			return state;
	}
}

