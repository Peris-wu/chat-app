<template>
	<view class="chat-room">
		<view class="header">
			<chat-header>
				<template v-slot:left>
					<view class="left">
						<image src="../../static/images/register/arrow-left-bold.png" mode="aspectFill"></image>
					</view>
				</template>
				
				<template v-slot:middle>
					<view class="middle">
						开心就好
					</view>
				</template>
				
				<template v-slot:right>
					<view class="right">
						<image src="../../static/images/template/05.jpg" mode="aspectFill"></image>
					</view>
				</template>
			</chat-header>
		</view>
		<view class="chat-main">
			<scroll-view 
			:scroll-y="true" 
			:scroll-with-animation="true" 
			style="height: 100%;"
			:show-scrollbar="false"
			>
				<view class="user-left user-commom">
					<view class="msg-time">
						11月14日 20:23
					</view>
					<view class="icon-msg">
						<view class="icon">
							<image class="icon-style" src="../../static/images/template/02.jpg"></image>
						</view>
						<view class="msg-common msg">
							开发的，啥可大可久多久的开发
							上课地方，是的开发绿色健康。
							上课地方叫来，都看见。
						</view>
					</view>
				</view>
				<view class="myself-right">
					<view class="msg-time">
						11月15日 22:23
					</view>
					<view class="icon-msg user-commom">
						<view class="icon">
							<image class="icon-style" src="../../static/images/template/01.jpg"></image>
						</view>
						<view class="msg msg-common">
							的，啥可大可久多久的开发了大
							地方，是的开发绿色健康。
						</view>
					</view>
				</view>
				
				<view class="user-left user-commom">
					<view class="msg-time">
						11月14日 20:23
					</view>
					<view class="icon-msg">
						<view class="icon">
							<image class="icon-style" src="../../static/images/template/02.jpg"></image>
						</view>
						<view class="msg-common msg">
							开发的，啥可大可久多久的开发
							上课地方，是的开发绿色健康。
							上课地方叫来，都看见。
						</view>
					</view>
				</view>
				<view class="myself-right">
					<view class="msg-time">
						11月15日 22:23
					</view>
					<view class="icon-msg user-commom">
						<view class="icon">
							<image class="icon-style" src="../../static/images/template/01.jpg"></image>
						</view>
						<view class="msg msg-common">
							的，啥可大可久多久的开发了大
							地方，是的开发绿色健康。
						</view>
					</view>
				</view>
				
				<view class="user-left user-commom">
					<view class="msg-time">
						11月14日 20:23
					</view>
					<view class="icon-msg">
						<view class="icon">
							<image class="icon-style" src="../../static/images/template/02.jpg"></image>
						</view>
						<view class="msg-common msg">
							开发的，啥可大可久多久的开发
							上课地方，是的开发绿色健康。
							上课地方叫来，都看见。
						</view>
					</view>
				</view>
				<view class="myself-right">
					<view class="msg-time">
						11月15日 22:23
					</view>
					<view class="icon-msg user-commom">
						<view class="icon">
							<image class="icon-style" src="../../static/images/template/01.jpg"></image>
						</view>
						<view class="msg msg-common">
							的，啥可大可久多久的开发了大
							地方，是的开发绿色健康。
						</view>
					</view>
				</view>
				
				<view class="user-left user-commom">
					<view class="msg-time">
						11月14日 20:23
					</view>
					<view class="icon-msg">
						<view class="icon">
							<image class="icon-style" src="../../static/images/template/02.jpg"></image>
						</view>
						<view class="msg-common msg">
							开发的，啥可大可久多久的开发
							上课地方，是的开发绿色健康。
							上课地方叫来，都看见。
						</view>
					</view>
				</view>
				<view class="myself-right">
					<view class="msg-time">
						11月15日 22:23
					</view>
					<view class="icon-msg user-commom">
						<view class="icon">
							<image class="icon-style" src="../../static/images/template/01.jpg"></image>
						</view>
						<view class="msg msg-common">
							的，啥可大可久多久的开发了大
							地方，是的开发绿色健康。
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import chatHeader from '@/components/chat-header/chat-header.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			chatHeader
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.chat-room{
	height: 100vh;
	background-color: #F4F4F4;
	.header{
		.left{
			width: 48rpx;
			height: 48rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.middle{
			font-size: 40rpx;
			color: #272832;
		}
		.right{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			width: 100%;
			image{
				width: 68rpx;
				height: 68rpx;
			}
		}
	}
	.chat-main{
		height: calc(100% - 88rpx);
		box-sizing: border-box;
		padding: 8rpx 32rpx 0 32rpx;
		scrollbar-width:none;
		.msg-common{
			width: 480rpx;
			padding: 16rpx 24rpx;
			font-size: 32rpx;
			color: #272832;
			box-sizing: border-box;
		}
		.msg-time{
			font-size: 24rpx;
			color: rgba(39,40,50,0.3);
			text-align: center;
			padding: 20rpx 0;
		}
		.icon-style{
			width: 80rpx;
			height: 80rpx;
			border-radius: 20rpx;
		}
		.user-commom{
			margin: 20rpx 0;
		}
		.user-left{
			.icon-msg{
				display: flex;
				margin-top: 20rpx;
				.msg{
					background-color: #FFFFFF;
					border-radius: 0 20rpx 20rpx 20rpx;
					margin-left: 20rpx;
				}
			}
		}
		.myself-right{
			.icon-msg{
				display: flex;
				flex-direction: row-reverse;
				margin-top: 20rpx;
				.msg{
					background-color: #FFE431;
					border-radius: 20rpx 0 20rpx 20rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
}
</style>
