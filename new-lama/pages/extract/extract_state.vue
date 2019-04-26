<template>
	<view>
		<view class="ex_state">
		<!-- 提现金额 -->
		<view class="extract_top">
			<view class="uni-flex uni-column">
				<text style="font-size: 44upx;">零钱提现时间</text>
				<text>{{orderInfo.addtime}}</text>
			</view>
			<view class="uni-flex uni-column" style="text-align: center;">
				<text style="color: #CAC8C9;font-size: 36upx;margin-top: 40upx;">提现金额</text>
				<text style="font-size: 50upx;">￥{{orderInfo.price}}</text>
			</view>
		</view>
		<!-- 详细信息 -->
		<view style="margin-top: 30upx;">
			<view class="uni-flex uni-row" style="font-size: 30upx;">
				<text class="detail">提现银行:</text>
				<text>{{orderInfo.bank}}({{cartI}})</text>
			</view>
			<view class="uni-flex uni-row" style="font-size: 30upx;">
				<text class="detail">提现时间:</text>
				<text>{{orderInfo.addtime}}</text>
			</view>
			<view v-if="orderInfo.status == 2" class="uni-flex uni-row" style="font-size: 30upx;">
				<text class="detail">到账时间:</text>
				<text>{{orderInfo.donetime}}</text>
			</view>
			<view class="uni-flex uni-row" style="font-size: 30upx;">
				<text class="detail">备注:</text>
				<text v-if="orderInfo.status == 1">你的零钱提现正在审核中</text>
				<text v-if="orderInfo.status == 2">你的零钱提现已到账至银行卡</text>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				// 提现订单id
				orderId: '',
				cartI: '',
				orderInfo: []
			}
		},
		onShow() {

		},
		onLoad(params) {
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			this.orderId = params.orderId;
			this.goCash();
		},
		methods: {
			//获取提现状态
			//user/getUserCash?uid=1&id=2
			goCash: function() {
				uni.request({
					url: this.apiUrl + 'user/getUserCash',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						id: this.orderId
					},
					success: res => {
						if (res.data.code === 0) {
							this.orderInfo = res.data.data;
							this.cartI = this.orderInfo.card_num.slice(-4);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="less">
	.ex_state {
		width: 80%;
		background-color: #fff;
		margin: 40upx auto;
		padding: 50upx 50upx 30upx 50upx;

		.extract_top {
			border-bottom: 1upx solid #ccc;
		}

		.detail {

			color: #ccc;
			width: 34%;
		}
	}
</style>
