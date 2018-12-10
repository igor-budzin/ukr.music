import { 
	CHOSE_MUSIC,
	PLAY_MUSIC,
	PAUSE_MUSIC,
	LOAD_MUSIC,
	LOAD_MUSIC_SUCCESS,
	LOAD_MUSIC_ERROR,
} from '../consts';

export function choseMusicAction(music) {
	return {
		type: CHOSE_MUSIC,
		music
	}
}

export function playMusicAction(audio) {
	audio.startAudio();
	console.log('playMusicAction')
	return {
		type: PLAY_MUSIC,
		status: true
	}
}

export function pauseMusicAction(audio) {
	audio.startAudio();
	console.log('pauseMusicAction')
	return {
		type: PAUSE_MUSIC,
		status: false
	}
}

export function loadMusicAction() {
	return {
		type: LOAD_MUSIC,
		loadProcess: true,
		loaded: false
	}
}

export function loadMusicSuccessAction() {
	return {
		type: LOAD_MUSIC_SUCCESS,
		loadProcess: false,
		loaded: true
	}
}

export function loadMusicErrorAction() {
	return {
		type: LOAD_MUSIC_ERROR,
		loadProcess: false,
		loaded: false
	}
}

export function loadMusic(audio, link) {

	return (dispatch) => {
		dispatch(loadMusicAction());

		return new Promise((resolve, reject) => {
			audio.loadAudio(link)
			.then(() => {
				dispatch(loadMusicSuccessAction());
				resolve()
			})
			.catch((error) => {
				dispatch(loadMusicErrorAction());
				resolve()
				console.log(error);
			});
		})

	}
}


