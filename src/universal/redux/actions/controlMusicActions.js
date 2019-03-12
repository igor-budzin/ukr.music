import * as consts from '../consts';
import { API_URL } from '../../../global.config';

function playNewAudioAction() {
	return {
		type: consts.PLAY_NEW_AUDIO
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

export function playAudio(currentMusic = undefined, playlist = undefined) {
	return dispatch => {
		if(currentMusic !== undefined) {
			dispatch(setCurrentAudio(currentMusic));

			window.audioInstance.src = `${API_URL}/getAudioFile/${currentMusic.link}`;
			window.audioInstance.play().then(() => {
				dispatch(playNewAudioAction());
				document.title = currentMusic.title;
				if(playlist) dispatch(setCurrentPlaylistAction(playlist));
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
		document.title = 'Cabine of Pilot';
		dispatch(pauseAudioAction());
	}
}

export function setCurrentPlaylistAction(playlist) {
	return {
		type: consts.SET_CURRENT_PLAYLIST,
		playlist
	}
}

function setCurrentAudio(currentMusic) {
	return {
		type: consts.SET_CURRENT_AUDIO,
		currentMusic
	}
}