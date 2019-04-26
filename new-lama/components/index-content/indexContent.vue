<template>
	<view>
		<!-- 头条公告 -->
		<view v-if="type == 'home'|| type == 'health'" class="uni-flex uni-row" style="background: #FFF; height: 70upx;border-bottom: 1px solid #E7EBEC;">
			<view class="notice_bg">
				<image src="http://static.lamamuying.com/static/images/lam-14_r2_c2.png" style="width: 100%; height: 50upx;"></image>
			</view>
			<view class="notice_content">
				<view class="uni-swiper-msg">
					<swiper vertical="true" autoplay="true" circular="true" interval="3000">
						<swiper-item v-for="(item, index) in notice" :key="index">
							<navigator url="/pages/index/notice" hover-class="nones">{{item.title}}</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 健康问诊ad -->
		<view v-if="type == 'home'" style="height: 260upx;border-bottom: 1px solid #E7EBEC;" @click="goHealth">
			<image src="http://static.lamamuying.com/static/images/health.jpg" style="width: 100%; height: 260upx;"></image>
		</view>
		<!-- 限时抢购活动 -->
		<!-- 	<view class="uni-flex uni-row" style="padding: 20upx; background: #FFFFFF;">
			<navigator class="text" style="width: 50%;height: 340upx;display: flex; justify-content: center;align-items: center;"
			 url="./flash_sale">
				<image src="http://static.lamamuying.com/static/images/lam-14_r4_c3.jpg" style="width: 100%;height: 340upx;"></image>
			</navigator>
			<view class="uni-flex uni-column" style="flex: 1;justify-content: space-between; width: 50%;">
				<navigator class="text" style="height: 170upx;text-align: left;" url="./specials">
					<image src="http://static.lamamuying.com/static/images/lam-14_r4_c6.jpg" style="width: 100%;height: 170upx;"></image>
				</navigator>
				<navigator class="text" style="height: 170upx;text-align: left;" url="./try">
					<image src="http://static.lamamuying.com/static/images/lam-14_r7_c6.jpg" style="width: 100%;height: 170upx;"></image>
				</navigator>
			</view>
		</view> -->
	</view>
</template>

<script>
	var cate;
	import twoGoods from '@/components/lama-goods-vue/two-goods.vue';
	export default {
		props: {
			type: String
		},
		components: {
			twoGoods
		},
		data() {
			return {
				notice: [{
						title: '生完娃的辣妈们，应该这样减脂！'
					},
					{
						title: '过了35岁这个极限年龄生孩子，孕妇要做好4件事'
					},
					{
						title: '1岁内宝宝禁用的感冒药'
					},
				]
			}
		},
		onLoad() {

		},
		methods: {
			goHealth: function() {
				uni.switchTab({
					url: '../../pages/health/health_inquiring'
				})
			},
			goGoodsDetail: function() {
				uni.navigateTo({
					url: '../goods/goods_detail'
				})
			}
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

	.home_conter {
		justify-content: center !important;
	}
</style>
