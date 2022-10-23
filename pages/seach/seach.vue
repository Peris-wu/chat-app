<template>
	<view class="seach-page">
		<chat-header :headerLeft="false" :headerRightW="84">
			<template v-slot:middle>
				<view class="top-bar-middle">
					<input type="text" class="top-bar-input" @input="iptSearch"/>
					<image src="../../static/images/common/search@3x.png"></image>
				</view>
			</template>
			<template v-slot:right>
				<view class="top-bar-text" @tap="backTo">取消</view>
			</template>
		</chat-header>
		
		<view class="search-list">
			<view class="title" v-if="searchData.length > 0">
				<!-- <slot name="title-style">{{searchResult}}</slot> -->
				用户
			</view>
			<list-style :searchResult="searchData"></list-style>
		</view>
	</view>
</template>

<script>
	import chatHeader from '../../components/chat-header/chat-header.vue'
	import listStyle from './listStyle/listStyle.vue'
	import searchFunc from '@/mock/datas/index.js'
	export default {
		data() {
			return {
				iptValue:'',
				searchList:[],
				searchData:[],
				friendsList:[],
				searchResult:[
					{
						title:'用户',
						list:[
							{
								id: 1,
								imgUrl:'../../../static/images/template/02.jpg',
								name:'齐天大圣'
							}
						]
					},
					{
						title:'群组',
						list:[
							{
								id: 1,
								imgUrl:'../../../static/images/template/02.jpg',
								name:'齐天大圣'
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
			iptSearch(e){
				this.iptValue = e.target.value
				this.searchData = []
				this.searchList = searchFunc.users()
				this.friendsList = searchFunc.friends()
				const exp = eval(`/${this.iptValue}/g`)
				if(this.iptValue.length > 0){
					this.searchList.forEach(item=>{
						if(item.name.search(this.iptValue) !== -1){
							this.friendsList.forEach(firendItem=>{
								if(firendItem.firend === item.id){
									item.tip = 1
								}
							})
							item.name = item.name.replace(exp,"<block style='color:#4AAAFF;'>"+this.iptValue+"</block>")
							this.searchData.push(item)
						}
					})
				}
			},
			backTo(){
				uni.navigateBack(-1)
			}
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
			.title{
				font-size: 44rpx;
				color: #272832;
				letter-spacing: -0.75rpx;
				font-weight: 600;
			}
		}
	}
</style>
