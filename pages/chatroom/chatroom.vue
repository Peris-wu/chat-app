<template>
	<view class="chat-room">
		<view class="header">
			<chat-header>
				<template v-slot:left>
					<view class="left">
						<image src="../../static/images/register/arrow-left-bold.png" mode="aspectFill"></image>
					</view>
				</template>
				
				<template v-slot:middle>
					<view class="middle">
						开心就好
					</view>
				</template>
				
				<template v-slot:right>
					<view class="right">
						<image @tap="toGroupDetail" src="../../static/images/template/05.jpg" mode="aspectFill"></image>
					</view>
				</template>
			</chat-header>
		</view>
		<view class="chat-main">
			<scroll-view 
			:scroll-y="true" 
			style="height: 100%;"
			:show-scrollbar="false"
			:scroll-into-view="scrollIntoV"
			:scroll-anchoring="true"
			@scrolltoupper="setTop"
			>
			 <view class="loading-wrap" v-show="isShowLoading">
				 <image :animation="animationLoading" src="../../static/images/chatroom/loading.png" mode="aspectFill"></image>
			 </view>
				<view :id="`msg${msgItem.tip}`" class="user-commom" :class="msgItem.id === 'b'? 'myself-right':'user-left'"  v-for="(msgItem,index) in msgs" :key="index">
					<view class="msg-time" v-show="msgItem.time">
						{{msgItem.time | timerFilter}}
					</view>
					<view class="msg-time" v-show="msgItem.time === ''">
					</view>
					<view class="icon-msg">
						<view class="icon">
							<image class="icon-style" :src="require(`../../static/images/template/${msgItem.imgUrl}`)" />
						</view>
						<view class="msg-common msg">
							<!-- 文本类型信息 -->
							<view v-if="msgItem.types === 0" class="world-break">
								{{msgItem.message}}
							</view>
							<!-- :src="require(`../../static/images/template/${msgItem.message}`)" -->
							<!-- 图片类型信息 -->
							<image 
								v-if="msgItem.types === 1"
								class="msg-img"
								:src="msgItem.message"
								mode="widthFix"
								@tap="previewImage(msgItem)"
							></image>
							<!-- 语音类型信息 -->
							<view 
								class="voice" 
								:class="{'voice-reverse': msgItem.id === 'a'?false:true}"
								v-if="msgItem.types === 2"
								:style="{width:`${calWidth(msgItem.message.time)}px`}"
								@tap="playAudio(msgItem)"
							>
								<image src="../../static/images/chatroom/voice-input.png" mode="aspectFill"></image>
								<span>
									{{msgItem.message.time}}
									<span>"</span>
								</span>
							</view>
							<!-- 地图类型信息 -->
							<view class="map-wrap" v-if="msgItem.types === 3">
								<view class="name text-overflow">
									{{msgItem.message.name}}
								</view>
								<view class="address text-overflow">
									{{msgItem.message.address}}
								</view>
								<view class="map-show" @tap="showLocation(msgItem)">
									<!-- <map
										class="map" 
										:latitude="msgItem.message.latitude" 
										:longitude="msgItem.message.longitude"
										:markers="handlCover(msgItem)"
									></map> -->
									<image class="map" src="../../static/images/chatroom/map.png" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view :style="{paddingBottom:`${padBottom}px`}"></view>
			</scroll-view>
		</view>
		<view class="chat-btm-wrap">
			<chat-btm @inptArea="inptArea" @handleHeight="handleHeight"></chat-btm>
		</view>
	</view>
</template>

