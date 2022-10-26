<template>
	<view class="editor">
		<view class="header">
			<chat-header>
				<template v-slot:left>
					<slot name="left">
						<view @tap="cancel">
							取消
						</view>
					</slot>
				</template>
				<template v-slot:middle>
					<slot name="middle">
						编辑信息
					</slot>
				</template>
				
				<template v-slot:right>
					<view class="right" @tap="achivement">
						<slot name="right">
							确定
						</slot>
					</view>
				</template>
			</chat-header>
		</view>
		<view class="edit-area">
			<view v-if="editorType === 'textarea'">
				<textarea v-model="showMsg" :value="showMsg" maxlength="120"></textarea>
			</view>
			<view v-if="editorType === 'input'">
				<input v-model="showMsg" :value="showMsg"></input>
			</view>
		</view>
	</view>
</template>

<script>
	import chatHeader from '@/components/chat-header/chat-header.vue'
	export default {
		name:"editorinfo",
		data() {
			return {
				showMsg:''
			};
		},
		props:{
			editorType:{
				type: String,
				default:'textarea'
			},
			data:{
				type:String,
				default:''
			}
		},
		methods:{
			cancel(){
				this.showMsg = this.data
				this.$emit('cancel')
			},
			achivement(){
				this.$emit('achivement',this.showMsg)
			}
		},
		components:{
			chatHeader
		},
		mounted(){
			this.showMsg = this.data
		}
	}
</script>

<style scoped lang="scss">
 .editor{
	 .header{
		 .left{
			 font-size: 32rpx;
			 color: #272832;
		 }
		 .right{
			 display: flex;
			 justify-content: flex-end;
			 width: 100%;
			 height:100%;
			 color:#4AAAFF;
		 }
	 }
	 .edit-area{
		 margin: 34rpx 32rpx 0 32rpx;
		 padding: 20rpx;
		 background-color: #F3F4F6;
		 box-sizing: border-box;
	 }
 }
</style>