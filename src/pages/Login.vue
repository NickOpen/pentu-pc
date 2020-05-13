<template>
	<div class="pg login-pg">
		<el-form label-position="top" :model="userForm" ref="userForm" label-width="100px" class="login-form">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="userForm.name"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="userForm.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="loginClickHandler()" class="login-btn">登陆</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "LoginPage",
	data(){
		return {
			userForm: {
				username: '',
				password: '',
			}
		}
	},
	methods: {
		loginClickHandler(){
			this.$router.push({path: "/main"})
		}
	}
}
</script>

<style lang="less">
.login-pg{
	width: 100%;
	margin-top: 10%;
	display: flex;
	justify-content: center;
	

	.login-form{
		width: 280px;
	}

	.el-form-item__label{
		line-height: 14px;
	}
	.login-btn{
		width: 100%;
		margin-top: 32px;
	}
}
</style>