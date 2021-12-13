
import {PAGE_SIZE_COUNT} from '../../config/index';
import * as coatingRestAdapter from '../../rest/coatings';

export default {
	state: {
		type: "",
		page: 1,
		size: 0,
		list: [],
		filter: {
			name: null,
			platingType: null
		},
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
		},
		setFilters(state, filters){
			state.filter = {...filters}
		}
	},
	actions: {
		async listCoatings({commit, state}, {type, name, platingType, page, size = PAGE_SIZE_COUNT}){
			let ret = await this.commonActionHandler({
				commit,
				mutation: 'setPagingCoatingData',
				service: coatingRestAdapter.getPageCoatings,
				payload: {type, page: page - 1, size, ...state.filter, name, platingType}
			});

			commit('setCurrentCoatingType', type);
			commit('setCoatingCurrentPage', page);
			commit('setFilters', {name, platingType});
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

			this.dispatch('listCoatings', {
				page: state.page, type: payload.type, name: state.filter.name, platingType: state.filter.platingType});

			return ret;
		},

		async updateCoating({state}, payload){
			let ret = await this.commonActionHandler({
				service: coatingRestAdapter.edit,
				payload: payload
			});

			this.dispatch('listCoatings', {page: state.page, type: payload.type, name: state.filter.name, platingType: state.filter.platingType});

			return ret;
		},

		async deleteCoating({state}, id){
			let resp = await coatingRestAdapter.del(id);
			if(resp.status === 0){
				this.dispatch('listCoatings', {page: state.page, type: state.type, name: state.filter.name, platingType: state.filter.platingType});
			}
		}
	}
}