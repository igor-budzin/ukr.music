export function getMusicList({ userLogin = null, limit = 30, page = 1, sortBy = null, callback }) {
  return {
    typePrefix: 'REQUEST_GET_MUSIC_LIST',
    endpoint: 'getMusicList',
    data: { userLogin, limit, page, sortBy },
    handleSuccess: response => {
      if(typeof callback === 'function') callback(response);
    },
    handleError: error => {
      console.log('handleError');
      console.log(error);
    }
  }
}