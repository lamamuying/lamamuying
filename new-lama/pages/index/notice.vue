<template>
	<view>
		<view class="noticeList" v-for="(name,index) in titleList" :key="index">
			<navigator class="navGo" :url="'../article/article_detail?id=' + name.id" hover-class="none">
				<text class="circle"></text>
				<text type="default" class="text">{{name.title}}</text>
			</navigator>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleList: [],
				loadMoreText: "加载中...",
				showLoadMore: false,
				page: 1
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中',
			});
			this.getTitleList();
		},
		// 监听页面卸载
		onUnload() {
			this.titleList = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		// 页面上拉触底事件的处理函数
		onReachBottom() {
			this.getTitleList();
			
		},
		methods: {
			getTitleList() {
				uni.request({
					url: this.apiUrl + 'article/getArticleList',
					method: 'GET',
					data: {
						page: this.page,
						limit:18,
						cid:12
					},
					success: (result) => {
						if (result.data.code == 0) {
							if (Array.isArray(result.data.data) && result.data.data.length === 0) {
								this.loadMoreText = "没有更多数据了!"
								return;
							}
							
							if( result.data.data.length < 10){
								this.loadMoreText = "没有更多数据了!"
							}
							this.showLoadMore = true;
							this.page++;
							result.data.data.forEach((article) => {
								this.titleList.push(article);
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
	.noticeList {	
		background: #fff;
		padding:0 20upx;
	}
	.navGo {
		font-size: 28upx;
		height: 80upx;
		color: #333;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		
		.circle {
			width: 10upx;
			height: 10upx;
			background: #D2D2D2;
			display: inline-block;
			border-radius: 60upx;
			margin:0  20upx;
		}
		.text{
			height:80upx;
			line-height: 80upx;
			white-space: nowrap;
			overflow: hidden;
			font-size: 32upx;
			text-overflow: ellipsis;
		}
	}

	
</style>
