import { isFSA } from 'flux-standard-action';
import axios from 'axios';

const errorMessages = {
	callAPI: 'Expected callAPI to be a function.',
	formatData: 'Expected formatData to be a function.',
	formatDataReturn: 'Expected formatData to return an object.',
	options: 'Expected each suffix to be a string',
	payload: 'Expected payload to be an object',
	shouldCallAPI: 'Expected shouldCallAPI to be a function.',
	type: 'Expected type to be a string.',
	types: 'Expected an array of three string types.'
}

function validateInput(
	{
		typePrefix,
		types,
		formatData = res => res,
		payload = {},
	},
	options,
) {
	if (
		options === undefined
		&& (!Array.isArray(types)
			|| types.length !== 3
			|| !types.every(t => typeof t === 'string'))
	) {
		throw new Error(errorMessages.types);
	}
	if (options !== undefined && typeof typePrefix !== 'string') {
		throw new Error(errorMessages.type);
	}
	if (typeof payload !== 'object') {
		throw new Error(errorMessages.payload);
	}
}

function validateOptions({ pendingSuffix, successSuffix, errorSuffix }) {
	if (
		typeof pendingSuffix !== 'string'
		|| typeof successSuffix !== 'string'
		|| typeof errorSuffix !== 'string'
	)
		throw new Error(errorMessages.options);
}

function optionsAreValid(typePrefix, types, options) {
	if (options === undefined && !types) return false;
	if (options === undefined && types) return true;
	if (options !== undefined && !typePrefix) return false;
	if (options !== undefined && typePrefix) {
		validateOptions(options);
		return true;
	}
	return false;
}

function getActionTypes(typePrefix, types, options) {
	if (options !== undefined) {
		return [
			`${typePrefix}${options.pendingSuffix}`,
			`${typePrefix}${options.successSuffix}`,
			`${typePrefix}${options.errorSuffix}`,
		];
	}
	return types;
}

function createRequestMiddleware(options, settings) {
	return ({ dispatch, getState }) => next => action => {
		const {
			typePrefix,
			types,
			endpoint,
			payload = {},
			method = 'get',
			data,
			handleSuccess,
			handleError
		} = action;

		const isFSACompliant
			= options && options.isFSACompliant === false ? false : true;

		if (!optionsAreValid(typePrefix, types, options)) return next(action);

		validateInput(action, options);

		const [pendingType, successType, errorType] = getActionTypes(
			typePrefix,
			types,
			options,
		);

		const pendingAction = isFSACompliant
			? { payload, type: pendingType }
			: { ...payload, type: pendingType };

		if (isFSACompliant && !isFSA(pendingAction)) next(action);
		else dispatch(pendingAction);

		let request = null;

		if(method === 'get') {
			request = axios.get(settings.baseUrl + endpoint, {
				method: method,
				params: data,
				header: settings.header
			});
		}
		else {
			request = axios({
				method: method,
				url: settings.baseUrl + endpoint,
				header: settings.header,
				data: data
			})
		}

		request.then(response => {

			const successAction = isFSACompliant
				? {
						type: successType,
						payload: {
							...payload,
							...response.data
						}
					}
				: {
						type: successType
					};

			if (isFSACompliant && !isFSA(successAction)) next(action);
			else {
				if(typeof handleSuccess === 'function') handleSuccess();
				dispatch(successAction);
			}

			return Promise.resolve(getState());
		})
		.catch(error => {
			const errorAction = isFSACompliant
				? {
						payload: error,
						error: true,
						type: errorType
					}
				: {
						message: error.message,
						error: true,
						type: errorType
					};

			if (isFSACompliant && !isFSA(errorAction)) next(action);
			else {
				if(typeof handleError === 'function') handleError(error);
				dispatch(errorAction)
			}

			return Promise.reject(error);
		});
	};
}

const requestMiddleware = createRequestMiddleware();
requestMiddleware.withOptions = createRequestMiddleware;

export default requestMiddleware;