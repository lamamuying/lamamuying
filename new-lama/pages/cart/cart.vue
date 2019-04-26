<!-- glance 店铺购物车单页模板 -->
<template>
	<view>
		<view class="cart">
			<block v-for="(goodsItem, goodsIndex) in cart" :key="goodsIndex">
				<view class="cart-item" v-if="goodsItem.num > 0">
					<view class="chose">
						<!-- <label>
						<checkbox color="#ff4965" /></label> -->
						<checkbox :checked="goodsItem.isChecked" @click="clickitemselected(goodsItem)" />
					</view>
					<view class="image">
						<image class="img" :src="goodsItem.image"></image>
					</view>
					<view class="attrs">
						<navigator class="title" hover-class="none" :url="'/pages/goods/goods_detail?goods_id='+goodsItem.goods_id">{{ goodsItem.goods_name }}</navigator>
						<view class="attr">属性:{{ goodsItem.attr }}</view>
						<view class="num">
							<!-- 减数量 -->
							<view class="num-minus" @click="minusitem(goodsItem)">-</view>
							<!-- 数量 -->
							<view class="num-quantity">{{ goodsItem.num }}</view>
							<!-- 加数量 -->
							<view class="num-plus" @click="plusitem(goodsItem)">+</view>
						</view>
					</view>
					<view class="action">
						<view class="price">￥{{ goodsItem.price }}</view>
						<view class="del_price">￥{{ goodsItem.market_price }}</view>
						<view class="del" @click="clickdel(goodsItem)">
							<span class="iconfont" style="font-size: 52upx; color: #999;">&#xe60e;</span>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view v-if="cart.length == 0" style="width: 100%;text-align:center;">
			<image mode="widthFix" src="../../static/images/cart.jpg"></image>
		</view>
		<view class="total">
			<view class="chose-all">
				<!-- <label>
					<checkbox value="all" :checked="isCheckAll" color="#ff4965" @click="allCheck" /> 全选 
				</label> -->
				<checkbox value="all" :checked="isCheckAll" @click="allCheck" />
				<text style="padding-left:20upx;">全选</text>
			</view>
			<view class="price">合计：￥{{ totalamount }}</view>
			<view class="submit"><button class="btn" @click="goFirm">结算</button></view>
		</view>
	</view>
</template>

