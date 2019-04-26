<template>
	<view>

		<!-- 宝贝描述 -->
		<view class="evaluate_list">
			<image :src="images" style="width: 160upx;height: 160upx;"></image>
			<text class="list_text">宝贝描述</text>
			<uni-rate size="26" value="0" @change="goodsRate"></uni-rate>
		</view>
		<!-- 留言板 -->
		<view class="list_comment">
			<view class="uni-title uni-common-pl" style="color:#8f8e8e;padding:0 20upx;font-size: 28upx;">宝贝满足你的期待吗？说说您的体验，分享给想购买的他们！</view>
			<view class="uni-textarea">
				<textarea rows="5" maxlength="200" v-model="content" />
				</view>
		</view>
		<!-- 评分星星 -->
		<view class="list_comment">
			<view class="uni-title uni-common-pl" style="font-size:32upx;">服务门店评分</view>
			<view class="flex-row">
				<text class="list_text">物流服务</text>
				<uni-rate size="26" value="0" @change="locRate"></uni-rate>
			</view>
			<view class="flex-row">
				<text class="list_text">服务态度</text>
				<uni-rate size="26" value="0" @change="serRate"></uni-rate>
			</view>
		</view>
		<!-- 发表评论 -->
		<view>
			<button class="list_button" @click="subComment">发表评论</button>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	var userLoginInfo;
	export default {
		components: {uniRate},
		data () {
			return { 
				content:'',
				locS:0,//物流
				serS:0,//服务
				goodsS:0,//宝贝
				goodsId:0,
				images:''
			}
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../order/order', 2);
		},
		onLoad(params) {
			console.log(params);
			this.goodsId = params.goods_id;	
			this.images = params.goods_image;
		},
		methods:{
			// 点击发表评价
			subComment(){
				uni.request({
					url: this.apiUrl + 'goods/addGoodsComment',
					method: 'POST',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						goods_id:this.goodsId,
						uid:userLoginInfo.id,
						content:this.content,
						loc_score:this.locS,//物流分数
						ser_score:this.serR,//服务
						goods_score:this.goodsS,//商品
					},
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					success: res => {
						if(res.data.code===0){
							uni.showToast({
								title: '评论成功',
								icon:'none',
								success: (res) => {
									setTimeout(function () {
										uni.navigateBack({
											delta:1
										});
									}, 800);
								}
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			//物流评分
			locRate(res){
				this.locS = res.value;				
			},
			// 服务评分
			serRate(res){
				this.serR = res.value;				
			},
			// 商品评分
			goodsRate(res){
				this.goodsS = res.value;				
			},
			
	}
}
</script>

<style lang="less">
// .list_button{background:none;color:#fff;position: absolute;z-index:1000;margin:50upx 20upx;background-color:#ff4965}
.list_button{
	background:#ff4965;
	color:#fff;margin:50upx 20upx;
}
uni-button:after{border:none;}
uni-button:after{border:none;}
.evaluate_list{width: 100%;padding:10upx 20upx;background:#fff;display:flex;justify-content:flex-start;align-items:center;
	image{width:160upx;height: 160upx;}
	.list_text{font-size:28upx;color:#8F8F94;padding:0 20upx;}
}
.list_comment{margin:20upx 0; background:#fff;
		.uni-textarea-textarea{padding:0 10upx;}
		.flex-row{display: flex;justify-content:flex-start;align-items: center;
			.list_text{font-size:32upx;color:#8F8F94;padding:20upx;}
		}
}	
</style>
