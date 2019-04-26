<template>
	<view>
		<view class="Menubox63">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control class="uni-content" :current="current" :values="items" v-on:clickItem="onClickItem"></uni-segmented-control>
			</view>
			<navigator url="./collection_management" hover-class="other-navigator-hover">
				<span class="iconfont management" style="font-size: 56upx;">&#xe70f;</span>
			</navigator>
		</view>
		<view class="content">
			<view v-show="current === 0" class="content_show">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(goods ,index) in goodsList" :key="index">
						<view class="uni-media-list">
							<image class="uni-media-list-logo" :src="goods.image"></image>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{goods.name}}</view>
								<view class="uni-media-list-text-bottom">
									<text style="color:#FF4965;font-size:28upx;">￥{{goods.price}}</text>
									<text class="comment">{{goods.comment}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="current === 1">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(goods ,index) in goodsList" :key="index">
						<view class="uni-media-list">
							<image class="uni-media-list-logo" :src="goods.image"></image>
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{goods.title}}</view>
								<view class="uni-media-list-text-bottom">
									<text style="color:#FF4965;font-size:28upx;">{{goods.price}}</text>
									<text class="comment">{{goods.comment}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more color="#333" style="margin-top: 100upx;" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
	</view>
</template>
<script>
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	var dateUtils = require('@/common/util.js').dateUtils;
	import uniLoadMore from '@/components/uni-load-more.vue';
	var userLoginInfo;
	export default {
		components: {
			uniSegmentedControl,
			uniLoadMore
		},
		data() {
			return {
				type: 1,
				goodsList: [],
				loadingType: 1,
				showLoadMore: false,
				page: 1,
				items: [{
						name: '宝贝收藏',
						type: 1
					},
					{
						name: '内容收藏',
						type: 0
					}
				],
				current: 0
			}
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../collection/collection', 1);
			this.cateCurrentIndex = this.status;
			this.getLikeGoodsList();
		},
		onLoad() {
			// this.getLikeGoodsList();
			this.goodsList = [],
			this.showLoadMore = false;
		},
		// 页面上拉触底事件的处理函数
		onReachBottom() {
			//console.log("onReachBottom");
			this.getLikeGoodsList();
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.index) {
					this.current = e.index;
					this.type = e.type;
					// 清空商品信息			
					this.goodsList = [];
					this.page = 1;
					this.getLikeGoodsList();
				}
			},
			getLikeGoodsList: function() {
				uni.request({
					url: this.apiUrl + 'user/getCollect',
					method: "GET",
					data: {
						uid: userLoginInfo.id,
						type: this.type,
						page: this.page
					},
					success: (res) => {
						if (res.data.code === 0) {
							if (Array.isArray(res.data.data) && res.data.data.length === 0) {
								this.loadingType = 2;
								return;
							}
							if (res.data.data.length < 10) {
								this.loadingType = 2;
							}
							this.showLoadMore = true;
							this.page++;
							let collectionData = [];
							res.data.data.forEach((orders) => {
								collectionData.push(orders);
							});
							console.log(res.data.data);
							// 拼接加载更多数据
							this.goodsList = this.goodsList.concat(collectionData);
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.Menubox63 {
		width: 100%;
		height: 100upx;
		background: #fff;
		margin-bottom: 5upx;
	}

	.uni-common-mt {
		margin-top: 0px;
		padding-top: 10upx;
	}

	.segmented-control.button {
		border: none;
	}

	.segmented-control {
		width: 60%;
		border-radius: 30upx;
		margin-left: 15%;
	}

	uni-image {
		width: 50upx;
		height: 50upx;
		display: inline-block;
		overflow: hidden;
		position: relative;
	}

	uni-button {
		background: none;
		position: absolute;
		z-index: 10;
		right: 12%;
		top: 12upx;
	}

	uni-button:after {
		border: none;
	}

	.management {
		position: absolute;
		top: 0;
		right: 30upx;
		background: none;
		color: #FF4965;
	}

	.uni-list-cell {
		margin-right: 20upx;
	}

	.uni-media-list {
		width: 95%;
		padding: 50upx 30upx;
	}

	.uni-list::before {
		height: 0;
	}

	.uni-media-list-logo {
		width: 200upx;
		height: 160upx;
	}

	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-top {
		height: 74upx;
		font-size: 32upx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;

		.comment {
			padding: 0 20upx;
		}
	}
</style>
