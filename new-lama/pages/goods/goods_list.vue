<template>
	<view>
		<!-- 引入搜索组件 -->
		<header-search type="page" :keyword="keyword" @setKeyword="setKeyword"></header-search>
		<!-- 价格筛选 -->
		<view class="search-keyword" @touchstart="blur">
			<view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="row in keywordList" :key="row.keyword">
					<view class="keyword-img">
						<image src="http://static.lamamuying.com/static/HM-search/back.png"></image>
					</view>
				</view>
			</view>
			<view class="select">
				<view @click="sortList" data-type="default">默认</view>
				<view class="uni-flex uni-row" style="color: #000000; justify-content: center;" @click="sortList" data-type="price">
					价格
					<view class="uni-flex uni-column" style="line-height: 84upx;">
						<span class="iconfont" style="font-size: 40upx; width: 20upx; height: 14upx;" :class="priceSort == 'asc' ? 'sort-chose' : ''">&#xe72d;</span>
						<span class="iconfont" style="font-size: 40upx; width: 20upx; height: 14upx;" :class="priceSort == 'desc' ? 'sort-chose' : ''">&#xe72e;</span>
					</view>
				</view>
				<view class="uni-flex uni-row" style="color: #000000; justify-content: center;" @click="sortList" data-type="sale">销量
					<view class="uni-flex uni-column" style="line-height: 84upx;">
						<span class="iconfont" style="font-size: 40upx; width: 20upx; height: 14upx;" :class="saleSort == 'asc' ? 'sort-chose' : ''">&#xe72d;</span>
						<span class="iconfont" style="font-size: 40upx; width: 20upx; height: 14upx;" :class="saleSort == 'desc' ? 'sort-chose' : ''">&#xe72e;</span>
					</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view style="width: 100%;background: #F6F6F6 !important;">
				<view class="uni-product-list home_conter" style="justify-content: flex-start;">
					<!-- 得到所有商品 -->
					<block v-for="(newsItem, newsIndex) in goodsList" :key="newsIndex">
						<navigator hover-class="none" :url="'/pages/goods/goods_detail?goods_id='+newsItem.id">
							<two-goods :data="newsItem"></two-goods>
						</navigator>
					</block>
				</view>
				<uni-load-more color="#333" :loadingType="loadingType"></uni-load-more>
				<!--  :status="status" :contentText="contentText" -->
			</view>
		</view>
	</view>
</template>

<script>
	var shop;
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/search/mehaotian-search-revision.vue';
	import twoGoods from '@/components/lama-goods-vue/two-goods.vue';
	import headerSearch from '@/components/common/header-search.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	let userInfo;
	export default {
		data() {
			return {
				headerPosition: "fixed",
				priceSort: '',
				saleSort: '',
				goodsList: [],
				sortType: '',
				page: 1,
				loadingType: 1,
				showLoadMore: false,
				keyword: '',
				cateId: 0
			}
		},
		onLoad: function(params) {
			this.keyword = params.keyword;
			if (params.cid) {
				this.cateId = params.cid;
			}
			userInfo = uni.getStorageSync('userLoginInfo');
			if (userInfo.identity) {
				this.identity = userInfo.identity;
			}
			shop = uni.getStorageSync('locationShop');
			//console.log(params);
			this.getGoodsList();
		},
		// 监听页面卸载
		onUnload() {
			this.goodsList = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		// 页面上拉触底事件的处理函数
		onReachBottom() {
			//console.log("onReachBottom");
			this.getGoodsList();
		},
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch,
			twoGoods,
			headerSearch,
			uniLoadMore
		},
		methods: {
			navigateBack() {
				uni.navigateBack();
			},
			setKeyword(data) {
				this.keyword = data;
				this.loadingType = 1;
				this.page = 1;
				this.goodsList = [];
				this.getGoodsList();
				//console.log(data);
			},
			// 获取商品分类
			// 获取商品列表
			getGoodsList: function() {
				if (this.page < 2) {
					uni.showLoading({
						title: "数据加载中..."
					});
				}
				let sort, data;
				if (this.sortType == 'price') {
					sort = this.priceSort;
				} else {
					sort = this.saleSort;
				}
				// console.log(this.keyword);
				if (this.keyword) {
					data = {
						shop_id: shop.id,
						page: this.page,
						name: this.keyword,
						limit: 10,
						type: this.sortType,
						sort: sort,
						identity:this.identity
					}
				} else {
					data = {
						shop_id: shop.id,
						page: this.page,
						cid: this.cateId,
						limit: 10,
						type: this.sortType,
						sort: sort,
						identity:this.identity
					}
				}
				//console.log(data);
				uni.request({
					url: this.apiUrl + 'goods/getGoodsList',
					method: 'GET',
					data: data,
					success: res => {
						if (res.data.code == 0) {
							// console.log(res.data.data);
							if (Array.isArray(res.data.data) && res.data.data.length === 0) {
								this.loadingType = 2;
								return;
							}
							if (res.data.data.length < 10) {
								this.loadingType = 2;
							}
							this.showLoadMore = true;
							this.page++;
							let goodsData = [];
							res.data.data.forEach((goods) => {
								goodsData.push(goods);
							});
							this.goodsList = this.goodsList.concat(goodsData);
						}
					},
					fail: () => {
						uni.showToast({
							title: "获取数据失败",
							icon: "none"
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			// 根据价格或者销量进行排序
			sortList(e) {
				var el = e.currentTarget;
				//console.log(e);
				this.sortType = el.dataset.type;
				if (el.dataset.type == 'price') {
					if (this.priceSort == 'asc') {
						this.priceSort = 'desc';
					} else {
						this.priceSort = 'asc';
					}
					this.saleSort = '';
				} else if (el.dataset.type == 'sale') {
					if (this.saleSort == 'asc') {
						this.saleSort = 'desc';
					} else {
						this.saleSort = 'asc';
					}
					this.priceSort = '';
				} else {
					this.priceSort = '';
					this.saleSort = '';
					this.sortType = '';
				}
				
				this.loadingType = 1;
				this.goodsList = [];
				this.page = 1;
				this.getGoodsList();
			},
			blur() {
				uni.hideKeyboard()
			},
		}
	}
</script>
<style lang="less">
	.arrow-left-mp {
		/* #ifdef MP-WEIXIN*/
		width: 0;
		overflow: hidden;
		margin-left: 40upx;
		/* #endif */
	}

	.search-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		background-color: rgb(242, 242, 242);
	}

	.keyword-list-box {
		height: calc(100vh - 55px);
		padding-top: 5px;
		border-radius: 10px 10px 0 0;
		background-color: #fff;
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 94%;
		height: 40px;
		margin: 0 3%;
		font-size: 15px;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1px #e7e7e7;
	}

	.keyword-entry image {
		width: 30px;
		height: 30px;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 40px;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	/* 修改搜索框 */
	.search-box {
		background-color: #FF4965;

		.dosearch {
			color: white;
			font-size: 40upx;
			margin-top: 10upx;
		}
	}

	.home_conter {
		justify-content: center !important;
	}

	.uni-product {
		padding: 10upx;
		margin: 10upx;
		background: #FFFFFF;
	}

	.select {
		display: flex;
		flex-wrap: nowrap;
		height: 90upx;
		padding: 0 10upx;
		background-color: #fff;

		view {
			width: 33.33%;
			text-align: center;
			line-height: 90upx;
			font-size: 32upx;
		}
	}

	.sort-chose {
		color: #FF4965;
	}
</style>
