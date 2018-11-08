import axios from 'axios';

import {
	REQUEST_SAVE_ROUTE,
	REQUEST_SAVE_ROUTE_SUCCESS,
	REQUEST_SAVE_ROUTE_ERROR
} from '../consts';

import { closeSaveRouteModalAction } from 'universal/redux/actions/modalActions';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});


export function requestSaveRoute() {
	return {
		type: REQUEST_SAVE_ROUTE
	}
}

export function requestSaveRouteSuccess() {
	return {
		type: REQUEST_SAVE_ROUTE_SUCCESS
	}
}

export function requestSaveRouteError() {
	return {
		type: REQUEST_SAVE_ROUTE_ERROR
	}
}

export function saveRouteAction(data) {
	return (dispatch) => {
		dispatch(requestSaveRoute());

		axiosInstance.post('save-route', data)
		.then((response) => {
			if(response.data === 'OK') {
				dispatch(requestSaveRouteSuccess());
			}
			else {
				dispatch(requestSaveRouteError());
			}
			dispatch(closeSaveRouteModalAction());
		})
		.catch((error) => {
			dispatch(requestSaveRouteError());
			dispatch(closeSaveRouteModalAction());
			console.log(error);
		});
	}
}