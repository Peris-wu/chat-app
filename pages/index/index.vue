<template>
	<view class="content">
		<view class="top-bar">
			<view class="top-bar-left">
				<image src="../../static/images/template/04.jpg"></image>
			</view>
			<view class="top-bar-middle">
					<view class="middle-wrap">
						<image src="../../static/images/index/火@3x.png"></image>
					</view>
			</view>
			<view class="top-bar-right">
				<image src="../../static/images/index/search@3x.png"></image>
				<image src="../../static/images/index/add group@3x.png"></image>
			</view>
		</view>
		
		<view class="friends-application">
			
		</view>
		
		<view class="friend-list">
			<view class="list-item" v-for="item in friends" :key="item.id">
				<view class="left">
					<view class="tip">{{item.tip}}</view>
					<!-- <image src="../../static/images/index/apply.png"></image> -->
					<image :src="`../../static/images/template/${item.imgUrl}`"></image>
				</view>
				<view class="right">
					<view class="top">
						<view class="friend-name">{{item.name}}</view>
						<view class="time">{{item.time | timerFilter}}</view>
						<!-- <view class="time">上午7:45</view> -->
					</view>
					<view class="msg">{{item.msg}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import datas from '../../mock/datas/index.js'
	export default {
		data() {
			return {
				title: 'Hello',
				friends:[]
			}
		},
		filters:{
			timerFilter(time){
				const oldTime = new Date(time)
				const currentTime = new Date()
				
				// oldTime
				let _timeStamp = oldTime.getTime()
				let _year = oldTime.getFullYear()
				let _month = oldTime.getMonth() + 1
				let _date = oldTime.getDate()
				let _hour = oldTime.getHours()
				let _minutes = oldTime.getMinutes()
				let _seconds = oldTime.getSeconds()
				
				// currentTime
				let timeStamp = currentTime.getTime()
				let year = currentTime.getFullYear()
				let month = currentTime.getMonth() + 1
				let date = currentTime.getDate()
				let hour = currentTime.getHours()
				let minutes = currentTime.getMinutes()
				let seconds = currentTime.getSeconds()
				
				// 当天开始的时间戳
				let currentPassTime =  (hour * 3600 + minutes * 60 + seconds) * 1000
				let startTimeStamp = timeStamp - currentPassTime
				let yesterdayStartTimeStamp = startTimeStamp - 24 * 60 * 60 * 1000
				
				// 同一天
				if(_year === year && _month===month && _date===date){
					if(_hour < 10 ){
						_hour = `0${_hour}`
					}
					if(_minutes < 10){
						_minutes = `0${_minutes}`
					}
					return `${_hour}:${_minutes}`
				}
				// 昨天
				if(yesterdayStartTimeStamp < _timeStamp && _timeStamp < startTimeStamp){
					if(_hour < 10 ){
						_hour = `0${_hour}`
					}
					if(_minutes < 10){
						_minutes = `0${_minutes}`
					}
					return `昨天${_hour}:${_minutes}`
				}
				
			}
		},
		onLoad() {
			this.getFriendsList()
		},
		methods: {
			getFriendsList(){
				this.friends = datas.friends()
				console.log(this.friends);
			}
		}
	}
</script>

<style scoped lang="scss">
	image{
		width: 100%;
		height: 100%;
	}
	.top-bar{
		position: relative;
		height: 88rpx;
		margin-top: 33rpx;
		padding: $uni-padding-lr;
		padding-top: var(--status-bar-height);
		box-shadow: 0rpx 1rpx 0rpx 0rpx rgba(0,0,0,0.1);
		.top-bar-left{
			position: absolute;
			left: 32rpx;
			top: 50%;
			width: 68rpx;
			height: 68rpx;
			image{
				border-radius: 16rpx;
			}
			transform: translateY(-50%);
		}
		.top-bar-middle{
			position: absolute;
			left: 0;
			top: 50%;
			width: 100%;
			text-align: center;
			transform: translateY(-50%);
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
			position: absolute;
			display: flex;
			justify-content: space-between;
			width: 140rpx;
			right: 32rpx;
			top: 50%;
			transform: translateY(-50%);
			image{
				width: 52rpx;
				height: 52rpx;
			}
		}
	}
	.friend-list{
		// margin-top: 18rpx;
		padding-top: var(--status-bar-height);
		.list-item{
			display: flex;
			// width: 100%;
			justify-content: space-between;
			align-items: center;
			padding: 18rpx 36rpx;
			&:active{
				background-color: $uni-bg-color-hover;
			}
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
					background-color: $uni-color-primary;
				}
			}
			.right{
				flex: 1;
				.top{
					display: flex;
					justify-content: space-between;
					.friend-name{
						color: $uni-text-color;
						font-size: 36rpx;
					}
					.time{
						font-size: 24rpx;
						color: $uni-text-color-disable;
					}
				}
				.msg{
					display:-webkit-box;
					font-size: 28rpx;
					color:$uni-text-color-grey;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient:vertical;
					-webkit-line-clamp:1;
					word-wrap: break-word;
				}
			}
		}
	}
</style>
