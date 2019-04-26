<template>
	<view class="segmented-control" :class="styleType" :style="wrapStyle">
		<view v-for="(item, index) in values" class="segmented-control-item" :class="styleType" :data-index="index"
		 :type="item.type" :key="index" :style="index === currentIndex ? activeStyle : itemStyle" @click="onClick(index,item.type)">
			{{item.name}}
		</view>
	</view>
</template>


<script>
	export default {
		name: 'segmented-control',
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return [];
				}
			},
			activeColor: {
				type: String,
				default: '#dd524d',
			},
			styleType: {
				type: String,
				default: 'text'
			}
		},
		data() {
			return {
				currentIndex: this.current
			}
		},
		watch: {
			current(val) {
				if (val !== this.currentIndex) {
					this.currentIndex = val;
				}
			}
		},
		computed: {
			wrapStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `border:0;`;
						break;
					default:
						styleString = `border-color: ${this.activeColor}`;
						break;
				}
				return styleString;
			},
			itemStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `color:#000;border-left:0;`;
						break;
					default:
						styleString = `color:${this.activeColor};border-color:${this.activeColor};`;
						break;
				}
				return styleString;
			},
			activeStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `color:${this.activeColor};border-left:0;border-bottom-style:solid;`;
						break;
					default:
						styleString = `color:#fff;border-color:${this.activeColor};background-color:${this.activeColor}`;
						break;
				}
				return styleString;
			}
		},
		methods: {
			onClick: function(index, type) {				
				if (this.currentIndex !== index) {
					this.currentIndex = index;
					this.$emit('clickItem', {
						index,
						type
					})
				}
			}
		},
	}
</script>

<style>
	.segmented-control {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 60%;
		border-radius: 10upx;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
	}

	.segmented-control.button {
		border: 2upx solid;
	}

	.segmented-control-item.text {
		font-size: 32upx;
	}

	.segmented-control.text {
		border: 0;
		border-radius: 0upx;
	}

	.segmented-control-item {
		flex: 1;
		text-align: center;
		/* line-height: 60upx; */
		box-sizing: border-box;
		height: 90upx;
	}

	.segmented-control-item.button {
		border-left: 1upx solid;
	}

	.segmented-control-item.text {
		line-height: 2.4;
		border-left: 0;
	}

	.segmented-control-item:first-child {
		border-left-width: 0;
	}
</style>
