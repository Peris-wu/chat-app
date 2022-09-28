<template>
	<view>
		<view class="title">
			<!-- <slot name="title-style">{{searchResult}}</slot> -->
			{{searchResult.title}}
		</view>
		<view class="list">
			<view class="item">
				<view class="item-left">
					<image src="../../../static/images/template/02.jpg"></image>
					<view class="name-text">齐天大圣</view>
				</view>
				<view class="item-right">发消息</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			searchResult:{
				type: Object,
				default:{}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
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
</style>
