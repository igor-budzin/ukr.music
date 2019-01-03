	import { 
	REQUEST_GET_FOLLOWS,
	REQUEST_GET_FOLLOWS_SUCCESS,
	REQUEST_GET_FOLLOWS_ERROR
} from '../../redux/consts';

const initialState = {
	follows: []
};

export default function followsReducer(state = initialState, action) {
	const {follows}  = action;
	switch(action.type) {
		case REQUEST_GET_FOLLOWS:
			return {
				follows: []
			};
		case REQUEST_GET_FOLLOWS_SUCCESS:
			return {
				follows
			};
		case REQUEST_GET_FOLLOWS_ERROR:
			return {
				state
			};
		default:
			return state;
	}
}

