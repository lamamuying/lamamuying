<template>
	<view>
		<view class="uni-list uni-flex uni-row">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(goodsItems,index) in goodSpecials" :key="index"
			  @click="goGoodsDetail(newsItem)">
				<!-- v-for="(value,key) in listData" :key="key" -->
				<view class="uni-media-list">
					<image class="uni_firm" :src="goodsItems.image"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{goodsItems.title}}</view>
						<view class="uni-media-list-text-bottom">
							<text class="specail"><text class="spel">特价</text><text class="now_price">￥{{goodsItems.favourPrice}}</text></text>
						</view>
						<view>
							<text class="price">日常价<text>￥{{goodsItems.originalPrice}}</text></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var dateUtils = require('@/common/util.js').dateUtils;
	export default {
		data() {
			return {
				listData: [],
				last_id: "",
				reload: false,
				goodSpecials: [{
					image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
					title: '【老子】就是喜欢国产手机滚你美国手机',
					originalPrice: 99.00,
					favourPrice: 88.00,
					tip: '自营'
				}, {
					image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
					title: '【老子】就是喜欢国产手机滚你美国手机',
					originalPrice: 9999,
					favourPrice: 8888,
					tip: '自营'
				}, {
					image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
					title: '【老子】就是喜欢国产手机滚你美国手机',
					originalPrice: 9999,
					favourPrice: 8888,
					tip: '自营'
				}]
			}
		},
		onLoad() {
			this.getList();
			console.log(123);
		},
		onPullDownRefresh() {
			this.reload = true;
			this.last_id = "";
			this.getList();
		},
		onReachBottom() {
			this.getList();
		},
		methods: {
			goGoodsDetail:function() {
				uni.navigateTo({
					url:'../goods/goods_detail'
				})
			},
			getList() {
				var data = {
					column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
				};
				if (this.last_id) { //说明已有数据，目前处于上拉加载
					data.minId = this.last_id;
					data.time = new Date().getTime() + "";
					data.pageSize = 10;
				}
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: (data) => {
						console.log(data)
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							this.listData = this.reload ? list : this.listData.concat(list);
							this.last_id = list[list.length - 1].id;
							this.reload = false;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			goDetail: function(e) {
				// 				if (!/前|刚刚/.test(e.published_at)) {
				// 					e.published_at = dateUtils.format(e.published_at);
				// 				}
				let detail = {
					author_name: e.author_name,
					cover: e.cover,
					id: e.id,
					post_id: e.post_id,
					published_at: e.published_at,
					title: e.title
				}
				uni.navigateTo({
					url: "../list2detail-detail/list2detail-detail?detailDate=" + encodeURIComponent(JSON.stringify(detail))
				})
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						//published_at: dateUtils.format(e.published_at),
						title: e.title
					});
				});
				return newItems;
			}
		},
	}
</script>

<style lang="less">
	.uni-media-list-body {
		height: auto;
		justify-content: space-around;

		.price {
			display: block;
			line-height: 60upx;
			color: #999;

			text {
				text-decoration: line-through;
			}
		}
	}

	.uni-media-list-text-top {
		height: 74upx;
		font-size: 28upx;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.specail {
			width: 240upx;
			border-radius: 12upx;
			height: 50upx;
			line-height: 50upx;
			color: #D20806;
			margin-top: 2%;

			.spel {
				width: 70upx;
				background: #FF4660;
				height: 50upx;
				display: inline-block;
				text-align: center;
				color: #fff;
				margin-right: 14upx;
				border-radius: 12upx;

			}

		}

	}

	.uni-media-list {
		padding: 20upx 40upx;
	}

	.uni_firm {
		width: 35%;
		height: 220upx;
		margin-right: 9px;
	}

	// 修改
	.uni-list::before {
		height: 0;
	}

	.uni-list:after {
		margin: 0 20upx;
		right: 28upx;
	}

	.uni-list-cell::after {
		margin: 0 20upx;
		right: 28upx;
	}
</style>
