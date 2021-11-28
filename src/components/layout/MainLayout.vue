<template>
<el-container class="main-page">
  <el-header class="pt-flex-row-between-center main-header">
		<span class="slogan">
			<span>热喷涂工艺规程大数据系统</span>
		</span>
		<div class="pt-flex-row-between-center">
			<i class="el-icon-user-solid user-icon"></i>
			<el-link class="user-name" @click="logout">退出</el-link>
		</div>
	</el-header>
  <el-container>
    <el-aside class="main-nav-container">
			<el-menu
				router
				default-active="/main/coatings/coatings_metal"
				class="main-nav"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#E5A312">
				<el-submenu index="/main/coatings">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>涂层类型</span>
					</template>
					<el-menu-item-group>
						<el-menu-item v-for="coatingType in coatingTypes"
							:index="'/main/coatings/coatings_' + coatingType.key.toLowerCase()" 
							:key="coatingType.key">{{coatingType.title}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-menu-item index="/main/coating_methods">
					<i class="el-icon-s-grid"></i>
					<span slot="title">喷涂方法</span>
				</el-menu-item>
				<el-menu-item index="/main/performance_test">
					<i class="el-icon-s-data"></i>
					<span slot="title">性能检测</span>
				</el-menu-item>
				<el-menu-item index="/main/device_materials">
					<i class="el-icon-s-help"></i>
					<span slot="title">设备材料</span>
				</el-menu-item>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-setting"></i>
						<span>基础设置</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/settings/devices">设备型号</el-menu-item>
						<el-menu-item index="/settings/coating_gas_types">气体类型</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>
    <el-main class="main-container">
			<div class="main-breadcrumb">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item v-for="item in breadcrumbs" :key="item">{{item}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>

			<div class="main-content">
				<router-view></router-view>
			</div>
			
			<div class="main-footer">
				<div>Copyright © 2021.西安交通大学材料学院热喷涂实验室支持 All Rights Reserved. </div>
			</div>
		</el-main>
  </el-container>
</el-container>

</template>

<script>
import {COATING_TYPES} from '../../config/sysConstants';

export default {
	name: "MainLayout",
	data(){
		return {
			breadcrumbs: [],

			coatingTypes: Object.keys(COATING_TYPES).map(key => COATING_TYPES[key])
		}
	},
	methods: {
		logout(){
			this.$router.push({path: '/login'});
		}
	},
	beforeRouteUpdate(to, from, next){
		let breadcrumbs = [];
		to.matched.forEach(node => {
			if(node.meta && node.meta.name){
				breadcrumbs.push(node.meta.name);
			}
		});

		this.breadcrumbs = breadcrumbs;

		next && next();
	},

	beforeRouteEnter(to, from, next){
		let breadcrumbs = [];
		to.matched.forEach(node => {
			if(node.meta && node.meta.name){
				breadcrumbs.push(node.meta.name);
			}
		});

		next(vm => {
			vm.breadcrumbs = breadcrumbs;
		});
	}
}
</script>

<style lang="less">
@import '@assets/style/variables.less';
.main-page{
	width: 100%;
	height: 100%;

	.main-header{
		background-color: @theme-color;
	}

	.slogan{
		color: @color-base-gray-light;
		font-size: 16px;
	}

	.user-name{
		color: @color-base-gray-light;
		font-size: 14px;
		margin-left: 8px;
	}

	.user-icon{
		color: @color-base-gray-light;
		font-size: 16px;
	}

	.main-nav-container{
		width: 200px !important;
		height: 100%;
		background-color: #545c64;
	}

	.main-nav{
		width: 200px;
	}



	.el-menu{
		border-right: solid 0px #545c64;
	}

	.main-container{
		background-color: #F1F5F9;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0px;

		.main-breadcrumb{
			margin: 20px 20px 0px 20px;
			padding: 14px 20px;
			background-color: white;
			border-bottom: 2px solid #E4E7ED;
			border-radius: 2px;
			margin-bottom: 12px;
		}

		.main-content{
			flex: 1;
			background-color: white;
			margin: 0px 20px 0px 20px;
		}

		.main-footer{
			margin-top: 20px;
			line-height: 68px;
			background-color: white;
			color: #BBBBBB;
			text-align: right;
			padding-right: 20px;
			font-size: 14px;
		}
	}

	.sub-title{
		font-size: 10px;
		margin-top: 4px;
		line-height: 10px;
		color: gray;
	}

	.el-menu-item-group__title{
		padding: 0px;
	}

	.el-menu-item-group .el-menu-item{
		padding-left: 50px !important;
	}
}
</style>