<template>
	<view>
		<!-- 引入搜索组件 -->
		<header-search type="home" @scanCode="scanCode"></header-search>
		<!-- 占位 导航条-->
		<view class="home-header-cate">
			<scroll-view class="home-tab-title lama-center" scroll-x="true" id="home-tab-title">
				<view
					v-for="(cate, index) in category"
					:key="index"
					:data-cateid="cate.cid"
					:data-index="index"
					:class="[cateCurrentIndex === index ? 'home-tab-current' : '']"
					@click="tabChange"
				>
					{{ cate.cat_name }}
				</view>
			</scroll-view>
		</view>
		<view>
			<!-- 占位 轮播图-->
			<view class="swiper-view" @click="goGoods">
				<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff">
					<swiper-item v-for="swiper in swiperList" :key="swiper.sid"><image mode="aspectFill widthFix" :src="swiper.img"></image></swiper-item>
				</swiper>
				<view class="keep-out"></view>
			</view>
			<!-- 头条公告  限时抢购-->
			<index-con v-if="cateid == 0" type="home"></index-con>
			<!-- 店铺信息 -->
			<view class="store">
				<!-- <text style="font-size: 30upx;color:#ff4965;margin-bottom: 10upx;">商家店铺</text> -->
				<view class="uni-flex uni-row storeName">
					<view class="img"><image :src="shopOrd.shop_logo"></image></view>
					<!-- 					<view class="img">
						<image src="http://static.lamamuying.com/upload/ShopLogo/20190107/e4efcac88833be6e55bd003bb1d2dd37.jpeg"></image>
					</view> -->
					<view class="uni-flex uni-column name ">
						<text style="font-size: 34upx;font-weight:500;">{{ shopOrd.shop_name }}</text>
						<text class="shopping">辣妈母婴合作门店</text>
					</view>
				</view>
			</view>
			<!-- 热卖 辣妈推荐 -->
			<page-con :recGoods="recGoods" :goodsList="goodsList" :chidCategory="chidCategory" :cateid="cateid" :loadingType="loadingType" :showLoadMore="showLoadMore"></page-con>
		</view>
	</view>
</template>

