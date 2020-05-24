<template>
<el-container class="main-page">
  <el-header class="pt-flex-row-between-center main-header">
		<span class="slogan">热喷涂工艺规程查询</span>
		<div class="pt-flex-row-between-center">
			<i class="el-icon-user-solid user-icon"></i>
			<el-link class="user-name" @click="logout">退出</el-link>
		</div>
	</el-header>
  <el-container>
    <el-aside class="main-nav-container">
			<el-menu
				router
				default-active="/main/coatings"
				class="main-nav"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#E5A312">
				<el-menu-item index="/main/coatings">
					<i class="el-icon-menu"></i>
					<span slot="title">喷涂类型</span>
				</el-menu-item>
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
					<el-breadcrumb-item :to="{ path: '/main/coatings' }">喷涂类型</el-breadcrumb-item>
					<!--el-breadcrumb-item></el-breadcrumb-item-->
				</el-breadcrumb>
			</div>

			<router-view>

			</router-view>
		</el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
	name: "MainLayout",
	methods: {
		logout(){
			this.$router.push({path: '/login'});

			//TODO.
		}
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

	.main-breadcrumb{
		padding: 14px 20px;
		background-color: white;
    border-bottom: 2px solid #E4E7ED;
		border-radius: 2px;
		margin-bottom: 12px;
	}

	.el-menu{
		border-right: solid 0px #545c64;
	}
	.main-container{
		background-color: #F1F5F9;
	}
}
</style>