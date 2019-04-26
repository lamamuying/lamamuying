<template>
	<view>
		<!-- 待付款 -->
		<view class="flex-item uni-row">
			<view class="uni-column">
				<view class="wait">等待买家付款</view>
			</view>
			<!-- <image src="http://static.lamamuying.com/static/images/a_doctor.png" class="waitImge" mode=""></image> -->
			<span class="iconfont waitImge" style="font-size: 90upx; margin-bottom: 30upx; color: #fff;">
				&#xe69d;
			</span>
		</view>
		<!-- 订单地址 -->
		<view class="uni-row address">
			<image src="http://static.lamamuying.com/static/images/56.png" mode="" class="address-logo"></image>
			<view class="uni-column add">
				<view>
					<text>{{ orderData.address_name }}</text>
					<text style="color:#999;padding-left: 20upx;">{{ orderData.address_tel }}</text>
				</view>
				<view>{{ orderData.address_address }}</view>
			</view>
		</view>
		<!-- 购买商品信息 -->
		<view class="goodsList uni-column">
			<view class="goods uni-row" v-for="(orderGoods, orderItem) in orderData.goods" :key="orderItem">
				<image :src="orderGoods.image" class="goods_image"></image>
				<view class="uni-column message">
					<view class="goodsName">{{ orderGoods.goods_name }}</view>
					<view class="size">属性:{{ orderGoods.goods_attr_value }}</view>
				</view>
				<view class="price uni-column">
					<text>￥{{ orderGoods.price }}</text>
					<view style="color:#999;font-size: 26upx;">x{{ orderGoods.num }}</view>
				</view>
			</view>
			<view class="goodsMoney uni-row">
				<text>运费</text>
				<text class="over">￥{{ orderData.freight }}</text>
			</view>
			<view class="goodsMoney uni-row">
				<text>优惠</text>
				<text class="over">-￥{{ orderData.discount }}</text>
			</view>
			<view class="goodsMoney uni-row">
				<text style="font-size: 28upx;color:#333;">实付款(含运费)</text>
				<text style="color:#F96400;width:73%;text-align: right;">
					￥{{ orderData.amount }}
				</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="orderMessage uni-column">
			<view class="info">订单信息</view>
			<view class="uni-row number">
				<text class="orderNum">订单编号：</text>
				<text class="num">{{ orderData.order_trade_no }}</text>
			</view>
			<view class="uni-row number">
				<text class="orderNum">付款交易号：</text>
				<text>2840379358249321174564534</text>
			</view>
			<view class="uni-row number">
				<text class="orderNum">创建时间：</text>
				<text class="num">{{ orderData.addtime }}</text>
			</view>
		</view>
		<!-- 占位符 -->
		<view class="place"></view>
		<!-- #ifdef MP-WEIXIN-->
		<view class="payStyle">
			<view class="close" @tap="noTitlemodalTap">取消订单</view>
			<view class="payMoney" @click="showWeixin">付款</view>
		</view>
		<!-- #endif -->

		<!-- #ifdef APP-PLUS -->
		<!-- 支付方式 app支付 -->
		<view class="payStyle" v-if="isdefault">
			<view class="close" @tap="noTitlemodalTap">取消订单</view>
			<view class="payMoney" @tap="showApp">付款</view>
		</view>
		<my-drawer :visible="openAttr" mode="right" @close="closeAttr">
			<view class="attr-pop-box">
				<view class="attr-pop">
					<view class="close" @click="closeAttr">
						<img class="icon" src="http://static.lamamuying.com/static/images/icon_close.png" />
					</view>
					<view class="uni-flex" style="justify-content: center;">
						<text style="font-size:32upx;color:#333;">确认付款<text style="color:#FF4965;margin-left: 20upx;">￥{{ orderData.amount }}</text></text>
					</view>
					<view style="margin-top: 60upx;">
						<radio-group @change="radioChange">
							<label style="display:flex; align-items: center; border-bottom: 1px solid #DDD; padding: 30upx 20upx;  " v-for="(item,index) in radioItems"
							 :key="index">
								<view style="width: 40%;">
									<label class="uni-flex flex-row" :for="item.value">
										<image :src="item.icon" style="width: 60upx;" mode="widthFix"></image>
										<view style="align-items: center; display: flex; margin-left: 20upx;">{{item.name}}</view>
									</label>
								</view>
								<view style="flex: 1; justify-content: flex-end;  text-align: right;">
									<radio color="#ff4965" :id="item.value" :value="item.value" :checked="item.checked"></radio>
								</view>
							</label>
							<view class="uni-flex" style="justify-content: center;margin-top: 40upx;" @click="goAppPay">
								<button class="uni-flex btn" style="justify-content: center;border-radius: 20upx;"><text>确认支付</text></button>
							</view>
						</radio-group>
					</view>
				</view>
			</view>
		</my-drawer>
		<!-- #endif  -->
	</view>
