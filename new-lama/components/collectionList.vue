<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(goods ,index) in goodsList" :key="index">
				<checkbox :checked="goods.isChecked" @click="goods.isChecked ? _checkFalse(goods) : _checkTrue(goods)" />
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="goods.image"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top" v-if='type==1'>{{goods.name}}</view>
						<view class="uni-media-list-text-top" v-if='type==0'>{{goods.title}}</view>
						<view class="uni-media-list-text-bottom">
							<text style="color:#FF4965;font-size:28upx;" v-if="type==1">{{goods.price}}</text>
							<text class="comment">{{goods.comment}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg_glx">
			<checkbox value="all" :checked="isCheckAll" @click="allCheck" /><text style="padding-left:20upx;">全选</text>
			<button class="delete" @click="getCheckData(type)">删除</button>
		</view>
	</view>
</template>
<script>
	var userLoginInfo;
	export default {
		name: "collectionList",
		props: {
			goodsList: Array,
			type: Number,
			uid: Number
		},
		data() {
			return {
				isCheckAll: false,
				checkedCount: 0,
			};
		},
		methods: {
			// 全选
			allCheck() {
				this.isCheckAll = !this.isCheckAll;
				this.isCheckAll ?
					this.goodsList.forEach((proItem) => {
						this._checkTrue(proItem)
					}) :
					this.goodsList.forEach((proItem) => {
						this._checkFalse(proItem)
					})
			},
			_checkTrue(item) {
				item.isChecked = true;
				++this.checkedCount == this.goodsList.length ? this.isCheckAll = true : this.isCheckAll = false
			},
			_checkFalse(item) {
				item.isChecked = false;
				--this.checkedCount;
				this.isCheckAll = false;
			},
			onLoad: function() {
				//userLoginInfo = this.userLoginInfo('../addAdress/adress', 1);
				//console.log(userLoginInfo);
			},
			// 删除商品或者文章
			getCheckData: function(type) {
				let ids = [];
				this.goodsList.forEach((proItem) => {
					if (proItem.isChecked) {
						ids.push(proItem.id)
					}
				})
				console.log(this.type);
				console.log(ids);
				console.log(this.uid);
				//执行删除操作
				uni.request({
					url: this.apiUrl + 'user/delCollect',
					method: 'GET',
					data: {
						uid: this.uid,
						ids: ids,
						type: this.type
					},
					success: (res) => {
						console.log(res.data);
						if (res.data.code == 0) {
// 							uni.showToast({
// 								title: '删除成功！',
// 								icon: 'none',
// 								success: () => {
// 									// 清空商品信息
// 									this.goodsList = [];
// 									// this.$emit('onClickItem'，this.page = 1);	
// 								}
// 							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	uni-checkbox {
		padding-left: 30upx;
	}

	.bg_glx {
		width: 100%;
		position: fixed;
		z-index: 9999;
		left: 0;
		bottom: 0;
		padding: 4% 16upx;
		background: #fff;
		border-top: 2upx solid #eee;
	}

	.bg_glx .delete {
		position: absolute;
		right: 40upx;
		top: 15%;
		font-size: 32upx;
		background: #FF4965;
		color: #fff;
		border-radius: 10upx;
	}

	.uni-list-cell {
		margin-right: 20upx;
	}

	.uni-media-list {
		width: 95%;
	}

	.uni-list::before {
		height: 0;
	}

	.uni-media-list-logo {
		width: 200upx;
		height: 200upx;
	}

	.uni-media-list-text-top {
		height: 74upx;
		font-size: 32upx;
		overflow: hidden;
	}

	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	/* 添加修改样式 */
	.comment {
		padding: 0 20upx;
	}
</style>
