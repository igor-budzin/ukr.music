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

const requestGetUserDataAction = () => ({
	type: REQUEST_GET_USERDATA
});

const requestGetUserDataSuccessAction = data => ({
	type: REQUEST_GET_USERDATA_SUCCESS,
	payload: data
});

const requestGetUserDataErrorAction = () => ({
	type: REQUEST_GET_USERDATA_ERROR
});

export function getVisibleUserData(currentUserID, visibleUserID) {
	return dispatch => {
		dispatch(requestGetUserDataAction());

		return new Promise((resolve, reject) => {
			axiosInstance.post('getUserData', {
				currentUserID: currentUserID,
				userID: visibleUserID
			})
			.then(response => {
				if(response.status === 200) {
					dispatch(requestGetUserDataSuccessAction(response.data));
					resolve();
				}
				else {
					dispatch(requestGetUserDataErrorAction());
					reject();
				}
			})
			.catch(error => {
				dispatch(requestGetUserDataErrorAction());
				console.log(error);
				reject();
			});
		});

	}
}