<script>
	import chatHeader from '@/components/chat-header/chat-header.vue'
	import data from '@/mock/datas/index.js'
	import chatBtm from '@/components/chat-btm/chat-btm.vue'
	export default {
		data() {
			return {
				msgs:[],
				picUrls:[],
				scrollIntoV:'',
				animationLoading:{},
				loadingTimer:null,
				isShowLoading: false,
				padBottom:0,
				initPad:false,
				initTime:0,
				page:0,
				referenceTime: new Date()
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
				// 今年
				else if(_year === year){
					if(_hour < 10 ){
						_hour = `0${_hour}`
					}
					if(_minutes < 10){
						_minutes = `0${_minutes}`
					}
					return `${_month}月${_date}日 ${_hour}:${_minutes}`
				}else{
					if(_hour < 10 ){
						_hour = `0${_hour}`
					}
					if(_minutes < 10){
						_minutes = `0${_minutes}`
					}
					return `${_year}年${_month}月${_date}日 ${_hour}:${_minutes}`
				}
				// 大于今年
				
				
				
			}
		},
		components:{
			chatHeader,
			chatBtm
		},
		methods: {
			// 上拉加载历史消息
			async setTop(){
				if(!this.isShowLoading){
					this.isShowLoading = true
					++this.page
					await setTimeout(()=>{
						this.getMessageList(this.page)
						this.isShowLoading = false
					},2000)
				}
			},
			// loading
			 handleLoading(){
				 const animationLoading = uni.createAnimation({
				   duration: 1000,
				   timingFunction: "step-start",
				 })
				 let i = 0
				 this.loadingTimer = setInterval(()=>{
					 animationLoading.rotate(30*i).step()
					 this.animationLoading = animationLoading.export()
					 i++
				 }, 150)
			 },
			// 计算语音宽度
			calWidth(width){
				// 480是消息最宽像素 60秒暂定为最长语音
				return Math.ceil(480 * width / 60)
			},
			previewImage(msgItem){
				console.log(msgItem);
				const index = this.picUrls.findIndex(item=>{
					return item === msgItem.message
				})
				uni.previewImage({
					current: index,
					urls:this.picUrls,
					loop:true
				})
			},
			getMessageList(page = 0){
				console.log(page);
				const msgs = data.message()
				let msgsLen = msgs.length
				let distance = msgs.length - page * 10

				if(distance >= 10){
					for(let i = 10 * page; i < (page+1) * 10; i++){
						if(msgs[i].types === 1){
							this.picUrls.unshift(`../../static/images/template/${msgs[i].message}`)
							msgs[i].message = `../../static/images/template/${msgs[i].message}`
						}
						const time = this.spaceTime(this.referenceTime,msgs[i].time)
						if(time){
							this.referenceTime = time
						}
						msgs[i].time = time
						this.msgs.unshift(msgs[i])
					}
				}else{
					for(let i = 10 * page; i < (page) * 10 + distance; i++){
						if(msgs[i].types === 1){
							this.picUrls.unshift(`../../static/images/template/${msgs[i].message}`)
							msgs[i].message = `../../static/images/template/${msgs[i].message}`
						}
						const time = this.spaceTime(this.referenceTime,msgs[i].time)
						if(time){
							this.referenceTime = time
						}
						msgs[i].time = time
						this.msgs.unshift(msgs[i])
					}
				}
				this.$nextTick(()=>{
					const len = this.msgs.length
					this.scrollIntoV = `msg${this.msgs[len-this.page * 10 - 1]?.tip}`
				})
			},
			scrollToBottom(){
				this.$nextTick(()=>{
					const len = this.msgs.length
					this.scrollIntoV = `msg${this.msgs[len-1].tip}`
				})
			},
			spaceTime(old_time,current_time){
				const o_time = new Date(old_time)
				const c_time = new Date(current_time)
				const v_time = o_time - c_time
				if(v_time >  (60*5*1000)){
					return c_time
				}else{
					return ''
				}
			},
			handleHeight(height){
				this.padBottom = height
				// 同一个scrollIntoV 无法进行过渡 需要重置scrollIntoV 
				this.scrollIntoV  = ''
				this.scrollToBottom()
			},
			inptArea(value){
				const len = this.msgs.length
				let lastTime = this.msgs[len - 1]
				let c_time = new Date()
				let lock = false
				if(c_time - 1000*60*5 > this.initTime){
					this.initTime = c_time
					lock = true
				}else{
					lock = false
				}
				if(value.types === 1){
					this.picUrls.push(value.message)
				}
				const data = {
					id: 'b',
					imgUrl: '02.jpg',
					message: value.message,
					types: value.types,
					time: lock?this.initTime:'',
					tip:len
				}
				this.msgs.push(data)
				this.scrollIntoV = ''
				this.scrollToBottom()
			},
			playAudio(msgItem){
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = msgItem.message.voice
				// innerAudioContext.src = '../../static/voice/333.mp3'
				console.log(msgItem.message.voice)
				innerAudioContext.onPlay(() => {
				  console.log('开始播放');
				});
			},
			handlCover(item){
				const cover = [
					{
						latitude: item.message.latitude,
						longitude: item.message.longitude,
						iconPath: '../../static/images/chatroom/location.png',
						width: 20,
						height: 20
					}
				]
				return cover
			},
			showLocation(msgItem){
				uni.openLocation({
					latitude: msgItem.message.latitude,
					longitude: msgItem.message.longitude,
					name: msgItem.message.name,
					address: msgItem.message.address,
					success: function () {
						console.log('success');
					}
				});
			},
			// 进入群详情
			toGroupDetail(){
				uni.navigateTo({
					url:'/pages/groupdetail/groupdetail'
				})
			}
		},
		mounted(){
			this.getMessageList()
			this.handleLoading()
		}
	}
