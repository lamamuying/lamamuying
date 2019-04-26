<template>
	<view class="sales">
		<view class="head">
			<view class="box">
				<view class="h2">立即申请活动价</view>
				<view class="h3">298.00</view>
				<view class="h2">成为辣妈Plus立送(价值￥498.00元)孕产期洗护五件套</view>
			</view>

			<view class="reg">
				<!-- #ifdef MP-WEIXIN -->
				<button class="reg_btn" @click="wxpay">立即申请</button>
				<!-- #endif -->
				<!-- #ifdef  APP-PLUS -->
				<button class="reg_btn" @tap="showAttr">立即申请</button>
				<!-- #endif -->
			</view>
		</view>
		<view class="list-title">
			<text class="h1">成为辣妈Plus的优势</text>
		</view>
		<view class="list-list b-line">
			<view class="list-logo">
				<image class="img" src="http://static.lamamuying.com/static/images/icon1.jpg"></image>
			</view>
			<view class="list-body">
				<view class="list-text-top">自用省钱</view>
				<view class="list-text-bottom uni-ellipsis">一年节省3380-6800元以上</view>
			</view>
		</view>
		<view class="list-list b-line">
			<view class="list-logo">
				<image class="img" src="http://static.lamamuying.com/static/images/icon-free-002.png"></image>
			</view>
			<view class="list-body">
				<view class="list-text-top">赚取佣金</view>
				<view class="list-text-bottom uni-ellipsis">推荐购买终身赚取收益</view>
			</view>
		</view>
		<view class="list-list b-line">
			<view class="list-logo">
				<image class="img" src="http://static.lamamuying.com/static/images/icon3.jpg"></image>
			</view>
			<view class="list-body">
				<view class="list-text-top">零门槛开店</view>
				<view class="list-text-bottom uni-ellipsis">成为辣妈Plus所有产品归你所售，打造宝妈全民创业时代</view>
			</view>
		</view>
		<view class="list-list b-line">
			<view class="list-logo">
				<image class="img" src="http://static.lamamuying.com/static/images/icon-free-005.png"></image>
			</view>
			<view class="list-body">
				<view class="list-text-top">快速配送</view>
				<view class="list-text-bottom uni-ellipsis">同区域内免费两小时内送货到家</view>
			</view>
		</view>
		<view class="list-list b-line">
			<view class="list-logo">
				<image class="img" src="http://static.lamamuying.com/static/images/icon-free-004.png"></image>
			</view>
			<view class="list-body">
				<view class="list-text-top">七天无理由退货</view>
				<view class="list-text-bottom uni-ellipsis">七天内无理由上门或到店退货</view>
			</view>
		</view>
		<view class="list-list b-line">
			<view class="list-logo">
				<image class="img" src="http://static.lamamuying.com/static/images/icon6.jpg"></image>
			</view>
			<view class="list-body">
				<view class="list-text-top">正品保障</view>
				<view class="list-text-bottom uni-ellipsis">所有商品均为正规渠道来源</view>
			</view>
		</view>
		<view class="list-list b-line">
			<view class="list-logo">
				<image class="img" src="http://static.lamamuying.com/static/images/icon-free-001.png"></image>
			</view>
			<view class="list-body">
				<view class="list-text-top">安全可追溯</view>
				<view class="list-text-bottom uni-ellipsis">所有商品均来自实体店，售后有保障</view>
			</view>
		</view>
		<view class="list-list b-line">
			<view class="list-logo">
				<image class="img" src="http://static.lamamuying.com/static/images/icon8.jpg"></image>
			</view>
			<view class="list-body">
				<view class="list-text-top">科学育儿</view>
				<view class="list-text-bottom uni-ellipsis">提供年轻妈妈的科学育儿知识</view>
			</view>
		</view>
		
		<!-- #ifdef  APP-PLUS -->
		<!-- 申请导购支付弹窗 -->
		<my-drawer :visible="openAttr" mode="right" @close="closeAttr">
			<view class="attr-pop-box">
				<view class="attr-pop">
					<view class="close" @click="closeAttr">
						<img class="icon" src="http://static.lamamuying.com/static/images/icon_close.png" />
					</view>
					<view class="uni-flex" style="justify-content: center;">
						<text style="font-size:32upx;color:#333;">确认付款<text style="color:#ff4965;">￥298.00</text></text>
					</view>
					<view style="margin-top: 60upx;">
						<radio-group @change="radioChange">
							<label style="display:flex; align-items: center; border-bottom: 1px solid #DDD; padding: 30upx 20upx;  " v-for="(item,index) in radioItems"
							 :key="index">
								<view style="width: 40%;">
									<label class="uni-flex flex-row" :for="item.value">
										<image :src="item.icon" style="width: 60upx;" mode="widthFix"></image>
										<view style="align-items: center; display: flex; margin-left: 40upx;">{{item.name}}</view>
									</label>
								</view>
								<view style="flex: 1; justify-content: flex-end;  text-align: right;">
									<radio color="#ff4965" :id="item.value" :value="item.value" :checked="item.checked"></radio>
								</view>
							</label>
							<view class="uni-flex" style="justify-content: center;margin-top: 40upx;">
								<button  @click="goAppPay" class="uni-flex btn" style="justify-content: center;border-radius: 20upx;"><text>确认支付</text></button>
							</view>
						</radio-group>
					</view>
				</view>
			</view>
		</my-drawer>
		<!-- #endif -->
	</view>
</template>

