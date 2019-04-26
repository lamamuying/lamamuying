<template>
	<view style="width: 100%;" class="lama-body">
		<view class="uni-product-list">
			<view class="uni-product" v-for="(product,index) in goodsList"
			 :key="index" @click="goGoodsDetail(newsItem)">
				<view class="image-view">
					<image class="uni-product-image" :src="product.image"></image>
				</view>
				<view class="uni-product-title">{{product.title}}</view>
				<view class="uni-product-price">
					<text class="uni-product-price-original">￥{{product.favourPrice}}</text>
				</view>
				<view class="uni-product-time">
					<text class="uni-product-title time">距离结束还有3天21小时 16分钟21秒</text>
					<text class="now_buy">立即抢购</text>
				</view>
			</view>
			<!-- <block v-for="(newsItem, newsIndex) in goodsList" :key="newsIndex">
				<two-goods :data="newsItem" @click="goDetail(newsItem)"></two-goods>
			</block> -->
		</view>
	</view>
</template>

<script>
	// var dateUtils = require('../../common/util.js').dateUtils;
	export default {
		data() {
			return {
				listData: [],
				last_id: "",
				reload: false,
				goodsList: [{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: '【老子】就是喜欢国产手机滚你美国手机',
						originalPrice: 9999,
						favourPrice: 8888,
						tip: '自营'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: 'Apple iPad 平板电脑 2018年新款9.7英寸',
						originalPrice: 3499,
						favourPrice: 3399,
						tip: '优惠'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: 'Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）',
						originalPrice: 12999,
						favourPrice: 10688,
						tip: '秒杀'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: 'Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色',
						originalPrice: 999,
						favourPrice: 958,
						tip: '秒杀'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: '微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）',
						originalPrice: 8888,
						favourPrice: 8288,
						tip: '优惠'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: 'Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）',
						originalPrice: 2899,
						favourPrice: 2799,
						tip: '自营'
					}
				]
			}
		},
		onLoad() {
			this.getList();
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
				// if (!/前|刚刚/.test(e.published_at)) {
				// 		e.published_at = dateUtils.format(e.published_at);
				// }
				let detail = {
					author_name: e.author_name,
					cover: e.cover,
					id: e.id,
					post_id: e.post_id,
					published_at: e.published_at,
					title: e.title
				}
				uni.navigateTo({
					url: "../goods_detail/goods_details"
					// url: "../list2detail-detail/list2detail-detail?detailDate=" + encodeURIComponent(JSON.stringify(detail))
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
						// published_at: dateUtils.format(e.published_at),
						title: e.title
					});
				});
				return newItems;
			}
		},
	}
</script>

<style lang="less">

	.uni-product-time {
		display: flex;
		flex-direction: row;
	}
	// 覆盖
	.uni-product-title.time {
		width: 200upx;
		color: #ccc;
		margin-right: 16upx;
	}
	.uni-product {
		padding: 10upx;
		margin: 10upx;
		background: #FFFFFF;
	}
	.now_buy {
		height: 70upx;
		line-height:70upx;
		background: #FF4965;
		color: white;
		border-radius: 12upx;
		margin-top: 5upx;
		font-size: 24upx;
		padding: 0 8upx;
	}
	.uni-product-list {
		justify-content: center;
	}
</style>
