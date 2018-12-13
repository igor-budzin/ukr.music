import * as consts from '../consts';

function playNewAudioAction(currentMusic) {
	return {
		type: consts.PLAY_NEW_AUDIO,
		currentMusic
	}
}

function playAudioAction() {
	return {
		type: consts.PLAY_AUDIO
	}
}

function pauseAudioAction() {
	return {
		type: consts.PAUSE_AUDIO
	}
}

export function playAudio(currentMusic = undefined) {
	return dispatch => {
		if(currentMusic !== undefined) {
			window.audioInstance.src = 'https://localhost:8080/api/get-music/' + currentMusic.link;
			window.audioInstance.play().then(() => {
				dispatch(playNewAudioAction(currentMusic));
			});
		}
		else {
			window.audioInstance.play();
			dispatch(playAudioAction());
		}
	}
}

export function pauseAudio() {
	return dispatch => {
		window.audioInstance.pause();
		dispatch(pauseAudioAction());
	}
}