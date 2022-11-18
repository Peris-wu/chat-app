<template>
	<view class="group-detail">
		<view class="bg">
			<image src="../../static/images/groupdetail/group-detail-bg.jpg" mode="aspectFill"></image>
		</view>
		<view class="header">
			<chat-header>
				<template v-slot:left>
					<view class="left">
						<image src="../../static/images/detail/arrow-left.png"></image>
					</view>
				</template>
				<template v-slot:middle>
					<view>
					</view>
				</template>
				<template v-slot:right>
					<view class="right">
						<image src="../../static/images/groupdetail/more1.png"></image>
					</view>
				</template>
			</chat-header>
		</view>
		<view class="detail">
			<view class="title-time-info">
				<view class="title-time">
					<view class="title">开心就好</view>
					<view class="time">2022/10/05</view>
				</view>
				<view class="info">
					风起的日子 笑看落花,雪舞的时节 举杯向月,这样的心情,这样的路,我们一起走过,
					希望你能爱我到地老到天荒,希望你能陪我到海角到天涯,就算一切重来,我也不会改变决定,
					我选择了你,你选择了我 喔
				</view>
			</view>
			<view class="group-member-wrap">
				<view class="title-manager">
					<view class="title">群成员</view>
					<view class="manager">
						成员管理
						<image src="../../static/images/groupdetail/more.png"></image>
					</view>
				</view>
				<view class="member-icon-wrap">
					<view class="item-wrap"  v-for="(item,index) in 7" :key="index">
						<view class="item">
							<image v-if="index === 0" src="../../static/images/groupdetail/delete.png"></image>
						</view>
						<view class="name">
							lorin
						</view>
					</view>
					<view class="item-add">
						<view class="add">
							<image src="../../static/images/groupdetail/add.png"></image>
						</view>
						<view class="text">邀请</view>
					</view>
				</view>
			</view>
			
			<view class="option-wrap">
				<option-view>
					<template v-slot:left>
						群名称
					</template>
					<template v-slot:r-text>
						开心就好
					</template>
				</option-view>
			</view>
			
			<view class="option-wrap">
				<option-view>
					<template v-slot:left>
						群公告
					</template>
					<template v-slot:r-text>
						特别的爱给特别库，大哭高科啊老哭特别的爱给特别库，大哭高科啊老哭特别的爱给特别库，大哭高科啊老哭
					</template>
				</option-view>
			</view>
			
			<view class="option-wrap">
				<option-view>
					<template v-slot:left>
						群内名
					</template>
					<template v-slot:r-text>
						高兴就好
					</template>
				</option-view>
			</view>
			
			<!-- 消息免打扰 -->
			<view class="dont-disturb-wrap">
				<view class="left">消息免打扰</view>
				<view class="right">
					<switch color="#FFCC33" :checked="checked"></switch>
				</view>
			</view>
			<!-- 退出群聊 -->
			<view class="signout-chat-wrap">
				退出群聊
			</view>
		</view>
	</view>
</template>

<script>
	import chatHeader from '@/components/chat-header/chat-header.vue'
	import optionView from '@/pages/groupdetail/optionview/optionview.vue'
	export default {
		data() {
			return {
				checked: false
			}
		},
		components:{
			chatHeader,
			optionView
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.group-detail{
	.bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 750rpx;
		z-index: -1;
		image{
			width: 100%;
			height: 750rpx;
		}
	}
	.detail{
		padding-top: 360rpx;
		width: 100%;
		min-height: 70%;
		.title-time-info{
			padding: 30rpx 32rpx 0;
			background-color: #fff;
			border-radius: 40rpx 40rpx 0 0;
			.title-time{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.title{
					font-size: 48rpx;
					color: #272832;
					font-weight: 600;
				}
				.time{
					font-size: 28rpx;
					color: rgba(39,40,50,0.50);
				}
			}
			.info{
				width: 100%;
				margin-top: 20rpx;
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2;
				font-size: 28rpx;
				color: #272832;
			}
		}
		.group-member-wrap{
			padding: 0 32rpx;
			background-color: #fff;
			.title-manager{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 48rpx;
				.title{
					font-size: 36rpx;
					color: #272832;
					font-weight: 600;
				}
				.manager{
					display: flex;
					align-items: center;
					font-size: 32rpx;
					color: rgba(39,40,50,0.60);
					image{
						width: 25rpx;
						height: 25rpx;
						margin-left: 20rpx;
					}
				}
			}
			.member-icon-wrap{
				display: flex;
				flex-wrap: wrap;
				gap: 40rpx;
				padding: 20rpx 0;
				.item-wrap{
					.item{
						position: relative;
						width: 104rpx;
						height: 104rpx;
						background-color: yellowgreen;
						border-radius: 20rpx;
						image{
							position: absolute;
							right: -14rpx;
							top: -10rpx;
							width: 40rpx;
							height: 40rpx;
						}
					}
					.name{
						display: -webkit-box;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:1;
						word-break: break-all;
						width: 104rpx;
						margin-top: 8rpx;
						text-align: center;
						font-size: 28rpx;
						color:#272832;
					}
				}
				.item-add{
					.add{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 104rpx;
						height: 104rpx;
						background-color: #FFE431;
						border-radius: 20rpx;
						image{
							width: 40rpx;
							height: 40rpx;
						}
					}
					.text{
						margin-top: 8rpx;
						font-size: 28rpx;
						color:#272832;
						text-align: center;
					}
				}
			}
		}
		.dont-disturb-wrap{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32rpx;
			height: 112rpx;
			.left{
				font-size: 32rpx;
				color: #272832;
			}
			.right{
				
			}
		}
		.signout-chat-wrap{
			display: flex;
			justify-content: center;
			align-items: flex-end;
			margin-top: 22rpx;
			padding: 0 32rpx;
			height: 60rpx;
			font-size: 32rpx;
			color: #FF5D5B;
		}
	}
	.header{
		.left{
			width: 48rpx;
			height: 48rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.right{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			width: 100%;
			height: 100%;
			image{
				width: 68rpx;
				height: 14rpx;
			}
		}
	}
}
</style>
