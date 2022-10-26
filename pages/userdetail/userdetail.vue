<template>
	<view class="detail">
		<view class="header">
			<chat-header>
				<template v-slot:left>
					<view class="left">
						<image src="../../static/images/register/arrow-left-bold.png" mode=""></image>
					</view>	
				</template>
				<template v-slot:middle>
					<view class="middle">
						详情
					</view>	
				</template>
				<template v-slot:right>
					<view class="right">
					</view>	
				</template>
			</chat-header>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">头像</span>
			</view>
			<view class="right">
				<yq-avatar 
					class="icon"
					selWidth="200px" 
					selHeight="400upx" 
					@upload="myUpload" 
					:avatarSrc="imgUrl"
				></yq-avatar>
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">签名</span>
			</view>
			<view class="right" @tap="triggerEditor('signature')">
				<view class="signture common">{{signature}}</view>
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option line">
			<view class="left">
				<span class="title">注册</span>
			</view>
			<view class="right">
				<view class="common">2022-01-15 23:33:45</view>
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
				<!-- <picker mode="date" :value="date">
					<view class="uni-input">{{date}}</view>
				</picker> -->
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">昵称</span>
			</view>
			<view class="right" @tap="editorNick">
				<view class="common">{{nick}}</view>
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">性别</span>
			</view>
			<view class="right">
				<view class="common">
					<picker @change="changeSex" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">生日</span>
			</view>
			<view class="right">
				<view class="common">
					<picker mode="date" @change="changeDate" :value="time" style="height: 100%;">
						<view class="uni-input">{{time}}</view>
					</picker>
				</view>
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option">
			<view class="left">
				<span class="title">电话</span>
			</view>
			<view class="right" @tap="editorPhone">
				<view class="common">{{phone}}</view>
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option line">
			<view class="left">
				<span class="title">邮箱</span>
			</view>
			<view class="right" @tap="editorEmail">
				<view class="common">{{email}}</view>
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="option line">
			<view class="left">
				<span class="title">密码</span>
			</view>
			<view class="right">
				<view class="common">******</view>
				<image class="arrow-left" src="../../static/images/register/arrow-left-bold.png"></image>
			</view>
		</view>
		<view class="bottom-btn-wrap">
			<bottom-btn>
				<template v-slot:right>
					<view class="btn-bg">
					退出应用
					</view>
				</template>
			</bottom-btn>
		</view>
		
		<!-- 签名弹出层 -->
		<view class="editor-wrap"  :style="{bottom:`${-clientHeight}px`}" :animation="animationSignature">
			<editor-info @cancel="cancel('signature')" @achivement="achivementSignature" :data="signature">
				<template v-slot:middle>
					<view class="middle">
						修改签名
					</view>
				</template>
			</editor-info>
		</view>
		<!-- 昵称弹出层 -->
		<view class="editor-wrap" :style="{bottom:`${-clientHeight}px`}" :animation="animationNick">
			<editor-info :editorType="'input'" @cancel="cancel('nick')" @achivement="achivementNick" :data="nick">
				<template v-slot:middle>
					<view class="middle">
						修改昵称
					</view>
				</template>
			</editor-info>
		</view>
		<!-- 电话弹出层 -->
		<view class="editor-wrap" :style="{bottom:`${-clientHeight}px`}" :animation="animationPhone">
			<editor-info :editorType="'input'" @cancel="cancel('phone')" @achivement="achivementPhone" :data="phone">
				<template v-slot:middle>
					<view class="middle">
						修改电话
					</view>
				</template>
			</editor-info>
		</view>
		<!-- 邮箱弹出层 -->
		<view class="editor-wrap" :style="{bottom:`${-clientHeight}px`}" :animation="animationEmail">
			<editor-info :editorType="'input'" @cancel="cancel('email')" @achivement="achivementEmail" :data="email">
				<template v-slot:middle>
					<view class="middle">
						修改邮箱
					</view>
				</template>
			</editor-info>
		</view>
	</view>
</template>

