<template>
	<view class="firm_order">
		<!--订单-->
		<view @click="changeAdress" class="uni-flex uni-row" style="display:fles;justify-content: flex-start;align-items: center;padding: 0 20upx;">
			<view class="address" style="width: 10%;">
				<span class="iconfont img_icon" style="font-size: 52upx;">&#xe61b;</span>
			</view>
			<view v-if="isfault" style="width:90%;text-align: left;">
				<view class="order_adree uni-flex uni-row">
					<text>收货人：{{adressInfo.name}}</text>
					<text>{{adressInfo.mobile}}</text>
				</view>
				<view class="firm_icon">
					<view style="line-height: 30upx;"><text>收货地址：{{adressInfo.province}}{{adressInfo.city}}{{adressInfo.area}}{{adressInfo.address}}</text></view>
				</view>
				
			</view>
			<view v-else class="order_adree">
				<view style="justify-content: center;">快去添加收货地址吧</view>
			</view>
		</view>
		<view class="hr">
			<image src="http://static.lamamuying.com/static/images/hr.png"></image>
		</view>
		<!--购买的商品-->
		<view>
			<view class="order_goods" v-for="(orderGoods,goodsIndex) in selectGoods" :key="goodsIndex">
				<navigator class="uni-list" hover-class="none" :url="'/pages/goods/goods_detail?goods_id='+orderGoods.goods_id">
					<view class="uni-list-cell">
						<view class="uni-media-list">
							<image class="uni_firm logo" :src="orderGoods.image"></image>
							<view class="uni-media-list-body">
								<view class=" firm_title">{{orderGoods.goods_name}}</view>
								<view class="order_store">
									<text>属性:{{orderGoods.attr}}</text>
								</view>
								<view class="uni-media-list-text-bottom">
									<text style="color:#E75265;">￥{{orderGoods.price}}</text>
									<text class="Ocolor">X{{orderGoods.num}}</text>
								</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<!--买家留言 -->
			<view class="words">
				<view class="words_top uni-flex uni-row">
					<text>买家留言</text>
					<input type="text" value="" class="words_ps" />
				</view>

			</view>
		</view>

		<view class="order_pay">
			<view class="chose-all">
				<view class="words_foot uni-flex uni-row">
					<text>共<text style="color: #ff4965;">{{num}}</text>件商品</text>
				</view>
			</view>
			<view class="price">合计：￥{{totalPrice}}</view>
			<view class="submit"><button class="btn" @click="payMony">提交订单</button></view>
		</view>
		<view style="height:100upx;"></view>
	</view>
