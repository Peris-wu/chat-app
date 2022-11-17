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
					<input type="text" placeholder="群名称群名称" v-model="groupName"/> 
				</view>
				<view class="title">用户</view>
			</view>
			<view class="user-list-wrap">
				<view class="user-list" :style="{height:`${calcH}px`}">
					<scroll-view scroll-y scroll-with-animation enable-flex style="height: 100%;">
						<!-- <checkbox-group>
							<label class="list-item" v-for="(item,index) in items" :key="index">
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
						</checkbox-group> -->
						<view 
							v-for="(item,index) in items" 
							:key="index" 
							class="list-item"
							@tap="chooseUser(item,index)"
						>
							<view class="custom-checkbox" :class="{checked: item.isChoose}">
								<image 
									v-if="item.isChoose" 
									src="../../static/images/createchatgroup/choose.png" 
									mode="aspectFill"
								>
								</image>
							</view>
							<view class="user-icon">
								<image :src="item.imgUrl" mode="aspectFill"></image>
							</view>
							<view class="user-name">
									{{item.name}}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="create-btn-wrap">
			<view 
				class="default-btn" 
				:class="{'create-btn':choosedUsers && groupName.trim().length}"
				@tap="createGroup"
			>
				<span>创建</span>
				<span>({{choosedUsers}})</span>
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
				groupName: '',
				items: [
					{
						id:0,
						isChoose:true,
						imgUrl: '../../static/images/template/02.jpg',
						name:'武动乾坤'
					},
					{
						id:1,
						isChoose:false,
						imgUrl: '../../static/images/template/02.jpg',
						name:'斗破苍穹'
					},
					{
						id:3,
						isChoose:false,
						imgUrl: '../../static/images/template/02.jpg',
						name:'完美世界'
					},
					{
						id:4,
						isChoose:false,
						imgUrl: '../../static/images/template/02.jpg',
						name:'遮天'
					},
					{
						id:5,
						isChoose:false,
						imgUrl: '../../static/images/template/02.jpg',
						name:'凡人修仙传'
					},
					{
						id:6,
						isChoose:false,
						imgUrl: '../../static/images/template/02.jpg',
						name:'仙逆'
					},
					{
						id:7,
						isChoose:false,
						imgUrl: '../../static/images/template/02.jpg',
						name:'圣墟'
					},
					{
						id:8,
						isChoose:false,
						imgUrl: '../../static/images/template/02.jpg',
						name:'大主宰'
					},
					{
						id:9,
						isChoose:false,
						imgUrl: '../../static/images/template/02.jpg',
						name:'斗罗大陆'
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
				return result
			},
			choosedUsers(){
				let result = 0
				this.items.forEach(item=>{
					if(item.isChoose) result++
				})
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
			},
			// 选择添加好友进群
			chooseUser(item,index){
				this.items[index].isChoose = !this.items[index].isChoose
			},
			createGroup(){
				if(!this.choosedUsers || !this.groupName.trim().length)return
				console.log('created success!!');
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
					// max-height: 100rpx;
					height: 80;
					margin-bottom: 40rpx;
					.custom-checkbox{
						position: relative;
						width: 48rpx;
						height: 48rpx;
						background: rgba(255,228,49,0.50);
						// background: #FFE431;
						border-radius: 24rpx;
						image{
							position: absolute;
							left: 50%;
							top: 50%;
							width: 30rpx;
							height: 20rpx;
							transform: translate(-50%,-50%);
						}
					}
					.checked{
						background: #FFE431;
					}
					.user-icon{
						display: flex;
						height: 100%;
						align-items: center;
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
		.default-btn{
			width: 686rpx;
			height: 80rpx;
			color: #272832;
			font-size: 32rpx;
			margin-top: 12rpx;
			background-color: #eee;
			border-radius: 10rpx;
			line-height: 80rpx;
			text-align: center;
		}
		.create-btn{
			background-color: #FFE431;
		}
	}
}
</style>
