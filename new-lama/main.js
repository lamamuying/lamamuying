import Vue from 'vue'
import App from './App'

const currentVersion = {
    id: 1006
}

// 未找到
// import store from './store/store.js'
// import '@/static/css/reset.scss'
// import '@/static/iconfont/iconfont.css' //使用字体图标
// import '@/static/js/constant.js'

Vue.config.productionTip = false
Vue.prototype.$current = currentVersion
App.mpType = 'app'
//全局封装APIhttps://api.lamamuying.com/
Vue.prototype.apiUrl = 'https://api.lamamuying.com/'
//用户登录信息
Vue.prototype.userLoginInfo = function(backpage, backtype){
// 	console.log(backtype);
// 	console.log(userLoginInfo);
	var userLoginInfo  = uni.getStorageSync('userLoginInfo');
	if(!userLoginInfo){
		// console.log(backpage);
		backpage = encodeURIComponent(backpage);
		// console.log(backpage);
		uni.redirectTo({
			url:"../login/login?backtype="+backtype+"&backpage="+backpage
		});
		return false;
	}
	return userLoginInfo;
}

const app = new Vue({
    ...App
})
app.$mount()
