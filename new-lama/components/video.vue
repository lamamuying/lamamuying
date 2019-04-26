<template>
		<view class="uni-timeline" style="background-color: #fff;">
			<view class="uni-timeline-item "  v-for="(time,index) in timeList" :key="index">
				<view class="uni-timeline-item-divider"></view>
				<view class="uni-timeline-item-content">
					<view>{{time.title}}</view>
					<view class="datetime">{{time.date}}</view>	
					<template v-if="!src">
						<view class="uni-hello-addfile" @tap="chooseVideo">添加视频</view>
					</template>
					<template v-else>
						<video :src="src" class="video"></video>
					</template>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				src:"",
				timeList:[
					{title:"uni-app 支持使用 npm 安装依赖，支持微信小程序自定义组件",date:"2018.10"}
				]
			};
		},
		methods:{
			// 视频
			sourceTypeChange: function (e) {
				this.sourceTypeIndex = e.target.value
			},
			chooseVideo: function () {
				uni.chooseVideo({
					// sourceType: sourceType[this.sourceTypeIndex],
					success: (res) => {
						this.src = res.tempFilePath
					}
				})
			}
		}
	}
</script>

<style>
	.uni-list{background:none;}
.uni-list:after{height: 0;}
.uni-list::before{height:0;}
	.uni-uploader__input-box{width:140upx;height: 140upx;}
.uni-timeline{margin:20upx 0;padding:0 80upx;}
.uni-timeline-item .uni-timeline-item-divider{background:#ff4965;left:2upx;}
.uni-timeline-item{border-bottom: 40upx;}
.datetime{font-size:24upx;}
/* 修改添加样式 */
.uni-hello-addfile {
	padding: 0upx !important;
	border:2upx solid #ececec;
}
</style>
