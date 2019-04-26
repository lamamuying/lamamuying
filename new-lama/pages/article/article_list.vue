<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" style="position:fixed"></view>
		<!-- 头部搜索 -->
		<view class="header" style="position:fixed">
			<view class="scan arrow-left-mp" @click="navigateBack">
				<span class="iconfont icon scan" style="font-size: 46upx; color: #fff;">&#xe604;</span>
			</view>
			<view class="input">
				<span class="iconfont icon search" style="font-size: 56upx;">&#xe61a;</span>
				<input  placeholder="请输入关键字查询" v-model="keyword" />
			</view>
			<view class="icon-item" style="color: #FFFFFF; margin-left:20upx ;" @click="setKeyword()">
				<span class="iconfont" style="font-size: 50upx;">&#xe62d;</span>
			</view>
		</view>

		<!-- 占位符 -->
		<view class="place"></view>
		<!-- 文章列表 -->
		<view class="container">
			<view class="uni-list" v-for="(itemList,index) in articleList" :key="index">
				<navigator :url="'./article_detail?id=' + itemList.id" hover-class="navigator-hover">
					<view class="uni-list-cell">
						<view class="uni-media-list">
							<view class="uni-media-list-body">
								<view class="uni-media-list-text-top">{{itemList.title}}</view>
								<view class="uni-media-list-text-bottom">
									<view class="text" style="padding-right: 20upx;">{{itemList.addtime}}</view>
									<view class="text">{{itemList.comment_num}}次评论</view>
								</view>
							</view>
							<image class="uni-media-list-logo" :src="itemList.image"></image>
						</view>
					</view>
				</navigator>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				articleList: [],
				keyword: '',
				loadMoreText: "加载中...",
				showLoadMore: false,
				page: 1
			};
		},
		onLoad(params) {
			uni.showLoading({
				title: '加载中',
			});
			this.getList();
		},
		// 监听页面卸载
		onUnload() {
			this.articleList = [],
			this.loadMoreText = "加载更多.....",
			this.showLoadMore = false;
		},
		// 页面上拉触底事件的处理函数
		onReachBottom() {
			this.getList();
			
		},
		methods: {
			//调取文章列表
			getList() {
				uni.request({
					url: this.apiUrl + 'article/getArticleList',
					method: 'GET',
					data: {
						page: this.page,
						title: this.keyword
					},
					success: (result) => {
						if (result.data.code == 0) {
							this.loadMoreText = "加载更多.....";
							this.showLoadMore = true;
							if (Array.isArray(result.data.data) && result.data.data.length === 0) {
								this.loadMoreText = "没有更多数据了!"
								return;
							}
							if( result.data.data.length < 10){
								this.loadMoreText = "没有更多数据了!"
							}
							this.page++;
							result.data.data.forEach((article) => {
								this.articleList.push(article);
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
			},
			// 返回上级跳转页面
			navigateBack() {
				uni.navigateBack();
			},
			
			setKeyword(){
				this.loadMoreText = "正在加载.....";
				this.articleList = [];
				this.page = 1;
				this.getList();
			}
		},
	}
</script>

<style lang="less">
	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		height: 100upx;
	}

	.status {
		width: 100%;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff4965;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.header {
		width: 100%;
		height: 100upx;
		background-color: #ff4965;
		display: flex;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		justify-content: flex-start;
		z-index: 996;

		.scan {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.input {
			width: calc(100% - 200upx);
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			input {
				width: calc(100% - 60upx);
				height: 60upx;
				background-color: #ffffff;
				border-radius: 60upx;
				padding-left: 60upx;
				font-size: 30upx;

			}

			.icon {
				width: 60upx;
				height: 60upx;
				position: absolute;
				color: #a18090;
				z-index: 996;
				top: 20upx;
				left: 0;
				font-size: 40upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}


		}

		.arrow-left-mp {
			/* #ifdef MP-WEIXIN*/
			width: 0;
			overflow: hidden;
			margin-left: 80upx;
			/* #endif */
		}
	}

	.container {
		padding: 20upx 0;
		height: 100vh;
		background: #fff;

		.uni-list::before {
			height: 0;
		}

		.uni-media-list {
			.uni-media-list-logo {
				width: 180upx;
				height: 140upx;
				margin-right: 10upx;
			}

			.uni-media-list-body {
				height: 140upx;

				.uni-media-list-text-top {
					line-height: 40upx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.uni-media-list-text-bottom {
					display: flex;
					justify-content: flex-start;
					align-items: center;
				}

			}
		}

	}
</style>
