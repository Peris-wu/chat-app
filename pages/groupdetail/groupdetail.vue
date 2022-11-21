<template>
	<view class="group-detail">
		<view class="bg">
			<image :src="imgUrl" mode="aspectFill"></image>
		</view>
		<view class="header" :style="{backgroundColor: !triggerPic?'':'#fff'}">
			<chat-header :isShowShadow="false">
				<template v-slot:left>
					<view class="left">
						<image 
							src="../../static/images/createchatgroup/back1.png"
							v-show="!triggerPic"
						>
						</image>
						<image 
							v-show="triggerPic" 
							src="../../static/images/createchatgroup/back.png"
						></image>
					</view>
				</template>
				<template v-slot:middle>
					<view>
					</view>
				</template>
				<template v-slot:right>
					<view class="right">
						<image 
							src="../../static/images/groupdetail/more1.png"
							v-show="!triggerPic"
						>
						</image>
						<image 
							src="../../static/images/createchatgroup/more.png"
							v-show="triggerPic" 
						>
						</image>
					</view>
				</template>
			</chat-header>
		</view>
		<view class="detail-wrap">
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
				
				<view class="option-wrap" @tap="triggerEditor('groupName')">
					<option-view>
						<template v-slot:left>
							群名称
						</template>
						<template v-slot:r-text>
							{{groupName}}
						</template>
					</option-view>
				</view>
				
				<view class="option-wrap">
					<option-view>
						<template v-slot:left>
							群头像
						</template>
						<template v-slot:r-text>
							<view style="display: flex;height: 100%;width: 100%;align-items: center">
								<yq-avatar
									class="group-img"
									selWidth="200px" 
									selHeight="400upx" 
									@upload="myUpload" 
									:avatarSrc="imgUrl"
									avatarStyle="width: 80upx; height: 80upx; border-radius: 20upx;"
								></yq-avatar>
								<!-- <image class="group-img" src="../../static/images/groupdetail/group-detail-bg.jpg"></image> -->
							</view>
						</template>
					</option-view>
				</view>
				
				<view class="option-wrap" @tap="triggerEditor('groupNotice')">
					<option-view>
						<template v-slot:left>
							群公告
						</template>
						<template v-slot:r-text>
							{{groupNotice}}
						</template>
					</option-view>
				</view>
				
				<view class="option-wrap" @tap="triggerEditor('groupAliaName')">
					<option-view>
						<template v-slot:left>
							群内名
						</template>
						<template v-slot:r-text>
							{{groupAliaName}}
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
		<!-- 群名称弹出层 -->
		<view class="editor-wrap"  :style="{bottom:`${-clientHeight}px`}" :animation="animationGroupName">
			<editor-info @cancel="cancel('groupName')" @achivement="achivementSignature" :data="groupName">
				<template v-slot:middle>
					<view class="middle">
						修改群名称
					</view>
				</template>
			</editor-info>
		</view>
		
		<!-- 群公告弹出层 -->
		<view class="editor-wrap"  :style="{bottom:`${-clientHeight}px`}" :animation="animationGroupNotice">
			<editor-info @cancel="cancel('groupNotice')" @achivement="modifyGroupNotice" :data="groupNotice">
				<template v-slot:middle>
					<view class="middle">
						修改群公告
					</view>
				</template>
			</editor-info>
		</view>
		
		<!-- 群公告弹出层 -->
		<view class="editor-wrap"  :style="{bottom:`${-clientHeight}px`}" :animation="animationGroupAliaName">
			<editor-info @cancel="cancel('groupAliaName')" @achivement="modifyGroupAliaName" :data="groupAliaName">
				<template v-slot:middle>
					<view class="middle">
						修改群内名
					</view>
				</template>
			</editor-info>
		</view>
	</view>
</template>

