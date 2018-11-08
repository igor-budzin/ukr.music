import { CHANGE_DISTANCE } from '../consts';

const initialState = {
	distance: 0
};

export default function distanceReducer(state = initialState, action) {
	switch(action.type) {
		case CHANGE_DISTANCE:
			const distance = action.distance;
			return Object.assign({}, state, {distance});
		default:
			return state;
	}
}

