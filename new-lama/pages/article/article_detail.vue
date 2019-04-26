<template>
	<view class="root">
		<view style="font-size:40upx;padding:20upx;">{{articleView.title}}</view>
		<view class="uni-flex uni-row" style="display: flex;justify-content:space-between;align-items: center;">
			<view class="text" style="font-size:24upx;">{{articleView.addtime}}</view>
			<view class="text" style="font-size:28upx;color: #333;" @click="share()">
				转发
			</view>
		</view>
		<view class="contain" style="padding: 20upx;">
			<rich-text :nodes="articleView.content"></rich-text>
		</view>
		<!-- 评论列表 -->
		<comment :articleId='articleId'></comment>
		<!--<view style="width: 100%;text-align: center;margin-bottom:20upx;" v-if="isfault">
			<text type="default" @click="showMore">评论</text>
		</view> -->
		<view class="place"></view>
		<view class="uni-flex uni-row article_foot">
			<view url="" class="btn">
				<span class="iconfont article_icon1" style="font-size: 50upx;" v-if="icon1===0">&#xe613;</span>
				<span class="iconfont article_icon1" style="font-size: 50upx;color:red" v-show="icon1===1" @click="heart">&#xe82b;</span>
				<button type="default" @click="heart()">收藏</button>
			</view>
			<view @click="comment()" class="btn">
				<span class="iconfont article_icon" style="font-size: 50upx;">&#xe60d;</span>
				<button type="default">评论</button>
			</view>
		</view>

	</view>
</template>
<script>
	import comment from '@/components/article_comment/comment.vue';
	export default {
		components: {
			comment
		},
		data() {
			return {
				icon1: 0,
				articleView: {},
				commentList: [],
				isfault: false,
				articleId: ''
			}
		},
		onLoad(params) {
			this.articleId = params.id;
			this.getDetail();
		},
		methods: {
			share: () => {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: "辣妈母婴文章分享",
					summary: "我正在使用辣妈母婴APP，赶紧跟我一起来体验！",
					imageUrl: "../../static/images/logo.jpg",
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			// 获取文章详情
			getDetail: function() {
				uni.showLoading({
					title: '加载中...'
				})
				uni.request({
					url: this.apiUrl + 'article/getArticle',
					method: 'GET',
					data: {
						id: this.articleId
					},
					success: res => {
						
						if (res.data.code == 0) {
							let content = res.data.data.content;
							res.data.data.content = content.replace(/\<img/gi, '<img style="width:100%;height:auto" ');
							this.articleView = res.data.data;
						}
					},
					fail: () => {},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			// 收藏
			heart() {
				this.icon1 = this.icon1 === 0 ? 1 : 0;
				if (this.icon1 === 1) {
					uni.showToast({
						title: "收藏成功",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: "取消收藏",
						icon: "none"
					});
				}
			},
			// 去评论
			comment() {
				uni.navigateTo({ //跳转到评论页面
					url: '/pages/article/comment?articleId=' + this.articleId
				})
			}
		}
	}
</script>
<style>
	.root {
		background: #fff;
		width: 100%;
	}

	.text {
		padding: 10upx 20upx;
		color: #929292;
		font-size: 32upx;
	}

	.text image {
		width: 40upx;
		height: 32upx;
		position: absolute;
		right: 60upx;
	}

	.contain image {
		padding: 10upx 20upx;
		width: 95%;
		height: 320upx;
	}

	.uni-comment {
		margin-top: 20upx;
	}

	.uni-comment-top .name {
		font-size: 32upx;
		color: #333;
	}

	.uni-comment-date .date {
		font-size: 24upx;
		color: #cac8c9;
	}

	.uni-comment-content {
		font-size: 28upx;
	}

	.uni-textarea {
		width: 94%;
		margin: 10upx auto;
		border: 1px solid #d5dde6;
		border-radius: 20upx;
	}

	.uni-comment-list {
		border-bottom: 2upx solid #EBEBEB;
	}

	.uni-comment-face {
		width: 18%;
		height: 122upx;
	}

	.btn {
		width: 50%;
		background: #fff;
		font-size: 24upx;
	}

	/* */
	.article_icon {
		position: absolute;
		right: 31%;
		top: 14upx;
		z-index: 100;
	}

	.article_icon1 {
		position: absolute;
		left: 12%;
		top: 12upx;
		z-index: 100;
	}

	.article_foot {
		position: fixed;
		justify-content: center;
		bottom: 0;
		width: 100%;
		padding-top: 10upx;
	}

	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		height: 105upx;
		background: #F4F5F6;
	}
</style>
