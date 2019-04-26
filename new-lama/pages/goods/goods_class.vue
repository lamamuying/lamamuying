<template>
	<view>
		<view class="page-body" style="position:fixed">
			<!-- 左侧分类列表 -->
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
				 v-for="(item,index) in categoryList">
					{{item.NAME}}
				</view>
				<view class="place"></view>
			</scroll-view>
			<!-- 分类内容 -->
			<scroll-view class="nav-right-scroll" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
			 scroll-with-animation>
				<view class="nav-right">
					<view class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index">
						<navigator hover-class="none" :url="'/pages/goods/goods_list?cid='+item.cid">
							<image :src="item.IMG" mode="widthFix" />
							<view class="view_name">{{item.NAME}}</view>
						</navigator>
					</view>
				</view>
				<view class="place"></view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon.vue';
	let userInfo;
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				//headerPosition:"fixed",
				categoryList: [],
				subCategoryList: [],
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				name: "七月_"
			}
		},
		onLoad(e) {
			userInfo = uni.getStorageSync('userLoginInfo');
			if (userInfo.identity) {
				this.identity = userInfo.identity;
			}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(categroy, index) {
				this.categoryActive = index;
				this.subCategoryList = categroy.subCategoryList;
				this.scrollTop = -this.scrollHeight * index;
			},
			getCategory() {
				uni.showLoading({
					title: "数据加载中..."
				});
				uni.request({
					url: this.apiUrl + 'goods/getCategory',
					method: 'GET',
					data: {
						identity:this.identity,
					},
					success: res => {
						if (res.data.code == 0) {

							for (var i = 0; i < res.data.data.length; i++) {
								var subList = [];
								// 对应分类商品
								var goodsLis = res.data.data[i].child;

								for (var j = 0; j < goodsLis.length; j++) {
									subList.push({
										"NAME": goodsLis[j].cat_name,
										"IMG": goodsLis[j].image,
										"cid": goodsLis[j].cid
									})
								}
								//console.log(subList);
								// 分类
								this.categoryList.push({
									"NAME": res.data.data[i].cat_name,
									"subCategoryList": subList
								})

							}
							this.subCategoryList = this.categoryList[0].subCategoryList;
						}
					},
					fail: () => {
						uni.showToast({
							title: "获取数据失败",
							icon: "none"
						})
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
		},
		onLoad: function() {
			this.getCategory();
			this.height = uni.getSystemInfoSync().windowHeight;
		}
	}
</script>

<style lang="less">
	// 占位符
	.place {
		/*  #ifdef  APP-PLUS  */
		margin-bottom: var(--status-bar-height);
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
	.page-body {
		width: 100%;
		// padding:0 1%;
		// margin: auto;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.nav-left {
		width: 30%;
		background-color: #fff;
		border-right: solid 1px #ECECEC;
	}

	.nav-left-item {
		height: 100upx;

		border-bottom: solid 1px #ECECEC;
		font-size: 32upx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 100upx;
	}

	.nav-right-scroll {
		width: 70%;
		//padding-right: 2%;
		background: #fff;
		// overflow: hidden;
		background: #fff;
		padding: 2%;
	}

	.nav-right {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		padding-bottom: 10px;

	}

	.nav-right-item {
		width: 46%;
		/* height: 220upx; */
		text-align: center;
		// padding: 11upx;
		margin-left: 3%;
		font-size: 28upx;
		//flex-wrap: nowrap;
	}

	.view_name {
		font-size: 28upx;
		text-align: center;
		line-height: 60upx;
		display: -webkit-box;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;

	}

	.nav-right-item image {
		width: 100%;
		height: 254upx;
	}

	.active {
		color: #FF4965;
		background: #fff;
	}

	/* 导航栏 */
	.title_tap {
		height: 100upx;
		line-height: 100upx;
		color: white;
		text-align: center;
		width: 100%;
		background-color: #ff4965;
		font-size: 34upx;
	}

	/* 禁用滚动条 */
	/* #ifdef H5 || MP-WEIXIN*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	/* #endif */
	/* // 头部样式 */
	.title {
		width: calc(100% - 200upx);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.title .icon {
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

	.search-box {
		width: 100%;
		height: 100upx;
		background-color: #FF4965;
		/* padding: 7.5px 2.5%; */
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.search-box .title {
		color: #fff;
		font-size: 34upx;
	}

	.search-box .scan {
		color: white;
		width: 100upx;
		height: 100upx;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
	}
</style>
