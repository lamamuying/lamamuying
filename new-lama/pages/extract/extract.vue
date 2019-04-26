<template>
	<view>
		<view class="extract">
			<view class="uni-flex uni-row" @click="showBanner">
				<text class="addExtra">到账银行卡</text>
				<view class="uni-flex uni-column" v-if="isdefault">
					<text>{{card.bank}}({{cartI}})</text>
					<text style="color: gray;" v-if="cardList != null">24小时内到账</text>
				</view>
			</view>
			<view>
				<text class="addExtra">提现金额</text>
			</view>
			<view class="uni-flex uni-row" style="border-bottom: 1upx solid #ececec;margin-bottom: 10upx;">
				<text class="addExtra" style="font-size: 70upx;">￥</text>
				<input type="number" v-model="exMony" value="" style="font-size: 50upx;" />
			</view>
			<view><text style="color: gray;">当前零钱余额{{remainder}}元</text></view><!-- ，</text><text style="color: #0A98D5;">全部提现</text> -->
			<!-- 体现按钮 -->
			<view hover-class="none" style="margin-top: 20upx;" @click="goCash"><button class="btn">提现</button></view>
		</view>
		<!-- 点击选择银行卡 弹窗 -->
		<view>
			<add-card :visible="openAttr" mode="right" @close="closeAttr">
				<view class="haveCard">
					<view class="attr-pop">
						<view class="close" @click="closeAttr">
							<img class="icon" src="http://static.lamamuying.com/static/images/icon_close.png" />
						</view>
						<!-- <view>123</view> -->
						<view class="flex-item uni-row" v-for="(card,cardIndex) in cardList" :key="cardIndex" @click="selectMyCard(card.id)">
							<image src="http://static.lamamuying.com/static/images/56.png" mode=""></image>
							<view class="uni-flex uni-column info">
								<view>{{card.bank}}</view>
								<view>{{card.card_type}}</view>
								<view>{{card.card_num}}</view>
							</view>
						</view>
					</view>
				</view>
			</add-card>
		</view>
	</view>
</template>
<script>
	import addCard from "@/components/addCard/addCard.vue";
	var userLoginInfo;
	export default {
		components: {
			addCard
		},
		data() {
			return {
				exMony: '',
				remainder: '',
				card: [],
				bankId: '',
				cartI: '',
				orderId: '',
				openAttr: false,
				cardList: [],
				isdefault: true
			}
		},
		onShow() {

		},
		onLoad(params) {
			// 账户余额
			// console.log(params);
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			this.getCard();
			if (params.remainder) {
				this.remainder = params.remainder;
				return;
			}
		},
		methods: {
			// 选择银行卡
			showBanner: function() {
				if (this.openAttr === false) {
					// 打开规格选择弹窗
					this.openAttr = !this.openAttr;
				}
			},
			//获取用户选中的银行卡
			selectMyCard: function(selectMyCard) {
				uni.request({
					url: this.apiUrl + 'user/getBank',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						id: selectMyCard
					},
					success: res => {
						// console.log(res.data.data);
						if (res.data.code === 0) {
							this.card = res.data.data;
							// 修改选中银行卡id
							this.bankId = selectMyCard;
							// 截取银行卡后四位
							this.cartI = this.card.card_num.slice(-4);
							this.openAttr = false;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 去判断该用户是否绑定了银行卡 若没绑定跳转到添加银行卡页面
			//否则默认提交到第一张银行卡上
			getCard: function() {
				uni.request({
					url: this.apiUrl + 'user/getBankList',
					method: 'GET',
					data: {
						uid: userLoginInfo.id
					},
					success: res => {
						if (res.data.code === 0) {
							if (Array.isArray(res.data.data) && res.data.data.length === 0) {
								this.isdefault = false;
								uni.showToast({
									title: '您还未绑定银行卡',
									icon: 'none',
									success: (res) => {
										setTimeout(() => {
											uni.redirectTo({
												url: '../addCard/addCard'
											})
										}, 300);
									}
								})
							} else {
								// console.log(res.data.data);
								this.card = res.data.data[0];
								this.bankId = this.card.id;
								// 截取银行卡后四位
								this.cartI = this.card.card_num.slice(-4);
								// 								// console.log(this.cartI);
								this.cardList = res.data.data;
							}
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			// 提交提现金额 和 提交的银行卡
			goCash: function() {
				if (this.remainder < this.exMony) {
					uni.showToast({
						title:'超出了您的零钱余额，请重试',
						icon:'none',
						success: (res) => {
							return;
						}
					})
					
				}
				uni.request({
					// user/saveUserCash
					url: this.apiUrl + 'user/saveUserCash',
					method: 'POST',
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						uid: userLoginInfo.id,
						price: this.exMony,
						bank_id: this.bankId
					},
					success: res => {
						if (res.data.code === 0) {
							// 订单id
							this.orderId = res.data.data;
							uni.showToast({
								title: "提交成功",
								icon: 'none', //图标，支持"success"、"loading" 
								mask: true,
								duration: 1000,
								success: (res) => {
									uni.redirectTo({
										url: './extract_apply?orderId=' + this.orderId
									});
								},
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});

			},
			// 关闭规格弹窗
			closeAttr() {
				this.openAttr = false;
			},
		}
	}
</script>

<style lang="less">
	.extract {
		width: 80%;
		background-color: #fff;
		margin: 40upx auto;
		padding: 50upx 50upx 30upx 50upx;

		.addExtra {
			width: 36%;
		}

		input {
			height: 0;
			margin-top:7%;
			margin-left:12%;
		}

		.btn {
			background: #ff4965;
			color: #fff;
		}
	}

	.selectCard {
		width: 100%;
		display: flex;
		justify-content: center;
		position: fixed;
		bottom: 0;
		z-index: 1000;
		background: #fff;
	}

	.haveCard {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;

		.flex-item {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin: 40upx;
			background: #FF7D91;
			border-radius: 10upx;

			image {
				margin: 0 20upx;
				width: 70upx;
				height: 70upx;
			}

			.info {
				width: 80%;
				padding: 20upx 0;
				color: #fff;
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

	.attr-pop {
		width: 100%;
		// padding: 4%;
		background: #fff;
		position: fixed;
		z-index: 9;
		bottom: 0;
		overflow-y: auto;
		padding-top: 60upx;
	}

	.attr-pop .close {
		position: absolute;
		width: 48rpx;
		height: 48rpx;
		right: 20rpx;
		overflow: hidden;
		top: 31.25rpx;
	}

	.attr-pop .close .icon {
		width: 48rpx;
		height: 48rpx;
	}
</style>
