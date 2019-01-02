import axios from 'axios';

import { 
	REQUEST_GET_FOLLOWS,
	REQUEST_GET_FOLLOWS_SUCCESS,
	REQUEST_GET_FOLLOWS_ERROR,
} from '../../redux/consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});

export function requestGetFollowsAction() {
	return {
		type: REQUEST_GET_FOLLOWS
	}
}

export function requestGetFollowsSuccessAction(data) {
	return {
		type: REQUEST_GET_FOLLOWS_SUCCESS,
		follows: data
	}
}

export function requestGetFollowsErrorAction() {
	return {
		type: REQUEST_GET_FOLLOWS_ERROR
	}
}

export function getFollows(userId, callback) {
	return (dispatch) => {
		dispatch(requestGetFollowsAction());

		axiosInstance.get('getUserFollows/' + userId)
		.then((response) => {
			if(response.status === 200) {
				dispatch(requestGetFollowsSuccessAction(response.data));
			}
			else {
				dispatch(requestGetFollowsErrorAction());
				callback({status: false});
			}
		})
		.catch((error) => {
			dispatch(requestGetFollowsErrorAction());
			console.log(error);
			callback({status: false});
		});
	}
}