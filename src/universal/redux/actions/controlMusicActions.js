import * as consts from '../consts';

export function setCurrentAudioction(currentMusic) {
	return {
		type: consts.SET_CURRENT_AUDIO,
		currentMusic
	}
}

export function playAudioAction() {
	return {
		type: consts.PLAY_AUDIO
	}
}
export function pauseAudioAction() {
	return {
		type: consts.PAUSE_AUDIO
	}
}