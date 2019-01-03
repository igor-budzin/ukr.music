import axios from 'axios';

import { 
	REQUEST_GET_FOLLOWS,
	REQUEST_GET_FOLLOWS_SUCCESS,
	REQUEST_GET_FOLLOWS_ERROR,
	REQUEST_FOLLOW_USER,
	REQUEST_FOLLOW_USER_SUCCESS,
	REQUEST_FOLLOW_USER_ERROR
} from '../../redux/consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});

const requestGetFollowsAction = () => ({
	type: REQUEST_GET_FOLLOWS
});

const requestGetFollowsSuccessAction = (data) => ({
	type: REQUEST_GET_FOLLOWS_SUCCESS,
	follows: data
});

const requestGetFollowsErrorAction = () => ({
	type: REQUEST_GET_FOLLOWS_ERROR
});

export function getFollows(userId) {
	return (dispatch) => {
		dispatch(requestGetFollowsAction());

		axiosInstance.get('getUserFollows/' + userId)
		.then((response) => {
			if(response.status === 200) {
				dispatch(requestGetFollowsSuccessAction(response.data));
			}
			else {
				dispatch(requestGetFollowsErrorAction());
			}
		})
		.catch((error) => {
			dispatch(requestGetFollowsErrorAction());
			console.log(error);
		});
	}
}

const requestFollowUser = () => ({
	type: REQUEST_FOLLOW_USER
});

const requestFollowUserSuccessAction = () => ({
	type: REQUEST_FOLLOW_USER_SUCCESS
});

const requestFollowUserErrorAction = () => ({
	type: REQUEST_FOLLOW_USER_ERROR
});

export function followUser(userId, followId) {
	return (dispatch) => {
		dispatch(requestFollowUser());

		axiosInstance.get(`followUser/${userId}/${followId}`)
		.then((response) => {
			if(response.status === 200) {
				dispatch(requestFollowUserSuccessAction());
			}
			else {
				dispatch(requestFollowUserErrorAction());
			}
		})
		.catch((error) => {
			dispatch(requestFollowUserErrorAction());
			console.log(error);
		});
	}
}