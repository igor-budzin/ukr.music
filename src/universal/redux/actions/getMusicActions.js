import axios from 'axios';

import { 
	REQUEST_GET_MUSIC_LIST,
	REQUEST_GET_MUSIC_LIST_SUCCESS,
	REQUEST_GET_MUSIC_LIST_ERROR
} from '../consts';


const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});


export function requestGetMusic() {
	return {
		type: REQUEST_GET_MUSIC_LIST
	}
}

export function requestGetMusicSuccess(music) {
	return {
		type: REQUEST_GET_MUSIC_LIST_SUCCESS,
		music
	}
}

export function requestGetMusicError() {
	return {
		type: REQUEST_GET_MUSIC_LIST_ERROR
	}
}

export function getMusicAction() {
	return (dispatch) => {
		dispatch(requestGetMusic());

		axiosInstance.get('get-music')
		.then((response) => {
			if(response.status === 200) {
				dispatch(requestGetMusicSuccess(response.data));
			}
			else {
				dispatch(requestGetMusicError());
			}
		})
		.catch((error) => {
			dispatch(requestGetMusicError());
			console.log(error);
		});
	}
}