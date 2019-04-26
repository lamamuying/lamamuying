<template>
	<view class="uni-drawer" @tap="close" :catchtouchmove="catchtouchmove" :class="{'uni-drawer-visible':visible,'uni-drawer-right':rightMode}">
		<view v-if="showMask" class="uni-drawer-mask"></view>
		<view class="uni-drawer-content">
			<slot></slot>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'my-drawer',
		props: {
			/**
			 * 显示状态
			 */
			visible: {
				type: Boolean,
				default: false
			},
			/**
			 * 显示模式（左、右），只在初始化生效
			 */
			mode: String,
			/**
			 * 蒙层显示状态
			 */
			mask: {
				type: [Boolean, String],
				default: true
			}
		},
		data() {
			return {
				rightMode: false,
				catchtouchmove: false
			}
		},
		computed: {
			showMask() {
				return String(this.mask) === 'true'
			}
		},
		created() {
			this.rightMode = this.mode === 'down'
			//#ifdef MP-WEIXIN
			this.catchtouchmove = true
			//#endif
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style>
	.uni-drawer {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		visibility: hidden;
		z-index: 998;
		height:100%;
	}

	.uni-drawer>.uni-drawer-mask {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
	}

	.uni-drawer>.uni-drawer-content {
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: all 0.3s ease-out;
		transform: translatey(100%);
	}

	.uni-drawer.uni-drawer-down>.uni-drawer-content {
		top: auto;
		bottom: 0;
		transform: translatey(-100%);
	}

	.uni-drawer.uni-drawer-visible {
		visibility: visible;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-mask {
		display: block;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-content {
		transform: translatey(0);
	}
</style>