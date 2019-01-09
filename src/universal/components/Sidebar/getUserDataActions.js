import axios from 'axios';

import { 
	REQUEST_GET_FOLLOWS

} from '../../redux/consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});

const requestGetUserDataAction = () => ({
	type: 'REQUEST_GET_USERDATA'
});

const requestGetUserDataSuccessAction = data => ({
	type: 'REQUEST_GET_USERDATA_SUCCESS',
	follows: data
});

const requestGetUserDataErrorAction = () => ({
	type: 'REQUEST_GET_USERDATA_ERROR'
});

export function getUserData(currentUserID, visibleUserID) {
	return dispatch => {
		dispatch(requestGetUserDataAction());

		axios.post('https://localhost:8080/api/getUserData', {
			currentUserID: currentUserID,
			userID: visibleUserID
		})
		.then(response => {
			if(response.status === 200) {
				dispatch(requestGetUserDataSuccessAction(response.data));
			}
			else {
				dispatch(requestGetUserDataErrorAction());
			}
		})
		.catch(error => {
			dispatch(requestGetUserDataErrorAction());
			console.log(error);
		});
	}
}