<template>
	<view>
		<view class="status" style="position:fixed"></view>
		<view class="banner uni-flex uni-row">
			<navigator url="./personal_data" hover-class="none" class="image">
				<!-- 				<image v-if="personMessage.phone" class="banner-img"  src="http://static.lamamuying.com/static/images/face.png"></image>
				<image v-else class="banner-img" :src="personMessage.photo"></image> -->
				<image v-if="personMessage.photo" :src="personMessage.photo" class="banner-img"></image>
				<image v-else src="http://static.lamamuying.com/static/images/face.png" class="banner-img"></image>
			</navigator>
			<view class="uni-flex uni-column unumn">
				<view v-if="personMessage.nickname" class="banner-title">{{personMessage.nickname}}</view>
				<view v-else class="banner-title"> {{personMessage.phone}}</view>
				<view v-if="leaguer" class="banner-vip">
					<span class="iconfont" style="font-size:34upx;padding-right: 10upx;color:#9385FB;">&#xe66c;</span>
					辣妈Plus
				</view>
				<view v-else class="banner-vip">
					<span class="iconfont icon-test1" style="font-size:34upx;padding-right: 10upx;color:#FF6773;">&#xe659;</span>
					普通会员
				</view>
			</view>
		</view>
		<!-- 我的订单 -->
		<view class="uni-flex uni-row mine-order">
			<view class="text" style="font-size:32upx;">我的订单</view>
			<view class="text">
				<navigator url="/pages/order/order?status=0" hover-class="none">
					<text style="font-size:24upx;color:#656565;">查看更多订单></text>
				</navigator>
			</view>
		</view>
		<!-- order 订单分类-->
		<view class="uni-flex uni-row order">
			<view class="text" v-for="(order ,orderIndex) in orderList " :key="orderIndex" @click="navOrder" :data-id="orderIndex">
				<navigator :url="'/pages/order/order?status='+order.oid" hover-class="none">
					<image :src="order.srcimg" mode=""></image>
					<view>
						<text type="default" style="text-align: center;">{{order.title}}</text>
					</view>
				</navigator>
			</view>
		</view>
		<navigator v-if="!leaguer" class="ad" url="./sales" hover-class="none">
			<image src="http://static.lamamuying.com/static/images/ad.jpg" mode="widthFix"></image>
		</navigator>
		<view v-else class="ad" hover-class="none">
			<image src="http://static.lamamuying.com/static/images/ad.jpg" mode="widthFix"></image>
		</view>
		<!-- 成为辣妈Plus -->
		<view class="uni-flex uni-column mine_size">
			<navigator v-if="!leaguer" url="./sales" hover-class="none">
				<view class="flex-item  uni-row">
					<span class="iconfont img_icon" style="font-size: 46upx;color:#A11CEC;font-weight: 700;">
						&#xe62f;
					</span>
					<text type="default" class="mine-text">成为辣妈Plus</text>
				</view>
			</navigator>
			<!-- 我的收益 -->
			<navigator v-if="leaguer" url="./wallet" hover-class="none">
				<view class="flex-item  uni-row">
					<span class="iconfont img_icon" style="font-size: 44upx;color:#EE9900;font-weight: 700;">&#xe601;</span>
					<text class="mine-text">我的收益</text>
				</view>
			</navigator>
			<!-- 推广二维码  v-show="isdefault" -->
			<view>
				<navigator v-if="leaguer" class="flex-item  uni-row" hover-class="none" url="./code">
					<span class="iconfont img_icon" style="font-size: 46upx;color: #086af3;font-weight: 700;">&#xe602;</span>
					<text type="default" class="mine-text">我的推广二维码</text>
					<image src="http://static.lamamuying.com/static/images/wxr2_c2.jpg" mode="" style="position: absolute;right: 60upx;width:70upx;height: 60upx;border-radius: 50%;"></image>
				</navigator>
			</view>
			<!-- 会员礼品领取地址 -->
			<navigator v-if="giftStatus" url="./order_Plus" hover-class="none" >
				<view class="flex-item  uni-row">
					<span class="iconfont img_icon" style="font-size: 52upx;color:#FF4965;font-weight: 700;">&#xe61b;</span>
					<text class="mine-text">Plus会员礼品领取地址</text>
				</view>
			</navigator>
			<navigator url="../addAdress/address_management" hover-class="none">
				<view class="flex-item  uni-row">
					<span class="iconfont img_icon" style="font-size: 52upx;">&#xe61b;</span>
					<text class="mine-text">我的收货地址</text>
				</view>
			</navigator>
		</view>
		<view class="uni-flex uni-column" style="padding: 0 28upx;background:#fff; margin-top:30upx;">
			<navigator url="./feedback" hover-class="none">
				<view class="flex-item  uni-row">
					<span class="iconfont img_icon" style="font-size: 46upx;color: #1296DB;">&#xe60d;</span>
					<text class="mine-text">意见反馈</text>
				</view>
			</navigator>
			<navigator url="./about_mom" hover-class="none">
				<view class="flex-item  uni-row">
					<span class="iconfont img_icon" style="font-size: 48upx;color:#DE533A;">&#xe620;</span>
					<text class="mine-text">关于辣妈</text>
				</view>
			</navigator>
			<navigator url="../password_change/password_change" hover-class="none">
				<view class="flex-item  uni-row">
					<span class="iconfont img_icon" style="font-size: 46upx;color:#393939;">&#xe67c;</span>
					<text class="mine-text">修改密码</text>
				</view>
			</navigator>
		</view>
		<button class="btn" @click="exit">退出登录</button>
		<!-- 占位符 -->
		<view class="place"></view>
	</view>
