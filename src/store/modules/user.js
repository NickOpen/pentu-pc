
import Vue from 'vue';
import * as userRestAdapter from '../../rest/user';
import {ACCESS_TOKEN} from '../../config/sysConstants';

export default{
	state: {
		test: ""
	},
	mutations: {
		setTest(state, data){
			state.test = data;
		}
	},
	actions: {
		async login(_, {username, password}) {
			//let ret = await this.commonActionHandler({service: userRestAdapter.login, payload: {username, password});
			let resp = await userRestAdapter.login(username, password);
			let ret = resp.status === 0;
			if(ret){
				Vue.ls.set(ACCESS_TOKEN,"")
				console.log(resp);
			}

			return ret;
		},
	}
}