import * as devicesRestAdapter from '../../rest/coatingDevices';

export default {
	state: {
		all: []
	},
	mutations: {
		setAllDevices(state, data){
			state.all = data;
		}
	},
	actions: {
		async getAllCoatingDevices({commit}){
			return await this.commonActionHandler({
				commit,
				mutation: 'setAllDevices',
				service: devicesRestAdapter.getAll,
				payload: {}
			});
		},

		async addCoatingDevice(_, {name}){
			let ret = await this.commonActionHandler({
				service: devicesRestAdapter.add,
				payload: name
			});

			this.dispatch('getAllCoatingDevices');

			return ret;
		},

		async deleteCoatingDevice(_, id){
			let ret = await this.commonActionHandler({
				service: devicesRestAdapter.del,
				payload: id
			});

			this.dispatch('getAllCoatingDevices');

			return ret;
		},

		async updateCoatingDevice(_, {id, name}){
			let ret = await this.commonActionHandler({
				service: devicesRestAdapter.update,
				payload: {id, name}
			});

			this.dispatch('getAllCoatingDevices');

			return ret;
		}
	}
}