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
				<input v-model="user" type="text" placeholder="请输入名字" placeholder-style="color:#808080;fontSize:28rpx"/>
				<image v-if="isInvalidUsername === true" src="../../static/images/register/pass.png"></image>
				<view v-else-if="isInvalidUsername === false" class="username-error-tip">{{userErrorTip}}</view>
			</view>
			<view class="content-email">
				<input v-model="mail" type="text" placeholder="请输入邮箱" placeholder-style="color:#808080;fontSize:28rpx"/>
				<image v-if="isInvalidEmail === true" src="../../static/images/register/pass.png"></image>
				<view v-else-if="isInvalidEmail === false" class="email-error-tip">{{mailErrorTip}}</view>
			</view>
			<view class="content-pwd">
				<input v-if="defaultStatus" v-model="pwd" type="text" placeholder="请输入密码" placeholder-style="color:#808080;fontSize:28rpx"/>
				<input v-else v-model="pwd" type="password" placeholder="请输入密码" placeholder-style="color:#808080;fontSize:28rpx"/>
				<image @click="switchoverStatus" :src="isShowPwd"></image>
			</view>
			<button 
				class="register-btn" 
				:style="{'backgroundColor':isRegister?'#FFE431':'' ,'color':isRegister?'#000000':''}"
				@tap="tapRegister"
			>注册</button>
		</view>
	</view>
</template>

<script>
	import {debounce} from '@/utils/debounce.js'
	export default {
		data() {
			return {
				user:'',
				isInvalidUsername: undefined,
				mail:'',
				isInvalidEmail: undefined,
				pwd:'',
				isInvalidPwd:false,
				defaultStatus:false,
				userErrorTip:'请填写用户名',
				mailErrorTip: '邮箱错误',
				debounceFn: null
			}
		},
		computed:{
			isRegister(){
				return this.user && this.mail && this.pwd && this.isInvalidUsername && this.isInvalidEmail
			},
			isShowPwd(){
				return this.defaultStatus?'../../static/images/register/show-pwd.png':'../../static/images/register/password-not-view.png'
			}
		},
		watch:{
			user:{
				handler(newVal,oldVal){
					// this.isExist(newVal)
					this.checkUser()
				}
			},
			mail:{
				handler(newVal,oldVal){
					// this.debounceFn(newVal)
					this.checkMail()
				}
			}
		},
		mounted(){
			this.debounceFn = debounce(this.isExist,500)
		},
		methods: {
			switchoverStatus(){
				this.defaultStatus = !this.defaultStatus
			},
			// 验证 user/mail 是否存在
			isExist(user,mail=null){
				uni.request({
					url:'http://localhost:8082/user/isexist',
					data:{
						user,
						mail
					},
					method:'POST',
					success:data=>{
						console.log(data);
						if(user?.length){
							if(data.data.code === 200){
								this.userErrorTip = '用户名已存在'
								this.isInvalidUsername = false
							}else{
								this.userErrorTip = '请填写用户名'
								this.isInvalidUsername = true
							}
						}else{
							if(data.data.code === 200){
								this.mailErrorTip = '邮箱已存在'
								this.isInvalidEmail = false
							}else{
								this.mailErrorTip = '邮箱错误'
								this.isInvalidEmail = true
							}
						}
					}
				})
			},
			checkUser(){
				this.user ? this.isInvalidUsername = true : this.isInvalidUsername = false
				if(this.user){
					// debounce(this.isExist)
					this.debounceFn(this.user)
				}
			},
			checkMail(){
				if(this.mail.length === 0){
					this.mailErrorTip = '请填写邮箱'
					this.isInvalidEmail = false
					return
				}
				const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(?:\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
				let result = reg.test(this.mail)
				result ? this.isInvalidEmail = true:this.isInvalidEmail = false
				if(result){
					// this.isExist(null,this.mail)
					this.debounceFn(null,this.mail)
				}
			},
			toSignIn(){
				console.log(11111);
				uni.navigateBack({
					url:'pages/login/login'
				})
			},
			// 注册按钮点击事件
			tapRegister(){
				if(this.isRegister){
					uni.request({
						url:'http://localhost:8082/user/register',
						data:{
							user: this.user,
							mail: this.mail,
							pwd: this.pwd
						},
						method:'POST',
						success:feedbackMessage=>{
							// console.log(feedbackMessage);
							const { data } = feedbackMessage
							console.log(data);
							if(data.code === 200){
								console.log(666);
								uni.navigateTo({
									url:'/pages/login/login'
								})
							}
							this.user = ''
							this.mail = ''
							this.pwd = ''
							this.isInvalidUsername = undefined
							this.isInvalidEmail = undefined
						}
					})
				}
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
