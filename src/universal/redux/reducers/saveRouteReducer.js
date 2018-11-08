import { 
	REQUEST_SAVE_ROUTE,
	REQUEST_SAVE_ROUTE_SUCCESS,
	REQUEST_SAVE_ROUTE_ERROR
} from '../consts';

const initialState = {
	saveModalLoading: false,
};

export default function saveRouteReducer(state = initialState, action) {
	switch(action.type) {
		case REQUEST_SAVE_ROUTE:
			return {
				saveModalLoading: true,
			};
		case REQUEST_SAVE_ROUTE_SUCCESS:
			return {
				saveModalLoading: false
			};
		case REQUEST_SAVE_ROUTE_ERROR:
			return {
				saveModalLoading: false
			};
		default:
			return state;
	}
}

