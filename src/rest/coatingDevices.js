import request from '../utiles/request';

export function getAll(){
	return request.get('/coatings/devices', {boolAll: true});
}

export function add(name){
	return request.post('/coatings/devices', {name});
}

export function update({id, name}){
	return request.put('/coatings/devices', {id, name});
}

export function del(id){
	return request.delete(`/coatings/devices?id=${id}`);
}