<template>
	<view>
		<view style="background: #fff;">
			<view class="uni-title uni-common-pl" style="color:#8f8e8e;background:#F4F5F6;">我们懂得聆听，知错就改。您的意见是</view>
			<view class="textarea">
				<!-- <view class="uni-title uni-common-pl" style="color:#8f8e8e;">发表您的意见，我们及时反馈</view> -->
				<view class="uni-textarea">
					<textarea placeholder="发表您的意见，我们及时反馈" v-model="content" />
				</view>
			</view>
			<view class="bg_hr"></view>
		</view>
		<view class="btn">
			<button  @click="save()">保存</button>
		</view>
	</view>
</template>


<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				focus: false,
				content:''
			}
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
		},
		onUnload() {
			
		},
		methods: {
			//提交反馈内容
			save() {
				uni.request({
					url: this.apiUrl + 'user/addFeedBack',
					method: 'POST',
					header:{
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						uid: userLoginInfo.id,
						content:this.content,
					},
					success: res => {
						
						if(res.data.code == 0){
							this.content= '',
							uni.showToast({
								title: "提交成功",
								icon: "none"
// 								success: (res) => {
// 									setTimeout(function () {
// 										uni.redirectTo({
// 											url:'./install'
// 										})
// 									}, 500);
// 								},
							});
						}	
					}
				});
			},
		}
	}
</script>

<style>
	
/* .uni-textarea{ border: none;text-align: left; background: none;font-size:28upx;line-height:40upx; height:200upx;color: #8f8e8e;}    */
.textarea{border-top: 2upx solid #E6E4E5;text-indent:10upx;} 
.uni-common-pl{font-size:28upx;padding-left:20upx;}
.bg_hr{ width:100%; height:30upx; background:#F6F6F6; clear:both; overflow:hidden; margin-bottom:20upx;}

.btn{margin-top:30upx;}
.btn button{background:#ff4965;color:#fff;font-size:34upx;width: 95%;margin: auto;}


</style>
