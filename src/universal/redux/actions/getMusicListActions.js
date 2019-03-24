import axios from 'axios';
import { API_URL } from '../../../global.config';

import { 
	REQUEST_GET_MUSIC_LIST,
	REQUEST_GET_MUSIC_LIST_SUCCESS,
	REQUEST_GET_MUSIC_LIST_ERROR,
} from '../consts';

const axiosInstance = axios.create({
	baseURL: `${API_URL}/`,
	headers: {'Access-Control-Allow-Origin': '*'}
});

export function requestGetListMusic() {
	return {
		type: REQUEST_GET_MUSIC_LIST
	}
}

export function requestGetMusicListSuccess(data, page) {
	data.page = page;
	
	return {
		type: REQUEST_GET_MUSIC_LIST_SUCCESS,
		payload: data
	}
}

export function requestGetMusicListError() {
	return {
		type: REQUEST_GET_MUSIC_LIST_ERROR
	}
}

export function getMusicListAction(login, page) {
	return (dispatch) => {
		dispatch(requestGetListMusic());

		return new Promise((resolve, reject) => {
			axiosInstance.get(`getMusic/${login}/${page}`)
			.then((response) => {
				if(response.status === 200) {
					dispatch(requestGetMusicListSuccess(response.data, page));
					resolve();
				}
				else {
					dispatch(requestGetMusicListError());
					reject();
				}
			})
			.catch((error) => {
				dispatch(requestGetMusicListError());
				console.log(error);
				reject();
			});
		})
	}
}