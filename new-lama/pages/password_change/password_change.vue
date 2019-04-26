<template>
	<view>
		<view class="uni-padding-wrap" style="background:#fff;height: 100vh;">
			<view class="static"></view>
			<form @submit="submit">
				<!-- logo -->
				<view class="from-logo">
					<image src="http://static.lamamuying.com/static/images/login_r1_c1.jpg" mode="widthFix"></image>
				</view>
				<view class="from-column">
					<view class="uni-form-item uni-row" style="margin-top:0;">
						<span class="iconfont login-icon">&#xe658;</span>
						<input class="uni-input" password type='text' name="password" v-model="password" placeholder="请输入原密码" />
					</view>
					<view class="uni-form-item uni-row">
						<span class="iconfont login-icon">&#xe658;</span>
						<input class="uni-input" password type='text' name="newpassword" v-model="newpassword" placeholder="请输入新密码" />
					</view>
					<view class="uni-form-item uni-row">
						<span class="iconfont login-icon">&#xe658;</span>
						<input class="uni-input" password type='text' name="confirmpassword" v-model="confirmpassword" placeholder="请再次输入密码" />
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
	var graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				password: '',
				newpassword: '',
				confirmpassword: ''
			}
		},
		methods: {
			submit(e) {
				// 
				var rule = [{
					name: "newpassword",
					checkType: "password",
					checkRule: "6,8",
					errorMsg: "请输入包含数字和英文字母的密码或密码长度大于6位"
				}];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				// 验证---密码和确认密码是否一致
				if (e.detail.value.newpassword != e.detail.value.confirmpassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: 'none'
					})
					return false;
				}
				// 如果核对信息填写全部正确 存储用户信息
				if (checkRes) {
					uni.request({
						url: this.apiUrl + 'login/editPassword',
						method: 'POST',
						data: {
							mobile: uni.getStorageSync('userLoginInfo').phone,
							password: this.password,
							newpassword: this.newpassword,
							confirm_password: this.confirmpassword,
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							console.log(res);
							if (res.data.code == 0) {
								//uni.setStorageSync('userLoginInfo', res.data.data);
								//uni.setStorageSync('locationShop', res.data.data.shop);
								uni.showToast({
									title: '修改成功',
									icon: 'none',
									success: (res) => {
										setTimeout( () => {
											uni.redirectTo({
												url: '../login/login'
											});
										}, 500);
									}
								});
							}else{
								uni.showToast({
									title:'不能修改密码~',
									icon:'none'
								})
							}
						},
						fail: () => {
							
						},
						complete: () => {}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
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

	}

	.from-column {
		width: 100%;
		padding-top: 30upx;
		// height: 100vh;
		background: #fff;
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
