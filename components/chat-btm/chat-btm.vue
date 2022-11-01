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
				<image class="add-img" src="../../static/images/chatroom/add.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="options" v-show="isShowOption" :animation="animationOption"></view>
	</view>
</template>

<script>
	export default {
		name:"chat-btm",
		data() {
			return {
				areaHeight:0,
				isKeyboard: true,
				isShowOption: false,
				animationOption: {},
				inptValue:'',
				modeImg: '../../static/images/chatroom/yy.png'
			};
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
					this.$emit('handleHeight',data.height)
				}).exec()
			},
			inptArea(e){
				const value = e.detail.value
				if(value.indexOf('\n') !== -1 && value.length > 1){
					this.$emit('inptArea',value)
					this.inptValue = ''
				}
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
				width: 100%;
				height: 460rpx;
				background-color: rgba(237,238,239,1);
				transition: all 0.3s ease;
			}
	}
</style>