<script>
	var userLoginInfo,
		cartGoods = [];
	export default {
		data() {
			return {
				isCheckAll: true,
				checkedCount: 0,
				// 实际项目中 购物车数据可从本地缓存中获取或从服务端获取
				cart: [],
				// 订单商品 购物车里已选择的商品生成订单
				selectGoods: [],
				// 合计金额
				totalamount: 0,
				// 购物车商品数量 用于空购物车背景
				cntitems: 0,
				cartGoodSelect: [],
				isdefault: true
			};
		},
		onLoad: function() {

		},
		onShow: function() {
			userLoginInfo = this.userLoginInfo('../cart/cart', 2);
			cartGoods = uni.getStorageSync('cartGoods');
			// console.log(cartGoods);

			//this.saveCart();
			this.getCartGoods();
			this.totalCart();
		},
		computed: {},
		// 关闭购物车前 存入缓存
		beforeDestroy: function() {
			if (userLoginInfo) {
				this.setCartGoods();
			}
		},
		methods: {
			setCartGoods() {
				let cartData = [];
				let goods = [];

				for (let i = 0; this.cart.length > i; i++) {
					if (this.cart[i].num > 0) {
						goods.push(this.cart[i]);
					}
				}
				cartGoods.forEach(cart => {
					if (cart.uid == userLoginInfo.id) {
						cart.goods = goods;
					}
					cartData.push(cart);
				});

				uni.setStorageSync('cartGoods', cartData);
				this.getCartGoods();
			},
			getCartGoods() {
				// 				if (this.cart) {
				// 					this.isdefault = true;
				// 				}
				for (var i = 0; i < cartGoods.length; i++) {
					if (cartGoods[i].uid == userLoginInfo.id) {
						this.cart = cartGoods[i].goods;
					}
				}
				this.cart.forEach((goods) => {
					goods.isChecked = true;
				});
				this.checkedCount = this.cart.length;
			},
			goFirm() {
				this._selectGoods();
				if (this.selectGoods.length == 0) {
					uni.showToast({
						title: '请选择购买商品',
						icon: 'none'
					})
					return false;
				}
				this.cartGoodSelect = JSON.stringify(this.selectGoods);
				uni.navigateTo({
					url: '../order/firm_order?selectGoods=' + this.cartGoodSelect
				})

			},
			// 统计选中金额
			totalCart() {
				this.totalamount = 0;
				for (let i = 0; i < this.cart.length; i++) {
					if (this.cart[i].isChecked) {
						this.totalamount = this.totalamount + this.cart[i].price * this.cart[i].num;
						// 总数量
						this.cntitems = this.cntitems + this.cart[i].num;
					}
				}
				this.totalamount = this.fmamount(this.totalamount);
			},
			allCheck() {

				this.isCheckAll = !this.isCheckAll;
				this.isCheckAll ?
					this.cart.forEach((proItem) => {
						if (!proItem.isChecked) {
							this._checkTrue(proItem)
						}
					}) :
					this.cart.forEach((proItem) => {
						if (proItem.isChecked) {
							this._checkFalse(proItem)
						}
					});
			},
			_checkTrue(item) {
				item.isChecked = true;
				this.totalamount = this.totalamount + item.price * item.num;
				this.totalamount = this.fmamount(this.totalamount);
				++this.checkedCount == this.cart.length ? this.isCheckAll = true : this.isCheckAll = false
			},
			_checkFalse(item) {

				item.isChecked = false;
				this.cntitems = this.cntitems - item.num;
				// 更新总金额
				this.totalamount = this.totalamount - item.price * item.num;
				this.totalamount = this.fmamount(this.totalamount);
				--this.checkedCount;
				this.isCheckAll = false;
			},
			// 点击勾选
			clickitemselected(item) {
				item.isChecked ? this._checkFalse(item) : this._checkTrue(item)
			},
			// 减数量
			minusitem(item) {
				if (item.num == 1) {
					return;
				}
				--item.num;
				if (item.isChecked) {
					// 更新总数量
					this.updatecntitems(-1);
					// 更新总金额
					this.updatetotalamt(-item.price);
				}
			},
			// 加数量
			plusitem(item) {
				if (item.num == 99) {
					return;
				}
				++item.num;
				// 勾选状态下更新数量和金额
				if (item.isChecked) {
					// 更新总数量
					this.updatecntitems(1);
					// 更新总金额
					this.updatetotalamt(item.price);
				}
			},
			// 点击删除
			clickdel(item) {
				uni.showModal({
					// title: '提示',
					content: '确定要删除该商品吗？',
					success: (res) => {
						if (res.confirm) {
							if (item.isChecked) {
								this.cntitems = this.cntitems - item.num;
								// 更新总金额
								this.totalamount = this.totalamount - item.price * item.num;
								this.totalamount = this.fmamount(this.totalamount);
							}
							item.num = -1;
							this.setCartGoods();
							// 删除购物车商品时 更新合计金额
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
			// 更新合计金额
			updatetotalamt(amt) {
				this.totalamount = this.totalamount + amt;
				this.totalamount = this.fmamount(this.totalamount);
			},
			// 更新合计数量
			updatecntitems(cnt) {
				this.cntitems = this.cntitems + 1;
			},
			// 格式化金额
			fmamount(amt) {
				return Math.round(amt * 100) / 100;
			},
			_selectGoods(item) {
				this.selectGoods = [];
				this.cart.forEach(item => {
					if (item.isChecked) {
						this.selectGoods.push(item)
					}
				});
			},
		}
	};
</script>

<style lang="less">
	.cart {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-bottom: 100upx;

		.cart-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 240upx;
			margin-top: 10upx;
			border-bottom: 2upx solid #eeeeee;
			background: #fff;

			.chose {
				width: 10%;
				margin-left: 2%;
			}

			.image {
				width: 170upx;
				height: 170upx;

				.img {
					width: 170upx;
					height: 170upx;
				}
			}

			.attrs {
				width: 60%;
				margin-left: 2%;

				.title {
					font-size: 28upx;
					line-height: 36upx;
					color: #333;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.attr {
					font-size: 24upx;
					color: #8a8a8a;
				}

				.num {
					display: flex;
					flex-flow: row;
					align-items: flex-end;
					justify-content: space-between;
					width: 50%;
					height: 50upx;
					font-size: 20px;
					text-align: center;
					color: #6c6c6c;
					line-height: 50upx;
					margin-top: 20upx;

					.num-minus {
						border-style: solid;
						border-width: 1px 0px 1px 1px;
						border-color: #ccc;
						width: 33.33%;
						height: 100%;
						position: relative;
						top: 25%;
						transform: translateY(-50%);
					}

					// 数量
					.num-quantity {
						border-style: solid;
						border-width: 1px 1px 1px 1px;
						border-color: #ccc;
						width: 33.33%;
						height: 100%;
						font-size: 13px;
						position: relative;
						top: 25%;
						transform: translateY(-50%);
					}

					// 加数量
					.num-plus {
						border-style: solid;
						border-width: 1px 1px 1px 0;
						border-color: #ccc;
						width: 33.33%;
						height: 100%;
						position: relative;
						top: 25%;
						transform: translateY(-50%);
					}
				}
			}

			.action {
				width: 24%;
				margin-right: 3%;

				.price {
					width: 100%;
					font-size: 28upx;
					font-weight: bold;
					color: #ff4965;
					text-align: right;
				}

				.del_price {
					width: 100%;
					font-size: 20upx;
					font-weight: bold;
					color: #999;
					text-align: right;
					text-decoration: line-through;
				}

				.del {
					width: 100%;
					font-size: 20upx;

					margin-top: 36upx;
					text-align: right;
				}
			}
		}
	}

	.total {
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

		.chose-all {
			width: 20%;
			margin-left: 2%;
			font-size: 28upx;
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
