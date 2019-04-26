<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
		<!-- 头部 -->
		<!-- 引入搜索组件 -->
		<header-search type="health" @scanCode="scanCode"></header-search>
		<!-- 轮播 -->
		<view class="swiper-view">
			<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff">
				<swiper-item v-for="swiper in swiperList" :key="swiper.sid">
					<navigator :url="'../article/article_detail?id=' + swiper.id" hover-class="none">
						<image mode="aspectFill" :src="swiper.image"></image>
					</navigator>
				</swiper-item>
			</swiper>

			<view class="keep-out"></view>
		</view>
		<!-- 头条公告-->
		<index-con type="health"></index-con>
		<!-- 亲子视频 -->
		<!-- 	<view class="hotArticle uni-column">
			<view class=" uni-row healthApp">
				<view style="font-size: 38upx;color:#000;font-weight: 800;">热门视频</view>
				<navigator url="child_video" hover-class="none">
					<view style="font-size:26upx;color:#999;">查看更多</view>
				</navigator>
			</view>
			<view class="hotList">
				<view class="uin-flex uni-column list" v-for="(video,videoIndex) in videoList" :key="videoIndex"  >
					<view class="video">
						<video id="myVideo" :src="video.media_url" :poster="video.image" controls></video>
					</view>
					<view class="time uni-row">
						<text class="date">{{video.title}}</text>
					</view>
				</view>
			</view>		
		</view> -->


		<!-- 育儿百科 -->
		<view class="hotArticle uni-column">
			<view class=" uni-row healthApp">
				<view style="font-size: 38upx;color:#000;font-weight: 800;">热门文章</view>
				<navigator url="../article/article" hover-class="none">
					<view style="font-size:26upx;color:#999;">查看更多</view>
				</navigator>
			</view>
			<!-- list -->
			<view class="hotList ">
				<navigator hover-class="none" class="uin-flex uni-column list" v-for="(hot,hotIndex) in hotList" :key="hotIndex"
				 :url="'../article/article_detail?id=' + hot.id">
					<image :src="hot.image" mode=""></image>
					<view class="title">{{hot.title}}</view>
					<view class="comment uni-row">
						<text class="addtime">{{hot.addtime}}</text>
						<text class="show">{{hot.comment_num}}次评论</text>
					</view>
				</navigator>
			</view>

		</view>

		<!-- 文章 -->
		<!-- 		<view class="uni-tab-bar container">
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
				<view v-for="(tab,index) in tabBars" :key="tab.cid" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
				 :id="tab.cid" :data-current="index" @click="tapTab(index)">{{tab.cat_name}}</view>
			</scroll-view>
			<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item v-for="(newsSwiperItem,newsSwiperIndex) in tabBars" :key="newsSwiperIndex">
					<scroll-view class="list" scroll-y>
						<block v-for="(newsItem,newsIndex) in newsSwiperItem.child" :key="newsIndex" class="inf_news table-view">
							<navigator :url="'../article/article_detail?id=' + newsItem.id" hover-class="none">
								<media-list :data="newsItem" class="inf_news mui-table-view"></media-list>
							</navigator>
						</block>
					
					</scroll-view>
				</swiper-item>
			</swiper>
		</view> -->

	</view>
