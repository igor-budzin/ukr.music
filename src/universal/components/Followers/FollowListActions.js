import axios from 'axios';
import { API_URL } from '../../../global.config';

import { 
	REQUEST_GET_FOLLOWS,
	REQUEST_GET_FOLLOWS_SUCCESS,
	REQUEST_GET_FOLLOWS_ERROR,
	REQUEST_FOLLOW_USER,
	REQUEST_FOLLOW_USER_SUCCESS,
	REQUEST_FOLLOW_USER_ERROR
} from '../../redux/consts';

const axiosInstance = axios.create({
	baseURL: `${API_URL}/`,
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

export function getFollows(name) {
	return (dispatch) => {
		dispatch(requestGetFollowsAction());

		axiosInstance.get('getUserFollows/' + name)
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

export function followUser(userId, followId) {
	return (dispatch) => {
		dispatch({ type: REQUEST_FOLLOW_USER });

		axiosInstance.get(`followUser/${userId}/${followId}`)
		.then((response) => {
			console.log('follow user response')
			if(response.status === 200) {
				dispatch({ type: REQUEST_FOLLOW_USER_SUCCESS });
			}
			else {
				dispatch({ type: REQUEST_FOLLOW_USER_ERROR });
			}
		})
		.catch((error) => {
			dispatch({ type: REQUEST_FOLLOW_USER_ERROR });
			console.log(error);
		});
	}
}