<script>
let userInfo, shop;
import headerSearch from '@/components/common/header-search.vue';
import indexCon from '@/components/index-content/indexContent.vue';
import pageCon from '@/components/index-content/pageContent.vue';
export default {
	components: {
		headerSearch,
		indexCon,
		pageCon
	},
	data() {
		return {
			cateid: '0',
			headerPosition: 'fixed',
			category: [],
			chidCategory: [],
			cateCurrentIndex: 0,
			//轮播
			swiperList: [
				{
					sid: 0,
					cid: 7100,
					src: '自定义src0',
					// img: 'file:///E:/xjj-work/xjj4-11/new-lama/static/images/banner/images/banner/011.jpg'
					// img: 'http://static.lamamuying.com/static/images/banner/011.jpg'
					img: 'http://static.lamamuying.com/static/images/banner/banner1.jpg'
				},
				{
					sid: 1,
					cid: 7109,
					src: '自定义src1',
					img: 'http://static.lamamuying.com/static/images/banner/banner2.jpg'
				},
				{
					sid: 2,
					cid: 7095,
					src: '自定义src2',
					img: 'http://static.lamamuying.com/static/images/banner/banner3.jpg'
				},
				{
					sid: 3,
					cid: 7909,
					src: '自定义src3',
					img: 'http://static.lamamuying.com/static/images/banner/banner4.jpg'
				}
			],
			goodsList: [], //商品列表
			recGoods: [], //推荐商品
			loadingType: 1,
			page: 1,
			identity: 1,
			shopOrd: '',
			showLoadMore: false
		};
	},
	// 监听页面加载
	onLoad() {
		//uni.removeStorageSync('userLoginInfo');
		//uni.removeStorageSync('locationShop');
		//uni.removeStorageSync('referee');
		//this.locationShop();
		//console.log(uni.getStorageSync('userLoginInfo'));
		//console.log(this.locationShop());
		//console.log(uni.getStorageSync('referee'));
		//uni.setStorageSync('testInfo','lll');
		//console.log(uni.getStorageSync('testInfo'));
		//this.locationShop();
		userInfo = uni.getStorageSync('userLoginInfo');
		shop = uni.getStorageSync('locationShop');
		if (shop.id == undefined) {			
			uni.getLocation({
				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				success: locationRes => {
					var userLoginInfo = uni.getStorageSync('userLoginInfo');
					const latitude = locationRes.latitude;
					const longitude = locationRes.longitude;
					//console.log(res)
					uni.request({
						url: this.apiUrl + 'user/getLocation',
						method: 'GET',
						data: {
							lat: latitude,
							lng: longitude,
							uid: userLoginInfo.id
						},
						success: res => {
							shop = res.data.data;
							this.shopOrd = shop;
							uni.setStorageSync('locationShop', shop);
							if (userInfo.identity) {
								this.identity = userInfo.identity;
							}
							this.page = 1;
							this.goodsList = [];
							this.recGoods = [];
							this.getRecGoodsData();
							this.getGoodsCategory();
							this.getGoodsList();
						},
						fail: () => {
							console.log('无法获取定位');
						}
					});
				},
				fail: e => {
					console.log(JSON.stringify(e));
					console.log('获取定位失败');
				}
			});
		} else {
			this.shopOrd = shop;
			if (userInfo.identity) {
				this.identity = userInfo.identity;
			}
			this.page = 1;
			this.goodsList = [];
			this.recGoods = [];
			this.getRecGoodsData();
			this.getGoodsCategory();
			this.getGoodsList();
		}
	},
	onShow() {},
	// 监听页面卸载
	onUnload() {
		(this.goodsList = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
	},
	// 页面上拉触底事件的处理函数
	onReachBottom() {
		//console.log("onReachBottom");
		this.getGoodsList();
	},
	methods: {
		scanCode() {
			uni.scanCode({
				success: res => {
					//console.log('条码类型：' + res.scanType);
					//console.log('条码内容：' + res.result);
					uni.request({
						url: this.apiUrl + 'user/getUser',
						method: 'GET',
						data: {
							uid: res.result
						},
						success: result => {
							//console.log(result);
							uni.setStorageSync('referee', result.data.data.id);
							uni.setStorageSync('locationShop', result.data.data.shop);
							this.goodsList = [];
							this.recGoods = [];
							this.page = 1;
							this.getGoodsList();
							this.getRecGoodsData();
						},
						fail: () => {},
						complete: () => {}
					});
					uni.showToast({
						title: '扫描成功'
					});
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			});
		},
		// 商品分类事件
		tabChange: function(e) {
			this.loadingType = 1;
			// 分类id
			var cateid = e.currentTarget.dataset.cateid;
			//console.log(cateid);
			// 分类的index值 0~1，2，3
			var index = e.currentTarget.dataset.index;
			if (this.cateCurrentIndex === index) {
				return false;
			}
			this.cateCurrentIndex = index;
			this.page = 1;
			this.cateid = cateid;

			this.goodsList = [];
			this.getGoodsList();
			// tabbar下级分类
			// this.chidCategory = [];
			this.getGoodsCategory();
			this.getChildCategory();
		},
		//获取tabbar下级分类
		getChildCategory() {
			if (this.cateid > 0) {
				for (let i = 0; this.category.length > i; i++) {
					if (this.category[i].cid == this.cateid) {
						this.chidCategory = this.category[i].child;
					}
				}
			}
		},
		// 获取Category分类
		getGoodsCategory() {
			uni.request({
				url: this.apiUrl + 'goods/getCategory',
				method: 'GET',
				data: {},
				success: res => {
					if (res.data.code == 0) {
						// 获取首页各大分类
						res.data.data.unshift({
							cid: 0,
							cat_name: '全部',
							pid: 0
						});
						this.category = res.data.data;
						// console.log(this.category);
					}
				}
			});
		},
		// 获取商品列表
		getGoodsList: function() {
			//console.log(this.cateid);
			if (this.page < 2) {
				uni.showLoading({
					title: '数据加载中...'
				});
			}
			// console.log(shop);
			uni.request({
				url: this.apiUrl + 'goods/getGoodsList',
				method: 'GET',
				data: {
					shop_id: shop.id,
					page: this.page,
					cid: this.cateid,
					identity: this.identity,
					limit: 10
				},
				success: res => {
					if (res.data.code == 0) {
						if (Array.isArray(res.data.data) && res.data.data.length === 0) {
							this.loadingType = 2;
							return;
						}
						this.showLoadMore = true;
						this.page++;
						let goodsData = [];
						res.data.data.forEach(goods => {
							goodsData.push(goods);
						});
						this.goodsList = this.goodsList.concat(goodsData);
					}
				},
				fail: () => {
					uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					});
				},
				complete: () => {
					uni.hideLoading();
				}
			});
		},
		// 获取热门推荐
		getRecGoodsData: function() {
			uni.request({
				url: this.apiUrl + 'goods/getGoods',
				method: 'GET',
				data: {
					shop_id: shop.id,
					rec: 1,
					identity: this.identity
				},
				success: res => {
					if (res.data.code == 0) {
						this.recGoods = res.data.data;
						// console.log(this.recGoods)
					}
				},
				fail: () => {
					uni.showToast({
						title: '获取数据失败',
						icon: 'none'
					});
				},
				complete: () => {}
			});
		}
	}
};
</script>

