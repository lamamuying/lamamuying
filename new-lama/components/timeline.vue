<template name="timeline">
		<view class="uni-timeline">
			<view class="uni-timeline-item "  v-for="(time,timeIndex) in timeList" :key="timeIndex">
				<view class="uni-timeline-item-divider"></view>
				<view class="uni-timeline-item-content">
					<view>{{time.title}}</view>
					<view class="datetime">{{time.date}}</view>	
					<view class="uni-list list-pd">
						<view class="uni-list-cell cell-pd">
							<view class="uni-uploader">
								<view class="uni-uploader-body">
									<view class="uni-uploader__files">
										<block v-for="(image,imageIndex) in imageList" :key="imageIndex">
											<view class="uni-uploader__file">
												<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
											</view>
										</block>
										<view class="uni-uploader__input-box">
											<view class="uni-uploader__input" @tap="chooseImage"></view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		
		</view>
</template>

<script>
	export default {
		name: 'timeline',
		data() {
			return {
				imageList:[],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],	
				timeList:[
					{title:"uni-app 支持使用 npm 安装依赖，支持微信小程序自定义组件",date:"2018.10"}
				]
			};
		},
		methods:{
			// 图片
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			chooseImage: async function() {
					if (this.imageList.length === 9) {
						let isContinue = await this.isFullImg();
						console.log("是否继续?", isContinue);
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						// sourceType: sourceType[this.sourceTypeIndex],
						// sizeType: sizeType[this.sizeTypeIndex],
						count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths);
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
.uni-timeline{padding:20upx 80upx;background:#fff; margin:10upx 0;}
.uni-timeline-item .uni-timeline-item-divider{background:#ff4965;left:2upx;}
.uni-timeline-item{border-bottom: 40upx;}
.datetime{font-size:24upx;}
</style>
