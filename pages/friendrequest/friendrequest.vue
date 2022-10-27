<template>
	<view class="friend-request">
		<view class="header">
			<chat-header>
				<template v-slot:left>
					<view class="left">
						<image src="../../static/images/register/arrow-left-bold.png"></image>
					</view>
				</template>
				<template v-slot:middle>
					<span class="middle">好友请求</span>
				</template>
				<template v-slot:right>
					<view></view>
				</template>
			</chat-header>
		</view>
		<view class="request-list">
			<request-component></request-component>
			<request-component></request-component>
			<request-component></request-component>
		</view>
	</view>
</template>

<script>
	import chatHeader from '@/components/chat-header/chat-header.vue'
	import requestComponent from '@/pages/friendrequest/requestComponent/requestComponent.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			chatHeader,
			requestComponent
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
 .friend-request{
	 .header{
		 background-color: rgba(255,255,255,0.96);
		 .left{
			 image{
				 width: 48rpx;
				 height: 48rpx;
			 }
		 }
		 .middle{
			 font-size: 40rpx;
			 color: #272832;
		 }
	 }
	 .request-list{
		 display: flex;
		 flex-direction: column;
		 align-items: center;
		 padding: 10rpx 0 88rpx;
	 }
 }
</style>
