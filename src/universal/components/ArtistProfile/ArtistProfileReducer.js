import { 
	REQUEST_GET_ARTIST_DATA,
	REQUEST_GET_ARTIST_DATA_SUCCESS,
	REQUEST_GET_ARTIST_DATA_ERROR
} from '../../redux/consts';

const initialState = {
	name: null,
	coverLink: null,
	audioCount: 0,
	followersCount: 0
};

export default function ArtistProfileReducer(state = initialState, action) {
	switch(action.type) {
		case REQUEST_GET_ARTIST_DATA:
			return state;

		case REQUEST_GET_ARTIST_DATA_SUCCESS:
			return Object.assign({}, state, {...action.payload});

		case REQUEST_GET_ARTIST_DATA_ERROR:
			return state ;

		default:
			return state;
	}
}