</template>
<script>
	var userLoginInfo;
	import myDrawer from '@/components/my-animation.vue';
	import pay from '@/components/pay/pay.vue'
	export default {
		data() {
			return {
				orderData: [],
				order_trade_no: '',
				modalHidden: true,
				modalHidden2: true,
				openAttr: false,
				isdefault: true,
				checked: 1,
				radioItems: [{
						name: '微信支付',
						value: '1',
						icon: 'http://static.lamamuying.com/static/images/wx_icon.png',
						checked: 'true'
					},
					{
						name: '支付宝支付',
						icon: 'http://static.lamamuying.com/static/images/alipay_icon.png',
						value: '2'

					}
				],
			};
		},
		onLoad: function(params) {
			if (!params.order_trade_no) {
				uni.showToast({
					title: '参数错误',
					icon: 'none'
				});
			} else {
				this.order_trade_no = params.order_trade_no;
				this.getOrder();
			}
		},
		onShow() {},
		components: {
			myDrawer,
			pay
		},
		methods: {
			// 小程序中微信付款
			showWeixin: function() {
				uni.request({
					url: this.apiUrl + 'pay/mpPay',
					method: 'GET',
					data: {
						type: 'order',
						order_trade_no: this.order_trade_no
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
			// app付款
			showApp: function() {
				// 显示弹出框
				this.openAttr = true;
				this.isdefault = false;
			},
			// 确认支付 支付宝或者微信支付
			goAppPay: function() {
				let data = {
					orderInfo: this.orderData.amount
				}
				if (this.checked == 1) {
					uni.showLoading({
						title:'加载中...'
					})
					uni.request({
						url: this.apiUrl + 'pay/appWechat',
						method: 'GET',
						data: {
							order_trade_no: this.order_trade_no,
							type: 'order'
						},
						success: res => {
							if (res.data.code == 0) {
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: res.data.data, //微信、支付宝订单数据
									success: payRes => {
										// console.log('success:' + JSON.stringify(payRes));
										uni.showToast({
											title:'支付成功'
										});
										uni.reLaunch({
											url : '../order/order'
										})
									},
									fail: payErr => {
										console.log('fail:' + JSON.stringify(payErr));
									}
								});
							}
						},
						fail: () => {},
						complete: () => {
							uni.hideLoading();
						}
					});
				} else {
					uni.showLoading({
						title:'加载中...'
					})
					uni.request({
						url: this.apiUrl + 'pay/appAlipay',
						method: 'GET',
						data: {
							order_trade_no: this.order_trade_no,
							type: 'order'
						},
						success: res => {
							if (res.data.code == 0) {
								//console.log(res.data.data);
								uni.requestPayment({
									provider: 'alipay',
									orderInfo: res.data.data, //微信、支付宝订单数据
									success: payRes => {
										// console.log('success:' + JSON.stringify(payRes));
										uni.showToast({
											title:'支付成功'
										});
										uni.reLaunch({
											url : '../order/order'
										})
									},
									fail: payErr => {
										console.log('fail:' + JSON.stringify(payErr));
									}
								});
							}
						},
						fail: () => {},
						complete: () => {
							uni.hideLoading();
						}
					});
				}
			},			
			// 获取支付方式
			radioChange: function(e) {
				this.checked = e.detail.value;
				this.radioItems.forEach((radio)=>{
					if(radio.value == this.checked){
						radio.checked = true;
					}else{
						radio.checked = false;
					}
				});
			},
			noTitlemodalTap: function(e) {
				uni.showModal({
					content: '要取消吗？',
					success: res => {
						if (res.confirm) {
							console.log('用户点击确定');
							// this.orderData = [],
							uni.redirectTo({
								url: '../order/order'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			// 购买商品--订单
			getOrder() {
				userLoginInfo = this.userLoginInfo('../order/firm_order', 1);
				uni.showLoading({
					title: '数据加载中..',
					mask: true
				});
				uni.request({
					url: this.apiUrl + 'user/getOrderView',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						order_trade_no: this.order_trade_no
					},
					success: res => {
						if (res.data.code == 0) {
							this.orderData = res.data.data;
							// console.log(this.orderData);
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			// 关闭规格弹窗
			closeAttr() {
				this.openAttr = false;
				this.isdefault = true;
			},

		}
	};
</script>

<style lang="less">
	// 占位符
	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		height: 100upx;
	}



	.attr-pop-box {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 8;
		bottom: 0;
		/* display: none; */
	}

	.attr-pop {
		width: 92%;
		padding: 4%;
		background: #fff;
		position: fixed;
		z-index: 9;
		bottom: 0upx;
		bottom: calc(0upx + constant(safe-area-inset-bottom));
		bottom: calc(0upx + env(safe-area-inset-bottom));
		overflow-y: auto;
	}

	.attr-pop .close {
		position: absolute;
		width: 48rpx;
		height: 48rpx;
		right: 20rpx;
		overflow: hidden;
		top: 31.25rpx;
	}

	.attr-pop .close .icon {
		width: 48rpx;
		height: 48rpx;
	}

	.flex-item {
		background: linear-gradient(to top, #ff5b50 30%, #ff495a 70%);
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 20upx 0;

		.uni-column {
			text-align: left;

			.wait {
				font-size: 32upx;
				color: #fff;
			}
		}

		.waitImge {
			width: 120upx;
			height: 120upx;
		}
	}

	.address {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 20upx;
		background: #fff;

		.address-logo {
			width: 70upx;
			height: 70upx;
			margin-right: 20upx;
		}

		.add {
			text-align: left;
			width: 80%;
		}
	}

	.goodsList {
		margin-top: 20upx;
		background: #fff;
		padding: 20upx;

		.goods {
			display: flex;
			justify-content: space-between;
			// justify-content: flex-start;
			align-items: center;
			padding-bottom: 20upx;

			.goods_image {
				width: 30%;
				height: 140upx;
				margin-right: 20upx;
				border-radius: 15upx;
			}

			.message {
				width: 80%;
				display: flex;
				justify-content: flex-start;
				align-items: left;

				.goodsName {
					line-height: 40upx;
					height: 80upx;
					overflow: hidden;
					font-size: 28upx;
					margin-right: 20upx;
				}

				.size {
					color: #999;
					font-size: 26upx;
				}
			}

			.price {
				text-align: right;
				font-size: 26upx;
			}
		}

		.refund {
			width: 120upx;
			font-size: 24upx;
			border: 2upx solid #ccc;
			border-radius: 30upx;
			line-height: 50upx;
			text-align: center;
			margin-left: 83%;
			margin-bottom: 20upx;
		}

		.goodsMoney {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 26upx;
			color: #666;

			.over {
				width: 92%;
				text-align: right;
			}
		}
	}

	.orderMessage {
		margin-top: 20upx;
		background: #fff;
		padding: 20upx 0;

		.info {
			width: 90%;
			line-height: 40upx;
			border-left: 4upx solid #f96400;
			text-indent: 10upx;
			margin-left: 20upx;
		}

		.number {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 10upx 20upx;
			// background:pink;
			color: #999;

			.num {
				text-align: left;
			}
		}
	}

	.payStyle {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 1000;
		width: 100%;
		height: 100upx;
		background: #fff;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		.close {
			width: 160upx;
			font-size: 24upx;
			border: 2upx solid #ccc;
			border-radius: 30upx;
			line-height: 60upx;
			text-align: center;
		}
	}

	// 新添样式
	.orderNum {
		width: 26%;
	}

	.btn {
		width: 40%;
		background: #ff4965;
		color: #fff;
	}
</style>
