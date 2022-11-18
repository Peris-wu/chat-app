<template>
	<view class="option">
		<view class="left">
			<slot name="left">
				
			</slot>
		</view>
		
		<view class="right">
			<view class="text">
				<slot name="r-text">
					
				</slot>
			</view>
			<view class="icon">
				<image src="../../../static/images/groupdetail/more.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.option{
	display: flex;
	// justify-content: space-between;
	align-items: center;
	padding: 0 32rpx;
	height: 112rpx;
	.left{
		min-width: 94rpx;
		font-size: 32rpx;
		color: #272832;
	}
	.right{
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
		margin-left: 30rpx;
		font-size: 32rpx;
		color: rgba(39,40,50,0.60);
		.text{
			flex: 1;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
			word-break: break-all;
		}
		.icon{
			width: 25rpx;
			image{
				width: 25rpx;
				height: 25rpx;
			}
		}
	}
}
</style>
