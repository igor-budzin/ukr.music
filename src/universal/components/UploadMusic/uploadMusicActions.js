import axios from 'axios';

import { 
	REQUEST_UPLOAD_MUSIC,
	REQUEST_UPLOAD_MUSIC_SUCCESS,
	REQUEST_UPLOAD_MUSIC_ERROR,
} from 'universal/redux/consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});

function requestUploadMusicAction() {
	return {
		type: REQUEST_UPLOAD_MUSIC
	}
}

function requestUploadMusicSuccessAction() {
	return {
		type: REQUEST_UPLOAD_MUSIC_SUCCESS
	}
}

function requestUploadMusicErrorAction() {
	return {
		type: REQUEST_UPLOAD_MUSIC_ERROR
	}
}

export function requestUploadMusic(data, callback) {
	return dispatch => {
		dispatch(requestUploadMusicAction());

		axiosInstance.post('upload-music', data)
		.then((response) => {
			if(response.status === 200) {
				dispatch(requestUploadMusicSuccessAction());
				callback({status: true});
			}
			else {
				dispatch(requestUploadMusicErrorAction());
				callback({status: false});
			}
			
		})
		.catch((error) => {
			dispatch(requestUploadMusicErrorAction());
			console.log(error);
			callback({status: false});
		});
	}
}







// export function requestUploadMusic(data) {
// 	return (dispatch) => {
// 		dispatch(requestGetListMusic());

// 		axiosInstance.get('get-music')
// 		.then((response) => {
// 			if(response.status === 200) {
// 				dispatch(requestGetMusicListSuccess(response.data));
// 			}
// 			else {
// 				dispatch(requestGetMusicListError());
// 			}
// 		})
// 		.catch((error) => {
// 			dispatch(requestGetMusicListError());
// 			console.log(error);
// 		});
// 	}
// }