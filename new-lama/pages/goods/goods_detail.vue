<template>
	<view>
		<view class="container">
			<swiper class="goodsimgs" indicator-dots="true" autoplay="true" interval="3000" duration="500">
				<swiper-item v-for="(item, index) of goodsImages" :key="item.id" :data-index="index">
					<img :src="item.image" :data-src="item.image" @tap="previewImage" />
				</swiper-item>
			</swiper>
			<view class="goods-info">
				<view class="c">
					<view class="name">{{ goods.name }}</view>
					<view class="price">￥{{ goods.price }}</view>
					<view class="omit" v-if="economize == 0? flase : true">
						<text style="text-align: left;">价格立省{{economize}}元</text>
					</view>
				</view>
			</view>
			<view class="section-nav section-attr" @click="switchAttrPop">
				<view class="t">请选择规格数量</view>
				<img class="i" src="http://static.lamamuying.com/static/images/address_right.png" background-size="cover" />
			</view>
			<view class="comments" v-if="goodsComment.count > 0">
				<view class="h">
					<navigator :url="'../comment/comment?valueId=' + goods.id + '&typeId=0'">
						<text class="t">
							评价({{ goodsComment.count > 999 ? '999+' : goodsComment.count }})
						</text>
						<text class="i">查看全部</text>
					</navigator>
				</view>
				<view class="b">
					<view class="item" v-for="(commentItem, commentIndex) of goodsComment.data" :key="commentItem.id" :data-index="commentIndex">
						<view class="info">
							<view class="user">
								<img :src="commentItem.avatar" />
								<text>{{ commentItem.nickname }}</text>
							</view>
							<view class="time">{{ commentItem.addtime }}</view>
						</view>
						<view class="content">{{ commentItem.content }}</view>
					</view>
				</view>
			</view>
			<view class="goods-content" style="padding-bottom: 100upx;">
				<view class="t">商品详情</view>
				<view class="ricetext">
					<rich-text :nodes="goods.content" style="font-size: 0;"></rich-text>
				</view>
			</view>
			<my-drawer :visible="openAttr" mode="right" @close="closeAttr">
				<view class="attr-pop-box">
					<view class="attr-pop">
						<view class="close" @click="closeAttr">
							<img class="icon" src="http://static.lamamuying.com/static/images/icon_close.png" />
						</view>
						<view class="img-info">
							<img class="img" :src="goods.image" />
							<view class="info">
								<view class="c">
									<view class="p">价格：￥{{ goods.price }}</view>
									<view class="a">已选择：{{ selectGoodsAttr.attrs }}</view>
									<view class="a">购买数量：{{ numberValue }}</view>
								</view>
							</view>
						</view>
						<view class="spec-con">
							<view class="productBox">
								<view class="productConten">
									<view class="product-delcom" v-for="(ProductItem, n) in goods.attrs_list" :key="n">
										<text>{{ ProductItem.name }}</text>
										<view class="product-footerlist clearfix">
											<view class="product-attrs" v-for="(oItem, index) in ProductItem.item" :key="index" @click="
													specificationBtn(oItem.name, n, $event, index)
												"
											 v-bind:class="[
													oItem.isShow ? '' : 'noneActive',
													subIndex[n] == index ? 'productActive' : ''
												]">
												{{ oItem.name }}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="number-item">
								<view class="name">数量</view>
								<view class="number">
									<uni-number-box :min="1" :max="99" :value="numberValue" v-on:change="onNumberChange"></uni-number-box>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-btn">
					<view class="l l-collect" @click="heart()">
						<!-- <img class="icon"  :src="collectBackImage" /> -->
						<span class="iconfont article_icon1" style="font-size: 50upx;color:#919191;" v-if="icon1===0">&#xe60f;</span>
						<span class="iconfont article_icon1" style="font-size: 50upx;color:#F9EC51;" v-show="icon1===1">&#xe60f;</span>
					</view>
					<view class="l l-cart" @click="goCart">
						<view class="box">
							<text class="cart-count">{{ cartGoodsCount }}</text>
							<img class="icon" src="http://static.lamamuying.com/static/images/ic_menu_shoping_nor.png" />

						</view>
					</view>
					<view class="c" @click="addToCart">加入购物车</view>
					<view class="r" @click="addToCart('buy')">立即购买</view>
				</view>
			</my-drawer>
			<view class="bottom-btn">
				<view class="l l-collect" @click="heart()">
					<!-- <img class="icon" :src="collectBackImage" /> -->
					<span class="iconfont " style="font-size: 50upx;color:#919191;" v-if="icon1===0">&#xe60f;</span>
					<span class="iconfont " style="font-size: 50upx;color:#F9EC51;" v-show="icon1===1">&#xe60f;</span>
				</view>
				<view class="l l-cart" @click="goCart">
					<view class="box">
						<text class="cart-count">{{ cartGoodsCount }}</text>
						<img class="icon" src="http://static.lamamuying.com/static/images/ic_menu_shoping_nor.png" />
					</view>
				</view>
				<view class="c" @click="addToCart">加入购物车</view>
				<view class="r" @click="addToCart('buy')">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	var userLoginInfo, cartGoods, userInfo, imagesP;
	import myDrawer from '@/components/my-animation.vue';
	import uniNumberBox from '@/components/uni-number-box.vue';
	var pageOptions;
	export default {
		components: {
			myDrawer,
			uniNumberBox
		},
		data() {
			return {
				icon1: 0,
				goods: {
					attrs: [],
					attrs_list: []
				},
				goodsImages: [],
				productList: [],
				goodsComment: [],
				openAttr: false,
				collectBackImage: 'http://static.lamamuying.com/static/images/icon_collect.png',
				cartGoodsCount: 0, //购物车数量
				numberValue: 1, //购买数量
				selectArr: [], //存放被选中的值
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
				goodsAttrId: '',
				selectGoodsAttr: {},
				cart: [],
				identity: 1

			};
		},
		computed: {
			economize: function() {
				let price = this.goods.market_price - this.goods.price;
				return Math.round(price * 100) / 100;
			}
		},
		onLoad: function(params) {
			pageOptions = params;
			userInfo = uni.getStorageSync('userLoginInfo');
			if (userInfo.identity) {
				this.identity = userInfo.identity;
			}
			this.getCartCount();
			this.getGoods();

			//uni.removeStorageSync('cartGoods');
			//uni.removeStorageSync('userLoginInfo');
		},
		methods: {
			// 收藏
			heart() {
				this.icon1 = this.icon1 === 0 ? 1 : 0;
				if (this.icon1 === 1) {
					uni.showToast({
						title: "收藏成功",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: "取消收藏",
						icon: "none"
					});
				}
			},
			//获取商品信息
			getGoods: function() {
				uni.request({
					url: this.apiUrl + 'goods/getGoodsView',
					method: 'GET',
					data: {
						goods_id: pageOptions.goods_id,
						identity: this.identity
					},
					success: res => {
						if (res.data.code == 0) {
							// console.log(res.data.data.goods_images);
							let goods = res.data.data;
							let content = res.data.data.content;
							res.data.data.content = content.replace(
								/\<img/gi,
								'<img style="width:100%;height:auto" '
							);
							this.goods = res.data.data;

							this.goodsImages = goods.goods_images;
							this.goodsComment = goods.comment;
							this.goods.attrs = goods.attr.attrs;
							this.goods.attrs_list = goods.attr.attrs_list;
							this.intiAttrs();
							imagesP = this.goodsImages;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 点击图片放大预览
			previewImage: (e) => {
				var imagesLi = [];
				var current = e.currentTarget.dataset.src;
				imagesP.forEach((goods) => {
					imagesLi.push(goods.image);
				})
				wx.previewImage({
					loop: true,
					current: current, // 当前显示图片的http链接
					urls: imagesLi // 需要预览的图片链接列表
				})
			},
			getCart() {
				for (var i = 0; i < cartGoods.length; i++) {
					if (cartGoods[i].uid == userLoginInfo.id) {
						this.cart = cartGoods[i].goods;
					}
				}
			},
			getCartCount() {
				let userInfo = uni.getStorageSync('userLoginInfo');
				let cartGoods = uni.getStorageSync('cartGoods');
				// console.log(cartGoods);
				if (!userInfo || !cartGoods) {
					this.cartGoodsCount = 0;
				} else {
					for (var i = 0; i < cartGoods.length; i++) {
						if (cartGoods[i].uid == userInfo.id) {
							this.cartGoodsCount = cartGoods[i].goods.length;
						}
					}
				}
			},
			addToCart: function(jump) {
				userLoginInfo = this.userLoginInfo('../goods/goods_detail?goods_id=' + pageOptions.goods_id, 1);
				if (!userLoginInfo) {
					return;
				}
				cartGoods = uni.getStorageSync('cartGoods');
				if (this.openAttr === false) {
					// 打开规格选择弹窗
					this.openAttr = !this.openAttr;
				} else {
					//console.log(this.selectGoodsAttr);
					// 提示选择完整规格
					if (!this.selectGoodsAttr.id) {
						uni.showToast({
							title: '请选择商品规格',
							icon: 'none'
						});
						return false;
					}
					// 根据选中的规格，判断是否有对应的sku信息
					let checkedProduct = this.selectGoodsAttr;
					//console.log('checkedProduct', checkedProduct);
					// 验证商品型号
					if (checkedProduct.num <= 0) {
						// 提示没有库存
						uni.showToast({
							title: '库存型号不足',
							icon: 'none'
						});
						return false;
					}
					let productData = {
						goods_id: this.goods.id,
						goods_name: this.goods.name,
						attr: checkedProduct.attrs,
						image: checkedProduct.image,
						price: Number(checkedProduct.price),
						market_price: this.goods.market_price,
						num: this.numberValue
					};
					//console.log(productData);
					// 添加到购物车
					//const res = await api.CartAdd({ goodsId: this.goods.id, number: this.number, productId: checkedProduct[0].id });
					// console.log('添加到购物车，请求结果', res);
					const res = this._addToCart(productData);
					if (res.code === 0) {
						uni.showToast({
							title: '添加成功',
							icon: 'none'
						});
						this.openAttr = !this.openAttr;
						this.cartGoodsCount = res.goodsCount;
						if (jump == 'buy') {
							uni.switchTab({
								url: '../cart/cart'
							});
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				}
			},
			_addToCart(item) {
				let res = {
					code: 0,
					msg: '添加成功',
					goodsCount: 0
				};
				this.getCart();
				//console.log(this.cart);
				if (this.cart.length == 0) {
					this.cart.push(item);
				} else {
					let isExist = false;
					this.cart.forEach((goods) => {
						if (goods.goods_id == item.goods_id && goods.attr == item.attr) {
							goods.num = goods.num + item.num;
							isExist = true;
						}
					});
					if (isExist == false) {
						this.cart.push(item);
					}
				}
				this.setCartGoods();
				res.goodsCount = this.cart.length;
				return res;
			},
			setCartGoods() {
				let cartData = {
					uid: userLoginInfo.id,
					goods: this.cart
				};

				if (cartGoods.length == 0) {
					cartGoods = [];
					cartGoods.push(cartData);
				} else {
					let isExist = false;
					cartGoods.forEach((cart) => {
						if (cart.uid == userLoginInfo.id) {
							cart.goods = this.cart;
							isExist = true;
						}
					});
					if (isExist == false) {
						cartGoods.push(cartData);
					}
				}
				uni.setStorageSync('cartGoods', cartGoods);
				//console.log(cartGoods);
			},
			// 打开商品规格选择弹窗
			switchAttrPop: function() {
				if (this.openAttr === false) {
					this.openAttr = !this.openAttr;
				}
			},
			// 关闭规格弹窗
			closeAttr() {
				this.openAttr = false;
			},
			//点击加减数量
			onNumberChange: function(value) {
				this.numberValue = value;
				//console.log('购买数量 : ' + this.numberValue);
			},
			intiAttrs: function() {
				let self = this;
				for (let i in self.goods.attrs) {
					self.shopItemInfo[self.goods.attrs[i].attrs] = self.goods.attrs[i]; //修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配
				}
				this.initSeleted();
				self.checkItem();
			},
			/**
			 * 初始化选中
			 * @param  mixed|Int|String skuId 需要选中的skuId
			 * @return {[type]}       [description]
			 */
			initSeleted: function() {
				let self = this;
				let skuId = this.goodsAttrId;

				let option = self.goods.attrs_list;
				for (let i in self.goods.attrs) {
					if (self.goods.attrs[i].id == skuId) {
						let selectAttrName = self.goods.attrs[i].attrs.split(',');
						this.selectArr = selectAttrName;
					}
				}
				var selectAttr = [];
				for (let i in self.selectArr) {
					for (let ii in option) {
						for (let iii in option[ii].item) {
							if (option[ii].item[iii].name == self.selectArr[i]) {
								selectAttr.push(iii);
							}
						}
					}
				}
				this.subIndex = selectAttr;
			},
			specificationBtn: function(item, n, event, index) {
				var self = this;
				let attrs = self.goods.attrs;
				let option = self.goods.attrs_list;
				this.selectGoodsAttr = {};
				let select_attrs = '';
				if (self.selectArr[n] != item) {
					self.selectArr[n] = item;
					self.subIndex[n] = index;
				} else {
					self.selectArr[n] = '';
					self.subIndex[n] = -1; //去掉选中的颜色
				}
				for (let i in attrs) {
					if (attrs[i].attrs == this.selectArr.join(',')) {
						this.selectGoodsAttr = attrs[i];
					}
				}
				if (this.selectGoodsAttr.price) {
					this.goods.price = this.selectGoodsAttr.price;
					this.goods.image = this.selectGoodsAttr.image;
				}
				//console.log(this.selectGoodsAttr);
				//console.log(this.selectGoodsAttr.price);
				self.checkItem();
			},
			checkItem: function() {
				var self = this;
				var option = self.goods.attrs_list;
				var result = []; //定义数组存储被选中的值
				for (let i in option) {
					result[i] = self.selectArr[i] ? self.selectArr[i] : '';
				}

				for (let i in option) {
					let last = result[i]; //把选中的值存放到字符串last去
					for (let k in option[i].item) {
						result[i] = option[i].item[k].name; //赋值，存在直接覆盖，不存在往里面添加name值
						option[i].item[k].isShow = self.isMay(result); //在数据里面添加字段isShow来判断是否可以选择
					}

					result[i] = last; //还原，目的是记录点下去那个值，避免下一次执行循环时避免被覆盖
				}

				self.$forceUpdate(); //重绘
			},
			isMay: function(result) {
				for (var i in result) {
					if (result[i] == '') {
						return true; //如果数组里有为空的值，那直接返回true
					}
				}
				//console.log(this.shopItemInfo[result]);
				return this.shopItemInfo[result].num == 0 ? false : true; //匹配选中的数据的库存，若不为空返回true反之返回false
			},
			goCart: function() {
				uni.switchTab({
					url: '../cart/cart'
				});
			}
		}
	};
</script>

<style>
	@import '../../static/css/goods.css';

	.bottom-btn {
		border-bottom: none;

	}

	/* 添加修改样式 */
	.omit {
		font-size: 28upx;
		color: #B5001C;
		text-align: left;
		margin-top: 20upx;
		font-weight: 500;
	}
</style>
