<template>
	<view class="top-bar" :style="{'boxShadow':isShowShadow?'0rpx 1rpx 0rpx 0rpx rgba(0,0,0,0.1)':''}">
		<view class="top-bar-left" v-if="headerLeft">
			<slot name="left">
				<image src="../../static/images/template/04.jpg"></image>
			</slot>
		</view>
		<view class="top-bar-middle" v-if="headerMiddle">
			<slot name="middle">
				<view class="middle-wrap">
					<image src="../../static/images/index/火@3x.png"></image>
				</view>
			</slot>
		</view>
		<view class="top-bar-right" v-if="headerRight">
			<slot name="right">
				<image src="../../static/images/index/search@3x.png"></image>
				<image src="../../static/images/index/add group@3x.png"></image>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"chat-header",
		props:{
			headerLeft:{
				type: Boolean,
				default: true
			},
			headerMiddle:{
				type: Boolean,
				default: true
			},
			headerRight:{
				type: Boolean,
				default: true
			},
			isShowShadow:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				msg:'test'
			};
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
		justify-content: center;
		align-items: center;
		height: 88rpx;
		margin-top: 33rpx;
		padding: $uni-padding-lr;
		padding-top: var(--status-bar-height);
		// box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(0,0,0,0.1);
		.top-bar-left{
			min-width: 140rpx;
			// max-width: 140rpx;
			height: 68rpx;
			image{
				width: 68rpx;
				border-radius: 16rpx;
			}
		}
		.top-bar-middle{
			flex: 1;
			text-align: center;
			.middle-wrap{
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 88rpx;
					height: 42rpx;
				}
			}
			
		}
		.top-bar-right{
			display: flex;
			justify-content: space-between;
			min-width: 140rpx;
			// max-width: 140rpx;
			right: 32rpx;
			image{
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
</style>