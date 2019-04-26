<template>
	<view>
		<view class="container">
			<!-- 账户 -->
			<view class="person">
				<view class="balance uni-column">
					<text style="display: block; color:#fff;font-size:42upx;">{{remainder}}</text>
					<text style="color:#fff;">账户余额</text>
				</view>
				<view class="uni-row profit">
					<view class="text uni-column">
						<text class="money">{{walletList.today}}</text>
						<text class="profit-text">今日收益</text>
					</view>
					<view class="text uni-column">
						<text class="money">{{walletList.total}}</text>
						<text class="profit-text">累计收入</text>
					</view>
				</view>
				<view class="person_bottom ">
					<navigator class="uni-row" url="../addCard/addCard" hover-class="none">
						<span class="iconfont img_icon" style="font-size: 40upx;color:#fff;font-weight: 700;">&#xe657;</span>
						<text class="bottom-text">添加银行卡</text>
					</navigator>
					<navigator class="uni-row" :url="'/pages/extract/extract?remainder='+remainder" hover-class="none">
						<span class="iconfont img_icon" style="font-size: 40upx;color:#fff;font-weight: 700;">&#xe624;</span>
						<text class="bottom-text">提现</text>
					</navigator>
					<view class="uni-row" @click="goExtract">
						<span class="iconfont img_icon" style="font-size: 40upx;color:#fff;font-weight: 700;">&#xe680;</span>
						<text class="bottom-text">查看提现状态</text>
					</view>
				</view>
			</view>
			<!-- 明细 -->
			<view style="padding:20upx 0;margin-bottom:10upx; font-size: 32upx;text-indent:20upx;background: #fff;">明细</view>
			<view class="detailed">
				<view class="flex-item uni-row" v-for="(Lists,index) in moenyList" :key="index">
					<image :src="photo"></image>
					<view class=" uni-column">
						<view class="friend">{{nickname}}</view>
						<view class="mode">{{Lists.trade_no}}</view>
						<view class="date">
							<text>{{Lists.addtime}}</text>
							<!-- <text>{{Lists.time}}</text> -->
						</view>
					</view>
					<view class="add">{{Lists.price}}</view>
				</view>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
			<!-- bottom-image -->
			<!-- 	<view class="wallet-img">
				<image src="../../static/images/wallet.jpg" mode="widthFix"></image>
			</view> -->
			<!-- <view v-if="profit"><text>您还没有收入....</text></view> -->
		</view>
		
	</view>
</template>

<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				loadMoreText: "加载中...",
				showLoadMore: false,
				// 账户余额
				remainder: '',
				moenyList: [],
				walletList: [], //收益
				page: 1,
				photo: '',
				nickname: '',
				profit:true
				
			}
		},
		onLoad() {
			
		},
		// 监听页面卸载
		onUnload() {
			this.moenyList = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		// 页面上拉触底事件的处理函数
		onReachBottom() {
			this.getDetailed();
		},
		onShow() {
			uni.showLoading({
				title: '加载中',
			});
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			this.photo = userLoginInfo.photo;
			this.nickname = userLoginInfo.nickname;
			this.getWallet();
			this.getDetailed();
			this.getRemainder();
		},
		methods: {
			// 获取提现状态
			goExtract: function() {
				uni.navigateTo({
					url: "/pages/extract/extract_list"
				})
			},
			// 获取用户余额
			getRemainder() {
				uni.request({
					url: this.apiUrl + 'user/getUser',
					method: 'GET',
					data: {
						uid: userLoginInfo.id
					},
					success: (res) => {
						if (res.data.code == 0) {
							this.remainder = res.data.data.price;
							// console.log(this.remainder);
						}
					},
					fail: () => {
						uni.showToast({
							title: "获取数据失败",
							icon: "none"
						})
					},
					complete: function() {
						uni.hideLoading();
					}

				});
			},
			/* 收益 */
			getWallet() {
				uni.request({
					url: this.apiUrl + 'user/getSaleCount',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
					},
					success: res => {
						// console.log(res)
						if (Array.isArray(res.data.data) && res.data.data.length === 0) {
							return;
						}
						if (res.data.code == 0) {
							this.walletList = res.data.data;
						}
					},
					fail: () => {
						uni.showToast({
							title: "获取数据失败",
							icon: "none"
						})
					},
					complete: function() {
						uni.hideLoading();
					}
				});
			},
			//调取明细列表
			getDetailed() {
				uni.request({
					url: this.apiUrl + 'user/getSaleCashFlowList',
					method: 'GET',
					data: {
						uid: userLoginInfo.id,
						page: this.page
					},
					success: (result) => {
						if (result.data.code == 0) {
							if (Array.isArray(result.data.data.data) && result.data.data.data.length === 0) {
								this.loadMoreText = "没有更多数据了!"
								return;
							}
							// 当用户还无任何收入明细时；
							if(this.page == 1 && result.data.data.data.length === 0){
								this.profit = true;
							}else{
								this.profit = false;
							}

							if (result.data.data.data.length < 5) {
								this.loadMoreText = "没有更多数据了!"
							}
							this.showLoadMore = true;
							this.page++;
							result.data.data.data.forEach((money) => {
								this.moenyList.push(money);
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: "获取数据失败",
							icon: "none"
						})
					},
					complete: function() {
						uni.hideLoading();
					}

				});
			}

		}



	}
</script>

<style lang="less">
	.container {
		width: 100%;
		height: 100vh;

		.person {
			width: 100%;
			// height: 300upx;
			padding-top: 30upx;
			background: linear-gradient(to bottom, #FF425F 20%, #FF6078 80%);

			.balance {
				text-align: center;
			}

			.profit {
				display: flex;
				justify-content: space-around;
				align-items: center;

				.text {
					text-align: center;

					.money {
						display: block;
						color: #fff;
						font-size: 32upx;
					}

					.profit-text {
						font-size: 24upx;
						color: #fff;
						text-align: center;
						display: block;
					}
				}
			}

			.person_bottom {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-top: 30upx;
				border-top: 4upx outset #FF8698;
				padding: 10upx 0;

				.uni-row {
					width: 31%;
					border-right: 2upx solid #FF8698;
					text-align: center;
				}

				.uni-row:last-child {
					border-right: none;
				}

				.bottom-text {
					color: #fff;
					padding-left: 20upx;
				}
			}
		}

		.detailed {

			// height: 960upx;
			// overflow: hidden;
			.flex-item {
				background: #fff;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 20upx;
				border-bottom: 2upx solid #ececec;

				image {
					width: 120upx;
					height: 120upx;
				}

				.uni-column {
					width: 60%;
					margin: 0 20upx;
					text-align: left;

					.friend {
						font-size: 30upx;
					}

					.mode {
						font-size: 26upx;
						color: #BEBEBE;
					}

					.date {
						color: #999;
						font-size: 28upx;

						text {
							padding-right: 20upx;
						}
					}
				}

				.add {
					font-size: 32upx;
					color: #ff4965;
					font-weight: 700;
				}
			}

			.flex-item:last-child {
				border-bottom: none;
			}
		}


		.wallet-img {
			background: #fff;
			width: 100%;
			margin-top: 10upx;
			text-align: center;
		}
	}
</style>