</template>

<script>
	var userLoginInfo,shop;
	export default {
		data() {
			return {
				isuser: false,
				isdefault: false,
				leaguer: false,
				orderIndex: '',
				personMessage: [],
				giftStatus: false,
				orderList: [{
						oid: 1,
						srcimg: "http://static.lamamuying.com/static/images/pay.png",
						title: "待付款"
					},
					{
						oid: 2,
						srcimg: "http://static.lamamuying.com/static/images/send.png",
						title: "待发货"
					},
					{
						oid: 3,
						srcimg: "http://static.lamamuying.com/static/images/take.png",
						title: "待收货"
					},
					{
						oid: 4,
						srcimg: "http://static.lamamuying.com/static/images/evaluated.png",
						title: "待评价"
					}
				]
			}
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			// console.log(userLoginInfo);
			// if (userLoginInfo.identity == 2) {
			// 	this.isdefault = true;
			// }
			this.getPersonal();
			this.present();
// 			shop = uni.getStorageSync('locationShop');
// 			uni.showToast({
// 				title:'店铺id'+shop.id
// 			})
		},
		methods: {
			//退出登录
			exit: function() {
				uni.removeStorageSync('userLoginInfo');
				uni.removeStorageSync('locationShop');
				uni.removeStorageSync('referee');
				// 清除登录启动项
				uni.removeStorageSync('launchFlag');
				uni.reLaunch({
					url: "../index/index"
				});
			},
			// 是否有礼物可领取
			present() {
				// http://api.lamamuying.com/user/saveSaleOrder?uid=90775
				if (userLoginInfo.identity == 1) {
					return;
				}
				
				uni.request({
					url: this.apiUrl + 'user/getSaleOrder',
					method: 'GET',
					data: {
						uid: userLoginInfo.id
					},
					success: res => {
						if (res.data.code == 0 && res.data.data.id > 0) {
							this.giftStatus = true;
						}else{
							this.giftStatus = false;
						}
					},
					fail: () => {},
					complete: () => {}
				});
				
			},
			
			// 登录获取用户信息
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
							// 是否为会员
							if (this.personMessage.identity == 2) {
								this.leaguer = true;
							} else {
								this.leaguer = false;
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
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

	.banner {
		width: 100%;
		// height: 360upx;
		overflow: hidden;
		position: relative;
		width: 100%;
		padding: 70upx 0 35upx 0;
		background-image: -webkit-gradient(linear, left top, bottom top, from(#FF4965), to(#ff677f));
		background-image: -webkit-linear-gradient(left, #FF4965, #ff677f);
		background-image: -moz-linear-gradient(left, #FF4965, #ff677f);
		background-image: linear-gradient(to bottom, #FF4965, #ff677f);
		background-color: #ff8497;

		.image {
			width: 30%;
			margin-top: 14%;
			// margin-left:50upx;
			margin-left: 12%;

			.banner-img {
				border-radius: 50%;
				width: 150upx;
				height: 150upx;
			}
		}

		.banner-title {
			padding-left: 10upx;
			font-size: 34upx;
			overflow: hidden;
			height: 60upx;
			color: #fff;
		}

		.unumn {
			background: none;
			margin-top: 16%;
			width: 70%;
			height: 20%;
			text-align: left;
		}

		.banner-vip {
			margin-top: 20upx;
			width: 37%;
			height: 50upx;
			padding: 0 4upx;
			line-height: 50upx;
			font-size: 24upx;
			color: #ff4965;
			background: #fff;
			border-radius: 20upx;
			text-align: center;
		}
	}

	.mine-order {
		justify-content: space-between;
		background: #fff;
		padding: 10upx 20upx;
		border-bottom: 1px solid #EEEEEE;
	}

	.order {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background: #fff;
		padding: 20upx;

		.text {
			text-align: center;

			image {
				width: 70upx;
				height: 70upx;
			}
		}
	}

	.ad {
		margin: 20upx 0;
		width: 100%;

		// background:#fff;
		image {
			width: 90%;
			margin-left: 5%;
			border-radius: 10upx;
		}
	}

	.uni-column {
		padding: 0 28upx;
		background: #fff;
	}

	.flex-item {
		// padding-top: 20upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid #ececec;
		margin-top: 10px;

		.mine-text {
			padding-left: 20upx;
			font-size: 32upx;
		}

		image {
			position: absolute;
			right: 20px;
			width: 30upx;
			height: 30upx;
		}

	}

	.btn {
		width: 70%;
		margin-top: 50upx;
		border-radius: 40upx;
		background: #ff4965;
		color: #fff;
	}

	/* 添加修改样式 */
	.static {
		/*  #ifdef  APP-PLUS  */
		padding-top: var(--status-bar-height);
		background: #ff4965;
		/*  #endif  */
	}

	.mine-size {
		padding: 10upx 28upx;
		padding-bottom: 0;
		background: #fff;
	}

	// 申请成为辣妈Plus
	.apply {
		margin-top: 18%;
		width: 40%;
		height: 60upx;
		border-radius: 50px 0 0 50px;
		background: #444444;
		color: #f1e0bc;
		font-size: 28upx;
		position: relative;
	}

	.aui-member-sign span {
		font-size: 30upx;
		display: block;
	}

	.appl {
		align-items: center;
		background-color: #444444;
		color: #f1e0bc;
		font-size: 24upx;
		height: 80upx;
		width: 220upx;
		padding: 0;
		border-radius: 50px 0 0 50px;
		margin-top: 15%;
		padding-left: 20upx;
	}
</style>
