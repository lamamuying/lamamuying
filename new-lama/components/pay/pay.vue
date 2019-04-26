<template>
	<view>
		<view>
			<view class="payMoney" @tap="showBanner">付款</view>

		</view>
		<!-- 弹出层 -->
		<view class="uni-banner" style="background:#FFFFFF;" v-if="bannerShow">
			<view @tap="closeBanner">
				<view style="text-align: left; padding:20upx;">
					<text class="uni-icon uni-icon-close"></text>
					<text style="margin-left:30%;font-size:32upx;color:#333;">确认付款</text>
				</view>
			</view>
			<view class="uni-column btn">
				<view class="price">
					<text style="font-size:40upx;font-weight:normal;">￥</text>
					{{amount}}
				</view>
				<view class="information uni-column">
					<!-- <view class="uni-row pay">
						<text>支付账号</text>
						<text>187*****075</text>
					</view> -->
					<view class="uni-row pay">
						<text>付款方式</text>
						<text>微信支付</text>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="submit" @click="wxpay">小程序确认</view>
				<!-- #endif -->
				<!-- #ifdef  APP-PLUS -->
				<view class="submit" @click="wxappPay">app确认</view>
				<!-- #endif  -->
			</view>
		</view>
		<!-- 遮罩层 -->
		<view class="uni-mask" v-if="bannerShow"></view>
		<!-- 弹出层 -->
	</view>
</template>
<script>
	export default {
		props: {
			amount: null,
			orderTradeNo: null
		},
		data() {

			return {
				bannerShow: false
			}
		},
		onBackPress() {
			if (this.bannerShow) {
				this.bannerShow = true;
				return false;
			}
		},
		methods: {
			wxpay() {
				uni.request({
					url: this.apiUrl + 'pay/mpPay',
					method: 'GET',
					data: {
						type: 'order',
						order_trade_no: this.orderTradeNo
					},
					success: res => {
						if (res.data.code == 0) {
							let payData = res.data;
							this.payParams = payData.data;
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: this.payParams.timeStamp,
								nonceStr: this.payParams.nonceStr,
								package: this.payParams.package,
								signType: this.payParams.signType,
								paySign: this.payParams.paySign,
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// app中微信支付
			wxappPay() {
// 				uni.request({
// 					url: '',
// 					data: {
// 						code: code,
// 						payMoney: 1,
// 						uid: '',
// 						type: '1'
// 					},
// 					header: {
// 						'custom-header': '' //自定义请求头信息
// 					},
// 					success: (res) => {
// 						console.log(res);
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: 'orderInfo', //微信、支付宝订单数据
						success: function (res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function (err) {
							console.log('fail:' + JSON.stringify(err));
						}
					});
// 
// 						uni.requestPayment({
// 							provider: 'wxpay',
// 							// orderInfo: 'orderInfo', //微信、支付宝订单数据
// 							success: function(res) {
// 								console.log('success:' + JSON.stringify(res));
// 								plus.nativeUI.alert(JSON.stringify(res));
// 							},
// 							fail: function(err) {
// 								console.log('fail:' + JSON.stringify(err));
// 							}
// 						});
// 					},
// 				});
			},
			// 关闭按钮
			closeBanner: function() {
				this.bannerShow = false;
			},
			// 遮罩层
			showBanner: function() {
				this.bannerShow = true;
			},
			// 确认付款
			submit: function() {
				uni.navigateTo({
					url: '',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">
	/* 遮罩层 */
	.uni-mask {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 1;
	}

	/* 弹出层形式的广告 */
	.uni-banner {
		width: 100%;
		height: 600upx;
		position: fixed;
		left: 50%;
		bottom: -27%;
		background: #FFF;
		z-index: 99;
		transform: translate(-50%, -50%);
		// 用于修改苹果系统手机屏底部的小尾巴的样式
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* 添加修改样式 */
	.uni-icon {
		font-size: 30px;
		color: #333;
	}

	.btn {
		margin: 0 20upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		text-align: left;

		.price {
			width: 100%;
			text-align: center;
			color: #333;
			font-weight: bolder;
			font-size: 58upx;
		}

		.information {
			width: 100%;

			.pay {
				color: #999;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx 0;
				border-bottom: 2upx solid #ececec;
			}
		}

		.submit {
			position: absolute;
			bottom: 80upx;
			width: 200upx;
			line-height: 70upx;
			border-radius: 10upx;
			background: red;
			color: #fff;
			text-align: center;
		}
	}

	.payMoney {
		width: 160upx;
		font-size: 26upx;
		margin: 0 30upx;
		color: #F96400;
		border: 2upx solid #F96400;
		border-radius: 30upx;
		line-height: 60upx;
		text-align: center;
	}
</style>
