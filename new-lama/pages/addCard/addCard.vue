<template>
	<view>
		<!-- 添加银行卡 -->
		<view class="container uni-column">
			<!-- 已有银行卡显示样式 -->
			<view class="haveCard">
				<view class="flex-item uni-row" v-for="(card,cardIndex) in cardList" :key="cardIndex" @click="cardDetail(card.id)">
					<image src="http://static.lamamuying.com/static/images/56.png" mode=""></image>
					<view class=" uni-column info">
						<view class="cardName">{{card.bank}}</view>
						<view class="cardStyle">{{card.card_type}}</view>
						<view class="cardNum">{{card.card_num}}</view>
					</view>
				</view>
			</view>
			<!-- 添加银行卡 -->
			<view class="addCard uni-row" @click="addCard">
				<!-- <image src="http://static.lamamuying.com/static/images/56.png" mode=""></image> -->
				<span class="iconfont waitImge" style="font-size: 50upx;color: #ececec;margin:0 20upx;">&#xe616;</span>
				<text class="text">添加银行卡</text>
			</view>
		</view>
	</view>
</template>
<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				cardList: []
			}
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			// console.log(userLoginInfo.id);
			this.getCard();
		},
		// 		onLoad() {
		// 			this.getCard();
		// 		},
		methods: {
			// 添加银行卡
			// url="./card_holding"
			addCard: function() {
				uni.redirectTo({
					url: './card_holding'
				});
			},
			// 获取银行卡详情
			cardDetail: function(cardId) {
				uni.redirectTo({
					url: './addCard_detail?id=' + cardId
				});
			},
			getCard: function() {
				uni.request({
					url: this.apiUrl + 'user/getBankList',
					method: 'GET',
					data: {
						uid: userLoginInfo.id
					},
					success: res => {
						if (res.data.code === 0) {
							this.cardList = res.data.data;
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
	.container {
		padding: 20upx;
		padding-bottom: 0;
		// height: 100vh;
		background: #fff;

		.haveCard {
			width: 100%;

			.flex-item {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-top: 20upx;
				background: #FF7D91;
				border-radius: 10upx;

				image {
					margin: 0 20upx;
					width: 70upx;
					height: 70upx;
				}

				.info {
					width: 80%;
					height: 200upx;

					.cardName {
						color: #fff;
						font-size: 32upx;
						padding-top: 20upx;
					}

					.cardStyle {
						margin-top: -10upx;
						color: #fff;
						font-size: 24upx;
					}

					.cardNum {
						color: #fff;
						font-size: 36upx;
					}
				}
			}
		}

		.addCard {
			margin-top: 50upx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding-bottom: 20upx;
			border-bottom: 2upx solid #ececec;
			line-height: 80upx;

			image {
				margin: 0 20upx;
				width: 70upx;
				height: 70upx;
			}

			.text {
				font-size: 34upx;
				color: #999;
				font-weight: 400;
			}
		}
	}
</style>