<script>
	var user;
	import myDrawer from '@/components/my-animation.vue';
	export default {
		components: {
			myDrawer
		},
		onShow(){
			user = uni.getStorageSync('userLoginInfo');
		},
		data() {
			return {
				openAttr: false,
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
		methods: {
			// 关闭规格弹窗
			closeAttr() {
				this.openAttr = false;
			},
			showAttr() {
				this.openAttr = true;
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
			// 请求支付接口
			goAppPay: function() {
				if(user.identity == 2){
					uni.showToast({
						title:'您已是辣妈Plus',
						icon:'none'
					})
					return;
				}
				if (this.checked == 1) {
					uni.showLoading({
						title:'加载中...'
					})
					//plus.nativeUI.alert("微信支付");
					uni.request({
						url: this.apiUrl + 'pay/appWechat',
						method: 'GET',
						data: {
							type: 'sale',
							uid: user.id,
							shop_id: user.shop.id
						},
						success: res => {
							if (res.data.code == 0) {
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: res.data.data, //微信、支付宝订单数据
									success: payRes => {
										user.identity = 2;
										uni.setStorageSync('userLoginInfo',user);
										uni.reLaunch({
											url:'./order_Plus'
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
							//,order_trade_no: '2019040310550347797305',
							type: 'sale',
							uid: user.id,
							shop_id: user.shop.id
						},
						success: res => {
							if (res.data.code == 0) {
								uni.requestPayment({
									provider: 'alipay',
									orderInfo: res.data.data, //微信、支付宝订单数据
									success: payRes => {
										user.identity = 2;
										uni.setStorageSync('userLoginInfo',user);
										uni.reLaunch({
											url:'./order_Plus'
										})
									},
									fail: payErr => {
										this.checked  == 1;
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
			// 小程序端微信支付
			wxpay() {
				if(user.identity == 2){
					uni.showToast({
						title:'您已是辣妈Plus',
						icon:'none'
					})
					return;
				}
				uni.request({
					url: this.apiUrl + 'pay/mpPay',
					method: 'GET',
					data: {
						type: 'order'
					},
					success: res => {
						if (res.data.code == 0) {
							// plus.nativeUI.alert(res)
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
		}
	}
</script>

<style>
	.sales {
		width: 100%;
		height: auto;
	}

	.sales .head {
		position: relative;
		width: 100%;
		padding: 1rem 0 2rem 0;
		background-image: -webkit-gradient(linear, left top, bottom top, from(#FF4965), to(#ff677f));
		background-image: -webkit-linear-gradient(left, #FF4965, #ff677f);
		background-image: -moz-linear-gradient(left, #FF4965, #ff677f);
		background-image: linear-gradient(to bottom, #FF4965, #ff677f);
		background-color: #ff8497;
	}

	.sales .head .box {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		min-width: 0;
		font-size: 14px;
		color: #333;
		text-align: center;
	}

	.sales .head .box .h2 {
		color: rgba(255, 255, 255, 0.8);
		font-weight: normal;
		font-size: 14px;
		margin-bottom: 2px;
	}

	.sales .head .box .h3 {
		color: #fff;
		font-weight: normal;
		font-size: 32px;
		margin: 3px 0;
	}

	.sales .head .reg {
		width: 100%;
		position: absolute;
		bottom: -26px;
	}

	.sales .head .reg .reg_btn {
		width: 90%;
		background: #fff;
		border-radius: 50px;
		color: #ff4965;
		font-size: 16px;
		display: block;
		margin: 0 auto;
		border: none;
		padding: 4px 0;
		box-shadow: 0 3px 30px #ffccd4;
	}

	.sales .list-title {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 15px;
		padding-bottom: 0;
		margin-top: 26px;
		position: relative;
	}

	.sales .list-title .h1 {
		padding-left: 20px;
		position: relative;
		font-weight: bold;
		color: #ff4965;
		font-size: 16px;
	}

	.sales .list-title .h1:after {
		content: '';
		position: absolute;
		z-index: 0;
		top: 3px;
		left: 0;
		width: 5px;
		height: 80%;
		background-image: -webkit-gradient(linear, left top, bottom top, from(#FF4965), to(#ff677f));
		background-image: -webkit-linear-gradient(left, #FF4965, #ff677f);
		background-image: -moz-linear-gradient(left, #FF4965, #ff677f);
		background-image: linear-gradient(to bottom, #FF4965, #ff677f);
		background-color: #ff677f;
	}

	.sales .list-list {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding: 15px;
		position: relative;
		//border-bottom: 1px #ddd solid;
	}

	.sales .b-line:after {
		content: '';
		position: absolute;
		z-index: 2;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1px;
		border-bottom: 1px solid #e2e2e2;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		-webkit-transform-origin: 0 100%;
		transform-origin: 0 100%;
	}

	.sales .list-list .list-logo {
		width: 45px;
		height: 45px;
		margin-right: 0.8rem;
	}

	.sales .list-list .list-logo .img {
		width: 45px;
		height: 45px;
		display: block;
		border: none;
		border-radius: 100%;
	}

	.sales .list-list .list-body {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		min-width: 0;
		font-size: 14px;
		color: #333;
	}

	.sales .list-list .list-body .list-text-top {
		font-size: 16px;
		font-weight: bold;
	}

	.sales .list-list .list-body .list-text-bottom {
		color: #9c9c9c;
		font-size: 12px;
		font-weight: normal;
	}


	/* 支付弹窗 */
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
		/* background:pink; */
		position: fixed;
		z-index: 9;
		bottom: 0upx;
		bottom: calc(100upx + constant(safe-area-inset-bottom));
		bottom: calc(100upx + env(safe-area-inset-bottom));
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

	.btn {
		width: 40%;
		background: #ff4965;
		color: #fff;
	}
</style>
