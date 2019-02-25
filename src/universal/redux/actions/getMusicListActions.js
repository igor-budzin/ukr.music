import axios from 'axios';

import { 
	REQUEST_GET_MUSIC_LIST,
	REQUEST_GET_MUSIC_LIST_SUCCESS,
	REQUEST_GET_MUSIC_LIST_ERROR,
} from '../consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});

export function requestGetListMusic() {
	return {
		type: REQUEST_GET_MUSIC_LIST
	}
}

export function requestGetMusicListSuccess(music) {
	return {
		type: REQUEST_GET_MUSIC_LIST_SUCCESS,
		music
	}
}

export function requestGetMusicListError() {
	return {
		type: REQUEST_GET_MUSIC_LIST_ERROR
	}
}

export function getMusicListAction(name, offset) {
	return (dispatch) => {
		dispatch(requestGetListMusic());

		return new Promise((resolve, reject) => {
			axiosInstance.get(`getMusic/${name}/${offset}`)
			.then((response) => {
				if(response.status === 200) {
					dispatch(requestGetMusicListSuccess(response.data));
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