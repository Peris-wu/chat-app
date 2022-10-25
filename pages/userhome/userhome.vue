<template>
	<view class="user-home">
		<view class="header">
			<chat-header :headerMiddle="false">
				<template v-slot:left>
					<view class="left">
						<image src="../../static/images/register/arrow-left-bold.png" mode=""></image>
					</view>
				</template>
				<template v-slot:right>
					<view class="right">
						<image src="../../static/images/userhome/more.png"></image>
					</view>
				</template>
			</chat-header>
		</view>
		<view class="main">
			<view class="bg" :animation="animationBgc">	
			</view>
			<image class="blurImage" src="../../static/images/userhome/tx.jpg" mode="aspectFill"></image>
			<view class="user-info">
				<view class="pic" :animation="animationPic">
					<image src="../../static/images/userhome/tx.jpg" mode="aspectFill"></image>
					<view class="sex" :animation="animationIcon">
						<image src="../../static/images/userhome/woman.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="name">快乐游戏酱</view>
				<view class="nick">昵称：黑酱</view>
				<view class="intro">
					夜，结束了一天的喧嚣后安静下来，伴随着远处路灯那微弱的光。风，毫无预兆地席卷整片旷野，撩动人的思绪万千。
				</view>
			</view>
		</view>
		<view class="add-friend">
			<bottom-btn @rightBtn="addFriend"></bottom-btn>
		</view>
		
		<view class="send-wrap" :style="{height:`${clientHeight}px`,bottom:`${-clientHeight}px`}" :animation="animationWrap">
			<view class="name">快乐游戏酱</view>
			<view class="area-wrap">
				<textarea name="" maxlength="120" :value="'亲爱的,快点来到我这里~'"></textarea>
			</view>
			<view class="bottom-btn-wrap" :animation="animationBtns">
				<bottom-btn :hasLeftBtn="true"  @rightBtn="sendBtn" @leftBtn="cancelBtn">
					<template v-slot:right>
						发送
					</template>
				</bottom-btn>
			</view>
		</view>
	</view>
</template>

<script>
	import chatHeader from '@/components/chat-header/chat-header.vue'
	import bottomBtn from '@/components/bottom-btn/bottom-btn.vue'
	export default {
		data() {
			return {
				clientHeight:0,
				animationWrap:{},
				animationBtns:{},
				animationCancelBtn:{},
				animationPic:{},
				animationIcon:{},
				animationBgc:{},
				isAddFriends: false
			}
		},
		mounted(){
			this.getElementStyle()
			// if(this.$route.query.tip === '1'){
			// 	this.createAnimation()
			// }
		},
		methods: {
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this)
				query.select('.bg').boundingClientRect(data=>{
					this.clientHeight = data.height - 186
				}).exec()
			},
			createAnimation(){
				this.isAddFriends = !this.isAddFriends
				const animationWrap = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationBtns = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationCancelBtn = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationPic = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationIcon = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationBgc = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				if(this.isAddFriends){
					// 显示
					animationWrap.bottom(0).step()
					animationBtns.bottom(0).step()
					animationPic.width(120).height(120).translateX(-80).translateY(40).step()
					animationIcon.width(20).height(20).step()
					animationBgc.backgroundColor('rgba(255,228,49,0.6)').step()
				}else{
					// 隐藏
					animationWrap.bottom(-this.clientHeight).step()
					animationBtns.bottom(-156).step()
					animationPic.width(200).height(200).step()
					animationIcon.width(32).height(32).step()
					animationBgc.backgroundColor('rgba(255,228,49,0)').step()
				}
				this.animationWrap = animationWrap.export()
				this.animationBtns = animationBtns.export()
				this.animationPic = animationPic.export()
				this.animationIcon = animationIcon.export()
				this.animationBgc = animationBgc.export()
			},
			cancelBtn(){
				this.createAnimation()
			},
			sendBtn(){
			},
			addFriend(){
				this.createAnimation()
			}
		},
		components:{
			chatHeader,
			bottomBtn
		}
	}
</script>

<style scoped lang="scss">
	.user-home{
		.header{
			.left{
				display: flex;
				width: 100%;
				height: 68rpx;
				align-items: center;
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}
			.right{
				display: flex;
				width: 100%;
				height: 88rpx;
				justify-content: flex-end;
				align-items: center;
				image{
					width: 52rpx;
					height: 12rpx;
				}
			}
		}
		.main{
			.bg{
				position: fixed;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				z-index: -1;
			}
			.blurImage{
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				filter: blur(24rpx);
				z-index: -2;
			}
			.pic{
				position: relative;
				width: 400rpx;
				height: 400rpx;
				border-radius: 48rpx;
				border: 6rpx solid #ffffff;
				z-index: 99;
				.sex{
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					right: 10rpx;
					bottom: 10rpx;
					width: 64rpx;
					height: 64rpx;
					border-radius: 56rpx;
					background: #FF5D5B;
					z-index: 11;
					image{
						width: 50%;
						height: 50%;
					}
				}
				image{
					width: 100%;
					height: 100%;
					border-radius: 48rpx;
				}
			}
			.name{
				padding-top: 48rpx;
				font-size: 52rpx;
				color: #272832;
			}
			.nick{
				font-size: 28rpx;
				padding: 10rpx 0;
			}
			.user-info{
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 60rpx;
				font-size: 28rpx;
				color: #272832;
				font-family: PingFangSC-Light;
				line-height: 48rpx;
				.intro{
					width: 552rpx;
					opacity: 0.8;
				}
			}
		}
		.add-friend{
			position: fixed;
			width: 100%;
			bottom: 0;
		}
		.send-wrap{
			position: fixed;
			width: 100%;
			background: #ffffff;
			border-radius: 40rpx 40rpx 0 0;
			.name{
				padding: 250rpx 0 0 60rpx;
				font-size: 52rpx;
				color: #272832;
			}
			.area-wrap{
				margin: 40rpx 56rpx;
				box-sizing: border-box;
				padding: 10rpx;
				// min-height: 450rpx;
				background: #F3F4F6;
				textarea{
					width: 100%;
				}
			}
			.bottom-btn-wrap{
				position: fixed;
				width: 100%;
				bottom: -156rpx;
			}
		}
	}
</style>
