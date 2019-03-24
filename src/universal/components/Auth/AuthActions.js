import axios from 'axios';
import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../../../global.config';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  REQUEST_LOGIN_USER,
  REQUEST_LOGIN_USER_SUCCESS,
  REQUEST_LOGIN_USER_ERROR,
  REQUEST_REGISTER_USER,
  REQUEST_REGISTER_USER_SUCCESS,
  REQUEST_REGISTER_USER_ERROR
} from '../../redux/consts';

const axiosInstance = axios.create({
  baseURL: `${API_URL}/`,
  headers: {'Access-Control-Allow-Origin': '*'}
});

function requestLoginUser() {
  return {
    type: REQUEST_LOGIN_USER
  }
}

function requestLoginUserSuccess() {
  return {
    type: REQUEST_LOGIN_USER_SUCCESS
  }
}

function requestLoginUserError(err) {
  return {
    type: REQUEST_LOGIN_USER_ERROR,
    payload: err
  }
}

export const loginUser = user => dispatch => {
  return new Promise((resolve, reject) => {
    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event)  {
      const { accessToken } = event.data;
      console.log(event.data)
      if(!accessToken) reject();

      localStorage.setItem('jwtToken', `Bearer ${accessToken}`);
      setAuthToken(accessToken);
      const decoded = jwt_decode(accessToken);

      dispatch(setCurrentUser(event.data.user));
      dispatch(requestLoginUserSuccess());

      resolve();
    }

    dispatch(requestLoginUser());
    const width = 800;
    const height = 800;
    const left = Math.floor((window.innerWidth / 2) - (width / 2));
    const top = Math.floor((window.innerHeight / 2) - (height / 2));

    window.open(
      `${API_URL}/auth/google`,
      "mywindow",
      `status,scrollbars,width=${width},height=${height},top=${top},left=${left}`
    );
  });
}

function requestRegisterUser() {
  return {
    type: REQUEST_REGISTER_USER
  }
}

function requestRegisterUserSuccess() {
  return {
    type: REQUEST_REGISTER_USER_SUCCESS
  }
}

function requestRegisterUserError(err) {
  return {
    type: REQUEST_REGISTER_USER_ERROR,
    payload: err
  }
}


export const registerUser = (user) => dispatch => {
  dispatch(requestRegisterUser());

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axiosInstance.post('/register', user)
      .then(res => {
        dispatch(requestRegisterUserSuccess());
        resolve();
      })
      .catch(err => {
        dispatch(requestLoginUserError(err.response.data));
        resolve();
      });
    }, 1500);
  });
}

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}