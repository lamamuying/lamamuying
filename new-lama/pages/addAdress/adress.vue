<template>
	<view>
		<form  @submit="submit">
			<view class="uni-flex uni-row add">
				<text type="default" style="width: 25%;">收货人</text>
				<input class="uni-input entry facus" v-model="name" name="nickname" placeholder="请填写收货人姓名" />
			</view>
			<!-- #ifndef MP-ALIPAY -->
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						所在地区
					</view>
					<input disabled @click="showMulLinkageThreePicker" class="uni-input" :style="{color:cityColor}" :value="pickerText" v-model="pickerText">
					<!-- {{pickerText}} -->
					</input>
				</view>
			</view>
			<!-- #endif -->
			<view class="uni-flex uni-row add">
				<text type="default" style="width: 25%;">详细地址</text>
				<input class="uni-input entry" placeholder="街道、楼牌号等" v-model="address" />
			</view>
			<view class="uni-flex uni-row add">
				<text type="default" style="width: 25%;">手机号码</text>
				<input class="uni-input entry" placeholder="请填写收货人手机号" v-model="mobile" name="mobile" />
			</view>
			<!-- <view class="uni-flex uni-list uni-row" style="margin-top: 30upx;">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db red">保存</view>
				<switch checked />
			</view>
		</view> -->
			<view class="uni-btn-v" style="margin: 40upx auto;width:85%;">
				<button formType="submit" style="background:#ff4965;color: #fff;">保存</button>
			</view>
		</form>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>
<script>
	import mpvuePicker from '../../components/mpvue-picker/mpvuePicker.vue';
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '../../common/city.data.js';
	var  graceChecker = require("../../common/graceChecker.js");
	var userLoginInfo, id, adInformation;
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		data() {
			return {
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '省市区县、乡镇等',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: [],
				cityColor: '#666',
				name: '',
				mobile: '',
				address: '',
				province: '',
				city: '',
				area: '',
				is_default: 0,
				reviseId: 0
			};
		},
		onShow() {

			// console.log(userLoginInfo.id);
		},
		onLoad: function(params) {
			userLoginInfo = this.userLoginInfo('../addAdress/adress', 1);
			if (params.editId) {
				this.reviseId = params.editId;
				// console.log(params.editId);
				this.revise();
			}

		},
		methods: {
			onConfirm(e) {
				this.pickerText = e.label;
				this.cityColor = "#000";
				// 分割字符串
				this.province = e.label.split('-')[0];
				this.city = e.label.split('-')[1];
				this.area = e.label.split('-')[2];
			},
			onCancel(e) {
				// console.log(e)
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				uni.hideKeyboard();
				this.$refs.mpvueCityPicker.show();
			},
			// 修改用户地址
			revise() {
				uni.request({
					url: this.apiUrl + 'user/getAddressVIew',
					method: 'GET',
					data: {
						id: this.reviseId,
						uid: userLoginInfo.id
					},
					success: (res) => {
						if (res.data.code == 0) {
							console.log(res.data.data);
							adInformation = res.data.data;
							this.name = adInformation.name;
							this.pickerText = adInformation.province + '-' + adInformation.city + '-' + adInformation.area,
							this.address = adInformation.address,
							this.mobile = adInformation.mobile,
							this.cityColor = "#000";
							// 重新更新地址信息
							this.province = this.pickerText.split('-')[0];
							this.city = this.pickerText.split('-')[1];
							this.area = this.pickerText.split('-')[2];
						}
					},
					fail: () => {
						console.log('fail');
					}
				})
			},
			// 点击保存，保存收货地址
			submit(e) {
				// 输入规则
				var rule = [
					{name:"nickname", checkType : "string", checkRule:"1,6",  errorMsg:"姓名应为1-3个字符"},
					{name:"mobile", checkType : "phoneno", checkRule:"11",  errorMsg:"请输入正确手机号格式"},
				];
				//进行表单检
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					// uni.showToast({title:"验证通过!", icon:"none"});
						uni.request({
						url: this.apiUrl + 'user/saveAddress',
						method: 'POST',
						header: {
							'content-type': "application/x-www-form-urlencoded"
						},
						data: {
							uid: userLoginInfo.id,
							name: this.name,
							mobile: this.mobile,
							province: this.province,
							city: this.city,
							area: this.area,
							address: this.address,
							is_default: this.is_default,
							id: this.reviseId
						},
						success: (res) => {
							if (res.data.code == 0) {
								// console.log(res.data.data);
								uni.showToast({
									title: "添加成功",
									icon: 'none', //图标，支持"success"、"loading" 
									mask:true,
									success: (res) => {
										setTimeout(function () {
											uni.navigateBack({
												delta:1
											});
										}, 500);
									},
								})
							}
						},
						fail: () => {
							console.log('fail');
						}
					})
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			}
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel()
			}
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		}
	};
</script>

<style lang="less">
	.add {
		background-color: #fff;
		padding: 30upx;

		div {
			width: 100%;
		}

		input {
			padding: 0;
			// text-align: right;
		}
	}

	// 覆盖样式
	.uni-list::before {
		background-color: #fff;
	}

	.uni-list:after {
		height: 0;
	}

	.uni-input {
		line-height: 60upx;
	}
</style>
