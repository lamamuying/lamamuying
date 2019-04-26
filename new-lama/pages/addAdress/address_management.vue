<template>
	<view>
		<!-- 收货地址 -->
		<view class="address" v-for="(addressData,addIndex) in addressList" :key="addIndex">
			<!-- 收货人 地址-->
			<view @click="DeliveryAddress(addressData)">
				<view class="uni-flex uni-row edilt">
					<view class="text_left">{{addressData.name}}</view>
					<view class="text_right">{{addressData.mobile}}</view>
				</view>
				<view class="text">{{addressData.province}}{{addressData.city}}{{addressData.area}}{{addressData.address}}</view>
			</view>
			<!-- 对地址进行操作 -->
			<view class="uni-flex uni-row edilt">
				<!-- 设置为默认地址按钮 -->
				<!-- <view class="text_left font">
					<label>
						<checkbox value="checkbox1" />{{addressData.check}}
					</label>
				</view> -->
				<view class="text_right font">
					<!-- 编辑  删除-->
					<view class="uni-flex uni-row edilts">
						<view @click="edit(addressData.id)">
							<span class="iconfont">&#xe60d;</span>
							<text class="icon_ass">编辑</text>
						</view>
						<view @click="delect(addressData.id)">
							<span class="iconfont" style="margin-left: 20upx;">&#xe60e;</span>
							<text class="icon_ass">删除</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view @click="addAdress()"><button style="background:#ff4965;color: #fff;width: 85%;margin: 40upx auto;">添加收货地址</button></view>
	</view>
</template>

<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				addressList: [],
				key: ''
			}
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../addAdress/address_management', 1);
			// console.log(userLoginInfo.id);
			this.addressKee();
		},
		onLoad: function(params) {
		},
		methods: {
			navigateBack: function() {
				uni.navigateBack();
			},
			// 用户自己选择收货地址
			DeliveryAddress: function(addressData) {
				uni.setStorageSync('selectAddress',addressData);
				uni.navigateBack({
					delta:1
				})
			},
			// 用户已保存的地址信息
			addressKee() {
				uni.request({
					url: this.apiUrl + 'user/getAddress',
					method: 'GET',
					data: {
						// 判断用户是否登录
						uid: userLoginInfo.id
					},
					success: (res) => {
						if (res.data.code == 0) {
							
							this.addressList = res.data.data;
						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			},
			// 添加收获地址
			addAdress: function() {
				uni.navigateTo({
					url: './adress'
				})
			},
			// 编辑
			edit: function(addressId) {
				uni.navigateTo({
					url: './adress?editId=' + addressId
				})
			},
			// 删除收获地址
			delect: function(delectId) {
				uni.showModal({
					// title: '提示',
					content: '确定要删除该收获地址吗？',
					success: (res) => {
						if (res.confirm) {
							this.delAddress(delectId);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			delAddress: function(address_id) {
				// 执行删除操作
				uni.request({
					url: this.apiUrl + 'user/delAddress',
					method: 'GET',
					data: {
						// 判断用户是否登录
						uid: userLoginInfo.id,
						id: address_id
					},
					success: (res) => {
						if (res.data.code == 0) {
							// console.log(res.data.data);
							this.addressList = [],
							this.addressKee();
						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		height: 100upx;
	}

	.status {
		width: 100%;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff4965;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	// 头部
	.header {
		width: 100%;
		height: 100upx;
		background-color: #ff4965;
		display: flex;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		justify-content: center;
		z-index: 996;
	}

	.title {
		width: calc(100% - 200upx);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		color: #fff;
		font-size: 34upx;
	}

	.icon {
		width: 60upx;
		height: 60upx;
		position: absolute;
		color: #a18090;
		z-index: 996;
		left: 0;
		font-size: 40upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.scan {
		width: 100upx;
		height: 100upx;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.address {
		width: 100%;
		padding: 20upx 0 10upx 0;
		background: #fff;
		margin-top: 10upx;
		.edilts {
			position: relative;
			height: 70upx;
			margin-top: 10upx;
		}
		.edilt {
			position: relative;
			height: 70upx;
			margin: 10upx 30upx;
			.text_right {
				position: absolute;
				right: 0;
				font-size: 32upx;
				top: 7upx;

				image {
					width: 36upx;
					height: 36upx;
					padding: 8upx 10upx 0 10upx;
				}
			}

			.font {
				font-size: 28upx;
			}
		}
		.text {
			font-size: 28upx;
			color: #8f8f94;
			border-bottom: 2upx solid #ececec;
			margin: 0 20upx;
		}

	}

	.icon_ass {
		padding-left: 10upx ;
	}

	.address:first-child {
		margin-top: 0;
	}

	uni-checkbox .uni-checkbox-input {
		border: 2upx solid #EC4C31;
	}

	.arrow-left-mp {
		/* #ifdef MP-WEIXIN*/
		width: 0;
		overflow: hidden;
		margin-left: 80upx;
		/* #endif */
	}
</style>
