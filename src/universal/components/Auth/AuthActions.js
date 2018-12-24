import axios from 'axios';
import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';

import {
	GET_ERRORS,
	SET_CURRENT_USER,
	REQUEST_LOGIN_USER,
	REQUEST_LOGIN_USER_SUCCESS,
	REQUEST_LOGIN_USER_ERROR,
	REQUEST_REGISTER_USER,
	REQUEST_REGISTER_USER_SUCCESS,
	REQUEST_REGISTER_USER_ERROR
} from '../../redux/consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});

function requestLoginUser() {
	return {
		type: REQUEST_LOGIN_USER
	}
}

function requestLoginUserSuccess() {
	return {
		type: REQUEST_LOGIN_USER_SUCCESS
	}
}

function requestLoginUserError(err) {
	return {
		type: REQUEST_LOGIN_USER_ERROR,
		payload: err
	}
}

export const loginUser = (user) => dispatch => {
	dispatch(requestLoginUser());

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			axiosInstance.post('/login', user)
			.then(res => {
				const { token } = res.data;
				localStorage.setItem('jwtToken', token);
				setAuthToken(token);
				const decoded = jwt_decode(token);

				dispatch(setCurrentUser(decoded));
				dispatch(requestLoginUserSuccess());
				resolve();
			})
			.catch(err => {
				dispatch(requestLoginUserError(err.response.data));
				resolve();
			});
		}, 1500);
	});
}

function requestRegisterUser() {
	return {
		type: REQUEST_REGISTER_USER
	}
}

function requestRegisterUserSuccess() {
	return {
		type: REQUEST_REGISTER_USER_SUCCESS
	}
}

function requestRegisterUserError(err) {
	return {
		type: REQUEST_REGISTER_USER_ERROR,
		payload: err
	}
}


export const registerUser = (user) => dispatch => {
	dispatch(requestRegisterUser());

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			axiosInstance.post('/register', user)
			.then(res => {
				dispatch(requestRegisterUserSuccess());
				resolve();
			})
			.catch(err => {
				dispatch(requestLoginUserError(err.response.data));
				resolve();
			});
		}, 1500);
	});
}

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch(setCurrentUser({}));
}