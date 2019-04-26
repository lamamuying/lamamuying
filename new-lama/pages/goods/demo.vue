







<template>
	<view>
		<view class="uni-common-mt">
			<form>
				<view class="uni-list list-pd">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-body">
								<view class="uni-uploader__files">
									<block v-for="(image,index) in imageList" :key="index">
										<view class="uni-uploader__file">
											<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
										</view>
									</block>
								</view>
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [
					
					 "../../static/images/315938.jpg",
					 "../../static/images/323539.jpg",
					 "../../static/images/323847.jpg"
				],


			}
		},
		methods: {
			previewImage: function(e) {
				var current = e.target.dataset.src;
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
				console.log(current);
				console.log(this.imageList);
			}
		}
	}
</script>

<style>
	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}
</style>
