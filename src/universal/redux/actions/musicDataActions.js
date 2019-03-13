import axios from 'axios';

export function getMusicList({ userName = null, limit = 30, page = 1, sortBy = null }) {
  return {
    typePrefix: 'REQUEST_GET_MUSIC_LIST',
    endpoint: 'getMusicList',
    data: { userName, limit, page, sortBy },
    handleSuccess: response => {
      console.log('handleSuccess', response);
    },
    handleError: error => {
      console.log('handleError');
      console.log(error);
    }
  }
}