import { 
	REQUEST_GET_ROUTES,
	REQUEST_GET_ROUTES_SUCCESS,
	REQUEST_GET_ROUTES_ERROR
} from '../consts';

const initialState = {
	routes: []
};

export default function getRoutesReducer(state = initialState, action) {
	const { routes } = action;
	switch(action.type) {
		case REQUEST_GET_ROUTES:
			return {
				routes: []
			};
		case REQUEST_GET_ROUTES_SUCCESS:
			// console.log('REQUEST_GET_ROUTES_SUCCESS', action, routes)
			return {
				routes
			};
		case REQUEST_GET_ROUTES_ERROR:
			return {
				routes
			};
		default:
			return state;
	}
}

