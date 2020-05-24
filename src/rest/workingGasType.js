import request from '../utiles/request';

export function getAll(){
	return request.get('/coatings/working-gas', {boolAll: true});
}