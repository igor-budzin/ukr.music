import axios from 'axios';

import { 
	REQUEST_GET_ARTIST_DATA,
	REQUEST_GET_ARTIST_DATA_SUCCESS,
	REQUEST_GET_ARTIST_DATA_ERROR
} from '../../redux/consts';

const axiosInstance = axios.create({
	baseURL: 'https://localhost:8080/api/',
	headers: {'Access-Control-Allow-Origin': '*'}
});

export function getArtistData(artist) {
	return dispatch => {
		dispatch({ type: REQUEST_GET_ARTIST_DATA });

		axiosInstance.get('getArtistData', { params: { artist }})
		.then (response => {
				dispatch({ type: REQUEST_GET_ARTIST_DATA_SUCCESS, payload: response.data });
		})
		.catch(error => {
			dispatch({ type: REQUEST_GET_ARTIST_DATA_ERROR });
			console.log(error);
		});
	}
}

