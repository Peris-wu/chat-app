<template>
	<view class="seach-page">
		<chat-header :headerLeft="false" :headerRightW="84">
			<template v-slot:middle>
				<view class="top-bar-middle">
					<input type="text" class="top-bar-input"/>
					<image src="../../static/images/common/search@3x.png"></image>
				</view>
			</template>
			<template v-slot:right>
				<view class="top-bar-text">取消</view>
			</template>
		</chat-header>
		
		<view class="search-list">
			<list-style v-for="item in searchResult" :key="item.title" :searchResult="item"></list-style>
		</view>
	</view>
</template>

<script>
	import chatHeader from '../../components/chat-header/chat-header.vue'
	import listStyle from './listStyle/listStyle.vue'
	export default {
		data() {
			return {
				searchResult:[
					{
						title:'用户',
						list:[
							{
								id: 1,
								imgUrl:'',
								name:''
							}
						]
					},
					{
						title:'群组',
						list:[
							{
								id: 1,
								imgUrl:'',
								name:''
							}
						]
					}
				]
			}
		},
		components:{
			chatHeader,
			listStyle
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.seach-page{
		.top-bar-middle{
			position: relative;
			.top-bar-input{
				text-align: left;
				background-color: $uni-bg-color-grey;
				padding: 8rpx;
				border-radius: 10rpx;
			}
			image{
				position: absolute;
				right: 12rpx;
				top: 50%;
				transform: translateY(-50%);
				width: 40rpx;
				height: 40rpx;
			}
		}
		.top-bar-text{
			width: 100%;
			padding-left: 30rpx;
			font-size: 28rpx;
			color: #272832;
		}
		.search-list{
			margin-top: 34rpx;
			padding: $uni-padding-lr;
		}
	}
</style>
