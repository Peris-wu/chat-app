<template>
	<view class="chat-group">
		<view class="header">
			<chat-header>
				<template v-slot:left>
					<span class="left-text">取消</span>
				</template>
				<template v-slot:middle>
					<span class="middle-text">创建群聊</span>
				</template>
				<template v-slot:right>
					<view></view>
				</template>
			</chat-header>
		</view>
		<view class="main">
			<view class="icon-name-title">
				<view class="group-icon">
					<!-- <image src="../../static/images/createchatgroup/group.png"></image> -->
					<view class="group-icon-bg">
						<yq-avatar
							selWidth="200px"
							selHeight="400upx" 
							@upload="changeGroupIcon"
							:avatarSrc="defaultAvatar"
						></yq-avatar>
					</view>
					<!-- <image src="../../static/images/createchatgroup/change.png" class="icon-pan"></image> -->
				</view>
				<view class="group-name">
					<input type="text" placeholder="群名称群名称" /> 
				</view>
				<view class="title">用户</view>
			</view>
			<view class="user-list-wrap" :style="{height:`${calcH}px`}">
				<view class="user-list">
					<checkbox-group>
						<label class="list-item" v-for="item in items" :key="item.value">
							<view>
								<checkbox class="custom-checkbox" :value="item.value" :checked="item.checked" />
							</view>
							<view class="user-icon">
								<image src="../../static/images/template/02.jpg"></image>
							</view>
							<view class="user-name">
								<span>
									武动乾坤
								</span>
							</view>
						</label>
					</checkbox-group>
				</view>
			</view>
		</view>
		<view class="create-btn-wrap">
			<view class="create-btn">
				<span>创建</span>
				<span>()</span>
			</view>
		</view>
	</view>
</template>

<script>
	import chatHeader from '@/components/chat-header/chat-header.vue'
	import yqAvatar from '@/components/yq-avatar/yq-avatar.vue'
	export default {
		data() {
			return {
				defaultAvatar:'../../static/images/createchatgroup/group.png',
				sumH:0,
				headerH:0,
				iconInptH:0,
				btmH:0,
				items: [{
						value: 'USA',
						name: '美国'
					},
					{
						value: 'CHN',
						name: '中国',
						checked: 'true'
					},
					{
						value: 'CHNN',
						name: '中国',
						checked: 'true'
					}
				]
			}
		},
		components:{
			chatHeader,
			yqAvatar
		},
		computed:{
			calcH(){
				const result = this.sumH - this.headerH - this.iconInptH - this.btmH
				console.log(this.sumH);
				console.log(this.headerH);
				console.log(this.iconInptH );
				console.log(this.btmH);
				console.log(result);
				return result
			}
		},
		methods: {
			// 修改群头像
			changeGroupIcon(iconPath){
				this.defaultAvatar = iconPath.path
			},
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this)
				query.select('.header').boundingClientRect(data=>{
					// this.clientHeight = data.height
					// sumH:0,
					// headerH:0,
					// iconInptH:0,
					// btmH:0,
					this.headerH = data.height
				})
				query.select('.icon-name-title').boundingClientRect(data=>{
					this.iconInptH = data.height
				})
				query.select('.chat-group').boundingClientRect(data=>{
					this.sumH = data.height
				})
				query.select('.create-btn-wrap').boundingClientRect(data=>{
					this.btmH = data.height
				})
				query.exec()
			}
		},
		mounted(){
			this.getElementStyle()
		}
	}
</script>

<style scoped lang="scss">
.chat-group{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	.header{
		color: #272832;
		.left-text{
			font-size: 32rpx;
		}
		.middle-text{
			font-size: 40rpx;
		}
	}
	.main{
		.icon-name-title{
			.group-icon{
				position: relative;
				display: flex;
				justify-content: center;
				padding: 60rpx 0;
				image{
					width: 196rpx;
					height: 196rpx;
					border-radius: 40rpx;
				}
				.group-icon-bg{
					width: 196rpx;
					height: 196rpx;
					background-color: #FFE431;
					border-radius: 40rpx;
					box-shadow: 0px 18px 20px 0px rgba(39,40,50,0.1);
					::v-deep .my-avatar{
						width: 196rpx;
						height: 196rpx;
						border-radius: 40rpx;
					}
				}
				.icon-pan{
					position: absolute;
					left: 50%;
					top: 50%;
					background-color: transparent;
					transform: translate(-50%,-50%);
					width: 40rpx;
					height: 40rpx;
					z-index: 0;
				}
			}
			.group-name{
				padding: 0 32rpx;
				input{
					width: 686rpx;
					height: 92rpx;
					background-color: #F3F4F6;
					border-radius: 46rpx;
					text-align: center;
				}
			}
			.title{
				margin-top: 40rpx;
				padding: 0 32rpx 20rpx 32rpx;
				font-size: 44rpx;
				color: #272832;
				font-weight: 600;
			}
		}
		.user-list-wrap{
			padding: 0 32rpx;
			.user-list{
				// padding-top: 20rpx;
				.list-item{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					height: 80rpx;
					margin-bottom: 40rpx;
					.custom-checkbox{
						width: 48rpx;
						height: 48rpx;
						background: #FFE431;
						border-radius: 24rpx;
						::v-deep .uni-checkbox-input{
							width: 48rpx;
							outline: none;
							border: none;
							background-color: transparent;
							border-radius: 0;
						}
					}
					.user-icon{
						margin: 0 32rpx;
						image{
							width: 80rpx;
							height: 80rpx;
							border-radius: 20rpx;
						}
					}
					.user-name{
						font-size: 36rpx;
						color: #272832;
					}
				}
			}
		}
	}
	.create-btn-wrap{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 168rpx;
		background-color: #FAFAFA;
		box-sizing: border-box;
		padding: 0 32rpx;
		box-shadow: inset 0px 0.5rpx 0px 0px rgba(0,0,0,0.1);
		.create-btn{
			width: 686rpx;
			height: 80rpx;
			color: #272832;
			font-size: 32rpx;
			margin-top: 12rpx;
			background-color: #FFE431;
			border-radius: 10rpx;
			line-height: 80rpx;
			text-align: center;
		}
	}
}
</style>
