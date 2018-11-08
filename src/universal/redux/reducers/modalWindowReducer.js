import { 
	OPEN_SAVE_MODAL_WINDOW,
	CLOSE_SAVE_MODAL_WINDOW
} from '../consts';

const initialState = {
	visibleSaveRouteModal: false
};

export default function saveRouteModalReducer(state = initialState, action) {
	switch(action.type) {
		case OPEN_SAVE_MODAL_WINDOW: 
			return {
				visibleSaveRouteModal: true
			};
		case CLOSE_SAVE_MODAL_WINDOW: 
			return {
				visibleSaveRouteModal: false
			};
		default:
			return state;
	}
}

