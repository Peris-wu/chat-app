<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/template/04.jpg"></image>
			</view>
			<view class="top-bar-middle">
				<image src="../../static/images/index/火@3x.png"></image>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/index/search@3x.png"></image>
				<image src="../../static/images/index/add group@3x.png"></image>
			</view>
		</view>
		
		<view class="friends-application"></view>
		
		<view class="friend-list">
			<view class="list-item">
				<view class="left">
					<view class="tip">1</view>
					<image src="../../static/images/template/04.jpg"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="friend-name">Peris</view>
						<view class="time">上午7:45</view>
					</view>
					<view class="msg">我都不想点破你...</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	image{
		width: 100%;
		height: 100%;
	}
	.top-bar{
		display: flex;
		height: 88rpx;
		padding: $uni-padding-lr;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(0,0,0,0.1);
		.top-bar-left{
			width: 68rpx;
			height: 68rpx;
			image{
				border-radius: 16rpx;
			}
		}
		.top-bar-middle{
			width: 88rpx;
			height: 42rpx;
		}
		.top-bar-right{
			display: flex;
			width: 140rpx;
			height: 52rpx;
			justify-content: space-between;
			align-items: center;
			image{
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
	.friend-list{
		padding: 36rpx 32rpx 0 32rpx;
		.list-item{
			display: flex;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			.left{
				position:relative;
				width: 96rpx;
				height: 96rpx;
				margin-right: 32rpx;
				.tip{
					position:absolute;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #FFFFFF;
					font-size: 24rpx;
					top: -8rpx;
					right: -10rpx;
					width: 36rpx;
					height: 36rpx;
					background-color: #FF5D5B;
					z-index: 1;
					border-radius: $uni-border-radius-circle;
				}
				image{
					border-radius: 24rpx;
				}
			}
			.right{
				flex: 1;
				.top{
					display: flex;
					justify-content: space-between;
					.friend-name{
						font-size: 36rpx;
					}
					.time{
						font-size: 24rpx;
						color: $uni-text-color-disable;
					}
				}
				.msg{
					font-size: 28rpx;
					color:$uni-text-color-grey;
				}
			}
		}
	}
</style>
