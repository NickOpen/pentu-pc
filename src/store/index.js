import Vue from 'vue';
import Vuex from 'vuex';
import {Message} from 'element-ui';
/**
 * register Vue's state management lib.
 */
Vue.use(Vuex);


// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
// file name as module name
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath);
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules
})

/**
 *异步Action处理流程
 * @param {*} param0 
 */

store.commonActionHandler = async ({commit, mutation, service, payload}) => {
	try{
		let response = await service(payload);
		if(response.status === 0){
			if(commit && mutation){
				commit(mutation, response.data);
			}
			return response.data;
		}else{
			Message({
				title: response.message
			});

			return Promise.reject(new Error(response));
		}
	}catch(err){
		Message({
			title: JSON.stringify(err)
		});
		return Promise.reject(new Error());
	}
}


export {store};