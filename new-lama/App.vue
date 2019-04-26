<script>
	import { checkUpdater } from '@/common/checkUpdater'
	export default {
		onLaunch: function () {
			console.log('App Launch')
			const updated = uni.getStorageSync('updated') // 尝试读取storage
			
			if (updated.completed === true) { // 如果上次刚更新过
				// 删除安装包及安装记录
				console.log('安装记录被删除，更新成功')
				uni.removeSavedFile({ 
					filePath: updated.packgePath,
					success: (res) => {
						uni.removeStorageSync('updated')
					}
				})
			} else if (updated.completed === false) {
				uni.removeStorageSync('updated')
				plus.runtime.install(updated.packgePath, { force: true })
				uni.setStorage({
					key: 'updated',
					data: {
						completed: true,
						packgePath: updated.packgePath
					},
					success: (res) => {
						console.log('成功安装上次的更新，应用需要重启才能继续完成')
					}
				})     				
			} else {
				// 检查更新，参数：{ 当前版本号，跳转到更新页面的url }
				checkUpdater(this.$current.id, '../update/index') 
			}
		},
		onShow: function () {
			// 关闭启动页
// 			setTimeout(()=>{
// 				plus.navigator.closeSplashscreen();
// 			},0);
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	@import "common/uni.css";
	
	/**自定义公共样式**/
	@import "common/common.css";
	/**自定义字体样式**/
	@import "static/fonts/iconfont-ali/font.css";
	page {
		background-color: #F4F5F6;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}
	
	.uni-header-logo {
		padding: 30upx;
		text-align: center;
		margin-top: 10upx;
	}
	
	.uni-header-logo image {
		width: 140upx;
		height: 140upx;
	}
	
	.uni-hello-text {
		color: #7A7E83;
	}
	
	.uni-hello-addfile {
		text-align: center;
		line-height: 300upx;
		background: #FFF;
		padding: 50upx;
		margin-top: 10px;
		font-size: 38upx;
		color: #808080;
	}
</style>
