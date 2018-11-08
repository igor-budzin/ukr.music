import {
	CHANGE_DISTANCE,
	CHANGE_ROUTE_ITEMS,
	REQUEST_SAVE_ROUTE,
	REQUEST_SAVE_ROUTE_SUCCESS,
	REQUEST_SAVE_ROUTE_ERROR
} from '../consts';

export function changeDistanceAction(distance) {
	return {
		type: CHANGE_DISTANCE,
		distance
	};
}

export function changeRouteItemsAction(route) {
	return {
		type: CHANGE_ROUTE_ITEMS,
		route
	};
}