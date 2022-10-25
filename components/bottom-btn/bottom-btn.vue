<template>
	<view class="bottom-btn">
		<view class="btn">
			<view class="left-btn" v-if="hasLeftBtn" @tap="leftBtn">
				<slot name="left">取消</slot>
			</view>
			<view class="right-btn" @tap="rightBtn" >
				<slot name="right">加为好友</slot>
			</view>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	export default {
		name:"bottom-btn",
		props:{
			hasLeftBtn: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			leftBtn(){
				this.$emit('leftBtn')
			},
			rightBtn(){
				this.$emit('rightBtn')
			}
		}
	}
</script>

<style scoped lang="scss">
	.bottom-btn{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 0 36rpx;
		box-sizing: border-box;
		.btn{
			display: flex;
			width: 100%;
			.left-btn{
				display: flex;
				justify-content: center;
				align-items: center;
				width: 174rpx;
				height: 80rpx;
				border-radius: 10rpx;
				background: rgba(39,40,50,0.1);
				margin-right: 32rpx;
			}
			.right-btn{
				flex: 1;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #272832;
				background-color: #FFE431;
			}
		}
		.line{
			width: 268rpx;
			height: 10rpx;
			border-radius: 200rpx;
			margin: 48rpx 0 18rpx 0;
			background: rgba(0, 0, 0, 0.2);
		}
	}
</style>