<template>
	<view>
		<view class="title">
			<!-- <slot name="title-style">{{searchResult}}</slot> -->
			{{searchResult.title}}
		</view>
		<view class="list">
			<view class="item" v-for="searchItem in searchResult" :key="searchItem.id">
				<view class="item-left">
					<image :src="require(`../../../static/images/template/${searchItem.imgUrl}`)"></image>
					<view class="name-text" v-html="searchItem.name">
					</view>
				</view>
				<view class="item-right send" v-if="searchItem.tip === 1">发消息</view>
				<view class="item-right add" v-if="searchItem.tip === 0">加好友</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			searchResult:{
				type: Array,
				default:[]
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
 			font-size: 24rpx;
 		}
		.send{
			color: #272832;
			background: #FFE431;
		}
		.add{
			background: rgba(74,170,255,0.10);
			color: #4AAAFF;
		}
 	}
 }
</style>
