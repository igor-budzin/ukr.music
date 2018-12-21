import axios from 'axios';
import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';

import {GET_ERRORS} from '../../redux/consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});

export const registerUser = (user, history) => dispatch => {
	axiosInstance.post('/register', user)
			.then(res => {
				console.log('success', res);
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				});
			});
}

export const loginUser = (user) => dispatch => {
	axiosInstance.post('/login', user)
			.then(res => {
				const { token } = res.data;
				localStorage.setItem('jwtToken', token);
				setAuthToken(token);
				const decoded = jwt_decode(token);
				dispatch(setCurrentUser(decoded));
			})
			.catch(err => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				});
			});
}

export const setCurrentUser = decoded => {
	return {
		type: consts.SET_CURRENT_USER,
		payload: decoded
	}
}