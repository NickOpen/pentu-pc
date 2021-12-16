import request from '../utiles/request';

export function getPageCoatings({page, size, name}){
	return request.get('/sofc_coating', {page, size, materialName: name});
}

export function get(id){
	return request.get(`/sofc_coating/${id}`);
}

export function add(payload){
	return request.post(`/sofc_coating`, payload);
}

export function edit(payload){
	return request.put('/sofc_coating', payload);
}

export function del(id){
	return request.delete(`/sofc_coating?id=${id}`);
}