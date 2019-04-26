<template>
	<view>
		<view class="Menubox63">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control class="uni-content" :current="current" :values="items" v-on:clickItem="onClickItem"></uni-segmented-control>
			</view>
			<view @click="goBack()">
				<span class="iconfont management" style="font-size: 54upx;">&#xe603;</span>
			</view>
		</view>
		<view class="Contentbox63">
			<view class="content">
				<view v-show="current === 0" class="content_show">
					<collection-List :goodsList="goodsList" :uid="uid" :type='1'></collection-List>
				</view>
				<view v-show="current === 1">
					<collection-List :goodsList="goodsList" :uid="uid" :type='0'></collection-List>
				</view>
			</view>
			<uni-load-more color="#333" style="margin-top: 100upx;" :loadingType="loadingType" :contentText="contentText"></uni-load-more>
			<view style="height:60px;"></view>
		</view>
	</view>
</template>
<script>
	import uniSegmentedControl from '@/components/uni-segmented-control.vue';
	import collectionList from '@/components/collectionList.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	var userLoginInfo;
	export default {
		components: {
			uniSegmentedControl,
			collectionList,
			uniLoadMore
		},
		data() {
			return {
				isCheckAll: false,
				loadingType: 1,
				showLoadMore: false,
				items: [{
						name: '宝贝收藏',
						type: 1
					},
					{
						name: '内容收藏',
						type: 0
					}
				],
				current: 0,
				goodsList: [],
				type: 1,
				page: 1,
				uid: 0
			}
		},
		onShow() {
			this.getLikeGoodsList();
		},
		onLoad() {
			userLoginInfo = this.userLoginInfo('../collection/collection_management', 1);
			this.uid = userLoginInfo.id;

			this.goodsList = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
			// this.getLikeGoodsList();
		},
		// 页面上拉触底事件的处理函数
		onReachBottom() {
			//console.log("onReachBottom");
			this.getLikeGoodsList();
		},
		
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			onClickItem(e) {
				// console.log(e);
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
							// console.log(this.goodsList = res.data.data);
							if (Array.isArray(res.data.data) && res.data.data.length === 0) {
								this.loadingType = 2;
								return;
							}
							if (res.data.data.length < 10) {
								this.loadingType = 2;
							}
							// 拼接加载更多数据
							this.showLoadMore = true;
							this.page++;
							let collectionData = [];
							res.data.data.forEach((orders) => {
								collectionData.push(orders);
							});
							// 拼接加载更多数据
							this.goodsList = this.goodsList.concat(collectionData);
						}
					}
				})
			},
			// 全选
			allCheck() {
				this.isCheckAll = !this.isCheckAll;
				this.isCheckAll ?
					this.shopData.forEach((item) => {
						this._shopTrue(item)
					}) :
					this.shopData.forEach((item) => {
						this._shopFalse(item)
					})
			},

		}
	}
</script>

<style>
	.Menubox63 {
		width: 100%;
		background: #fff;
		height: 100upx;
		margin-bottom: 5upx;
	}

	.Contentbox63 {
		clear: both;
		height: auto;
		width: 100%;
		clear: both;
	}

	.uni-common-mt {
		margin-top: 0px;
		padding-top: 10upx;
	}

	.segmented-control-item.button {
		font-size: 32upx;
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
		margin: 0 22upx;
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

	.uni-media-list-text-top {
		height: 74upx;
		font-size: 32upx;
		overflow: hidden;
	}
</style>
