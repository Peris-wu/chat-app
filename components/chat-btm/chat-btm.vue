<template>
	<view class="chat-btm">
		<view class="main">
			<!-- 键盘输入 -->
			<view class="left">
				<view>
					<image 
						:src="modeImg" 
						mode="aspectFill"
						@tap="triggerMode"
					></image>
				</view>
				<view class="textarea-style">
					<scroll-view scroll-y="true" class="scroll-v" v-show="isKeyboard">
						<textarea
							auto-height="true"
							style="width: 100%"
							v-model="inptValue"
							@input="inptArea"
							@focus="inptFocus"
						></textarea>
					</scroll-view>
					<view class="txt-center" v-show="!isKeyboard">
						按住说话
					</view>
				</view>
			</view>
			
			<!-- <view class="left" v-show="!isKeyboard">
				<view>
					<image src="../../static/images/chatroom/yy.png" mode="aspectFill"></image>
				</view>
				<view class="textarea-style">
					按住说话
				</view>
			</view> -->
			
			
			<view>
				<image 
					src="../../static/images/chatroom/emoji.png" 
					mode="aspectFill"
					@tap="showOption"
				></image>
			</view>
			<view>
				<image 
					class="add-img" 
					src="../../static/images/chatroom/add.png" 
					mode="aspectFill"
					@tap="add"
				></image>
			</view>
		</view>
		<view class="options" v-show="isShowOption">
			<view class="cancel-send">
				<view class="cancel">
					<image v-show="!inptLen" src="../../static/images/chatroom/cancel.png" mode="aspectFill"></image>
					<image 
						v-show="inptLen" 
						src="../../static/images/chatroom/cancel-b.png" 
						mode="aspectFill"
						@tap="cancelMsg"
					></image>
				</view>
				<view class="send" :class="{'send-extral':inptLen}" @tap="sendMsg">发送</view>
			</view>
			<emoji-view @emoji="emoji"></emoji-view>
		</view>
		<view class="option-add" v-show="isShowOptionAdd">
			<view class="o-item">
				<image @tap="send('album')" src="../../static/images/chatroom/photo.png" mode=""></image>
				<span class="title">照片</span>
			</view>
			<view class="o-item">
				<image src="../../static/images/chatroom/camer.png" mode=""></image>
				<span class="title">照片</span>
			</view>
			<view class="o-item">
				<image src="../../static/images/chatroom/position.png" mode=""></image>
				<span class="title">照片</span>
			</view>
			<view class="o-item">
				<image src="../../static/images/chatroom/video.png" mode=""></image>
				<span class="title">照片</span>
			</view>
			<view class="o-item">
				<image src="../../static/images/chatroom/file.png" mode=""></image>
				<span class="title">照片</span>
			</view>
		</view>
	</view>
</template>

<script>
	import emojiView from '@/components/emoji/emoji.vue'
	export default {
		name:"chat-btm",
		data() {
			return {
				areaHeight:0,
				isKeyboard: true,
				isShowOption: false,
				isShowOptionAdd:false,
				animationOption: {},
				inptValue:'',
				modeImg: '../../static/images/chatroom/yy.png'
			};
		},
		components:{
			emojiView
		},
		computed:{
			inptLen(){
				return this.inptValue.length > 0
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getElementStyle()
			})
		},
		methods:{
			triggerMode(){
				if(this.isKeyboard){
					this.isKeyboard = false
					this.modeImg = '../../static/images/chatroom/voice.png'
				}else{
					this.isKeyboard = true
					this.modeImg = '../../static/images/chatroom/yy.png'
				}
			},
			showOption(){
				// const animationOption = uni.createAnimation({
				//   duration: 300,
				//   timingFunction: "ease",
				// })
				if(this.isShowOptionAdd){
					this.isShowOptionAdd = false
				}
				this.isShowOption = !this.isShowOption
				// if(this.isShowOption){
				// 	animationOption.height(230).step()
				// }else{
				// 	animationOption.height(0).step()
				// }
				this.$nextTick(()=>{
					this.getElementStyle()
				})
				// this.animationOption = animationOption.export()
			},
			getElementStyle(bool){
				const query = uni.createSelectorQuery().in(this)
				query.select('.chat-btm').boundingClientRect(data=>{
					// this.clientHeight = data.height
					// console.log(data.height);
					this.$emit('handleHeight',data.height+20)
				}).exec()
			},
			inptArea(e){
				const value = e.detail.value
				if(value.indexOf('\n') !== -1 && value.length > 1){
					this.handlMsg(value,0)
					this.inptValue = ''
				}
			},
			emoji(emoji){
				
				this.inptValue += emoji
			},
			cancelMsg(){
				this.inptValue = this.inptValue.substring(0,this.inptValue.length - 1)
			},
			sendMsg(){
				if(this.inptValue.length > 0){
					this.handlMsg(this.inptValue,0)
					this.inptValue = ''
				}
			},
			inptFocus(){
				this.isShowOption = false
				this.isShowOptionAdd = false
				this.$nextTick(()=>{
					this.getElementStyle()
				})
			},
			add(){
				if(this.isShowOption){
					this.isShowOption = false
				}
				this.isShowOptionAdd = !this.isShowOptionAdd
			},
			// send
			send(label){
				let count
				label === 'album'?count = 9:count = 1
				uni.chooseImage({
					count: count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [label], //从相册选择
					success:  (res) =>{
						// console.log(JSON.stringify(res.tempFilePaths));
						// console.log(res.tempFilePaths);
						const imgList = res.tempFilePaths
						imgList.forEach(img=>{
							this.handlMsg(img,1)
						})
						const query = uni.createSelectorQuery().in(this)
						query.select('.chat-btm').boundingClientRect(data=>{
							// this.clientHeight = data.height
							console.log(data.height);
							this.$emit('handleHeight',data.height+150)
						}).exec()
					}
				});
			},
			handlMsg(message,types){
				const data = {
					message,
					types
				}
				this.$emit('inptArea',data)
			}
		}
	}
