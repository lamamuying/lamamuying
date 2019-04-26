<template>
	<view class="content">
		<view class="code">
			<text class="plus">恭喜您成为辣妈Plus，请您到下方地址领取Plus会员礼品</text>
			<view class="adress"><text style="color: #FF4965;">地址：{{province}}{{city}}{{area}}{{towns}}{{detail}}</text></view>
			<view class="adress"><text style="color: #FF4965;">店铺：{{shopName}}</text></view>
		</view>
		
		<view><text style="font-size: 42upx;color:#FF4965;">注:请您在领取礼品之后再点击确定</text></view>
		<view class="cli">
			<button type="primary" style="background: #FF4965;" @click="saveSaleOrder">立即领取</button>
		</view>
	</view>
</template>

<script>
	var shop, userLoginInfo;
	export default {
		data() {
			return {
				address: [],
				province: '',
				city: '',
				area: '',
				towns: '',
				detail: '',
				shopName: ''
			}
		},
		onLoad() {
			shop = uni.getStorageSync('locationShop');
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			
			this.istrue = false;
			this.province = shop.province;
			this.city = shop.city;
			this.area = shop.area;
			this.towns = shop.towns;
			this.detail = shop.detail;
			this.shopName = shop.shop_name;
		},
		methods: {
			saveSaleOrder() {
				if (userLoginInfo.identity == 1) {
					return;
				}
				uni.showModal({
					title: '提示',
					content: '是否领取赠品礼物，领取后点击确定',
					success: res => {
						if (res.confirm) {
							uni.showLoading({
								title: '加载中..'
							})
							uni.request({
								url: this.apiUrl + 'user/saveSaleOrder',
								method: 'GET',
								data: {
									uid: userLoginInfo.id
								},
								success: orderRes => {
									if (orderRes.data.code == 0 && orderRes.data.data.status == 3) {
										uni.showToast({
											title: '领取成功',
											icon: 'none',
											success: (res) => {
												setTimeout(() => {
													uni.navigateBack({
														delta: 1
													});
												}, 500);
											},
										})
									}
								},
								fail: () => {},
								complete: () => {
									uni.hideLoading();
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
		}
	}
</script>

<style lang="less">
	.content {
		height: 100vh;
		padding: 30upx;

		.code {
			height: 350upx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			font-size: 32upx;
			padding: 30upx;
		}

		.plus {
			font-size: 40upx;
		}

		.adress {
			margin-top: 20upx;
			font-size: 31upx;
		}

		.clicc {
			margin-top: 30upx;
			color: #ff4965;
		}

		.cli {
			font-size: 40upx;
			margin-top: 50upx;
			text-align: center;
		}
	}
</style>