</template>
<script>
	import cartNumberBox from '../../components/cart-number-box.vue';
	var userLoginInfo,selectGoods;
	export default {
		components: {
			cartNumberBox
		},
		data() {
			return {
				adressInfo: [],
				selectId: 123,
				isfault: true,
				selectGoods: [],
				num: 0,
				totalPrice: 0
			}
		},
		onShow() {
			// console.log('页面已显示');
			let selectAddress = uni.getStorageSync('selectAddress');
			
			userLoginInfo = this.userLoginInfo('../order/firm_order', 1);					
			// 获取第一条地址信息
			if (selectAddress) {
				this.isfault = true;
				this.adressInfo = selectAddress;
			} else {
				this.getAdress();
			}
		},
		onHide(){
			uni.removeStorageSync('selectAddress');
			// console.log('页面已隐藏');
		},
		onUnload(){
			// console.log('页面已卸载');
		},
		onLoad: function(params) {			
			if (params.selectGoods) {
				// 获取购物车商品信息
				selectGoods = params.selectGoods;
				this.selectGoods = JSON.parse(params.selectGoods);
				for (var i = 0; i < this.selectGoods.length; i++) {
					this.num += this.selectGoods[i].num;
					this.totalPrice += this.selectGoods[i].price * this.selectGoods[i].num;
				}
			}
			if (params.id) {
				// 用户自己选择地址
				this.selectId = params.id;
				this.getAddressVIew();
				return;
			}
			//console.log(this.adressInfo);
		},
		methods: {
			// 改变用户地址
			changeAdress() {
				uni.navigateTo({
					url: '../addAdress/address_management'
				})
			},
			// 去支付  ---提交订单
			payMony: function() {
				if(!this.isfault){
					uni.showToast({
						title:'请添加收货地址',
						icon:'none'
					})
					return;
				}
				let orderData = {
					shop_id: userLoginInfo.shop.id,
					address_id: this.adressInfo.id,
					goods: selectGoods,
					uid: userLoginInfo.id
				};
				
				
				//orderData = JSON.stringify(orderData)
				uni.request({
					url: this.apiUrl + 'user/addOrder',
					method: "GET",
					data: orderData,
					success: (res) => {
						if (res.data.code == 0) {
							uni.redirectTo({
								url: '../pay/pay?order_trade_no=' + res.data.data.order_trade_no
							});
							//删除购物车商品
							this.delCartGoods();
						}
					},
				})
			},
			//提交订单   删除购物车商品
			delCartGoods(){
				let cartGoods = uni.getStorageSync('cartGoods');
				let cart = [];
				let newCart = [];
				for (var i = 0; i < cartGoods.length; i++) {
					if (cartGoods[i].uid == userLoginInfo.id) {
						cart = cartGoods[i].goods;
					}
				}
				
				this.selectGoods.forEach((goods,goodsIndex)=>{
					cart.forEach((cartGoods,cartGoodsIndex)=>{
						if(goods.goods_id == cartGoods.goods_id && goods.attr == cartGoods.attr){
							cart.splice(cartGoodsIndex,1)
						}
					});
				})
				let cartData = [];
				let goods = [];
				for (let i = 0; cart.length > i; i++) {
					if (cart[i].num > 0) {					
						goods.push(cart[i]);
					}
				}
				cartGoods.forEach(cart => {
					if (cart.uid == userLoginInfo.id) {
						cart.goods = goods;
					}
					cartData.push(cart);
				});
				//console.log(cartData);
				uni.setStorageSync('cartGoods', cartData);
			},
			// 加载用户选择的地址
			getAddressVIew: function() {
				uni.request({
					url: this.apiUrl + 'user/getAddressVIew',
					method: 'GET',
					data: {
						// 判断用户是否登录
						uid: userLoginInfo.id,
						id: this.selectId
					},
					success: (res) => {
						if (res.data.code == 0) {
							this.adressInfo = res.data.data;
						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			},
			// 加载默认收货地址
			getAdress: function() {
				uni.request({
					url: this.apiUrl + 'user/getAddress',
					method: 'GET',
					data: {
						// 判断用户是否登录
						uid: userLoginInfo.id
					},
					success: (res) => {
						if (res.data.code == 0) {
							if (Array.isArray(res.data.data) && res.data.data.length === 0) {
								this.isfault = false;
								return;
							}
							this.adressInfo = res.data.data[0];
							if(this.adressInfo){
								this.isfault = true;
							}else {
								this.isfault = false;
							}
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
	.firm_order {

		.order_adree {
			padding: 30upx 50upx 0 0;
			height: 60upx;
			line-height: 60upx;
			justify-content: space-between;
			font-size: 36upx;
			// margin-left: 40upx;
		}

		.firm_icon {
			// padding: 0 30upx;
			// padding-bottom: 2%;
			color: #64676F;

			image {
				width: 7%;
				height: 46upx;
				vertical-align: top;
				margin-right: 2%;
			}
		}

		.hr {
			padding-bottom: 0.93%;
			position: relative;
			margin-top: 20upx;
			image {

				position: absolute;
				width: 100%;
				height: 100%;
			}
		}
	}

	.order_goods {
		background-color: #FFFFFF;

		.order_store {
			display: flex;
			height: 60upx;
			// padding: 10upx 0;
			font-size: 24rpx;
			color: #8a8a8a;
			justify-content: space-between;
		}

		.uni-media-list-body {
			height: auto;
			justify-content: space-around;
		}

		.uni-media-list-text-bottom {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	// 字体颜色 覆盖
	.Ocolor {
		color: #8f8f94;
	}

	// 商品数量
	.attrs {
		justify-content: space-between;
		padding: 0 50upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;

		.num {
			line-height: 50px;
		}
	}

	// 买家留言
	.words {
		background-color: #fff;

		.words_top {
			height: 100upx;
			// line-height: 100upx;
			border-bottom: 1px solid #ececec;
			padding-left: 20upx;
			font-size: 34upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.words_ps{
				text-align: right;
				height: 100upx;
				line-height: 100upx;
				width: 70%;
				margin-right: 20upx;
			}
		}

		.words_foot {
			padding: 0 50upx;
			height: 100upx;
			line-height: 100upx;
			justify-content: flex-end;
		}
	}

	// 新添加样式
	.uni-media-list-logo {
		width: 200upx;
		height: 160upx;
	}

	.uni_firm {
		width: 35%;
		height: 220upx;
		margin-right: 9px;
	}

	.uni-list {
		border-top: 1px solid #ececec;
	}

	.firm_title {
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.img_icon {
		width: 60upx;
		height: 60upx;
		margin-top: 11upx;
	}

	.bottom {
		background-color: #fff;
		text-align: center;
		font-size: 32upx;
		padding: 30upx;
	}

	// 去支付按钮
	.order_pay {
		display: flex;
		position: fixed;
		width: 100%;
		height: 96upx;
		background: #fafafa;
		bottom: 0;
		/*  #ifdef  H5  */
		bottom: 98upx;
		/*  #endif  */
		font-size: 24upx;
		color: #333;
		flex-direction: row;
		align-items: center;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);  
		z-index:1111;
		.chose-all {
			width: 20%;
			margin-left: 6%;
			font-size: 30upx;
		}

		.price {
			width: 40%;
			font-size: 32upx;
			color: #ff4965;
			text-align: right;
			margin-right: 3%;
			font-weight: bold;
		}

		.submit {
			width: 35%;

			.btn {
				//display: block;
				width: 100%;
				height: 96upx;
				background: #ff4965;
				color: #fff;
				font-size: 32upx;
				font-weight: bold;
				text-align: center;
				line-height: 96upx;
				border-radius: 0;
			}
		}
	}
</style>
