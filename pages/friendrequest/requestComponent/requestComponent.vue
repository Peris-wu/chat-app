<template>
	<view class="request">
		<view class="option-btn">
			<view class="common reject">拒绝</view>
			<view class="icon">
				<image src="../../../static/images/template/02.jpg"></image>
			</view>
			<view class="common agree">同意</view>
		</view>
		<view class="name-time">
			<view class="name">深邃墨客</view>
			<view class="time">2022-01-15</view>
		</view>
		<view class="leave-msg">
			留言:你好，想请求加为好友。
		</view>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			requestItem:{
				type: Object,
				default: ()=>{}
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.request{
	width: 686rpx;
	background: rgba(255,255,255,1);
	border-radius: 20rpx;
	box-shadow: 0 24rpx 64rpx -8rpx rgba(0,0,0,0.1);
	padding: 20rpx;
	box-sizing: border-box;
	margin: 112rpx 0 20rpx;
	.option-btn{
		display: flex;
		justify-content: space-between;
		position: relative;
		.common{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 160rpx;
			height: 64rpx;
			font-size: 32rpx;
			border-radius: 40rpx;
		}
		.reject{
			
			color: rgba(255,93,91,1);
			background-color: rgba(255,93,91,.1);
		}
		.agree{
			color: rgba(39,40,50,1);
			background-color: rgba(255,228,49,1);
		}
		.icon{
			position: absolute;
			left: 50%;
			top: 0;
			transform: translate(-50%,-50%);
			image{
				width: 144rpx;
				height: 144rpx;
				border-radius: 50%;
			}
		}	
	}
	.name-time{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 30rpx;
		padding-bottom: 40rpx;
		.name{
			color:rgba(39,40,50,1);
			font-size: 36rpx;
			font-weight: 500;
		}
		.time{
			font-size: 24rpx;
			font-weight: 400;
			color:rgba(39,40,50,.4);
		}
	}
	.leave-msg{
		font-size: 28rpx;
		color: rgba(39,40,50,.8);
		padding: 20rpx 32rpx;
		background-color: rgba(243,244,246,1);
	}
}
</style>
