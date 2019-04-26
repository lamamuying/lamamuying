<template>
	<view>
		<!-- 持卡信息 -->
		<view class="container uni-column">
			<view class="holdingPs">请绑定持卡人本人的银行卡</view>
			<view class="flex-item uni-column">
				<view class="uni-row cardPerson">
					<view class="personal">持卡人</view>
					<view class="name">
						<input class="text" value="" v-model="PersonName" placeholder="请填写持卡人姓名" />
					</view>
				</view>
				<view class="uni-row cardPerson">
					<view class="personal">卡号</view>
					<view class="name">
						<input class="text" value="" v-model="Info" placeholder="请填写银行卡号" />
					</view>
				</view>
			</view>
			<!-- url="addCard_finish" -->
			<view @click="goCardHolding">
				<button class="btn" @click="massage">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		bankCardAttribution
	} from '../../common/checkCard.js';
	export default {
		name: 'checkCard',
		data() {
			return {
				Info: '',
				PersonName: '',
				addInfo: ''
			}
		},
		onLoad(params) {
			if (params.cardInfo) {
				var cardInfo = JSON.parse(params.cardInfo);
				this.PersonName = cardInfo.card_name;
				this.Info = cardInfo.card_num;
			}
		},
		methods: {
			massage() {
				// 			bankCode:"CIB",
				// 			bankName:"兴业银行",
				// 			cardType:"DC"
				// 			cardTypeName:"储蓄卡"
				var allIma = bankCardAttribution(this.Info);
				if (allIma == 'error') {
					uni.showModal({
						// title: '提示',
						content: '卡号输入有误，请重试？',
						success: (res) => {
							if (res.confirm) {
								this.Info = '';
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				} else {
					allIma.PersonName = this.PersonName;
					allIma.Info = this.Info;
					this.addInfo = JSON.stringify(allIma);
					uni.redirectTo({
						url: './addCard_finish?addInfo=' + this.addInfo
					});
				}
			},
		}
	}
</script>

<style lang="less">
	.container {
		width: 100%;
		height: 100vh;
		background: #EDEDED;

		.holdingPs {
			width: 100%;
			border-top: 2upx solid #E0E0E0;
			color: #9D9D9D;
			font-size: 28upx;
			padding: 20upx 0 0 30upx;
		}

		.flex-item {
			background: #fff;
			margin-bottom: 20upx;
			padding: 20upx;
			display: flex;
			justify-content: flex-start;

			.cardPerson {
				border-bottom: 2upx solid #EBEBEB;
				height: 100upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.personal {
					width: 18%;
					text-align: left;
					margin: 0 20upx;
					font-size: 32upx;
					color: #4A4A4A;
				}

				.name {
					width: 80%;
					height: 50upx;
					font-size: 32upx;

					// margin-top:10upx;
					uni-input {
						height: 70upx;
					}
				}

			}

			.cardPerson:last-child {
				border: none;
			}
		}

		.btn {
			margin-top: 50upx;
			width: 80%;
			background: #ff4965;
			color: #fff;
			font-size: 34upx;
		}
	}
</style>