</template>
<script>
	import mediaList from '@/components/tab-nvue/mediaList.vue';
	import headerSearch from '@/components/common/header-search.vue';
	import indexCon from '@/components/index-content/indexContent.vue';
	export default {
		components: {
			mediaList,
			headerSearch,
			indexCon
		},
		data() {
			return {
				headerPosition: "fixed",
				//轮播
				swiperList: [{
						id: 459,
						src: '自定义src0',
						image: 'http://static.lamamuying.com/static/images/banner/banner5.jpg'
					},
					{
						id: 151,
						src: '自定义src1',
						image: 'http://static.lamamuying.com/static/images/banner/banner6.jpg'
					},
					{
						id: 205,
						src: '自定义src2',
						image: 'http://static.lamamuying.com/static/images/banner/banner7.jpg'
					},
					{
						id: 67,
						src: '自定义src3',
						image: 'http://static.lamamuying.com/static/images/banner/banner8.jpg'
					}
				],
				notice: [{
						id: 2,
						title: '生完娃的辣妈们，应该这样减脂！'
					},
					{
						id: 3,
						title: '过了35岁这个极限年龄生孩子，孕妇要做好4件事'
					},
					{
						id: 4,
						title: '1岁内宝宝禁用的感冒药'
					},
				],
				videoList: [], // 热门视频
				hotList: [], // 热门文章
				scrollLeft: 0,
				newsList: [], //文章列表
				tabIndex: 0,
				tabBars: [] //文章tabbars
			}
		},
		// 视频
		onReady: function(res) {
			// #ifndef MP-ALIPAY
			this.videoContext = uni.createVideoContext('myVideo')
			// #endif
		},
		onLoad: function() {
			uni.showLoading({
				title: '加载中',
			});
			/* 初始化列表信息 */
			this.getTabBars();
			this.getList();
			this.getHotList();
			this.getvideoList();
		},
		methods: {
			scanCode() {
				uni.scanCode({
					success: res => {
						//console.log('条码类型：' + res.scanType);
						//console.log('条码内容：' + res.result);						
						uni.request({
							url: this.apiUrl + 'user/getUser',
							method: 'GET',
							data: {
								uid: res.result
							},
							success: result => {
								//console.log(result);
								uni.setStorageSync('referee', result.data.data.id);
								uni.setStorageSync('locationShop', result.data.data.shop);
								this.goodsList = [];
								this.recGoods = [];
								this.page = 1;
								this.getGoodsList();
								this.getRecGoodsData();
							},
							fail: () => {},
							complete: () => {}
						});
						uni.showToast({
							title: '扫描成功'
						});
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				});
			},
			// 视频
			getvideoList() {
				uni.request({
					url: this.apiUrl + 'article/getMedias',
					method: 'GET',
					data: {
						// limit:4,
						is_top: 1,
					},
					success: res => {
						// console.log(res);
						if (res.data.code == 0) {
							this.videoList = res.data.data;
							// console.log(this.videoList);
						}
					},
					fail: () => {},
					complete: () => {}
				});

			},


			// 热门文章
			getHotList() {
				uni.request({
					url: this.apiUrl + 'article/getArticles',
					method: 'GET',
					data: {
						limit: 30
					},
					success: (result) => {
						if (result.data.code == 0) {
							this.hotList = result.data.data;
						}
					},
				});
			},
			// 调取tabbar选项卡的数据
			getTabBars() {
				uni.request({
					url: this.apiUrl + 'article/getCategory',
					method: 'GET',
					data: {
						pid: 1,
						child: 1,
						limit: 12
					},
					success: result => {
						//console.log(result.data.data);
						if (result.data.code == 0) {
							this.tabBars = result.data.data;
						}
					}
				});

			},
			//调取文章列表
			getList() {
				uni.request({
					url: this.apiUrl + 'article/getArticles',
					// data:activeTab.requestParams,
					method: 'GET',
					data: {
						cid: 2,
					},
					success: (result) => {
						if (result.data.code == 0) {
							this.newsList = result
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

			async changeTab(event) {
				/* 左右滑动切换数据 */
				if (event.detail.current === this.tabIndex) {
					return false;
				} else {
					this.tabIndex = event.detail.current;
				}

				let index = event.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize('tab-bar');
			},
			getNodeSize(node) {
				return new Promise((resolve, reject) => {
					dom.getComponentRect(node, (result) => {
						resolve(result.size);
					});
				});
			},
			onRefresh(event) {
				this.getList();
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize('tab-bar'),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;


				}
			},
		}

	}
</script>

<style lang="less">
	//热门
	.hotArticle {
		background: #fff;

		.healthApp {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: #fff;
			margin: 10upx 0;
			padding: 10upx 20upx;
		}

		.hotList {
			flex-wrap: wrap;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20upx;
			overflow: hidden;

			.list:last-child {
				margin: 0;
			}

			.list {
				width: 48%;
				padding-bottom: 20upx;

				image {
					width: 100%;
					height: 240upx;
				}

				.video {
					width: 100%;
					height: 300upx;
				}

				uni-video {
					width: 170px;
					height: 140px;
				}

				video {
					width: 170px;
					height: 140px;
				}

				.title {
					text-indent: 10upx;
					height: 100upx;
					line-height: 50upx;
					font-size: 28upx;
					color: #000;
					overflow: hidden;
				}

				.time {
					font-size: 28upx;
					color: #333;
					overflow: hidden;
					height: 50px;
					text-indent: 20upx;
				}

				.comment {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 10upx;
					color: #999;
				}
			}
		}
	}


	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		height: 100upx;
	}

	/* #ifdef H5 || MP-WEIXIN*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	/*  #endif  */
	.status {
		width: 100%;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);
		/*  #endif  */
		background-color: #ff4965;
		position: fixed;
		top: 0;
		z-index: 1000;
	}
	.flex-item {
		width: 33.3%;
		height: 200upx;
		text-align: center;
		line-height: 200upx;
	}

	.flex-item-V {
		width: 100%;
		height: 150upx;
		text-align: center;
		line-height: 150upx;
	}

	.uni-flex {
		display: flex;
		justify-content: space-between;
		background: #fff;

		.text {
			margin-left: 110upx;
			margin-top: 110upx;
			height: 70upx;
			line-height: 70upx;
			text-align: left;
			font-size: 32upx;
		}

		.text_talk {
			width: 180upx;
			height: 0px;
			margin-left: 60upx;
			margin-top: -60upx;
			font-size: 32upx;
		}

		.text_take {
			width: 200upx;
			height: 0;
			margin-left: 60upx;
			margin-top: 48upx;
			font-size: 24upx;
			color: #656565;
		}
	}

	// 轮播  公告
	.swiper-view {
		.swiper {
			width: 100%;
			height: 360upx;

			image {
				width: 100%;
				height: 360upx;
			}
		}

		.keep-out {
			width: 100%;
			height: 30upx;
			border-radius: 100% 100% 0 0;
			margin-top: -15upx;
			position: absolute;
		}
	}

	.notice_bg {
		width: 15%;
		margin-left: 10upx;
		padding-top: 10upx;
		overflow: hidden
	}

	.notice_bg img {
		width: 100%;
	}

	.notice_content {
		width: 75%;
		height: 50upx;
		font-size: 28upx;
		margin-right: 5%;
		overflow: hidden;
		margin-top: 10upx;
		padding-left: 20upx;
	}

	.uni-swiper-msg {
		padding: 0 !important;
	}

	.flex-text {
		width: 340upx;
		height: 340upx;
		background: #fff;
		padding-top: 20upx;

		text {
			display: block;
		}
	}

	.growth {
		background: #fff;
		justify-content: unset;

		image {
			width: 340upx;
			height: 340upx;
			margin-left: 24upx;
		}
	}

	.more {
		width: 100%;
		height: 80upx;
		background: #FAF0E7;
		margin: auto;

		image {
			width: 70upx;
			height: 70upx;
			float: left;
			margin-top: 10upx;
		}

		.text {
			font-size: 32upx;
		}
	}

	.container {
		width: 100%;
		height: 2200upx;
	}

	.swiper-tab-list {
		font-size: 32upx;
	}

	.uni-tab-bar .active {
		color: #FF4965;
		font-size: 32upx;
		border-bottom: 2px solid #FF4965;
		padding-bottom: 20upx;
	}

	/* 添加修改样式  底部文章trabbar */
	.swiper-tab-list {
		margin-right: 20upx;
	}
</style>
