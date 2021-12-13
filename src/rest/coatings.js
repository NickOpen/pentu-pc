import request from '../utiles/request';

export function getPageCoatings({page, size, type, name, platingType}){
	return request.get('/coatings', {page, size, type, name, platingType});
}

export function get(id){
	return request.get(`/coatings/${id}`);
}

export function add(payload){
	return request.post(`/coatings`, payload);
}

export function edit(payload){
	return request.put('/coatings', payload);
}

export function del(id){
	return request.delete(`/coatings?id=${id}`);
}