<template>
	<view class="uni-tab-bar">
		<!-- 标题 -->
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.ref" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.ref"
			 :data-current="index" @click="tapTab(index)">{{tab.cat_name}}</view>
		</scroll-view>
		<!-- 文章 -->
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item  v-for="(newsItem,newsIndex) in newsList" :key="newsIndex">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(newsIndex)">
					<block v-for="(newsitem,index2) in newsItem.data" :key="index2" class="inf_news table-view">
						<navigator :url="'./article_detail?id=' + newsitem.id"  hover-class="navigator-hover">
							<media-list :data="newsitem" class="inf_news mui-table-view"></media-list>
						</navigator>
					</block>
					<view class="uni-tab-bar-loading"> 
					<!-- 加载更多状态码 -->
						<uni-load-more :loadingType="newsItem.loadingType"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	
	import mediaList from '@/components/tab-nvue/mediaList.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		components: {
			mediaList,
			uniLoadMore
		},
		data() {
			return {
				loadingText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				scrollLeft: 0,
				newsList: [],//文章列表
				tabIndex: 0,
				tabBars: [] //tab选项卡列表
			}
		},
		onLoad: function() {
			// 初始化列表信息
			this.getTabBars();
		},
		methods: {			
			// 调取tabbar选项卡的数据
			getTabBars() {
				uni.request({
					url: this.apiUrl + 'article/getCategory',
					method: 'GET',
					data: {
						pid: 1,						
					},
					success: result => {
						if (result.data.code == 0) {
							this.tabBars = result.data.data;
							/* 加载更多时最后添加数据 */
							this.tabBars.forEach((tabBar)=>{
								this.newsList.push({
									data: [],
									requestParams: {
										cid: tabBar.cid,
										page: 1
									},
									loadingText: '加载中...',
									loadingType:1  // 为0时 加载前；为1时 加载中； 为2时 没有更多；
								});
							});
							this.getList();  //默认开始调用并显示文章列表数据
						}
					}
				});			
			},
			//获取文章列表
			getList() {
				let activeTab = this.newsList[this.tabIndex];
				uni.request({
					url: this.apiUrl + 'article/getArticleList',
					data: activeTab.requestParams,
					success: (res) => {
						if (res.data.code == 0) {
							if(res.data.data.length == 0){
								activeTab.loadingType = 2;
							}
							// 返回文章列表的数据
							const data = res.data.data.map((news) => {
								return {
									id: news.id,
									title: news.title,
									image: news.image,
									addtime: news.addtime,
									is_show:news.is_show,
									comment_num: news.comment_num
								};
							});
							
							if (activeTab.requestParams.page === 1) {
								activeTab.data = data;	
								// 默认显示10条数据
								// console.log(activeTab.data)
							} else {
								data.forEach((news) => {
									activeTab.data.push(news);
								});
							}
							++activeTab.requestParams.page;
							// ++page在最后添加10条数据
							//console.log(activeTab.requestParams.page)
						}
					}
				});
			},
			//异步滑块切换事件
			async changeTab(event) {
				let index = event.detail.current;
				// 判断tabbar和文章列表的索引值是否一致
				if(this.tabIndex === index){
					return;
				}
				this.tabIndex = index;
				// 获取tabbars的宽度
				let tabBar = await this.getElSize('tab-bar');
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				//很据tabbar中绑定的 id=ref和key=ref 进行获取滑块的宽度
				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.tabBars[i].ref);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].ref),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				// 首次切换后加载数据
				const activeTab = this.newsList[this.tabIndex];
				if (activeTab.data.length === 0) {
					this.getList();
				}
			},
			//异步执行tabBar切换
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize('tab-bar'),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.tabIndex = index;
					
					// 首次切换后加载数据
					const activeTab = this.newsList[this.tabIndex];
					// console.log(activeTab.data);
					if (activeTab.data.length === 0) {
						this.getList();
					}
				}
			},
			loadMore() {  //加载更多 调用文章列表数据
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
		}
	}
</script>

<style>
	/* 滚动条 修改样式*/
	/* #ifdef H5 || MP-WEIXIN*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
 
	/*  #endif  */
	
	/* #ifdef MP-ALIPAY */
	.swiper-tab-list {
		display: inline-block;
	}

	/* #endif */
	.uni-tab-bar{
		background: #fff;
	}
	.uni-tab-bar .active {
		color: #FF4965;
		border-bottom: 4upx solid #FF4965;
	}

	.uni-swiper-tab {
		border: none;
	}

	/* 渲染页面样式 */
	.uni-tab-bar .list {
		width: 100%;
	}

	.inf_news {
		width: 98%;
		height:200upx;
		color: #393939;
	}

	.mui-table-view {
		position: relative;
		margin-top: 0;
		margin-bottom: 0;
		padding-left: 0;
		list-style: none;
		background-color: #fff;
	}
</style>
