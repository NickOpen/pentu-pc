import Vue from 'vue'
import axios from 'axios';
import {Message} from 'element-ui';
import qs from 'qs';
import {ACCESS_TOKEN, TOKEN_EXPIRED_TIME, REST_API_PREFIX_PRODUCT} from "../config/sysConstants";
import moment from "moment";

let mode = process.env.NODE_ENV;
if(mode === 'product'){
	axios.defaults.baseURL = REST_API_PREFIX_PRODUCT;
}else{
	axios.defaults.baseURL = '/pentu/api';
}

axios.defaults.timeout = 6000;

//create axios
const request = axios.create({})


const errHandler = (error) => {
    if(error.response){
				const data = error.response.data;
				if(data && data.status !== 200){
					Message({
						message: `${data.message || '服务器端错误'}`,
						type: 'error'
					});
				}
    }
    return Promise.reject(error)
};


//检查token是否将要过期
function isTokenAboutExpire(){
	let expiredTime = moment(Vue.ls.get(TOKEN_EXPIRED_TIME))
	let diff = expiredTime.diff(moment(), 'seconds');
	return diff< 30 * 60;
}


//request interceptor
axios.interceptors.request.use(config => {

    const token = Vue.ls.get(ACCESS_TOKEN)
    if(token){
        config.headers[ 'Authorization' ] = "Bearer " + token;
			if(isTokenAboutExpire()){
				//store.dispatch('refreshToken');
			}
    }
    return config
}, errHandler);

//response interceptor
axios.interceptors.response.use(response => {
    if(response.data && response.data.status === 401){
			Message({
				message: '没有权限',
				type: 'error'
			});
    }else if(response.data && response.data.status === 403){
			Message({
				message: 'API没有权限',
				type: 'error'
			});
		}

    return response.data;
}, errHandler);

request.post =  function (url,params,baseUrl) {
    if(baseUrl){
        return axios.post(url, params,baseUrl)
    }else{
        return axios.post(url, params)
    }

}


request.get = function (url, params) {
    return axios.get(url, {params});
};

request.delete = function (url,params) {
    return axios.delete(url, {params});
};



request.put = function (url, params,query) {

    if(query){
        url = url + "?" + qs.stringify(query);
    }
    return axios.put(url, params);
}


export default request;