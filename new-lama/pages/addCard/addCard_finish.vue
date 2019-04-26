<template>
	<view>
		<!-- 填写银行卡信息 -->
		<view class="container uni-column">
			<view class="holdingPs">银行卡信息</view>
			<view class="flex-item uni-column">
				<view class="uni-row cardPerson">
					<view class="personal">银行</view>
					<view class="name">
						<input class="text" value="" v-model="bankName" />
					</view>
				</view>
				<view class="uni-row cardPerson">
					<view class="personal">卡类型</view>
					<view class="name">
						<input class="text" value="" v-model="cardTypeName" />
					</view>
				</view>
			</view>
			<view class="uni-row phone">
				<view class="tel">手机号</view>
				<view class="phoneInput">
					<input focus placeholder="请输入银行预留手机号" v-model="mobile" />
				</view>
			</view>
			<view class="ps">信息加密处理，仅用于银行验证</view>
			<!-- 			<view class="agreen uni-row">
				<label>
					<checkbox value="cb" />同意
				</label>
				<view class="protocol">《用户协议》</view>
			</view> -->
			<view hover-class="none">
				<button class="btn" @click="addCard">完成</button>
			</view>
		</view>
	</view>
	</view>
</template>
<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				bankName: '',
				cardTypeName: '',
				PersonName: '',
				Info: '',
				mobile: '',
				// id 存在是保存操作  不存在为新增操作
				id: null
			}
		},
		onLoad(params) {
			userLoginInfo = this.userLoginInfo('../addAdress/adress', 1);
			// bankCode:"CIB",
			// bankName:"兴业银行",
			// cardType:"DC",
			// cardTypeName:"储蓄卡"
			this.bankName = JSON.parse(params.addInfo).bankName;
			this.cardTypeName = JSON.parse(params.addInfo).cardTypeName;
			this.PersonName = JSON.parse(params.addInfo).PersonName;
			this.Info = JSON.parse(params.addInfo).Info;
		},
		methods: {
			// 添加银行卡
			addCard() {
				uni.request({
					url: this.apiUrl + 'user/saveBank',
					method: 'POST',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						uid: userLoginInfo.id,
						bank: this.bankName,
						card_num: this.Info,
						card_type: this.cardTypeName,
						card_name: this.PersonName,
						card_mobile: this.mobile
						// id:this.id
					},
					success: (res) => {
						if (res.data.code == 0) {
							uni.showToast({
								title: '添加成功',
								icon: 'none',
								duration: 1000,
								success: (res) => {
									uni.redirectTo({
										url: './addCard'
									});
								}
							});
						}else {
							uni.showToast({
								title: '该银行已经被添加',
								icon: 'none',
								duration: 1000,
							});
						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.input-placeholder {
		color: #e4e4e4;
	}

	.container {
		width: 100%;
		height: 100vh;
		background: #EDEDED;

		.holdingPs {
			width: 100%;
			border-top: 2upx solid #E0E0E0;
			color: #9D9D9D;
			font-size: 28upx;
			padding: 20upx 0 0 30upx;
		}

		.flex-item {
			background: #fff;
			padding: 20upx;
			display: flex;
			justify-content: flex-start;

			.cardPerson {
				border-bottom: 2upx solid #EBEBEB;
				height: 100upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.personal {
					width: 18%;
					text-align: left;
					margin: 0 20upx;
					font-size: 32upx;
					color: #4A4A4A;
				}

				.name {
					width: 80%;
					height: 50upx;
					font-size: 32upx;
					color: #465982;

					// background:pink;
					// margin-top:10upx;
					uni-input {
						height: 70upx;
					}
				}

			}

			.cardPerson:last-child {
				border: none;
			}
		}

		.phone {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #fff;
			margin-top: 40upx;
			padding: 20upx;

			.tel {
				width: 18%;
				text-align: left;
				margin: 0 20upx;
				font-size: 32upx;
				color: #4A4A4A;
			}

			.phoneInput {
				width: 80%;
				height: 50upx;
				// margin-top:10upx;
				// background: pink;
				font-size: 32upx;

				uni-input {
					height: 70upx;

				}

			}
		}

		.ps {
			padding-right: 60upx;
			text-align: right;
			font-size: 24upx;
			color: #979797;
		}

		.agreen {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 30upx;

			.protocol {
				color: #5E6D8F;
				padding-left: 20upx;
			}
		}

		.btn {
			margin-top: 40upx;
			width: 80%;
			background: #ff4965;
			color: #fff;
			font-size: 34upx;
		}
	}
</style>
