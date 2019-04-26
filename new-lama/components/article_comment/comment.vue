<template>
	<view>
		<view style="text-align: left; line-height:100upx; font-size:36upx;padding-left:20upx;">热门评论</view>
		<view class="uni-padding-wrap">
			<view class="uni-comment" v-for="(comment,index) in commentList" :key="index">
				<view class="uni-comment-list">
					<view class="uni-comment-face">
						<image v-if="comment.user.photo" :src="comment.user.photo" mode="widthFix"></image>
						<image v-else src="http://static.lamamuying.com/static/images/face.png" mode="widthFix"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text v-if="comment.user.nickname" class="name">{{comment.user.nickname}}</text>
							<text v-else class="name">{{comment.user.phone}}</text>
						</view>
						<view class="uni-comment-date">
							<text class="date">{{comment.addtime}}</text>
						</view>
						<view class="uni-comment-content">{{comment.content}}</view>
					</view>
				</view>
			</view>
			<view v-if="isdefault" class="uni-flex" style="justify-content: center;color: #FF677F;padding:40upx 0upx;"><text>还没有评论，添加评论</text></view>
			<!--加载更多 -->
			<uni-load-more v-if="!isdefault" color="#333" style="margin-top: 100upx;" :loadingType="loadingType"></uni-load-more>
		</view>
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	var userLoginInfo;
	export default {
		props: {
			articleId: Number
		},
		components: {
			uniLoadMore
		},
		data() {
			return {
				focus: false,
				commentList: [],
				loadingType: 1,
				limit: 10,
				content: '',
				isdefault: false
			}
		},
		onLoad() {},
		onShow() {
			this.getComment();
		},
		//页面上拉触底事件的处理函数
		onReachBottom() {
			this.limit += 4;;
			this.getComment();
		},
		methods: {
			// 获取评论列表
			getComment: function() {
				uni.request({
					url: this.apiUrl + 'article/getArticleComment',
					method: 'GET',
					data: {
						article_id: this.articleId,
						limit: this.limit,
					},
					success: res => {
						if (res.data.code == 0) {
							if (Array.isArray(res.data.data) && res.data.data.length === 0) {
								this.isdefault = true;
								this.loadingType = 2;
								return;
							}
							this.commentList = res.data.data;
							if (res.data.data.length != this.limit) {
								this.isdefault = false;
								this.loadingType = 2;
								return;
							}
						}
					}
				});
			},
			//添加评论
			submit: function(data) {
				console.log(data.content);
				if (data.content == '') {
					uni.showToast({
						title: "请输入评论内容",
						icon: "none"
					});
					return false;
				}
				uni.request({
					url: this.apiUrl + 'article/addArticleComment',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						uid: data.userLoginInfo.id,
						article_id: this.articleId,
						content: data.content,
					},
					success: res => {
						if (res.data.code == 0) {
							// 输入框清空
							data.content = '';
							// 再次调用
							this.getComment();
						}
						uni.showToast({
							title: "评论成功",
							icon: "none",
							success: () => {
								this.isdefault = false;
							}
						});
						// console.log(res);
					}
				});

			},
		}
	}
</script>

<style>
	/* uni-view{font-size: 12px;} */
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

	.sub {
		position: absolute;
		right: 20upx;
		background: #FF4965;
		font-size: 32upx;
		color: #fff;
	}

	.uni-comment-list {
		border-bottom: 2upx solid #EBEBEB;
	}

	.uni-comment-face {
		width: 18%;
		height: 122upx;
	}

	/* 覆盖修改样式 */
	.uni-padding-wrap {
		background: #fff;
	}

	.uni-comment-list:last-child {
		border-bottom: none;
	}
</style>
