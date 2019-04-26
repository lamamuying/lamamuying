<template>
	<view>
		<!-- 占位 导航条-->
		<view class="home-header-cate">
			<view class="home-tab-title lama-center" id="home-tab-title">
				<view v-for="(cate, index) in category" :key="index" :data-status="cate.status" :data-index="index" :class="[cateCurrentIndex == index ? 'home-tab-current' : '']"
				 @click="tabChange">{{cate.name}}</view>
			</view>
		</view>
		<!-- 商品内容 -->
		<view class="places"></view>
		<view>
			<view class="order_goods" v-for="(orderGoods,goodsIndex) in orderGoodsList" :key="goodsIndex">
				<view class="order_store">
					<text>{{orderGoods.order_trade_no}}</text>
					<text>{{orderGoods.status}}</text>
				</view>
				<view class="uni-list" v-for="(goods,goodsInde) in orderGoods.goods" :key="goodsInde" @click="goOrderDetail(orderGoods.order_trade_no)">
					<view class="uni-list-cell">
						<view class="uni-media-list">
							<image class="uni_firm logo" :src="goods.image"></image>
							<view class="uni-media-list-body">
								<view class=" firm_title">{{goods.goods_attr_value}}</view>
								<view class="uni-media-list-text-bottom">
									<text style="color:#E75265;">￥{{goods.price}}</text>
									<text class="Ocolor">X{{goods.num}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 订单操作 -->
				<view class="order_operation">
					<view>
						<text class="num Ocolor">共{{orderGoods.sum}}件</text>
						<text>￥{{orderGoods.amount}}</text>
					</view>
					<view class="order_button">
						<text v-show="orderGoods.status == '待付款' || orderGoods.status == '交易完成'" @click="delectOrder(orderGoods.order_trade_no)">删除订单</text>
						<text v-show="orderGoods.status == '待付款'" @click="goPay(orderGoods.order_trade_no)">去付款</text>
						<text v-show="orderGoods.status === '待发货'">等待发货</text>
						<text v-show="orderGoods.status == '待收货'" @click="conformOrder(orderGoods.order_trade_no)">确认收货</text>
						<text v-show="orderGoods.status == '待评价'" @click="evaluate(orderGoods.id,orderGoods.goods[0].image)">去评价</text>
						<text v-show="orderGoods.status == '待评价'">已完成</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more color="#333" style="margin-top: 100upx;" :loadingType="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon.vue'
	import uniLoadMore from '@/components/uni-load-more.vue';
	var cate, userLoginInfo;
	export default {
		data() {
			return {
				listData: [],
				last_id: "",
				reload: false,
				headerPosition: "fixed",
				status: 0,
				category: [{
						status: 0,
						name: "全部"
					},
					{
						status: 1,
						name: "待付款"
					},
					{
						status: 2,
						name: "待发货"
					},
					{
						status: 3,
						name: "待收货"
					},
					{
						status: 4,
						name: "已完成"
					}
				],
				cateCurrentIndex: 0,
				orderGoodsList: [],
				goodss: [],
				sum: 0,
				// allPrice:0,
				page: 1,
				loadingType: 1,
			}

		},
		components: {
			//引用mSearch组件，如不需要删除即可
			uniIcon,
			uniLoadMore
		},
		onLoad(params) {
			if (params.status) {
				this.status = params.status;
			}
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../order/order', 1);
			this.cateCurrentIndex = this.status;
			this.orderGoodsList = [];
			this.loadingType = 1;
			this.page = 1;
			this.getOrderList();
			//console.log(userLoginInfo);
		},
		onPullDownRefresh() {},
		//页面上拉触底事件的处理函数
		onReachBottom() {
			//console.log("onReachBottom");
			this.getOrderList();
		},
		onHide(){
			// console.log("页面隐藏了");
		},
		methods: {
			navigateBack() {
				uni.navigateBack();
			},
			// 根据status 加载商品状态  ---待收货--代发货
			getOrderList() {
				uni.request({
					url: this.apiUrl + 'user/getOrder',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						page: this.page,
						status: this.status
					},
					success: (res) => {
						if (res.data.code == 0) {
							if (Array.isArray(res.data.data) && res.data.data.length === 0) {
								this.loadingType = 2;
								return;
							}
							if (res.data.data.length < 6) {
								this.loadingType = 2;
							}
							
							this.page++;
							let orderData = [];
							res.data.data.forEach((orders) => {
								//获取商品总件数
								orders.sum = 0;
								// orders.allPrice = 0;
								orders.goods.forEach((goods) => {
									orders.sum += goods.num;
									// orders.allPrice += goods.price;
								})
								orderData.push(orders);
							});
							this.orderGoodsList = this.orderGoodsList.concat(orderData);
							// 拼接加载更多数据
							// console.log(this.orderGoodsList);
						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			},
			// 切换tabbar
			tabChange: function(e) {
				this.loadingType = 1;
				var status = e.currentTarget.dataset.status;
				var index = e.currentTarget.dataset.index;
				this.cateCurrentIndex = index;
				this.status = status;
				// console.log(this.status);
				this.orderGoodsList = [];
				this.page = 1;
				this.getOrderList();
			},
			doSearch() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			// 			onLoad(event) {
			// 				// 目前在某些平台参数会被主动 decode，暂时这样处理。
			// 				try {
			// 					this.banner = JSON.parse(decodeURIComponent(event.detailDate));
			// 				} catch (error) {
			// 					this.banner = JSON.parse(event.detailDate);
			// 				}
			// 				uni.setNavigationBarTitle({
			// 					title: this.banner.title
			// 				});
			// 			},
			// 跳转到商品详情页
			goOrderDetail(trade) {
				uni.navigateTo({
					// url: './adress?editId=' + addressId
					url: './receive_goods?order_trade_no=' + trade
				})
			},
			// 去评论
			evaluate(goodsId, goodsImage) {
				uni.navigateTo({
					url: '../goods/evaluate?goods_id=' + goodsId + '&goods_image=' + goodsImage
				})
			},
			// 去付款
			goPay(pays) {
				uni.redirectTo({
					url: '../pay/pay?order_trade_no=' + pays
				})
			},
			// 删除订单
			delectOrder(trade) {
				uni.request({
					url: this.apiUrl + 'user/setOrderStatus',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						order_trade_no: trade,
						status: -1
					},
					success: (res) => {
						if (res.data.code == 0) {
							uni.showToast({
								title: '删除成功！',
								icon: 'none',
								success: () => {
									// 清空商品信息
									this.orderGoodsList = [];
									this.page = 1;
									this.getOrderList();
								}
							})

						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			},
			// 确认收货
			conformOrder(trade) {
				uni.request({
					url: this.apiUrl + 'user/setOrderStatus',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						order_trade_no: trade,
						status: 1
					},
					success: (res) => {
						if (res.data.code == 0) {
							uni.showToast({
								title: '已确认收货',
								icon: 'none',
								success: () => {
									// 清空商品信息
									this.orderGoodsList = [];
									this.page = 1;
									this.getOrderList();
								}
							})
						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			},
		},
	}
</script>
<style lang="less">
	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		height: 100upx;
	}

	.places {
		/*  #ifdef  APP-PLUS  */
		margin-top: 0;
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
		justify-content: flex-start;
		z-index: 996;
	}

	// 字体颜色 覆盖
	.Ocolor {
		color: #8f8f94;
	}

	.uni-media-list-text-bottom {
		color: #000;
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

	.arrow-left-mp {
		/* #ifdef MP-WEIXIN*/
		width: 0;
		overflow: hidden;
		margin-left: 80upx;
		/* #endif */
	}

	// 分段器
	.home-header-cate {
		position: fixed;
		width: 100%;
		height: 84upx;
		background: #FFF;
		border-bottom: 2px solid #F0F0F0;
		z-index: 1000;
		left: 0;
	}

	.home-tab-title {
		white-space: nowrap;
		text-align: center;
	}

	.home-tab-title view {
		width: auto;
		height: 80upx;
		padding:0 20rpx;
		// margin: 0 10upx;
		line-height: 84upx;
		display: inline-block;
		text-align: center;
		font-size: 31upx;
	}

	// .home-tab-title view:first-child{margin-left: 0;}
	// .home-tab-title view:last-child{margin-right: 0;}
	.home-tab-current {
		border-bottom: 2px solid #DE533A !important;
		color: #DE533A;
	}

	// 商品样式
	.order_goods {
		margin-top: 20upx;
		background-color: #FFFFFF;

		.order_store {
			display: flex;
			height: 60upx;
			padding: 20upx 40upx;
			font-size: 32upx;
			justify-content: space-between;
		}

		.logo {
			width: 270upx;
			height: 256upx;
		}

		.uni-media-list-body {
			height: auto;
			justify-content: space-around;

		}

		.uni-media-list-text-top {
			font-size: 29upx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.uni-media-list-text-bottom {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.order_operation {
			text-align: right;
			padding: 26upx;

			.num {
				margin-right: 20upx;
			}
		}

		.order_button {
			margin-top: 30upx;

			text {
				height: 80upx;
				padding: 12upx 14upx;
				border: 1px solid #ccc;
				border-radius: 14upx;
				margin-left: 20upx;
			}

		}
	}

	// 内容相隔距离
	.order_goods:nth-child(1) {
		margin-top: -4upx;
	}

	.uni_firm {
		width: 35%;
		height: 220upx;
		margin-right: 9px;
	}

	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		background-color: #c8c7cc;
	}
</style>
