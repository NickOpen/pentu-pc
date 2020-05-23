
import {LOGIN_API_PREFIX_DEV, LOGIN_API_PREFIX_PRODUCT} from '../config/sysConstants';

export function login(username, password) {
	let mode = process.env.NODE_ENV;
	let baseURL = LOGIN_API_PREFIX_DEV;

	if(mode === 'product'){
		baseURL = LOGIN_API_PREFIX_PRODUCT;
	}

	return fetch(baseURL, {
		method: "POST",
		body: JSON.stringify({username, password}),
	}).then(res => {
		return res.json();
	});
}