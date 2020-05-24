import * as workingGasTypeRestAdapter from '../../rest/workingGasType';

export default {
	state: {
		all: []
	},
	mutations: {
		setAllWorkingGasTypes(state, data){
			state.all = data;
		}
	},
	actions: {
		async getAllWorkingGasTypes({commit}){
			return await this.commonActionHandler({
				commit,
				mutation: 'setAllWorkingGasTypes',
				service: workingGasTypeRestAdapter.getAll,
				payload: {}
			});
		}
	}
}