<template>
    <view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-media-list">
					<image class="uni-media-list-logo" :src="data.image"></image>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{data.title}}</view>
						<view class="uni-media-list-text-bottom">
							<view class="text">{{data.cat_name}}</view>
							<view class="text">{{data.addtime}}</view>
							<view class="text">{{data.comment_num}}次评论</view>
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
        props: {
            data: {
                type: Object,
                default: function(e) {
                    return {}
                }
            }
        },
        methods: {
            bindClick() {
                this.$emit('click');
            }
        }
    }
</script>

<style>
	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
    position: absolute;
    right: 0;
    top: 6px;
	}

	.uni-media-list-body {
		
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-top {
		width:70%;
		height: 74upx;
		font-size: 28upx;
		white-space: nowrap;
		
		overflow: hidden;
		text-overflow: ellipsis !important;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding-right: 20upx;
	}
	.text{margin-right: 20upx;}
	.uni-list::before{height: 0;}
</style>
