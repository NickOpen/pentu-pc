<template>
	<section class="sub-pg coating-deivces">
		<div class="pg-header">
			<el-button size="small" type="primary" class="common-add-btn" @click="addDeviceHandler">新增</el-button>
		</div>
	</section>
</template>

<script>
import {mapActions, mapState} from 'vuex';
export default {
	name: "CoatingDevicesPage",
	data(){
		return {
			editDeviceForm: {
				visible: false,
				value: ""
			},
		}
	},
	computed:{
		...mapState({
			allCoatingDevices: state => state.coatingDevices.all,
		}),
	},
	methods: {
		...mapActions([
			'getAllCoatingDevices',
			'addCoatingDevice',
			'deleteCoatingDevice',
			'updateCoatingDevice'
		]),

		addDeviceHandler(){

		}
	},
	mounted(){
		this.getAllCoatingDevices();
	}
}
</script>

<style>

</style>