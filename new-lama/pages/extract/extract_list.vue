<template>
	<view>
		<view v-if="order" class="order_status">
			<text>你还没有提现记录....</text>
		</view>
		<view v-else>
			<view class="ex_state" v-for="(orderList,orderIndex) in orderInfo" :key="orderIndex">
				<!-- 提现金额 -->
				<view class="extract_top">
					<view class="uni-flex uni-column">
						<text v-if="orderList.status == 1" style="font-size: 34upx;">审核中</text>
						<text v-if="orderList.status == 2" style="font-size: 34upx;">已到账</text>
						<text>{{orderList.addtime}}</text>
					</view>
					<view class="uni-flex uni-column" style="text-align: center;">
						<text style="color: #CAC8C9;font-size: 36upx;margin-top: 40upx;">提现金额</text>
						<text style="font-size: 50upx;">￥{{orderList.price}}</text>
					</view>
				</view>
				<!-- 详细信息 -->
				<view style="margin-top: 30upx;">
					<view class="uni-flex uni-row" style="font-size: 30upx;">
						<text class="detail">提现银行:</text>
						<text>{{orderList.bank}}({{cartI}})</text>
					</view>
					<view class="uni-flex uni-row" style="font-size: 30upx;">
						<text class="detail">提现时间:</text>
						<text>{{orderList.addtime}}</text>
					</view>
					<view v-if="orderList.status == 2" class="uni-flex uni-row" style="font-size: 30upx;">
						<text class="detail">到账时间:</text>
						<text>{{orderList.donetime}}</text>
					</view>
					<view class="uni-flex uni-row" style="font-size: 30upx;">
						<text class="detail">备注:</text>
						<text v-if="orderList.status == 1">你的零钱提现正在审核中</text>
						<text v-if="orderList.status == 2">你的零钱提现已到账至银行卡</text>
					</view>
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
				cartI: '',
				orderInfo: [],
				order: false
			}
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			this.goCash();
		},
		methods: {
			// 获取提现列表
			goCash: function() {
				uni.request({
					url: this.apiUrl + 'user/getUserCashList',
					method: 'GET',
					data: {
						uid: userLoginInfo.id
					},
					success: res => {
						if (res.data.code === 0) {
							this.orderInfo = res.data.data.data;
							if (this.orderInfo.length == 0) {
								this.order = true;
							}else{
								this.order = false;
							}
							this.orderInfo.forEach((cardNum) => {
								this.cartI = cardNum.card_num.slice(-4);
							})
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
	.order_status{
		font-size: 35upx;
		text-align: center;
		padding-top:60upx;
	}
</style>
