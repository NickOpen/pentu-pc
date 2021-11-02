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
		children: [
			{
				path: "coatings",
				//redirect: "/main/coatings/coatings_metal",
				component: CoatingsContainer,
				children: [
					{
						path: "coatings_metal",
						component: CoatingsPage
					},{
						path: "coatings_ceramic",
						component: CoatingsPage
					},{
						path: "coatings_special",
						component: CoatingsPage
					},{
						path: "coatings_electrolyte",
						component: CoatingsPage
					}
				]
			},{
				path: 'coating_methods',
				component: CoatingMethodsPage
			},{
				path: 'performance_test',
				component: PerformanceTestPage
			},{
				path: 'device_materials',
				component: DeviceMaterialsPage
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