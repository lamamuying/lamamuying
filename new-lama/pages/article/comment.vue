<template>
	<view>
		<view class="uni-textarea comment">
			<textarea auto-height placeholder="评论" v-model="content" />
			<button class="sub" @click="submit">提交</button>
		</view>
		<comment :articleId='articleId' ref="child"></comment>
	</view>
</template>
<script>
	import comment from '@/components/article_comment/comment.vue';
	var userLoginInfo;
	export default {
		components:{
			comment
		},
		data() {
			return {
				focus: false,
				commentList:[],
				loadingType: 1,
				limit:10,
				content:'',
				articleId:'',
				isdefault:true
			}
		},
		onLoad(params) {
			this.articleId = params.articleId;
		},
		onShow() {
			
		},
		methods: {
			submit(){
				userLoginInfo = this.userLoginInfo('../article/comment?articleId=' + this.articleId, 1);
				// console.log(userLoginInfo);
				var data = {
					userLoginInfo:userLoginInfo,
					content:this.content
				}
				 this.$refs.child.submit(data); 
				 this.content = '';
			}
		}
	}
</script>

<style>
/* uni-view{font-size: 12px;} */
.uni-comment-top .name{font-size:32upx;color: #333;}
.uni-comment-date .date{font-size: 24upx;color: #cac8c9;}
.uni-comment-content{font-size:28upx;}
.comment{width:70%;border:2upx solid #d5dde6;margin:20upx;display: flex;justify-content: space-around;align-items: center;}
.sub{position:absolute;right:20upx;background:#FF4965;font-size:32upx;color:#fff;}

.uni-comment-list{border-bottom:2upx solid #EBEBEB;}
.uni-comment-face{width:18%;height:122upx;}

/* 覆盖修改样式 */
.uni-padding-wrap{background:#fff;}
.uni-comment-list:last-child{border-bottom: none;}
</style>