<script>
	import chatHeader from '@/components/chat-header/chat-header.vue'
	import optionView from '@/pages/groupdetail/optionview/optionview.vue'
	import yqAvatar from '../../components/yq-avatar/yq-avatar.vue'
	import editorInfo from '@/components/editorinfo/editorinfo.vue'
	export default {
		data() {
			return {
				checked: false,
				headerH: 0,
				offsetHeader: 0,
				triggerPic: false,
				imgUrl: '../../static/images/groupdetail/group-detail-bg.jpg',
				clientHeight: 0,
				animationGroupName: {},
				animationGroupNotice: {},
				animationGroupAliaName:{},
				isShowSignTure: false,
				groupName: '开心就好',
				groupNotice: '怀念逝去的英雄本色,怀念逝去的英雄本色,怀念逝去的英雄本色',
				groupAliaName: '高兴就好'
			}
		},
		components:{
			chatHeader,
			optionView,
			yqAvatar,
			editorInfo
		},
		mounted(){
			this.calcHeaderH()
			this.getElementStyle()
		},
		methods: {
			calcHeaderH(){
				const query = uni.createSelectorQuery().in(this)
				query.select('.header').boundingClientRect(data=>{
					this.headerH = data.height
				}).exec()
			},
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this)
				query.select('.detail').boundingClientRect(data=>{
					this.offsetHeader = data.top - this.headerH
					console.log(this.headerH);
					console.log(this.offsetHeader);
					if(this.offsetHeader <= 0){
						console.log('1111');
						this.triggerPic = true
					}else{
						this.triggerPic = false
					}
				}).exec()
			},
			// 修改头像
			myUpload(data){
				this.imgUrl = data.path
			},
			// 获取盒子高度
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this)
				query.select('.editor-wrap').boundingClientRect(data=>{
					this.clientHeight = data.height
				}).exec()
			},
			// 弹出层取消
			cancel(signal){
				this.triggerEditor(signal)
			},
			// 群名称
			achivementSignature(data){
				console.log(data);
				this.groupName = data
				this.triggerEditor('groupName')
			},
			// 群公告
			modifyGroupNotice(data){
				this.groupNotice = data
				this.triggerEditor('groupNotice')
			},
			// 群内名
			modifyGroupAliaName(data){
				this.groupAliaName = data
				this.triggerEditor('groupAliaName')
			},
			triggerEditor(signal){
				const animationGroupName = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationNotice = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const groupAliaName = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationEmail = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				this.isShowSignTure = !this.isShowSignTure
				if(this.isShowSignTure){
					if(signal==='groupName'){
						animationGroupName.bottom(0).step()
					}else if(signal==='groupNotice'){
						animationNotice.bottom(0).step()
					}else if(signal==='groupAliaName'){
						groupAliaName.bottom(0).step()
					}else if(signal==='email'){
						animationEmail.bottom(0).step()
					}
				}else{
					if(signal==='groupName'){
						animationGroupName.bottom(-this.clientHeight).step()
					}else if(signal==='groupNotice'){
						animationNotice.bottom(-this.clientHeight).step()
					}else if(signal==='groupAliaName'){
						groupAliaName.bottom(-this.clientHeight).step()
					}else if(signal==='email'){
						animationEmail.bottom(-this.clientHeight).step()
					}
				}
				this.animationGroupName = animationGroupName.export()
				this.animationGroupNotice = animationNotice.export()
				this.animationGroupAliaName = groupAliaName.export()
				this.animationEmail = animationEmail.export()
			}
		},
		onPageScroll(e){
			// console.log(e);
			this.getElementStyle()
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
	.detail-wrap{
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
		.option-wrap{
			background-color: #fff;
			.group-img{
				width: 80rpx;
				height: 80rpx;
				border-radius: 20rpx;
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
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		// background-color: red;
		z-index: 0;
		transition: all .8s ease;
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
	.editor-wrap{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #fff;
		.middle{
			font-size: 40rpx;
			color: #272832;
		}
		.right{
			font-size: 32rpx;
			text-align: right;
		}
	}
}
</style>
