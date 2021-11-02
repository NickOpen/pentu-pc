import Vue from 'vue';
import VueRouter from 'vue-router';

import UserLayout from '@components/layout/UserLayout';
import MainLayout from '@components/layout/MainLayout';

import LoginPage from '@pages/Login';
import CoatingsPage from '@pages/Coatings';

import CoatingsContainer from '@pages/coatings/CoatingsIndex.vue';
//import MetalCoatingPage from '@pages/coatings/CoatingsMetal.vue'

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
						component: CoatingsPage,
						meta:{
							name: "金属涂层"
						},
					},{
						path: "coatings_ceramic",
						component: CoatingsPage,
						meta:{
							name: "陶瓷涂层"
						},
					},{
						path: "coatings_special",
						component: CoatingsPage,
						meta:{
							name: "特殊涂层"
						},
					},{
						path: "coatings_electrolyte",
						component: CoatingsPage,
						meta:{
							name: "电解质涂层"
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