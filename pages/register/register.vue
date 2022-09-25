<template>
	<view>
		<view class="register-top">
			<image src="../../static/images/register/arrow-left-bold.png" @tap="toSignIn"></image>
		</view>
		<view class="register-logo">
			<image src="../../static/images/login/fire-logo.png"></image>
		</view>
		<view class="register-content">
			<view class="register-text">注册</view>
			<view class="content-text">
				<input @blur="usernameBlur" v-model="username" type="text" placeholder="请输入名字" placeholder-style="color:#808080;fontSize:28rpx"/>
				<image v-if="isInvalidUsername === true" src="../../static/images/register/pass.png"></image>
				<view v-else-if="isInvalidUsername === false" class="username-error-tip">请填写用户名</view>
			</view>
			<view class="content-email">
				<input @blur="emailBlur" v-model="email" type="text" placeholder="请输入邮箱" placeholder-style="color:#808080;fontSize:28rpx"/>
				<image v-if="isInvalidEmail === true" src="../../static/images/register/pass.png"></image>
				<view v-else-if="isInvalidEmail === false" class="email-error-tip">邮箱错误</view>
			</view>
			<view class="content-pwd">
				<input v-if="defaultStatus" v-model="pwd" type="text" placeholder="请输入密码" placeholder-style="color:#808080;fontSize:28rpx"/>
				<input v-else v-model="pwd" type="password" placeholder="请输入密码" placeholder-style="color:#808080;fontSize:28rpx"/>
				<image @click="switchoverStatus" :src="isShowPwd"></image>
			</view>
			<button class="register-btn" :style="{'backgroundColor':isRegister?'#FFE431':'' ,'color':isRegister?'#000000':''}">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				isInvalidUsername: '11',
				email:'',
				isInvalidEmail: '11',
				pwd:'',
				isInvalidPwd:false,
				defaultStatus:false
			}
		},
		computed:{
			isRegister(){
				return this.username && this.email && this.pwd
			},
			isShowPwd(){
				return this.defaultStatus?'../../static/images/register/show-pwd.png':'../../static/images/register/password-not-view.png'
			}
		},
		methods: {
			switchoverStatus(){
				this.defaultStatus = !this.defaultStatus
			},
			usernameBlur(){
				this.username ? this.isInvalidUsername = true : this.isInvalidUsername = false
			},
			emailBlur(){
				const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
				let result = reg.test(this.email)
				result ? this.isInvalidEmail = true:this.isInvalidEmail = false
			},
			toSignIn(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.register-top{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 88rpx;
		padding-left: 24rpx;
		font-size: 36rpx;
		color: #333333;
		letter-spacing: 0;
		font-weight: 500;
		image{
			width: 48rpx;
			height: 48rpx;
		}
	}
	.register-logo{
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
	.register-content{
		padding: 0 56rpx;
		.register-text{
			font-size: 56rpx;
			color: #272832;
			letter-spacing: 0;
			font-weight: 500;
		}
		.content-text{
			position: relative;
			image{
				position: absolute;
				top: 50%;
				right: 0;
				width: 42rpx;
				height: 32rpx;
				transform: translateY(-50%);
			}
			.username-error-tip{
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
				font-size: 24rpx;
				color:red;
			}
		}
		.content-email{
			position: relative;
			image{
				position: absolute;
				top: 50%;
				right: 0;
				width: 42rpx;
				height: 32rpx;
				transform: translateY(-50%);
			}
			.email-error-tip{
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
				font-size: 24rpx;
				color:red;
			}
		}
		.content-pwd{
			position: relative;
			image{
				position: absolute;
				top: 50%;
				right: 0;
				transform: translateY(-50%);
				width: 40rpx;
				height: 40rpx;
			}
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
		.register-btn{
			margin-top: 118rpx;
			// background-color: #FFE431;
			background-color: $uni-bg-color-hover;
			border-radius: 48rpx;
			box-shadow: 0rpx 50rpx 32rpx -36rpx;
			color:#FFFFFF;
		}
	}
</style>
