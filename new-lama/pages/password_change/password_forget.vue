<template>
	<view>
		<view class="uni-padding-wrap " style="background:#fff; height:100vh;">
			<view class="static"></view>
			<form @submit="submit">
				<!-- logo -->
				<view class="from-logo">
					<image src="http://static.lamamuying.com/static/images/login_r1_c1.jpg" mode="widthFix"></image>
				</view>

				<view class="from-column" style="padding-top:30upx;">
					<view class="uni-form-item uni-row " style="margin-top:0;">
						<span class="iconfont login-icon">&#xe607;</span>
						<input class="uni-input" name="phones" v-model="phones" placeholder="请输入手机号" />
					</view>
					<view class="uni-row phone_ma">
						<view class="mobile-code">
							<span class="iconfont login-icon">&#xe607;</span>
							<input class="uni-input" name="phone" v-model="code" placeholder="请输入手机验证码" />
						</view>
						<button type="primary" class="get" :disabled="disabled" @click="Getcode()"> {{btntxt}} </button>
					</view>
					<view class="uni-form-item uni-row">
						<span class="iconfont login-icon">&#xe658;</span>
						<input class="uni-input" password type='text' v-model="password" name="password" placeholder="请输入密码" />
					</view>
					<view class="uni-form-item uni-row">
						<span class="iconfont login-icon">&#xe658;</span>
						<input class="uni-input" password type='text' v-model="confirmPassword" name="password" placeholder="请再次输入密码" />
					</view>
					<view class="uni-btn-v">
						<button formType="submit">保存</button>
					</view>
					
				</view>
		
				

			</form>
		</view>

	</view>
</template>

<script>
	var graceChecker = require("../../common/graceChecker.js");
	// 18536654578
	export default {
		data() {
			return {
				phones: '',
				code: '',
				getCode: '',
				password: '',
				confirmPassword: '',
				btntxt: "获取验证码",
				time: 0,
				disabled: false,
			}
		},
		methods: {
			//点击注册
			submit(e) {
				console.log(uni.getStorageSync('referee'));
				// 进行手机号码的验证
				var rule = [{
						name: "phones",
						checkType: "phoneno",
						checkRule: "11",
						errorMsg: "请输入正确手机号格式"
					},
					{
						name: "password",
						checkType: "password",
						checkRule: "6,8",
						errorMsg:"请输入包含数字和英文字母的密码或密码长度大于6位"
					},
				];
				//进行表单检查
				// console.log(e);
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				console.log(checkRes);
				//验证验证码是否正确
				if (this.code != this.getCode) {
					uni.showToast({
						title: '验证码输入错误',
						icon: 'none'
					})
					return false;
				}
				// 验证---密码和确认密码是否一致
				// console.log(this.password);
				// console.log(this.confirmPassword);
				if (this.password != this.confirmPassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					})
					return false;
				}
				// 如果核对信息填写全部正确 存储用户信息
				if (checkRes) {
					uni.request({
						url: this.apiUrl + 'login/forgetPassword',
						method: 'POST',
						data: {
							mobile: this.phones,
							password: this.password,
							confirm_password: this.confirmPassword
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							console.log(res);
							if (res.data.code == 1) {
								uni.showToast({
									title: "您还没有注册",
									icon: "none",
									success: (res) => {
										setTimeout(function() {
											uni.redirectTo({
												url: '../register/register',
											})
										}, 500);
									}
								});
								return;
							}
							if (res.data.code == 0) {
								uni.showToast({
									title: "修改成功",
									icon: "none",
									success: (res) => {
										uni.redirectTo({
											url: '../login/login',
										})
									}
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						// title: '请输入正确信息',
						icon: "none"
					});
				}
			},
			// 点击获取验证码按钮
			Getcode() {
				this.time = 60;
				// this.disabled = true;
				uni.request({
					url: this.apiUrl + 'user/getCode',
					method: 'GET',
					data: {
						mobile: this.phones
					},
					success: (res) => {
						console.log(res);
						if (res.data.code == 0) {
							uni.showToast({
								title: "已发送，请注意查收信息",
								icon: "none"
							});
							// 获取发送至手机的验证码
							console.log(res.data.data.code);
							// 获取发送验证码赋值 getCode
							this.getCode = res.data.data.code;
							
							this.disabled =true;
							this.timer();
							
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			
			},
			timer :function() {
				if (this.time > 0) {
					this.time--;
					this.btntxt = this.time + "S后获取";
					setTimeout(this.timer, 1000);
					
				} else {
					this.time = 0;
					this.btntxt = "获取验证码";
					this.disabled =false;
				}
			}
		}
	}
</script>

<style lang="less">
	.uni-padding-wrap {
		width: 100%;
		padding: 0;

		.static {
			/*  #ifdef  APP-PLUS  */
			padding-top: var(--status-bar-height);
			background: #ff4965;
			/*  #endif  */
		}

		.from-logo {
			width: 100%;

			image {
				width: 100%;
			}
		}

		.phone_ma {
			margin: 30upx 0;
			margin: 0 10%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.mobile-code {
				width: 70%;
				border-radius: 30upx;
				padding: 20upx 0px;
				height: 50upx;
				border: 2upx solid #ccc;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.uni-input {
					width: 100%;
					margin-left: 5%;
					padding: 0;
				}

				.login-icon {
					font-size: 46upx;
					color: #ccc;
					z-index: 10;
					margin-left: 5%;
					line-height: 52upx;
				}
			}
			.get {
				color: #fff;
				width: 26%;
				font-size: 24upx;
				text-align: center;
				padding:0px;
				height: 85upx;
				line-height:85upx;
				background: #FF4965;
				border-radius: 10upx;
			}
		}


	}

	.from-column {
		width: 100%;
		// height:100vh;
		background:#fff;
		.uni-form-item {
			width: 80%;
			margin: 30upx 0;
			margin-left: 10%;
			padding: 20upx 0px;
			border-radius: 30upx;
			height: 50upx;
			border: 2upx solid #ccc;
			.login-icon {
				font-size: 46upx;
				color: #ccc;
				z-index: 10;
				margin-left: 3%;
				line-height: 52upx;
			}

			.uni-input {
				width: 80%;
				margin-left: 2%;
				padding: 0;
			}
		}
	}

	.uni-btn-v {
		display: flex;
		justify-content: center;
		width: 100%;
		text-align: center;
	}

	button {
		margin: 20upx 0upx;
		background: #ff4965;
		color: #fff;
		width: 80%;
	}
</style>
