import axios from 'axios';
import { API_URL } from '../../../global.config';

import {
  REQUEST_GET_USERDATA,
  REQUEST_GET_USERDATA_SUCCESS,
  REQUEST_GET_USERDATA_ERROR
} from '../../redux/consts';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/`,
  headers: { 'Access-Control-Allow-Origin': '*' }
});

export function getVisibleUserData(currentUserId, visibleUserId) {
  return dispatch => {
    dispatch({ type: REQUEST_GET_USERDATA });

    return new Promise((resolve, reject) => {
      axiosInstance.post('getUserData', {
        currentUserId,
        userId: visibleUserId
      })
      .then(response => {
        dispatch({
          type: REQUEST_GET_USERDATA_SUCCESS,
          payload: response.data
        });
        resolve();
      })
      .catch(error => {
        dispatch({ type: REQUEST_GET_USERDATA_ERROR });
        console.log(error);
        reject();
      });
    });

  }
}

export function getArtistsByUser(id) {
  return {
    typePrefix: "GET_ARTIST_LIST_BY_USER",
    endpoint: `artist/user/${id}`,
    method: 'get',
    data: {}
  }
}