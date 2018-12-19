const initialState = {
	status: null,
	userId: null,
	username: "",
	isLogged: false
}

export default function AuthReducer(state = initialState, action) {
	switch(action.type) {
		case 'LOGIN_REQUEST':
			return {
				status: "pending",
				isLogged: false
			}

		case 'LOGIN_SUCCESS':
			return {
				status: 'fulfilled',
				isLogged: true,
				username: action.response.username,
				userId: action.response.id
			}

		case 'LOGIN_FAILURE':
			return {
				status: 'rejected',
				isLogged: false,
				errors: action.error.response.body
			}

		case 'LOGIN_CLIENT_FAILURE':
			return {
				status: 'rejected',
				isLogged: false,
				errors: action.errors
			}

		case 'LOGOUT':
			return initialState

		default:
			return state
	}
}