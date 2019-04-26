<template>
	<view>
		<!-- 银行卡详情 -->

		<view class="container">
			<view class="uni-column haveCard">
				<view class="flex-item uni-row">
					<image src="http://static.lamamuying.com/static/images/56.png" mode=""></image>
					<view class=" uni-column info">
						<view class="cardName">{{cardDetailList.bank}}</view>
						<view class="cardStyle">{{cardDetailList.card_type}}</view>
						<view class="cardNum">{{cardDetailList.card_num}}</view>
					</view>
				</view>
				<view class="uni-row cardInfor">
					<text>持卡人：</text>
					<text>{{cardDetailList.card_name}}</text>
				</view>
				<view class="uni-row cardInfor">
					<text>手机号：</text>
					<text>{{cardDetailList.card_mobile}}</text>
				</view>
				<view class="uni-row cardInfor">
					<text>添加时间：</text>
					<text>{{cardDetailList.addtime}}</text>
				</view>
			</view>
			<view class="detail">
				<view hover-class="none" class="delete" @click="delectCard">解除</view>
			</view>
		</view>
	</view>
</template>
<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				cardDetailList: [],
				cardId: 0
			}
		},
		onLoad(params) {
			this.cardId = params.id;
		},
		onShow() {
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			// console.log(userLoginInfo.id)
			this.getDetailList();
		},
		methods: {
			// 获取银行卡详细信息
			getDetailList: function() {
				uni.request({
					url: this.apiUrl + 'user/getBank',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						id: this.cardId
					},
					success: res => {
						// console.log(res.data.data);
						if (res.data.code === 0) {
							this.cardDetailList = res.data.data;
							// console.log(this.cardDetailList);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 删除银行卡
			delectCard() {
				uni.request({
					url: this.apiUrl + 'user/delBank',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						id: this.cardId
					},
					success: res => {
						// console.log(res);
						if (res.data.code === 0) {
							uni.showToast({
								title: "删除银行卡成功",
								icon: 'none', //图标，支持"success"、"loading" 
								mask: true,
								success: (res) => {
									setTimeout(() => {
										uni.redirectTo({
											url: './addCard'
										});
									}, 500);
								},
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 对银行卡进行修改
			revise(cardDetailList) {
				// console.log(cardDetailList);
				var cartList = JSON.stringify(cardDetailList);
				// console.log(cartList);
				uni.navigateTo({
					url: './card_holding?cardInfo='+cartList
				})
			}

		},
	}
</script>

<style lang="less">
	.container {
		padding: 20upx;
		margin: 20upx;
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

				// border-radius:10upx; 
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

		.cardInfor {
			display: flex;
			justify-content: flex-start;
			align-items: left;
			padding-left: 20upx;

			text:first-child {
				width: 25%;
			}
		}

		.detail {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin: 20upx 0;

			.revise {
				width: 20%;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				font-size: 30upx;
				border: 2upx solid #ececec;
				border-radius: 30upx;
			}

			.delete {
				width: 20%;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				font-size: 30upx;
				border: 2upx solid #ececec;
				border-radius: 30upx;
			}
		}

	}
</style>
