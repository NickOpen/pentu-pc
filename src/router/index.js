import Vue from 'vue';
import VueRouter from 'vue-router';
import {COATING_TYPES} from '../config/sysConstants';

import UserLayout from '@components/layout/UserLayout';
import MainLayout from '@components/layout/MainLayout';

import LoginPage from '@pages/Login';

import CoatingsContainer from '@pages/coatings/CoatingsIndex.vue';
import MetalCoatingPage from '@pages/coatings/CoatingsMetal.vue'
import CeramicCoatingPage from '@pages/coatings/CoatingsCeramic.vue';
import ElectrolyteCoatingPage from '@pages/coatings/CoatingsElectrolyte.vue';
import VacuumCoatingPage from '@pages/coatings/CoatingsVacuum.vue';
import AuroraCoatingPage from '@pages/coatings/CoatingsAurora.vue';
import AirColdCoatingPage from '@pages/coatings/CoatingAirCold.vue';
import SofcSinterCoatingPage from '@pages/coatings/CoatingsSofc.vue';

import CoatingMethodsPage from '@pages/CoatingMethods.vue'
import PerformanceTestPage from '@pages/PerformanceTest.vue';
import DeviceMaterialsPage from '@pages/DeviceMaterials.vue';

import UsersPage from '@pages/Users';
import CoatingDevicesPage from '@pages/settings/CoatingDevices';
import CoatingGasTypesPage from '@pages/settings/CoatingGasTypes'


Vue.use(VueRouter);

const routes = [
	{
		path: "/",
    component: UserLayout,
		redirect: '/login',
		children: [
			{
				path: "/login",
				component: LoginPage
			}
		]
	},{
		path: '/main',
		name: "Main",
		component: MainLayout,
		redirect:"/main/coatings",
		children: [
			{
				path: "coatings",
				redirect: "/main/coatings/coatings_metal",
				component: CoatingsContainer,
				meta:{
					name: "涂层类型"
				},
				children: [
					{
						path: "coatings_metal",
						component: MetalCoatingPage,
						meta:{
							name: "金属涂层",
							users: [
								'刘康诚',
								'张惠宇',
								'邓世杰',
								'刘森辉'
							]
						},
					},{
						path: "coatings_ceramic",
						component: CeramicCoatingPage,
						meta:{
							name: "陶瓷涂层",
							users: [
								'邓世杰',
								'刘森辉'
							]
						},
					},{
						path: "coatings_electrolyte",
						component: ElectrolyteCoatingPage,
						meta:{
							name: "SOFC 涂层",
							users: [
								'粱彦能',
								'富涛',
								'李甲鸿'
							]
						},
					},{
						path: "coatings_vacuum",
						component: VacuumCoatingPage,
						meta:{
							name: "真空冷喷涂涂层",
							key: COATING_TYPES.VACUUM.key,
							users: [
								'田飞'
							]
						},
					},{
						path: "coatings_air_cold",
						component: AirColdCoatingPage,
						meta:{
							name: "大气冷喷涂涂层",
							key: COATING_TYPES.AIR_COLD.key,
							users: [
								'纪纲',
								'刘森辉'
							]
						},
					},{
						path: "coatings_aurora",
						component: AuroraCoatingPage,
						meta:{
							name: "激光熔覆涂层",
							key: COATING_TYPES.AURORA.key,
							users: [
								'刘康诚',
								'刘伊',
								'刘森辉'
							]
						},
					},{
						path: "coatings_sofc_sinter",
						component: SofcSinterCoatingPage,
						meta:{
							name: "SOFC 烧结涂层",
							key: COATING_TYPES.SOFC_SINTER.key,
							users: [
								'富涛',
								'李甲鸿'
							]
						},
					}
				]
			},{
				path: 'coating_methods',
				component: CoatingMethodsPage,
				meta:{
					name: "涂层方法"
				},
			},{
				path: 'performance_test',
				component: PerformanceTestPage,
				meta:{
					name: "性能检测"
				},
			},{
				path: 'device_materials',
				component: DeviceMaterialsPage,
				meta:{
					name: "设备材料"
				},
			}
		]
	},{
		path: '/settings',
		name: "Settings",
		component: MainLayout,
		redirect: '/settings/users',
		children: [
			{
				path: "users",
				component: UsersPage
			},{
				path: 'devices',
				component: CoatingDevicesPage
			},{
				path: "coating_gas_types",
				component: CoatingGasTypesPage
			}
		]
	}
];
let router = new VueRouter({
	mode: 'hash',
	routes
});

export default router;