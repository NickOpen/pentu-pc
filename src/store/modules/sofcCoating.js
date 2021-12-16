
import {PAGE_SIZE_COUNT} from '../../config/index';
import * as sofcCoatingRestAdapter from '../../rest/sofcCoating';

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
		setPagingSofcCoatingData(state, data){
			console.log(data);
			state.size = data.size;
			state.list = data.data;
		},
		setCoatingSofcCurrentPage(state, page){
			state.page = page;
		},
		setCurrentSofcCoating(state, data){
			state.current = data;
		},
		setCurrentSofcCoatingType(state, type){
			state.type = type;
		},
		setSofcFilters(state, filters){
			state.filter = {...filters}
		}
	},
	actions: {
		async listSofcCoatings({commit}, {name, page, size = PAGE_SIZE_COUNT}){
			let ret = await this.commonActionHandler({
				commit,
				mutation: 'setPagingSofcCoatingData',
				service: sofcCoatingRestAdapter.getPageCoatings,
				payload: {page: page - 1, size, name}
			});

			commit('setCoatingSofcCurrentPage', page);
			commit('setSofcFilters', {name});
			return ret;
		},

		async getSofcCoating({commit}, id){
			let ret = await this.commonActionHandler({
				commit,
				mutation: 'setCurrentSofcCoating',
				service: sofcCoatingRestAdapter.get,
				payload: id
			});

			return ret;
		},

		async addSofcCoating({state}, payload){
			let ret = await this.commonActionHandler({
				service: sofcCoatingRestAdapter.add,
				payload: payload
			});

			this.dispatch('listSofcCoatings', {
				page: state.page, type: payload.type, name: state.filter.name});

			return ret;
		},

		async updateSofcCoating({state}, payload){
			let ret = await this.commonActionHandler({
				service: sofcCoatingRestAdapter.edit,
				payload: payload
			});

			this.dispatch('listSofcCoatings', {page: state.page, type: payload.type, name: state.filter.name});

			return ret;
		},

		async deleteSofcCoating({state}, id){
			let resp = await sofcCoatingRestAdapter.del(id);
			if(resp.status === 0){
				this.dispatch('listSofcCoatings', {page: state.page, type: state.type, name: state.filter.name});
			}
		}
	}
}