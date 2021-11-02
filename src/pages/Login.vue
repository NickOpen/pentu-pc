<template>
	<div class="pg login-pg">
		<el-form status-icon label-position="top" 
			:model="userForm" :rules="rules" 
			ref="userForm" label-width="100px" 
			class="login-form">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="userForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="userForm.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="loginClickHandler()" class="login-btn">登陆</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import md5 from 'md5';

export default {
	name: "LoginPage",
	data(){
		return {
			userForm: {
				username: null,
				password: null,
			},
			rules: {
				username: [{ 
						validator: (rule, value, callback) => {
							if(!value){
								callback(new Error("请输入用户名"));
							}else{
								callback();
							}
						}, trigger: 'blur' 
					}],
				password: [{ 
						validator: (rule, value, callback) => {
							if(!value){
								callback(new Error("请输入密码"));
							}else{
								callback();
							}
						}, trigger: 'blur' 
					}]	
			}
		}
	},
	methods: {
		...mapActions([
			'login'
		]),
		
		loginClickHandler(){
			let that = this;
			this.$refs.userForm.validate((valid) => {
				if (!valid) {
					return;
				}
				let payload = {
					username: this.userForm.username,
					password: md5(this.userForm.password)
				}
				
				this.login(payload).then(ret => {
					if(ret){
						that.$router.push({path: "/main"})
					}
				})
			});
		}
	}
}
</script>

<style lang="less">
.login-pg{
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