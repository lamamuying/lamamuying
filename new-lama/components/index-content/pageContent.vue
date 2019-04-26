<template>
	<view>
		<!-- 热卖 -->
		<view v-if="cateid == 0" style="padding-top: 0; background: #FFFFFF;">
			<view class="uni-flex uni-row" style="width: 100%;display: flex; justify-content: center;align-items: center;">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="100">
					<navigator class="uni-product" style="display: inline-block;  -webkit-box-align: center;" hover-class="none" v-for="(recGoodsItem,recGoodIndex) in recGoods" :key="recGoodIndex" :url="'/pages/goods/goods_detail?goods_id='+recGoodsItem.id">
						<view class="image-view" style="width: 240upx; height: 240upx;">
							<image :src="recGoodsItem.image" style="width: 100%;height: 100%; "></image>
						</view>
						<view class="uni-product-title rec_pageTitle" style="width: 240upx;">{{recGoodsItem.name}}</view>
						<view><text class="uni-product-price-original">￥{{recGoodsItem.price}}</text><text class="uni-product-price-favour">￥{{recGoodsItem.market_price}}</text></view>
					</navigator>
				</scroll-view>
			</view>
		</view>
		<!-- 分类 -->
		<view v-if="cateid > 0" style="padding: 20upx;padding-top: 0; background: #FFFFFF;">
			<view class="uni-flex uni-row" style="width: 100%;display: flex; justify-content: center;align-items: center;">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="100">
					<navigator class="uni-product" style="display: inline-block;  -webkit-box-align: center;" hover-class="none" v-for="(childCateItem,childCateIndex) in chidCategory" :key="childCateIndex" :url="'/pages/goods/goods_list?cid='+childCateItem.cid">
						<view class="image-view" style="width: 240upx; height: 240upx;">
							<image :src="childCateItem.image" style="width: 100%;height: 100%; "></image>
						</view>
						<view class="uni-product-title rec_pageTitle" style="width: 240upx; text-align: center;">{{childCateItem.cat_name}}</view>
					</navigator>
				</scroll-view>
			</view>
		</view>
		<!-- 辣妈推荐 -->
		<view style="width: 100%;background: #F6F6F6;">
			<image src="http://static.lamamuying.com/static/images/lam-14_r2_c1.png" style="width: 100%;height: 66upx; margin-top: 20upx; "></image>
			<view class="uni-product-list home_conter" style="justify-content: flex-start;">
				<navigator v-for="(goodsItem, goodsIndex) in goodsList" hover-class="none" :key="goodsIndex" :url="'/pages/goods/goods_detail?goods_id='+goodsItem.id">
					<two-goods :data="goodsItem"></two-goods>
				</navigator>				
			</view>
			<!-- <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view> -->
			<uni-load-more color="#333" :loadingType="loadingType" ></uni-load-more>
			<!-- :status="status" :contentText="contentText" -->
		</view>
	</view>
</template>

<script>
	var cate;
	import twoGoods from '@/components/lama-goods-vue/two-goods.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		props: {
			type: String,
			recGoods: Array,
			goodsList: Array,
			loadMoreText: String,
			showLoadMore: Boolean,
			cateid: String,
			chidCategory: Array,
			loadingType:Number
		},
		components: {
			twoGoods,
			uniLoadMore
		},
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {

		}
	}
</script>

<style lang="scss">
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
		overflow: hidden
	}

	.notice_bg img {
		width: 100%;
		;
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
		background: #FFF;
		border-bottom: 2px solid #F0F0F0;
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
		border-bottom: 2px solid #DE533A !important;
		color: #DE533A;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
// 新添样式
	.home_conter {
		justify-content: center !important;
	}
	.rec_pageTitle {
		// display: none;
	}
</style>

