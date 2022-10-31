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
						></textarea>
					</scroll-view>
					<view v-show="!isKeyboard" class="txt-center">
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
				<image src="../../static/images/chatroom/emoji.png" mode="aspectFill"></image>
			</view>
			<view>
				<image class="add-img" src="../../static/images/chatroom/add.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"chat-btm",
		data() {
			return {
				areaHeight:0,
				isKeyboard: true,
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
					min-height: 72rpx;
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
	}
</style>