</script>

<style scoped lang="scss">
	.chat-btm{
		background-color: #F4F4F4;
		box-shadow: rgba(0,0,0,.1) 0 -1rpx 0 0;
			.main{
				display: flex;
				width: 100%;
				box-sizing: border-box;
				padding: 10rpx 32rpx;
				align-items: flex-end;
				image{
					width: 56rpx;
					height: 56rpx;
				}
				.left{
					display: flex;
					flex: 1;
					align-items: flex-end;
				}
				.textarea-style{
					flex: 1;
					background-color: #fff;
					margin: 0 20rpx;
					padding: 20rpx;
					box-sizing: border-box;
					border-radius: 10rpx;
					font-size: 24rpx;
					color: rgba(39,40,50,.6);
					.scroll-v{
						max-height: 210rpx;	
					}
					.txt-center{
						text-align: center;
						line-height: 42rpx;
					}
				}
				
				.inptStyle{
					flex: 1;
					max-height: 210rpx;
					background-color: #fff;
					margin: 0 20rpx;
					padding: 20rpx;
					box-sizing: border-box;
					border-radius: 10rpx;
					
				}
				.add-img{
					padding-left: 24rpx;
				}
			}
			.options{
				position: relative;
				width: 100%;
				height: 460rpx;
				background-color: rgba(237,238,239,1);
				.cancel-send{
					position: fixed;
					width: 260rpx;
					height: 120rpx;
					bottom: 0;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					// margin: 0 10rpx 10rpx 0;
					// box-sizing: border-box;
					// background-color: #999;
					background-color: rgba(236,237,238,0.8);
					.cancel{
						display: flex;
						width: 100rpx;
						height: 80rpx;
						justify-content: center;
						align-items: center;
						margin-right: 10rpx;
						border-radius: 10rpx;
						background-color: #fff;
						image{
							width: 48rpx;
							height: 38rpx;
						}
					}
					.send{
						display: flex;
						width: 100rpx;
						height: 80rpx;
						justify-content: center;
						align-items: center;
						border-radius: 10rpx;
						color: #aaa;
						background-color:#fff;
						// background-color: rgba(43, 238, 9, 0.9);
					}
					.send-extral{
						color: #fff;
						background-color: rgba(43, 238, 9, 0.9);
					}
				}
			}
			.option-add{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				height: 400rpx;
				box-sizing: border-box;
				padding: 20rpx;
				background-color: rgba(237,238,239,1);
				.o-item{
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 25%;
					image{
						width: 72rpx;
						height: 72rpx;
						padding: 24rpx;
						background-color: rgba(255,255,255,1);
						border-radius: 24rpx;
						margin-bottom: 10rpx;
					}
					.title{
						font-size: 24rpx;
						color: rgba(39,40,50,0.5);
					}
				}
			}
	}
</style>