</script>

<style scoped lang="scss">
	
// @-webkit-keyframes rotateVbtn {
// 	  0% {
// 	  -webkit-transform:rotate(0);
// 	  -moz-transform:rotate(0);
// 	  -ms-transform:rotate(0);
// 	  -o-transform:rotate(0);
// 	  transform:rotate(0)
// 	}
// 	100% {
// 	  -webkit-transform:rotate(360deg);
// 	  -moz-transform:rotate(360deg);
// 	  -ms-transform:rotate(360deg);
// 	  -o-transform:rotate(360deg);
// 	  transform:rotate(360deg)}
// }
.chat-room{
	height: 100vh;
	background-color: #F4F4F4;
	overflow: hidden;
	// overflow-y: hidden
	// padding-bottom: 120rpx;
	.header{
		padding-top: 50rpx;
		.left{
			width: 48rpx;
			height: 48rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.middle{
			font-size: 40rpx;
			color: #272832;
		}
		.right{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			width: 100%;
			image{
				width: 68rpx;
				height: 68rpx;
			}
		}
	}
	.chat-main{
		height: calc(100% - 138rpx);
		box-sizing: border-box;
		padding: 8rpx 32rpx 0 32rpx;
		// margin-bottom: var(--status-bar-height);
		// padding-bottom: 200rpx;
		.loading-wrap{
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 60rpx;
				height: 60rpx;
				// animation:rotateVbtn 5s linear infinite;
			}
		}
		.msg-common{
			max-width: 480rpx;
			padding: 16rpx 24rpx;
			font-size: 32rpx;
			color: #272832;
			box-sizing: border-box;
			word-wrap: break-word;
			// line-height: 56rpx;
			display: flex;
			align-items: center;
			flex-flow: row wrap;
		}
		.msg-time{
			font-size: 24rpx;
			color: rgba(39,40,50,0.3);
			text-align: center;
			padding: 20rpx 0;
		}
		.icon-style{
			width: 80rpx;
			height: 80rpx;
			border-radius: 20rpx;
		}
		.user-commom{
			margin: 20rpx 0;
			.icon-msg{
				display: flex;
				margin-top: 20rpx;
				.msg{
					background-color: #FFFFFF;
					border-radius: 0 20rpx 20rpx 20rpx;
					margin-left: 20rpx;
					.world-break{
						word-break: break-all;
					}
					.msg-img{
						max-width: 240rpx;
						border-radius: 20rpx;
					}
					.voice{
						display: flex;
						align-items: center;
						image{
							width: 40rpx;
							height: 40rpx;
							transform: rotate(180deg);
						}
					}
					.voice-reverse{
						display: flex;
						flex-direction: row-reverse;
						image{
							transform: rotate(360deg);
						}
					}
					.map-wrap{
						
						.text-overflow{
							display: -webkit-box;
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
						}
						.name{
							padding: 18rpx 24rpx 0 24rpx;
						}
						.address{
							padding: 0 24rpx;
						}
						.map-show{
							padding-top: 8rpx;
							overflow: hidden;
							background-color: #eee;
							width: 100%;
							height: 250rpx;
							.map{
								width: 100%;
								height: 250rpx;
							}
						}
					}
				}
			}
		}
		.myself-right{
			.icon-msg{
				display: flex;
				flex-direction: row-reverse;
				margin-top: 20rpx;
				.msg{
					background-color: #FFE431;
					border-radius: 20rpx 0 20rpx 20rpx;
					margin-right: 20rpx;
					.world-break{
						word-break: break-all;
					}
					.mgs-img{
						border-radius: 20rpx;
					}
				}
			}
		}
		.pad-btm{
			// padding-bottom: 102rpx;
			// padding-bottom: var(--status-bar-height);
		}
	}
	.chat-btm-wrap{
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
	}
}
</style>
