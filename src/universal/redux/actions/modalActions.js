import {
	OPEN_SAVE_MODAL_WINDOW,
	CLOSE_SAVE_MODAL_WINDOW
} from '../consts';

export function openSaveRouteModalAction() {
	return {
		type: OPEN_SAVE_MODAL_WINDOW
	};
}

export function closeSaveRouteModalAction() {
	return {
		type: CLOSE_SAVE_MODAL_WINDOW
	};
}