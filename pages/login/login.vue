<template>
	<view>
		<view class="login-top" @tap="toSignUp">
			注册
		</view>
		<view class="login-logo">
			<image src="../../static/images/login/fire-logo.png"></image>
		</view>
		<view class="login-content">
			<view class="login-text">登录</view>
			<view class="login-description">您好,欢迎来到login!</view>
			<input v-model="user" type="text" placeholder="用户名/邮箱"/>
			<input v-model="pwd" type="password" placeholder="密码"/>
			
			<button class="login-btn" @tap="login">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:'',
				pwd:''
			}
		},
		methods: {
			toSignUp(){
				uni.navigateTo({
					url:'/pages/register/register'
				})
			},
			login(){
				if(this.user && this.pwd){
					uni.request({
						url:'http://localhost:8082/user/login',
						data:{
							user: this.user,
							pwd: this.pwd
						},
						method:'POST',
						success:data=>{
							console.log(data);
						}
					})
					return 
				}
				uni.showToast({
					title:'登录失败',
					icon:'error'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.login-top{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 88rpx;
		padding-right: 56rpx;
		font-size: 36rpx;
		color: #333333;
		letter-spacing: 0;
		font-weight: 500;
	}
	.login-logo{
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		height: 226rpx;
		padding: 80rpx 0 54.36rpx 0;
		image{
			width: 192rpx;
			height: 91.64rpx;
		}
	}
	.login-content{
		padding: 0 56rpx;
		.login-text{
			font-size: 56rpx;
			color: #272832;
			letter-spacing: 0;
			font-weight: 500;
		}
		.login-description{
			margin-top: 14rpx;
			font-size: 40rpx;
			color: rgba(39,40,50,0.50);
			letter-spacing: 0;
			font-weight: 400;
		}
		input{
			font-size: 36rpx;
			color: #272832;
			letter-spacing: 0;
			font-weight: 500;
			height: 86rpx;
			box-sizing: border-box;
			padding: 18rpx 0;
			margin-top: 50rpx;
			border-bottom: 2rpx solid $uni-border-color;
		}
		.login-btn{
			margin-top: 118rpx;
			background-color: #FFE431;
			border-radius: 48rpx;
			box-shadow: 0rpx 50rpx 32rpx -36rpx;
		}
	}
</style>
