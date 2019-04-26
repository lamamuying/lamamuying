<template>
	<view>
		<view class="uni-flex uni-column contain">
			<view class="flex-item  uni-row">
				<text type="default">头像</text>
				<view v-if="personMessage.phone" class="uni-row logo" @click="upload">
					<image v-if="personMessage.photo" :src="personMessage.photo" class="peason" mode="scaleToFill"></image>
					<image v-else src="http://static.lamamuying.com/static/images/face.png" class="peason" mode="scaleToFill"></image>
				</view>
				<view v-else class="uni-row logo">
					<image v-if="personMessage.photo" :src="personMessage.photo" class="peason" mode="scaleToFill"></image>
					<image v-else src="http://static.lamamuying.com/static/images/face.png" class="peason" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="flex-item  uni-row item-name">
				<text type="default">会员名</text>
				<view class="uni-row logo">
					<input v-if="personMessage.nickname" class="name" :value="personMessage.nickname" @blur="blu" :disabled="disabled">
					<input v-else class="name" value="暂无用户名" @blur="blu" :disabled="disabled">
					<image src="http://static.lamamuying.com/static/images/jiantou.png" mode="" class="right"></image>
				</view>
			</view>
			<view class="flex-item  uni-row" @click="phoneChange">
				<text type="default">手机号</text>
				<view class="uni-row logo">
					<input class="name" disabled :value="personMessage.phone">
					<image src="http://static.lamamuying.com/static/images/jiantou.png" mode="" class="right"></image>
				</view>
			</view>
		</view>
		<!-- <view class="uni-list select">
			<view class="uni-list-cell ">
				<view class="uni-list-cell-left">性别</view>
				<view class="uni-list-cell-db logo uni-row">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
						<image src="http://static.lamamuying.com/static/images/jiantou.png" mode="" class="right"></image>
					</picker>
				</view>
			</view>
		</view> -->
	</view>

</template>

<script>
	var userLoginInfo, _self;
	export default {
		data() {
			return {
				// array: ['男', '女'],
				// index: 0,
				personMessage: [],
				isuser: false,
				nickname: '',
				photo: '',
				disabled: true,
				iptoto:'http://static.lamamuying.com/static/images/face.png'
			};
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			if (!userLoginInfo.photo) {
				this.disabled = false;
			} else {
				this.disabled = true;
			}
			// 获取用户个人信息
			this.getPersonal();
			// console.log(uni.getStorageSync('userLoginInfo'));
		},
		methods: {
			// 		bindPickerChange: function(e) {
			// 		console.log('picker发送选择改变，携带值为：' + e.target.value)
			// 		this.index = e.target.value
			// 	},
			// 获取用户个人信息
			getPersonal() {
				uni.request({
					url: this.apiUrl + 'user/getUser',
					method: 'GET',
					data: {
						uid: userLoginInfo.id
					},
					success: res => {
						if (res.data.code === 0) {
							this.personMessage = res.data.data;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 修改用户昵称
			blu(event) {
				this.nickname = event.detail.value;
				if(!this.personMessage.photo){
					this.photo = this.iptoto;
				}else{
					this.photo = this.personMessage.photo;
				}
				//保存用户信息
				this.hold();
			},
			// 上传个人头像
			upload() {
				_self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: this.apiUrl + 'user/uploadHeader',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: uploadFileRes => {
								var ress = JSON.parse(uploadFileRes.data);
								if (ress.code == 0) {
									this.photo = ress.data;
									if (!this.personMessage.nickname) {
										this.nickname = '暂无用户名';
									} else {
										this.nickname = this.personMessage.nickname;
									}
									//保存用户信息
									this.hold();
								}
							}
						});
					},
					error: function(e) {
					},
					complete: () => {

					}
				});
			},
			// 保存用户信息
			hold() {
				uni.request({
					url: this.apiUrl + 'user/saveUser',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						id: userLoginInfo.id,
						nickname: this.nickname,
						photo: this.photo
					},
					success: res => {
						if (res.data.code === 0) {
							this.getPersonal();
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad: function() {

		}
	}
</script>


<style lang="less">
	.contain {
		padding: 10upx 20upx;
		background: #fff;
		border-bottom: 2upx solid #ececec;
	}

	.logo {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.flex-item {
		padding: 20upx;
		font-size: 32upx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.peason {
			width: 70upx;
			height: 70upx;
			border-radius: 50%;
		}
	}

	.right {
		width: 20upx;
		height: 24upx;
		margin-left: 20upx;
	}

	/* 性别select */
	// .select{margin: 20upx 0;padding:20upx 0;}
	// 	.uni-list::before{background:none;}
	// 	.uni-list::after{background:none;}
	// 	.uni-list-cell-db{margin-right: 20px;}
	// 	.uni-input{width: 85%; font-size: 16px;display: contents;}
	// 	.uni-list-cell-left{font-size:32upx;padding:0 40upx;}
	/* 添加修改样式 */
	.item-name {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.name {
		text-align: right;
		font-size: 32upx;
		margin-top: -8upx;
	}
</style>
