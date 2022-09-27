<template>
	<view class="seach-page">
		<chat-header :headerLeft="false" :headerRightW="84">
			<template v-slot:middle>
				<view class="top-bar-middle">
					<input type="text" class="top-bar-input"/>
					<image src="../../static/images/common/search@3x.png"></image>
				</view>
			</template>
			<template v-slot:right>
				<view class="top-bar-text">取消</view>
			</template>
		</chat-header>
		
		<view class="search-list">
			<view class="title">
				用户
			</view>
			<view class="list">
				<view class="item">
					<view class="item-left">
						<image src="../../static/images/template/02.jpg"></image>
						<view class="name-text">齐天大圣</view>
					</view>
					<view class="item-right">发消息</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import chatHeader from '../../components/chat-header/chat-header.vue'
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
	.seach-page{
		.top-bar-middle{
			position: relative;
			.top-bar-input{
				text-align: left;
				background-color: $uni-bg-color-grey;
				padding: 8rpx;
				border-radius: 10rpx;
			}
			image{
				position: absolute;
				right: 12rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 40rpx;
				height: 40rpx;
			}
		}
		.top-bar-text{
			width: 100%;
			padding-left: 30rpx;
			font-size: 28rpx;
			color: #272832;
		}
		.search-list{
			margin-top: 34rpx;
			padding: $uni-padding-lr;
			.title{
				font-size: 44rpx;
				color: #272832;
				letter-spacing: -0.75rpx;
				font-weight: 600;
			}
			.list{
				margin-top: 20rpx;
				.item{
					display: flex;
					align-items: center;
					margin-bottom: 40rpx;
					.item-left{
						display: flex;
						align-items: center;
						flex: 1;
						image{
							width: 80rpx;
							height: 80rpx;
							border-radius: 20rpx;
						}
						.name-text{
							font-size: 36rpx;
							color: #272832;
							padding-left: 32rpx;
						}
					}
					.item-right{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 120rpx;
						height: 48rpx;
						border-radius: 24rpx;
						background: #FFE431;
						font-size: 24rpx;
						color: #272832;
					}
				}
			}
		}
	}
</style>
