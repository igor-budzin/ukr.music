

export function getArtistData(id) {
  return {
    typePrefix: "GET_ARTIST_DATA",
    endpoint: `artist/${id}`,
    method: 'get',
    data: {}
  }
}

export function getArtistAudioPart(alias, page = 1, sortBy = 'listenCount') {
  return {
    typePrefix: "GET_ARTIST_AUDIO_LIST_PART",
    endpoint: `artist/audio/${alias}`,
    method: 'get',
    data: {
      page,
      sortBy,
      limit: 8
    }
  }
}

export function getArtistAudio({ alias, callback, page = 1 }) {
  return {
    typePrefix: "GET_ARTIST_AUDIO_LIST",
    endpoint: `artist/audio/${alias}`,
    method: 'get',
    data: {
      params: {
        page
      }
    },
    handleSuccess: response => {
      if(typeof callback === 'function') callback();
    }
  }
}