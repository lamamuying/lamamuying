<template>
	<view>
		<view class="status" style="position:fixed"></view>
		<view class="header" style="position:fixed">
			<view class="scan" v-if="type == 'home' || type == 'health'">
				<span class="iconfont icon scan" style="font-size: 46upx; color: #fff;" @click="scanCode">&#xe623;</span>
			</view>
			<view class="scan arrow-left-mp" v-if="type == 'page'" @click="navigateBack">
				<span class="iconfont icon scan" style="font-size: 46upx; color: #fff;">&#xe604;</span>
			</view>
			<block v-if="type == 'page'">
				<view class="input">
					<span class="iconfont icon search" style="font-size: 56upx;">&#xe61a;</span>
					<input placeholder="请输入关键字查询" :value="keyword" v-model="keyword" />
				</view>
				<view class="icon-item" style="color: #FFFFFF; margin-left:20upx ;" @click="setKeyword">
					<span class="iconfont" style="font-size: 50upx;">&#xe62d;</span>
				</view>
			</block>
			<block v-else>	
				<navigator v-if="type =='health'" class="input" url="../article/article_list" hover-class="none">
					<span class="iconfont icon search" style="font-size: 56upx;">&#xe61a;</span>
					<input disabled placeholder="请输入关键字查询" />
				</navigator>
				<navigator v-if="type =='home'" class="input" url="../search/search" hover-class="none">
					<span class="iconfont icon search" style="font-size: 56upx;">&#xe61a;</span>
					<input disabled placeholder="请输入关键字查询" />
				</navigator>
				<navigator class="menu" v-if="type == 'home' || type == 'health'" url="../mine/personal_data" hover-class="none">
					<image v-if="personMessage.photo" :src="personMessage.photo"></image>
					<image v-else src="http://static.lamamuying.com/static/images/face.png"></image>
				</navigator>
			</block>
		</view>
		<view class="place"></view>
	</view>
</template>

<script>
	var userLoginInfo;
	export default {
		onLoad() {
			// plus.nativeUI.alert(JSON.stringify( this.keyword));
		},
		props: {
			type: String,
			keyword: String
		},
		data() {
			return {
				personMessage:[],
				isPhoto:false
			};
		},
		onShow() {
			userLoginInfo = uni.getStorageSync('userLoginInfo');
			this.getPersonal();
		},
		methods: {
			navigateBack() {
				uni.navigateBack();
			},
			setKeyword() {
				this.$emit('setKeyword', this.keyword);
			},
			scanCode() {
				this.$emit('scanCode');
			},
			// 用户信息
// 			goPersonal(){
// 				uni.redirectTo({
// 					url:'../../pages/mine/personal_data'
// 				})
// 			},
			// 获取用户信息
			getPersonal(){
				uni.request({
					url: this.apiUrl + 'user/getUser',
					method: 'GET',
					data: {
						uid:userLoginInfo.id
					},
					success: res => {
						if(res.data.code===0){
							this.personMessage = res.data.data;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	}
</script>

<style lang="less">
	.place {
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
		height: 100upx;
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

	.header {
		width: 100%;
		height: 100upx;
		background-color: #ff4965;
		display: flex;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		justify-content: flex-start;
		z-index: 996;

		.scan {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.input {
			width: calc(100% - 200upx);
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			input {
				width: calc(100% - 60upx);
				height: 60upx;
				background-color: #ffffff;
				border-radius: 60upx;
				padding-left: 60upx;
				font-size: 30upx;

			}

			.icon {
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


		}

		.menu {
			width: 100upx;
			height: 100upx;
			flex-shrink: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
				border-radius: 60upx;
			}
		}

		.arrow-left-mp {
			/* #ifdef MP-WEIXIN*/
			width: 0;
			overflow: hidden;
			margin-left: 80upx;
			/* #endif */
		}
	}
</style>
