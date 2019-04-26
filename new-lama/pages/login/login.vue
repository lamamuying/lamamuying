<template>
	<view style="background:#fff; height: 100vh;">
		<view class="static"></view>
		<form @submit="loginSubmit" class="login-from">
			<!-- logo -->
			<view class="from-logo">
				<image src="http://static.lamamuying.com/static/images/login_r1_c1.jpg" mode="widthFix"></image>
			</view>
			<!-- 登录 -->
			<view class="from-column">
				<view class="uni-form-item uni-row">
					<span class="iconfont login-icon">&#xe7bd;</span>
					<input class="uni-input" name="phone" type="number" placeholder="请输入您的账号" />
				</view>
				<view class="uni-form-item uni-row">
					<span class="iconfont login-icon">&#xe658;</span>
					<input class="uni-input" password type="text" name="password" placeholder="请输入您的密码" />
				</view>
				<!-- 忘记密码和注册 -->
				<view class="rember">
					<navigator url="../password_change/password_forget" hover-class="none">
						<text style="color:#FF4965;">忘记密码？</text>
					</navigator>
					<navigator url="../register/register" hover-class="none">
						<text style="color:grey;">还没有账号？<text style="color:#FF4965;"> 去注册</text></text>
					</navigator>
				</view>
				<view class="uni-btn-v"><button formType="submit">登录</button></view>
				<!-- 第三方登录 小程序-->
				<!-- #ifdef MP-WEIXIN -->
				<view style="padding-top:20upx; width: 100%;background: #fff; display: flex; flex-direction: column; justify-content: center; text-align: center; ">
					<view class="login-wx">
						<span class="solid"></span>
						<view class="three">第三方登录</view>
					</view>
					<view class="login-three">
						<button class="wx-button" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">
							获取微信用户信息
						</button>
					</view>
				</view>
				<!-- #endif  -->
				<!-- 第三方登录 App-->
				<!-- #ifdef  APP-PLUS -->
				<view style="margin-top:20upx; width: 100%; display: flex; flex-direction: column; justify-content: center; text-align: center; ">
					<view class="login-wx">
						<span class="solid"></span>
						<view class="three">第三方登录</view>
					</view>
					<view class="login-three">
						<view class="wx-button" @click="getuserappinfo">

						</view>
					</view>
				</view>
				<!-- #endif  -->
			</view>

		</form>
	</view>
</template>

