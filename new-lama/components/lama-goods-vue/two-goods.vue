<template>
	<view class="uni-product goods_product" @click="bindClick">
		<view class="image-view">
			<image class="uni-product-image" :src="data.image"></image>
		</view>
		<view class="save" v-if="data.market_price-data.price == 0? flase : true">
			<text>立省{{economize}}元</text>
		</view>
		<view class="uni-product-title goods_name">{{data.name}}</view>
		<view class="uni-product-price">
			<text class="uni-product-price-favour">￥{{data.market_price}}</text>
			<text class="uni-product-price-original try">￥{{data.price}}</text>
		</view>
	</view>
</template>

<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				userLoginInfo: uni.getStorageSync('userLoginInfo')
			}
		},
		name: 'two-goods',
		props: {
			data: {
				goodsItem: Object,
				save:Number
			},
			identity: Number
		},
		computed: {
			economize: function () {			
				let price = this.data.market_price-this.data.price;	
				return Math.round(price * 100) / 100;
			}
		},
		// watch: {
		// 	data: {
		// 		handler: function(val, oldval) {
		// 			let price = parseFloat(val.price);
		// 			let sales_deduction = parseFloat(val.sales_deduction);
		// 			let deduction = parseFloat(val.deduction);
		// 			if (this.userLoginInfo.identity == 2) {
		// 				val.price = price - sales_deduction;
		// 			} else {
		// 				val.price = price - deduction;
		// 			}
		// 			val.price = val.price.toFixed(2);
		// 		
		// 		},
		// 		immediate: true,
		// 		deep: true //对象内部的属性监听，也叫深度监听
		// 	}
		// },
		methods: {
			bindClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style>
	.goods_product {
		padding: 10upx;
		margin: 10upx;
		background: #FFFFFF;
		justify-content: flex-start;
		position: relative;
	}

	.goods_name {
		height: 82upx;
		padding-left: 6upx;

	}

	.save {
		padding: 0 10upx;
		height: 50upx;
		line-height: 50upx;
		background: #ff4965;
		color: #fff;
		border-radius: 10upx;
		text-align: center;
		font-size: 22upx;
		position: absolute;
		z-index: 100;
		right: 10upx;
		top: 10upx;
	}
</style>