<script>
	import chatHeader from '../../components/chat-header/chat-header.vue'
	import bottomBtn from '../../components/bottom-btn/bottom-btn.vue'
	import yqAvatar from '../../components/yq-avatar/yq-avatar.vue'
	import editorInfo from '@/components/editorinfo/editorinfo.vue'
	export default {
		data() {
			return {
				imgUrl:'',
				clientHeight:0,
				animationSignature:{},
				animationNick:{},
				animationPhone:{},
				animationEmail:{},
				isShowSignTure:false,
				signature:'看没看懂阿凡达，的局啊地卡斯蒂略噩看没看懂阿凡达，的局啊地卡斯蒂略噩',
				array: ['男', '女', '未知'],
				index:0,
				time: '',
				nick:'666',
				inptValue:'',
				phone:'',
				email:''
			}
		},
		mounted(){
			this.getElementStyle()
		},
		methods: {
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this)
				query.select('.editor-wrap').boundingClientRect(data=>{
					this.clientHeight = data.height
					console.log(data);
				}).exec()
			},
			chooseImg(){
				// console.log(123);
				uni.chooseImage({
					count:1,
					sourceType:['album','camera'],
					success:(res)=>{
						console.log(res);
						this.imgUrl = res.tempFilePaths.shift()
					}
				})
			},
			triggerEditor(signal){
				const animationSignature = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationNick = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationPhone = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				const animationEmail = uni.createAnimation({
				  duration: 300,
				  timingFunction: "ease",
				})
				this.isShowSignTure = !this.isShowSignTure
				if(this.isShowSignTure){
					if(signal==='signature'){
						animationSignature.bottom(0).step()
					}else if(signal==='nick'){
						animationNick.bottom(0).step()
					}else if(signal==='phone'){
						animationPhone.bottom(0).step()
					}else if(signal==='email'){
						animationEmail.bottom(0).step()
					}
				}else{
					if(signal==='signature'){
						animationSignature.bottom(-this.clientHeight).step()
					}else if(signal==='nick'){
						animationNick.bottom(-this.clientHeight).step()
					}else if(signal==='phone'){
						animationPhone.bottom(-this.clientHeight).step()
					}else if(signal==='email'){
						animationEmail.bottom(-this.clientHeight).step()
					}
				}
				this.animationSignature = animationSignature.export()
				this.animationNick = animationNick.export()
				this.animationPhone = animationPhone.export()
				this.animationEmail = animationEmail.export()
			},
			cancel(signal){
				this.triggerEditor(signal)
			},
			achivementSignature(data){
				this.signature = data
				this.triggerEditor('signature')
				// 发送请求修改
			},
			changeSex(data){
				this.index = data.detail.value
				// 发送请求修改
			},
			changeDate(data){
				this.time = data.detail.value
			},
			editorNick(){
				this.triggerEditor('nick')
			},
			achivementNick(data){
				this.nick = data
				this.triggerEditor('nick')
			},
			editorPhone(){
				this.triggerEditor('phone')
			},
			achivementPhone(data){
				this.phone = data
				this.triggerEditor('phone')
				//发起请求
			},
			editorEmail(){
				this.triggerEditor('email')
			},
			achivementEmail(data){
				this.email = data
				this.triggerEditor('email')
			},
			myUpload(data){
				this.imgUrl = data.path;
			}
		},
		components:{
			chatHeader,
			bottomBtn,
			yqAvatar,
			editorInfo
		}
	}
</script>

<style scoped lang="scss">
	.detail{
		.header{
			margin-bottom: 42rpx;
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
		.option{
			display: flex;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 26rpx 20rpx 32rpx;
			min-height: 112rpx;
			.left{
				display: flex;
				align-items: center;
				.title{
					width: 64rpx;
					font-size: 32rpx;
					color: #272832;
				}
				
			}
			.right{
				display: flex;
				flex: 1;
				justify-content: space-between;
				align-items: center;
				.icon{
					width: 108rpx;
					height: 108rpx;
					border-radius: 20rpx;
					margin-left: 32rpx;
				}
				.arrow-left{
					transform: rotate(-180deg);
					opacity: 0.3;
					width: 28rpx;
					height: 28rpx;
				}
				.common{
					width: 100%;
					height: 42rpx;
					font-size: 32rpx;
					color: rgba(39,40,50,0.60);
					margin-left: 32rpx;
					
				}
				.signture{
					display: -webkit-box;
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
				}
			}
		}
		.line{
			border-bottom: 1rpx solid rgba(238,238,238,1);
		}
		.bottom-btn-wrap{
			position: fixed;
			bottom: 0;
			width: 100%;
			.btn-bg{
				background-color: #ffffff;
				color: #FF5D5B;
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
