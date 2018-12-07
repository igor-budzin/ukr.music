import { 
	CHOSE_MUSIC,
	PLAY_MUSIC,
	PAUSE_MUSIC
} from '../consts';

export function choseMusicAction(music) {
	return {
		type: CHOSE_MUSIC,
		music
	}
}

export function playMusicAction() {
	return {
		type: PLAY_MUSIC
	}
}

export function pauseMusicAction() {
	return {
		type: PAUSE_MUSIC
	}
}


