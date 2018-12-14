import { 
	REQUEST_UPLOAD_MUSIC,
	REQUEST_UPLOAD_MUSIC_SUCCESS,
	REQUEST_UPLOAD_MUSIC_ERROR,
} from '../../redux/consts';

const initialState = {
	isUploading: false
};

export default function uploadMusicReducer(state = initialState, action) {
	switch(action.type) {
		case REQUEST_UPLOAD_MUSIC:
			return Object.assign({}, state, { isUploading: true });

		case REQUEST_UPLOAD_MUSIC_SUCCESS:
			return Object.assign({}, state, { isUploading: false });

		case REQUEST_UPLOAD_MUSIC_ERROR:
			return Object.assign({}, state, { isUploading: false });

		default:
			return state;
	}
}

