<template>
	<view >
		<view  style="background: #fff;" >
		
			<view class="uni-title uni-common-pl" style="color:#8f8e8e;background:#F4F5F6;">我们懂得聆听，知错就改。您的意见是</view>
			<view class="textarea">
				<view class="uni-title uni-common-pl" style="color:#8f8e8e;">发表您的意见，我们及时反馈</view>
				<view class="uni-textarea" v-model="content">
					<textarea  auto-height  @blur="bindTextAreaBlur" />
				</view>
			</view>
			<view class="bg_hr"></view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">								
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file">
										<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
									</view>
								</block>
								<view class="uni-uploader__input-box">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="justify-content: center;background: #fff;padding-bottom:30upx;margin-top: 20upx;">
				<view class="uni-title uni-common-pl" style="color:#8f8e8e;">请留下您的手机号，方便我们联系您</view>
				<input type="text" placeholder="请输入您的手机号"  class="phone-input"/>
			</view>
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
				feedback:[],
				imageList: [],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			// console.log(userLoginInfo.id)
			// this.getfeedback();
		},
		onUnload() {
			this.imageList = [],
			this.countIndex = 8;
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
						console.log(res);
						if(res.data.code == 0){
							uni.showToast({
								title: "提交成功",
								icon: "none"
							});
						}	
					}
				});
			},
			
			chooseImage: async function() {
					if (this.imageList.length === 9) {
						let isContinue = await this.isFullImg();
						console.log("是否继续?", isContinue);
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths);
						}
					})
				},
				isFullImg: function() {
					return new Promise((res) => {
						uni.showModal({
							content: "已经有9张图片了,是否清空现有图片？",
							success: (e) => {
								if (e.confirm) {
									this.imageList = [];
									res(true);
								} else {
									res(false)
								}
							},
							fail: () => {
								res(false)
							}
						})
					})
				},
				previewImage: function(e) {
					var current = e.target.dataset.src
					uni.previewImage({
						current: current,
						urls: this.imageList
					})
				}
		}
	}
</script>

<style>
/* 添加修改样式 */
.phone-input{
    width: 85%;
    height:80upx;
	border:2upx solid #D2D2D2;
    border-radius: 10px;
    margin-left: 5%;
	padding-left:30upx;
}



.uni-textarea{ border: none;text-align: left; background: none;font-size:28upx;line-height:40upx; height:180upx;color: #8f8e8e;}    
.cell-pd {padding: 22upx 30upx;}
.list-pd {margin-top: 50upx; }
.uni-uploader__input-box { border: 2upx dotted #D9D9D9;}
.uni-list::before {background:none;}
.textarea{width: 100%;border-top: 2upx solid #E6E4E5;} 
.uni-common-pl{font-size:28upx;}
.bg_hr{ width:100%; height:30upx; background:#F6F6F6; clear:both; overflow:hidden; margin-bottom:20upx;}

.btn{margin-top:30upx;}
.btn button{background:#ff4965;color:#fff;font-size:34upx;width: 96%;margin: auto;}


</style>
