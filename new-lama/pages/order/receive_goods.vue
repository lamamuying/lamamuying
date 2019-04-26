<template>
	<view>
		<!-- 待付款 -->
		<view class="flex-item uni-row">
			<view class="uni-column">
				<view class="wait">{{orderGoodsList.status}}</view>

			</view>
	
			<span class="iconfont waitImge" style="font-size: 90upx; margin-bottom: 30upx; color: #fff;">&#xe69d;</span>
		</view>
		<!-- 订单地址 -->
			<!-- 地址信息 -->
			<view class="uni-row address">
				
				<span class="iconfont address-logo" style="font-size: 46upx;">&#xe614;</span>
				<view class="uni-column add">
					<view>
						<text>{{orderGoodsList.address_name}}</text> 
						<text style="color:#999;padding-left: 20upx;">{{orderGoodsList.address_tel}}</text>
					</view>
					<view>{{orderGoodsList.address_address}}</view>
				</view>
			</view>
			<!-- 购买商品信息 -->
			<view class="goodsList uni-column">
				<view style="border-bottom: 1px #E2E2E2 solid; width: 100%; margin-top: 10upx;"  class="goods uni-row"  v-for="(orderItem,orderIndex) in orderGoodsList.goods" :key="orderIndex">
					<view style="width: 25%;">
						<image style="width: 160upx;" :src="orderItem.image" mode=" widthFix"></image>
					</view>					
					<view class="uni-column message" style="width:58%; padding-right: 2%;">
						<view class="goodsName">{{orderItem.goods_name}}</view>
						<view class="size">{{orderItem.goods_attr_value}}</view>
						
					</view>
					<view class="price uni-column" style="width: 15%;">
						<text>￥{{orderItem.price}}</text>
						<view style="color:#999;font-size: 26upx;">x{{orderItem.num}}</view>
					</view>
				</view>
				<view class="goodsMoney uni-row">
					<text>运费</text> <text class="over">￥0.00</text>
				</view>
				<view class="goodsMoney uni-row">
					<text>优惠</text> <text class="over">-￥{{orderGoodsList.discount}}</text>
				</view>
				<view class="goodsMoney uni-row">
					<text style="font-size: 28upx;color:#333;">实付款(含运费)</text>
					<text style="color:#F96400;width:73%;text-align: right;">￥{{orderGoodsList.amount}}</text>
				</view>
			</view>
			<!-- 订单信息 -->
			<view class="orderMessage uni-column">
				<view class="info">订单信息</view>
				<view class="uni-row number">
					<text>订单编号：</text>
					<text class="num">{{orderGoodsList.order_trade_no}}</text>
				</view>
				<view class="uni-row number">
					<text>付款交易号：</text>
					<text style="margin-left:7%;">2840379358249321174564534</text>
				</view>
				<view class="uni-row number">
					<text>创建时间：</text>
					<text class="num">{{orderGoodsList.addtime}}</text>
				</view>
				<!-- 代付款 隐藏 -->
				<view class="uni-row number" v-if="orderGoodsList.status != '待付款'">
					<text>付款时间：</text>
					<text class="num">{{orderGoodsList.pay_time}}</text>
				</view>
				<!-- 代付款隐藏 -->
				<view v-if="orderGoodsList.status == '待收货' || orderGoodsList.status =='待评价'" class="uni-row number">
					<text>发货时间：</text>
					<text class="num">2019-3-19 10:22:57</text>
				</view>
			</view>
			<!-- 占位符 -->
			<!-- <view class="place"></view> -->
			<!-- 支付方式 -->
			<!-- <view class="payStyle">
			
			<view class="close">查看物流</view>
			<view class="pay" @tap="showBanner">确认收货</view>		
			
		</view> -->
	</view>
</template>
<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				orderTrade: '',
				orderGoodsList: []
			}
		},
		onLoad(params) {
			this.orderTrade = params.order_trade_no;
			//console.log(params.order_trade_no);
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../order/recevie_goods', 1);
			// this.cateCurrentIndex = this.status;
			this.getOrderDetail();
			//console.log(userLoginInfo);
		},
		methods: {
			// 获取订单详情
			getOrderDetail() {
				uni.request({
					url: this.apiUrl + 'user/getOrderView',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						order_trade_no: this.orderTrade,
					},
					success: (res) => {
						if (res.data.code == 0) {
							console.log(res.data.data);
							this.orderGoodsList = res.data.data;
						}
						console.log(this.orderGoodsList)
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
	// 占位符
	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		height: 120upx;
	}

	.flex-item {
		background: linear-gradient(to top, #FF5B50 30%, #FF495A 70%);
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

		
			.add{text-align: left;width: 88%;overflow: hidden;}
	
	}

	.logistics {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 20upx;
		background: #fff;
		border-bottom: 2upx solid #ececec;

		.logistics-logo {
			width: 70upx;
			height: 70upx;
			margin-right: 20upx;
		}

		.fast {
			width: 88%;

			.express {
				width: 100%;
				height: 50upx;
				color: #0080FF;
				font-size: 30upx;
				// flex-wrap: wrap;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.date {
				color: #999;
				font-size: 26upx;
			}

		}


	}
	
		.refund{			
			width:120upx;
			font-size: 24upx;
			border:2upx solid #ccc;
			border-radius: 30upx;
			line-height: 50upx;
			text-align: center;			
			margin: 20upx 0;
			margin-left: 80%;
		}
	.goodsList {
		margin-top: 20upx;
		background: #fff;
		padding: 20upx;

		.goods {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding-bottom: 10upx;

			image {
				width: 200upx;
				height: 150upx;
				margin-right: 20upx;
				border-radius: 15upx;
			}

			.message {
				.goodsName {
					line-height: 40upx;
					height: 80upx;
					overflow: hidden;
					font-size: 28upx;
				}

				.size {
					color: #999;
					font-size: 26upx;
				}

				.remarks {
					color: #F76300;
					font-size: 24upx;
					background: #FFD9BF;
					width: 30%;
					text-align: center;
					border-radius: 10upx;
				}
			}

			.price {
				text-align: right;
				font-size: 26upx;
			}
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
			border-left: 4upx solid #F96400;
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
				margin-left: 11%;
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

		.close {
			width: 160upx;
			font-size: 24upx;
			border: 2upx solid #ccc;
			border-radius: 30upx;
			line-height: 60upx;
			text-align: center;
		}

		.pay {
			width: 160upx;
			font-size: 24upx;
			border: 2upx solid #ccc;
			border-radius: 30upx;
			line-height: 60upx;
			margin: 0 20upx;
			color: #F96400;
			text-align: center;
		}
	}
</style>
