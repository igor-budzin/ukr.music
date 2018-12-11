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

export function getMusicListAction() {
	return (dispatch) => {
		dispatch(requestGetListMusic());

		axiosInstance.get('get-music')
		.then((response) => {
			if(response.status === 200) {
				dispatch(requestGetMusicListSuccess(response.data));
			}
			else {
				dispatch(requestGetMusicListError());
			}
		})
		.catch((error) => {
			dispatch(requestGetMusicListError());
			console.log(error);
		});
	}
}