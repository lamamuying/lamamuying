<template>
	<view>
		<!-- 辣妈推荐 -->
		<view style="width: 100%;background: #F6F6F6;">
			<view class="uni-product-list home_conter">
				<view class="uni-product" v-for="(product,index) in goodsList" :key="index"  @click="goGoodsDetail(newsItem)">
					<view class="image-view">
						<image class="uni-product-image" :src="product.image"></image>
					</view>
					<view class="uni-product-title">{{product.title}}</view>
					<view class="uni-product-price">
						<text class="uni-product-price-favour">￥{{product.originalPrice}}</text>
						<text class="uni-product-price try">￥{{product.favourPrice}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		components: {
			// twoGoods
		},
		data() {
			return {
				goodsList: [{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: '【老子】就是喜欢国产手机滚你美国手机',
						originalPrice: 9999,
						favourPrice: 0.01,
						tip: '自营'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: 'Apple iPad 平板电脑 2018年新款9.7英寸',
						originalPrice: 3499,
						favourPrice: 0.01,
						tip: '优惠'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: 'Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）',
						originalPrice: 12999,
						favourPrice: 0.01,
						tip: '秒杀'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: 'Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色',
						originalPrice: 999,
						favourPrice: 0.01,
						tip: '秒杀'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: '微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）',
						originalPrice: 8888,
						favourPrice: 0.01,
						tip: '优惠'
					},
					{
						image: 'http://static.lamamuying.com/static/images/lam-14_r26_c4.jpg',
						title: 'Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）',
						originalPrice: 2899,
						favourPrice: 0.01,
						tip: '自营'
					}
				]
			}
		},
		
		onLoad() {

		},
		methods: {
			goGoodsDetail:function() {
				uni.navigateTo({
					url:'../goods/goods_detail'
				})
			},

		}
	}
</script>

<style lang="scss">
	.home_conter {
		justify-content: center !important;

		.try {
			margin-left: 120upx;
			color: #f5200a;
		}
	}

	.uni-product {
		padding: 10upx;
		margin: 10upx;
		background: #FFFFFF;
	}
</style>
