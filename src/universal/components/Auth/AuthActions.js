import axios from 'axios';

import {
	REQUEST_LOGIN,
	REQUEST_LOGIN_SUCCESS,
	REQUEST_LOGIN_ERROR
} from '../../redux/consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});

function requestLoginAction() {
	return {
		type: REQUEST_LOGIN
	}
}

function requestLoginActionSuccess() {
	return {
		type: REQUEST_LOGIN_SUCCESS
	}
}

function requestLoginActionError() {
	return {
		type: REQUEST_LOGIN_ERROR
	}
}

export function requestLogin(callback) {
	return (dispatch) => {
		dispatch(requestLoginAction());

		const type = 'facebook';

		axiosInstance.get(`/auth/${type}`)
		.then((response) => {
			console.log(response)
			
			dispatch(requestLoginActionSuccess());
		})
		.catch((error) => {
			dispatch(requestLoginActionError());
			console.log(error);
		});
	}
}