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
						<image src="../../static/images/template/05.jpg" mode="aspectFill"></image>
					</view>
				</template>
			</chat-header>
		</view>
		<view class="chat-main">
			<scroll-view 
			:scroll-y="true" 
			:scroll-with-animation="true" 
			style="height: 100%;"
			:show-scrollbar="false"
			:scroll-into-view="scrollIntoV"
			:scroll-anchoring="true"
			>
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
							<view v-if="msgItem.types === 0" class="world-break">
								{{msgItem.message}}
							</view>
							<!-- :src="require(`../../static/images/template/${msgItem.message}`)" -->
							<image 
								v-if="msgItem.types === 1"
								class="msg-img"
								:src="msgItem.message"
								mode="widthFix"
								@tap="previewImage(msgItem)"
							></image>
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
	
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				msgs:[],
				picUrls:[],
				scrollIntoV:'',
				padBottom:'51',
				initPad:false,
				initTime:0,
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
			getMessageList(){
				const msgs = data.message()
				msgs.forEach(msg=>{
					// msg.imgUrl = `../../static/images/template/${msg.imgUrl}`
					if(msg.types === 1){
						this.picUrls.unshift(`../../static/images/template/${msg.message}`)
						msg.message = `../../static/images/template/${msg.message}`
					}
					const time = this.spaceTime(this.referenceTime,msg.time)
					if(time){
						this.referenceTime = time
					}
					msg.time = time
					this.msgs.unshift(msg)
				})
				this.scrollToBottom()
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
				console.log(height);
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
				console.log('我被执行了');
				innerAudioContext.src = msgItem.message.voice
				console.log(msgItem.message.voice);
				innerAudioContext.play()
			}
		},
		mounted(){
			this.getMessageList()
		}
	}
</script>

<style scoped lang="scss">
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
