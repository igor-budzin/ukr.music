import axios from 'axios';
import { API_URL } from '../../global.config';

class API {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL || '/',
      timeout: 10000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json'
    });
  }

  request = ({ path, data, method, handleSuccess, handleError }) => {
    let requestPromise = null;

    if (path === undefined || typeof path !== 'string') {
      throw new Error(errorMessages.type);
    }

    if(!method || method === 'get') {
      requestPromise = this.axiosInstance.request({
        url: path,
        params: data
      });
    }
    else {
      requestPromise = this.axiosInstance.request({
        url: path,
        method,
        data
      });
    }

    if(handleSuccess === undefined) {
      return requestPromise;
    }
    else  {
      requestPromise
        .then(response => {
          if(typeof handleSuccess === 'function') {
            handleSuccess(response.data, response.status);
            return Promise.resolve();
          }
        })
        .catch(error => {
          console.log(error);
          if(typeof handleError === 'function') {
            handleError();
            return Promise.reject(error);
          }
        });
    }
  }

}

export default new API;