<script>
	var pageOptions,shop;

	export default {
		data() {
			return {
				oauthUserInfo: {}
			};
		},
		onLoad: function(params) {
			pageOptions = params;
			if (pageOptions.backpage) {
				pageOptions.backpage = decodeURIComponent(pageOptions.backpage);
			}
			// console.log(pageOptions);
			//console.log(params);
			//this.wxLogin();
		},
		onShow() {
		//shop = uni.getStorageSync('locationShop');
		//uni.showToast({
		//title:'店铺id'+shop.id
		//})
			// console.log(uni.getStorageSync('userLoginInfo'));
			// console.log(uni.getStorageSync('locationShop'));
			// console.log(uni.getStorageSync('referee'));
			// console.log(uni.getStorageSync('launchFlag'));
		},
		methods: {
			loginSubmit: function(e) {
				uni.showLoading({
					title: '登录中...',
					mask: false
				});
				uni.request({
					url: this.apiUrl + 'login/login',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						phone: e.detail.value.phone,
						password: e.detail.value.password
					},
					success: res => {
						uni.hideLoading();
						if (res.data.code == 0) {
							uni.setStorageSync('userLoginInfo', res.data.data);
							uni.setStorageSync('locationShop', res.data.data.shop);
							// #ifdef MP-WEIXIN
							if (!res.data.data.openid) {
								this.bindMpOpenid(res.data.data.phone);
							}
							// #endif
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							});
							if (pageOptions.backpage === undefined) {
								uni.reLaunch({
									url: '../mine/mine'
								});
							}
							if (pageOptions.backtype == 1) {
								uni.reLaunch({
									url: pageOptions.backpage
								});
							} else {
								uni.reLaunch({
									url: pageOptions.backpage
								});
							}

						} else {
							uni.showToast({
								title: '用户名密码错误',
								icon: 'none'
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			},
			bindMpOpenid: function(mobile) {
				uni.login({
					success: res => {
						uni.request({
							url: this.apiUrl + 'login/bindMpOpenid',
							method: 'GET',
							data: {
								code: res.code,
								phone: mobile
							},
							success: res => {
								if (res.data.code == 0) {
									return res.data.data.openid;
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				});
			},
			// 第三方微信小程序  微信登录
			// #ifdef MP-WEIXIN		
			getuserinfo(e) {
				let shop = uni.getStorageSync('locationShop');
				uni.getUserInfo({
					provider: 'weixin',
					success: infoRes => {
						uni.login({
							success: loginRes => {
								// console.log(shop_id);
								uni.request({
									url: this.apiUrl + 'login/getMpToken',
									method: 'GET',
									data: {
										code: loginRes.code,
										shop_id: shop.id,
										mpUserInfo: e.detail.userInfo
									},
									success: res => {
										uni.setStorageSync('userLoginInfo', res.data.data);
										uni.setStorageSync('locationShop', res.data.data.shop);
										uni.showToast({
											title: '登录成功',
											icon: 'none'
										});
										if (pageOptions.backpage === undefined) {
											uni.reLaunch({
												url: '../mine/mine'
											});
										}
										if (pageOptions.backtype == 1) {
											uni.reLaunch({
												url: pageOptions.backpage
											});
										} else {
											uni.reLaunch({
												url: pageOptions.backpage
											});
										}
									},
									fail: () => {},
									complete: () => {}
								});
							}
						});
					}
				});
			},
			// #endif
			// 第三方App 微信登录
			getuserappinfo() {
				let shop = uni.getStorageSync('locationShop');
				let referee = uni.getStorageSync('referee');
				
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						uni.request({
							url: this.apiUrl + 'login/getAppWechatToken',
							method: 'GET',
							data: {
								openid: loginRes.authResult.openid,
								shop_id: shop.id,
								access_token: loginRes.authResult.access_token,
								unionid: loginRes.authResult.unionid,
								referee: referee
							},
							success: res => {
								//console.log(JSON.stringify(res));
								if (res.data.code == 0) {
									uni.setStorageSync('userLoginInfo', res.data.data);
									uni.setStorageSync('locationShop', res.data.data.shop);
									uni.showToast({
										title: '登录成功',
										icon: 'none'
									});
									if (pageOptions.backpage === undefined) {
										uni.reLaunch({
											url: '../mine/mine'
										});
									}
									if (pageOptions.backtype == 1) {
										uni.reLaunch({
											url: pageOptions.backpage
										});
									} else {
										uni.reLaunch({
											url: pageOptions.backpage
										});
									}
								} else {
									uni.showToast({
										title: '登陆失败',
										icon: 'none'
									});
								}
							},
							fail: () => {},
							complete: () => {}
						});
					}
				});
			},
			// 第三方登录
			loginThree: function() {}
		}
	};
</script>

<style lang="less">
	@import '../../static/fonts/iconfont-ali/font.css';

	.static {
		/*  #ifdef  APP-PLUS  */
		padding-top: var(--status-bar-height);
		background: #ff4965;
		/*  #endif  */
	}

	.login-from {
		width: 100%;

		.from-logo {
			image {
				width: 100%;
			}
		}

		.from-column {
			width: 100%;
			// height:100%;
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
			background: #fff;
		}

		button {
			margin: 20upx 0upx;
			background: #ff4965;
			color: #fff;
			width: 80%;
			// margin-left: 10%;
		}


		.rember {
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #fff;

			uni-navigator {
				display: inline-block;
			}
		}

		.login-wx {
			justify-content: center;
			text-align: center;
			position: relative;
			height: 60upx;
			line-height: 60upx;
			margin-top: 60upx;
			padding: 0;
			width: 90%;
			margin: 0 5%;
			overflow: hidden;
			box-sizing: border-box;
			-webkit-box-sizing: border-box;
			display: inline-block;
			background: #fff;
		}

		.three {
			display: inline-block;
			padding: 0 32upx;
			background: #fff;
			position: relative;
			font-size: 24upx;
			color: #ccc;
			z-index: 2;
		}

		.solid {
			background: #ccc;
			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			display: block;
			width: 100%;
			z-index: 1;
			border-bottom: 2upx #ccc solid;
		}

		.login-three {
			display: flex;
			width: 100%;
			justify-content: center;
			text-align: center;
			background: #fff;
			padding: 20upx 0 28upx 0;

			.wx-button::after {
				border: none;
			}

			.wx-button {
				width: 160upx;
				height: 160upx;
				border-radius: 0px 0px 0px 0px;
				color: transparent;
				background: transparent no-repeat center center;
				background-size: cover;
				background-image: url('http://static.lamamuying.com/static/images/login_r5_c4.jpg');
			}

			image {
				width: 160upx;
				height: 160upx;
			}
		}
	}
</style>
