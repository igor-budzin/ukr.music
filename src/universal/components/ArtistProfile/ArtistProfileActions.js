

export function getArtistData(id) {
  return {
    typePrefix: "GET_ARTIST_DATA",
    endpoint: `artist/${id}`,
    method: 'get',
    data: {}
  }
}

export function getArtistAudio(id) {
  return {
    typePrefix: "GET_ARTIST_AUDIO_LIST",
    endpoint: `artist/audio/${id}`,
    method: 'get',
    data: {}
  }
}