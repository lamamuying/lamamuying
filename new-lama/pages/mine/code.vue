<template>
	<view class="content">
		<view class="banner">
			<view class="user uni-flex uni-row">
				<image v-if="personMessage.photo" :src="personMessage.photo" class="banner-img"></image>
				<image v-else src="http://static.lamamuying.com/static/images/face.png" class="banner-img"></image>
				<view class="uni-flex uni-column name">
					<text v-if="personMessage.nickname" style="font-size: 32upx;">{{personMessage.nickname}}</text>
					<text v-else style="font-size: 32upx;">暂无用户名</text>
					<text class="plus">辣妈Plus</text>
				</view>
			</view>
			<view class="img">
				<image :src="personMessage.qrcode" mode="widthFix" @longpress="save"></image>
			</view>
			<view class="code">
				<text>扫一扫上面的二维码图案，成为普通会员</text>
			</view>
		</view>
		

	</view>
</template>

<script>
	var userLoginInfo;
	export default {
		data() {
			return {
				type: 0,
				personMessage:[],
				personInfo:[]
			}
		},
		onLoad() {
			userLoginInfo = this.userLoginInfo('../mine/mine', 2);
			// this.version = plus.runtime.version;
			this.personInfo = userLoginInfo;
			this.getPersonal();
		},
		methods: {
			// http://pds.jyt123.com/wxtest/logo.png
			// 保存图片到相册
			// 登录获取用户信息
			getPersonal() {
				uni.request({
					url: this.apiUrl + 'user/getUser',
					method: 'GET',
					data: {
						uid: userLoginInfo.id
					},
					success: res => {
						if (res.data.code === 0) {
							this.personMessage = res.data.data;
							console.log(this.personMessage);
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			save() {
				let path = this.personMessage.qrcode;
				uni.showActionSheet({
					itemList: ['保存图片到相册'],
					success: () => {
						plus.gallery.save(path, function() {
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							})
						}, function() {
							uni.showToast({
								title: '保存失败，请重试！',
								icon: 'none'
							})
						});
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.content {
		height: 100vh;
		.banner {
			width: 80%;
			margin:0 8%;
			margin-top:15%; 
			padding:10upx 20upx;
			background-color:#fff;
			.user{
				padding:20upx 0;
				image{
					width:120upx;
					height:120upx;
					border-radius: 10upx;
				}
				.name{
					margin-left:5%;
					.plus{
						width: 120upx;
						height:50upx;
						line-height: 50upx;
						background:#ff4965;
						color:#fff;
						margin-top:10upx;
						font-size: 24upx;
						text-align: center;
						border-radius: 10upx;
					}
				}
			}
			.img {
				width: 500upx;
				margin: 20upx auto;
			}
			.img image {
				width: 100%;
				height: 100%;
			}
			.code{
				width: 100%;
				text-align: center;
			}
		}
	}

	

	

</style>
