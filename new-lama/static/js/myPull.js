/**
 * @name 封装下拉
 * @params getList 刷新数据的函数
 * @params listData 存放数据的变量名
 * @params page 页数变量名
 */
export default({getList="getList",listData="listData",page="page"})=> {
	return {
		data(){
			return {
				[listData]:[],
				[page]:1
			}
		},
		onPullDownRefresh() {
			this.refresh();
		},
		onReachBottom() {
			this[getList].call(this, this[page], this.__pulldone);
		},
		methods:{
			refresh(){
				this[page]=1;
				this[getList].call(this, this[page], this.__pulldone);
			},
			__pulldone(data){
				var db = data || [];
				if (this[page] == 1) {
				  this[listData] = db;
				} else {
				  this[listData] = (this[listData] || []).concat(db);
				}
				uni.stopPullDownRefresh();
				this[page]++;
			}
		}
	}
}