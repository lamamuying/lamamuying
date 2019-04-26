<template>
	<view class="page">
		<!-- 提现列表 -->
		<view class="top">
			<view class="uni-timeline" style="">
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view style="font-size: 34upx;color: gray;">
							发起提现申请
						</view>
					</view>
				</view>
				<view class="uni-timeline-item">
					<view class="uni-timeline-item-divider addcolor"></view>
					<view class="uni-timeline-item-content">
						<view style="font-size: 34upx;">银行处理中</view>
						<view class="datetime" style="color: gray;">预计{{extractInfo.donetime}}到账</view>
					</view>
				</view>
				<view class="uni-timeline-item uni-timeline-last-item">
					<view class="uni-timeline-item-divider"></view>
					<view class="uni-timeline-item-content">
						<view style="font-size: 34upx; color: gray;">到账成功</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-flex uni-column" style="margin: 20upx 50upx;">
			<view class="uni-flex uni-row" style="justify-content: space-between;font-size: 34upx;"><text class="whit">提现金额</text><text>￥{{extractInfo.price}}</text></view>
			<view class="uni-flex uni-row" style="justify-content: space-between;font-size: 34upx;"><text class="whit">服务费</text><text>￥{{extractInfo.commission}}</text></view>
			<view class="uni-flex uni-row" style="justify-content: space-between;font-size: 34upx;"><text class="whit">到账银行卡</text><text>{{extractInfo.bank}}</text></view>
			<view class="uni-flex uni-row" style="justify-content: space-between;font-size: 34upx;"><text class="whit">银行卡尾号</text><text>{{cartI}}</text></view>
		</view>
		<view style="margin-top: 160upx;"></view>
		<view @click="completeInfo"><button class="btn">完成</button></view>
	</view>
</template>
<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				title: 'timeline',
				extractInfo: [],
				cartI: '',
				orderId:''
			}
		},
		onLoad(params) {
			// {extractMony: "100", bankId: "36"}
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			if (params) {
				this.orderId = params.orderId;
				this.extractApply();
			}
		},
		methods: {
			//获取提现的详情
			extractApply: function() {
				uni.request({
					url: this.apiUrl + 'user/getUserCash',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						id: this.orderId
					},
					success: res => {
						if (res.data.code === 0) {
							this.extractInfo = res.data.data;
// 							// 截取银行卡后四位
							this.cartI = this.extractInfo.card_num.slice(-4);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 完成提现
			completeInfo:function() {
				uni.redirectTo({
					url: './extract_state?orderId=' + this.orderId
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fff;
	}

	.top {
		margin: 50upx 50upx;
		border-bottom: 1upx solid #ccc;

	}

	.uni-timeline-last-item .uni-timeline-item-divider {
		// background-color:#1AAD19;
		background-color: #bbb;
	}

	.uni-timeline-item .addcolor {
		background-color: #ff4965;
		// 			width:60upx;
		// 			height:60upx;
		// position: absolute;
	}

	.uni-timeline-item {
		padding-bottom: 46upx;
	}

	.whit {
		color: gray;
	}

	.btn {
		width: 80%;
		color: #fff;
		background-color: #ff4965;
	}
</style>
