import * as consts from '../consts';

export function playAudioAction(currentMusic) {
	return {
		type: consts.PLAY_AUDIO,
		currentMusic
	}
}
export function pauseAudioAction() {
	return {
		type: consts.PAUSE_AUDIO
	}
}