<style lang="less">
/* 添加修改样式 */
.store {
	// height: 200upx;
	background: #fff;
	padding: 20upx;
	border-bottom: 2upx solid #e7ebec;

	.storeName {
		height: 160upx;
		padding: 10upx 0;

		.img {
			width: 25%;
			height: 160upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.name {
			width: 70%;
			margin-left: 5%;

			.shopping {
				width: 185upx;
				padding: 0 10upx;
				height: 50upx;
				line-height: 50upx;
				background: #ff4965;
				border-radius: 10upx;
				color: #fff;
				font-size: 22upx;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}

.place {
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
	height: 100upx;
}

/* #ifdef H5 || MP-WEIXIN*/
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
}

/*  #endif  */

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

.swiper-view {
	.swiper {
		width: 100%;
		height: 360upx;

		image {
			width: 100%;
			height: 360upx;
		}
	}

	.keep-out {
		width: 100%;
		height: 30upx;
		border-radius: 100% 100% 0 0;
		margin-top: -15upx;
		position: absolute;
	}
}

.notice_bg {
	width: 15%;
	margin-left: 10upx;
	padding-top: 10upx;
	overflow: hidden;
}

.notice_bg img {
	width: 100%;
}

.notice_content {
	width: 75%;
	height: 50upx;
	font-size: 28upx;
	margin-right: 5%;
	overflow: hidden;
	margin-top: 10upx;
	padding-left: 20upx;
}

.uni-swiper-msg {
	padding: 0 !important;
}

/* 首页分段器 */
.home-header-cate {
	width: 100%;
	height: 84upx;
	background: #fff;
	border-bottom: 2px solid #f0f0f0;
	z-index: 1;
	left: 0;
}

.home-tab-title {
	white-space: nowrap;
	text-align: center;
}

.home-tab-title view {
	width: auto;
	height: 80upx;
	padding: 0 12px;
	margin: 0 8px;
	line-height: 84upx;
	display: inline-block;
	text-align: center;
	font-size: 30upx;
}

.home-tab-title view:first-child {
	margin-left: 0;
}

.home-tab-title view:last-child {
	margin-right: 0;
}

.home-tab-current {
	border-bottom: 2px solid #de533a !important;
	color: #de533a;
}

.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}

.home_conter {
	justify-content: center !important;
}
</style>
