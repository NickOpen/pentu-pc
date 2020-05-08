import Vue from 'vue';
import VueRouter from 'vue-router';

import UserLayout from '@components/layout/UserLayout';
import MainLayout from '@components/layout/MainLayout';

import LoginPage from '@pages/Login';
import DashboardPage from '@pages/Dashboard';
import UsersPage from '@pages/Users';

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
		redirect: "/main/dashboard",
		children: [
			{
				path: "dashboard",
				component: DashboardPage
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
			}
		]
	}
];
let router = new VueRouter({
	mode: 'hash',
	routes
});

export default router;