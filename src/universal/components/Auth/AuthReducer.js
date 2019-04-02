import {
	SET_CURRENT_USER,
	REQUEST_LOGIN_USER,
	REQUEST_LOGIN_USER_SUCCESS,
	REQUEST_LOGIN_USER_ERROR,
	REQUEST_REGISTER_USER,
	REQUEST_REGISTER_USER_SUCCESS,
	REQUEST_REGISTER_USER_ERROR
} from '../../redux/consts';

import isEmpty from '../../utils/isEmpty';

const initialState = {
	isAuthenticated: false,
	isLoginLoading: false,
	isRegisterLoading: false,
	user: {}
}

export default function AuthReducer(state = initialState, action) {
	switch(action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			}
		case REQUEST_LOGIN_USER:
			return {
				...state,
				isLoginLoading: true
			}
		case REQUEST_LOGIN_USER_SUCCESS:
			return {
				...state,
				isLoginLoading: false
			}
		case REQUEST_LOGIN_USER_ERROR:
			return {
				...state,
				isLoginLoading: false
			}
		default: 
			return state;
	}
}