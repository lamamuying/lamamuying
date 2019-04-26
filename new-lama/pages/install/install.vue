<template>
	<view>
		<view class="uni-flex uni-column" style="padding: 0upx 20upx;background:#fff;">
			<view class="flex-item  uni-row insBorder">
				<navigator url="./feedback" hover-class="none">
					<text type="default">意见反馈</text>
					<image src="http://static.lamamuying.com/static/images/jiantou.png" mode=""></image>
				</navigator>
			</view>
			<view class="flex-item  uni-row insBorder">
				<navigator url="./about_mom" hover-class="none">
					<text type="default">关于辣妈母婴</text>
					<image src="http://static.lamamuying.com/static/images/jiantou.png" mode=""></image>
				</navigator>
			</view>
			<view class="flex-item  uni-row insBorder">
				<navigator url="../password_change/password_change" hover-class="none">
					<text type="default">修改密码</text>
					<image src="http://static.lamamuying.com/static/images/jiantou.png" mode=""></image>
				</navigator>
			</view>
		</view>
		<button class="btn" type="warn" @click="exit">退出登录</button>
	</view>
</template>

<script>
	export default {
		methods: {
			exit: function() {
				uni.reLaunch({
					url: "../login/login"
				});
			}
		}
	}
</script>

<style lang="less">
	.insBorder {
		border-bottom: 2upx solid #ececec;
		line-height: 100upx;

		image {
			position: absolute;
			right: 30upx;
			width: 20upx;
			height: 24upx;
			margin-top: 42upx;
		}
	}
// 	.uni-column {
// 		margin-top: 35upx;
// 
// 	}
	uni-view {
		font-size: 32upx;
	}

	.btn {
		width: 70%;
		margin-top: 400upx;
		border-radius: 40upx;
	}
</style>
