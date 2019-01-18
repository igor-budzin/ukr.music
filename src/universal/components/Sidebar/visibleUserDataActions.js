import axios from 'axios';

import {
	REQUEST_GET_USERDATA,
	REQUEST_GET_USERDATA_SUCCESS,
	REQUEST_GET_USERDATA_ERROR
} from '../../redux/consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: { 'Access-Control-Allow-Origin': '*' }
});

export function getVisibleUserData(currentUserName, visibleUserName) {
	return dispatch => {
		dispatch({ type: REQUEST_GET_USERDATA });

		return new Promise((resolve, reject) => {
			axiosInstance.post('getUserData', {
				currentUserName: currentUserName,
				userName: visibleUserName
			})
			.then(response => {response.data
				dispatch({
					type: REQUEST_GET_USERDATA_SUCCESS,
					payload: response.data
				});
				resolve();
			})
			.catch(error => {
				dispatch({ type: REQUEST_GET_USERDATA_ERROR });
				console.log(error);
				reject();
			});
		});

	}
}