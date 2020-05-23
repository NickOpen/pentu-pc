
import {PAGE_SIZE_COUNT} from '../../config/index';
import * as coatingRestAdapter from '../../rest/coatings';

export default {
	state: {
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
		}
	},
	actions: {
		async listCoatings({commit}, {name, page, size = PAGE_SIZE_COUNT}){
			let ret = await this.commonActionHandler({
				commit,
				mutation: 'setPagingCoatingData',
				service: coatingRestAdapter.getPageCoatings,
				payload: {name, page: page - 1, size}
			});

			commit('setCoatingCurrentPage', page + 1);

			return ret;
		},

		async getCoating({commit}, id){
			let ret = await this.commonActionHandler({
				commit,
				mutation: 'setCurrentCoating',
				service: coatingRestAdapter.get,
				payload: {id}
			});

			return ret;
		},

		async addCoating({state}, payload){
			let ret = await this.commonActionHandler({
				service: coatingRestAdapter.add,
				payload: payload
			});

			this.dispatch('listCoatings', state.page);

			return ret;
		},

		async updateCoating({state}, payload){
			let ret = await this.commonActionHandler({
				service: coatingRestAdapter.edit,
				payload: payload
			});

			this.dispatch('listCoatings', state.page);

			return ret;
		}
	}
}