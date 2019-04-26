<template>
	<view>
		<view class="video1 clearfix w96 overflow">
			<view class="list-view">
				<view class="list-item" v-for="(video,listIndex) in videoList" :key="listIndex">
					<view class="video">
						<video id="myVideo" :src="video.media_url" :poster="video.image"  controls></video>
					</view>
					<view class="title">{{video.title}}</view>
					<text class="text"> {{video.addtime}}</text>
				</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoList:[],// 热门视频
				loadMoreText: "加载中...",
				showLoadMore: false,
				page: 1
			}
		},
		// 视频
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		onShow() {
			uni.showLoading({
				title: '加载中',
			});
			this.getvideoList();
		},
		// 监听页面卸载
		onUnload() {
			this.videoList = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		// 页面上拉触底事件的处理函数
		onReachBottom() {
			this.getvideoList();
			
		},
		methods: {
			getvideoList(){
				uni.request({
					url:this.apiUrl + 'article/getMediaList',
					method: 'GET',
					data: {
						page:this.page,
					},
					success: res => {
						// console.log(res.data.code)
						if(res.data.code == 0){
							// this.videoList=res.data.data.data;
							// console.log(this.videoList);
							if (Array.isArray(res.data.data.data) && res.data.data.data.length === 0) {
								this.loadMoreText = "没有更多数据了!"
								return;
							}
							
							if( res.data.data.data.length < 10){
								this.loadMoreText = "没有更多数据了!"
							}
							this.showLoadMore = true;
							this.page++;
							res.data.data.data.forEach((video) => {
								this.videoList.push(video);
							});
							
							console.log(this.videoList);
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
	.video{width:100%;}
	video{width: 100%;}
	uni-video{width:100%;}
	.list-item {
		margin: 20upx;
		border-bottom: 2upx solid #ECECEC;
	}
	.text {
		color: #868686;
		font-size: 26upx;
		display: inline-block;
	}
	.title{
		font-size: 30upx;
		text-indent: 20upx;
	}
</style>
