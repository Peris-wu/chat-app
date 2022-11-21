<template>
	<view class="content">
		<chat-header>
			<!-- <template v-slot:left></template> -->
			<template v-slot:right>
				<image class="img-search-add" src="../../static/images/index/search@3x.png"></image>
				<image 
					class="img-search-add" 
					src="../../static/images/index/add group@3x.png"
					@tap="createChatGroup"
				></image>
			</template>
		</chat-header>
		
		<view class="friends-application">
		</view>
		
		<view class="friend-list">
			<view 
				class="list-item" 
				v-for="item in friends" 
				:key="item.id"
				@tap="toChatPage"
			>
				<view class="left">
					<view class="tip">{{item.msgNum}}</view>
					<!-- <image src="../../static/images/index/apply.png"></image> -->
					<image :src="`../../static/images/template/${item.imgUrl}`" @tap="toUserHome"></image>
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
	import chatHeader from '@/components/chat-header/chat-header.vue'
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
				this.friends = datas.users()
				console.log(this.friends);
			},
			toUserHome(){
				uni.navigateTo({
					url:'/pages/userhome/userhome'
				})
			},
			// 创建群聊
			createChatGroup(){
				uni.navigateTo({
					url:'/pages/createchatgroup/createchatgroup'
				})
			},
			// 跳转到聊天
			toChatPage(){
				uni.navigateTo({
					url:'/pages/chatroom/chatroom'
				})
			}
		},
		components:{
			chatHeader
		}
	}
</script>

<style scoped lang="scss">
	.content{
		image{
			width: 100%;
			height: 100%;
		}
		.img-search-add{
			width: 52rpx;
			height: 52rpx;
		}
		
		.search{
			text-align: left;
			background-color: $uni-bg-color-grey;
			padding: 10rpx 20rpx;
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
	}
</style>
