export function getPlaylist({ playlistId, limit = 30, page = 1, sortBy = null, callback }) {
  return {
    typePrefix: 'REQUEST_GET_PLAYLIST',
    endpoint: `playlist/${playlistId}`,
    data: { limit, page, sortBy },
    handleSuccess: response => {
      if(typeof callback === 'function') callback(response.data);
    },
    handleError: error => {
      console.log('handleError');
      console.log(error);
    }
  }
}