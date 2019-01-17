import axios from 'axios';

export function getArtistMusicList(userName, limit = 30) {
	return {
		typePrefix: 'GET_MUSIC_LIST',
		endpoint: 'getArtistMusicList',
		data: {
			name: userName,
			limit: limit
		}
	};
}