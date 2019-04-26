<template>
	<view class="content">
		<!-- <view class="status" style="position:fixed"></view> -->
		<swiper class="swiper header" :autoplay="autoplay" :duration="duration" :style="'height:'+height+'px'">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image src="http://static.lamamuying.com/static/guide/guide-1.jpg" mode="widthFix"></image>
					</view>
					<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image src="http://static.lamamuying.com/static/guide/guide-2.jpg" mode="widthFix"></image>
					</view>
					<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
				</view>
				
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img">
						<image src="http://static.lamamuying.com/static/guide/guide-3.jpg" mode="widthFix"></image>
					</view>
					<view class="jump-over" @tap="launchFlag()">{{jumpover}}</view>
					<view class="experience" @tap="launchFlag()">{{experience}}</view>
				</view>
				
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				duration: 500,
				jumpover: '跳过',
				experience: '立即体验',
				height:''
			}
		},
		onShow() {
			this.height = uni.getSystemInfoSync().screenHeight;
		},
		methods: {
			launchFlag: function() {
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 */
				uni.setStorage({
					key: 'launchFlag',
					data: true,
				});
				uni.switchTab({
					url: '/pages/index/index'
				});

			}
		}
	}
</script>
<style>

	.header {
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
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
	.content {
		width: 100%;
		/* height: 100%; */
		background-size: 100% auto;
		padding: 0;
	}

	.swiper {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		display: flex;
		/* justify-content: center; */
		align-items: flex-end;
		flex-direction: column-reverse
	}

	.swiper-item-img {
		width: 100%;
		
		margin: auto auto;
	}

	.swiper-item-img image {
		width: 100%;
		height: 100vh;
	}
	.jump-over{
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #454343;
		border: 1px solid #454343;
		z-index: 999;
		right: 45upx;
		top: 5%;
	}
	.experience {
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		color: #454343;
		border: 1px solid #454343;
		right: 50%;
		margin-right: -105upx;
		bottom: 16%;
		z-index: 999;
	}
</style>
