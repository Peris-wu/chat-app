<template>
	<view class="detail">
		<view class="header">
			<chat-header>
				<template v-slot:left>
					<view class="left">
						<image src="../../static/images/register/arrow-left-bold.png" mode=""></image>
					</view>	
				</template>
				<template v-slot:middle>
					<view class="middle">
						详情
					</view>	
				</template>
				<template v-slot:right>
					<view class="right">
					</view>	
				</template>
			</chat-header>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">头像</span>
				<image class="icon" src="../../static/images/template/02.jpg" mode="aspectFill"></image>
			</view>
			<view class="right">
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">签名</span>
				<view class="signture common">看没看懂阿凡达，的局啊地卡斯蒂略噩看没看懂阿凡达，的局啊地卡斯蒂略噩</view>
			</view>
			<view class="right">
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option line">
			<view class="left">
				<span class="title">注册</span>
				<view class="common">2022-01-15 23:33:45</view>
			</view>
			<view class="right">
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">昵称</span>
				<view class="common">武动乾坤</view>
			</view>
			<view class="right">
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">性别</span>
				<view class="common">男</view>
			</view>
			<view class="right">
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">生日</span>
				<view class="common">1996-12-23</view>
			</view>
			<view class="right">
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">电话</span>
				<view class="common">12345678901</view>
			</view>
			<view class="right">
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option line">
			<view class="left">
				<span class="title">邮箱</span>
				<view class="common">123456@qq.com</view>
			</view>
			<view class="right">
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option line">
			<view class="left">
				<span class="title">密码</span>
				<view class="common">******</view>
			</view>
			<view class="right">
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="bottom-btn-wrap">
			<bottom-btn>
				<template v-slot:right>
					<view class="btn-bg">
					退出应用
					</view>
				</template>
			</bottom-btn>
		</view>
	</view>
</template>

<script>
	import chatHeader from '../../components/chat-header/chat-header.vue'
	import bottomBtn from '../../components/bottom-btn/bottom-btn.vue'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components:{
			chatHeader,
			bottomBtn
		}
	}
</script>

<style scoped lang="scss">
	.detail{
		.header{
			margin-bottom: 42rpx;
			.left{
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}
			.middle{
				font-size: 40rpx;
				color: #272832;
			}
		}
		.option{
			display: flex;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 26rpx 20rpx 32rpx;
			min-height: 112rpx;
			.left{
				display: flex;
				align-items: center;
				.title{
					width: 64rpx;
					font-size: 32rpx;
					color: #272832;
				}
				.common{
					font-size: 32rpx;
					color: rgba(39,40,50,0.60);
					margin-left: 32rpx;
				}
				.signture{
					display: -webkit-box;
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
				}
				image{
					width: 108rpx;
					height: 108rpx;
					border-radius: 20rpx;
					margin-left: 32rpx;
				}
			}
			.right{
				opacity: 0.3;
				transform: rotate(-180deg);
				image{
					width: 28rpx;
					height: 28rpx;
				}
			}
		}
		.line{
			border-bottom: 1rpx solid rgba(238,238,238,1);
		}
		.bottom-btn-wrap{
			position: fixed;
			bottom: 0;
			width: 100%;
			.btn-bg{
				background-color: #ffffff;
				color: #FF5D5B;
			}
		}
	}
</style>
