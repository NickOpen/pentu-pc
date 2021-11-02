
import {PAGE_SIZE_COUNT} from '../../config/index';
import * as coatingRestAdapter from '../../rest/coatings';

export default {
	state: {
		type: "",
		page: 1,
		size: 0,
		list: [],
		current: null
	},
	mutations: {
		setPagingCoatingData(state, data){
			state.size = data.size;
			state.list = data.data;
		},
		setCoatingCurrentPage(state, page){
			state.page = page;
		},
		setCurrentCoating(state, data){
			state.current = data;
		},
		setCurrentCoatingType(state, type){
			state.type = type;
		}
	},
	actions: {
		async listCoatings({commit}, {type, name, page, size = PAGE_SIZE_COUNT}){
			let ret = await this.commonActionHandler({
				commit,
				mutation: 'setPagingCoatingData',
				service: coatingRestAdapter.getPageCoatings,
				payload: {type, name, page: page - 1, size}
			});

			commit('setCurrentCoatingType', type);
			commit('setCoatingCurrentPage', page);

			return ret;
		},

		async getCoating({commit}, id){
			let ret = await this.commonActionHandler({
				commit,
				mutation: 'setCurrentCoating',
				service: coatingRestAdapter.get,
				payload: id
			});

			return ret;
		},

		async addCoating({state}, payload){
			let ret = await this.commonActionHandler({
				service: coatingRestAdapter.add,
				payload: payload
			});

			this.dispatch('listCoatings', {page: state.page, type: payload.type});

			return ret;
		},

		async updateCoating({state}, payload){
			let ret = await this.commonActionHandler({
				service: coatingRestAdapter.edit,
				payload: payload
			});

			this.dispatch('listCoatings', {page: state.page, type: payload.type});

			return ret;
		},

		async deleteCoating({state}, id){
			let resp = await coatingRestAdapter.del(id);
			if(resp.status === 0){
				this.dispatch('listCoatings', {page: state.page, type: state.type});
			}
		}
	}
}