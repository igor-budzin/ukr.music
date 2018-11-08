import axios from 'axios';

import { 
	REQUEST_GET_ROUTES,
	REQUEST_GET_ROUTES_SUCCESS,
	REQUEST_GET_ROUTES_ERROR
} from '../consts';


const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});


export function requestGetRoutes() {
	return {
		type: REQUEST_GET_ROUTES
	}
}

export function requestGetRoutesSuccess(routes) {
	return {
		type: REQUEST_GET_ROUTES_SUCCESS,
		routes
	}
}

export function requestGetRoutesError() {
	return {
		type: REQUEST_GET_ROUTES_ERROR
	}
}

export function getRoutesAction() {
	return (dispatch) => {
		dispatch(requestGetRoutes());

		axiosInstance.get('get-routes')
		.then((response) => {
			if(response.status === 200) {
				dispatch(requestGetRoutesSuccess(response.data));
			}
			else {
				dispatch(requestGetRoutesError());
			}
		})
		.catch((error) => {
			dispatch(requestGetRoutesError());
			console.log(error);
		});
	}
}