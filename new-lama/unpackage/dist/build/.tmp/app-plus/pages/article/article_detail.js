(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/article/article_detail"],{"4a50":function(t,e,i){},"4b7c":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"root"},[i("view",{staticStyle:{"font-size":"40rpx",padding:"20rpx"}},[t._v(t._s(t.articleView.title))]),i("view",{staticClass:"uni-flex uni-row",staticStyle:{display:"flex","justify-content":"space-between","align-items":"center"}},[i("view",{staticClass:"text",staticStyle:{"font-size":"24rpx"}},[t._v(t._s(t.articleView.addtime))]),i("view",{staticClass:"text",staticStyle:{"font-size":"28rpx",color:"#333"},attrs:{eventid:"4e508fed-0"},on:{click:function(e){t.share()}}},[t._v("转发")])]),i("view",{staticClass:"contain",staticStyle:{padding:"20rpx"}},[i("rich-text",{attrs:{nodes:t.articleView.content,mpcomid:"4e508fed-0"}})],1),i("comment",{attrs:{articleId:t.articleId,mpcomid:"4e508fed-1"}}),i("view",{staticClass:"place"}),i("view",{staticClass:"uni-flex uni-row article_foot"},[i("view",{staticClass:"btn",attrs:{url:""}},[0===t.icon1?i("span",{staticClass:"iconfont article_icon1",staticStyle:{"font-size":"50rpx"}},[t._v("")]):t._e(),i("span",{directives:[{name:"show",rawName:"v-show",value:1===t.icon1,expression:"icon1===1"}],staticClass:"iconfont article_icon1",staticStyle:{"font-size":"50rpx",color:"red"},attrs:{eventid:"4e508fed-1"},on:{click:t.heart}},[t._v("")]),i("button",{attrs:{type:"default",eventid:"4e508fed-2"},on:{click:function(e){t.heart()}}},[t._v("收藏")])],1),i("view",{staticClass:"btn",attrs:{eventid:"4e508fed-3"},on:{click:function(e){t.comment()}}},[i("span",{staticClass:"iconfont article_icon",staticStyle:{"font-size":"50rpx"}},[t._v("")]),i("button",{attrs:{type:"default"}},[t._v("评论")])],1)])],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},"5b47":function(t,e,i){"use strict";i.r(e);var n=i("8976"),a=i.n(n);for(var c in n)"default"!==c&&function(t){i.d(e,t,function(){return n[t]})}(c);e["default"]=a.a},8976:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("9cd0"));function a(t){return t&&t.__esModule?t:{default:t}}var c={components:{comment:n.default},data:function(){return{icon1:0,articleView:{},commentList:[],isfault:!1,articleId:""}},onLoad:function(t){this.articleId=t.id,this.getDetail()},methods:{share:function(){t.share({provider:"weixin",scene:"WXSceneSession",type:0,href:"http://uniapp.dcloud.io/",title:"辣妈母婴文章分享",summary:"我正在使用辣妈母婴APP，赶紧跟我一起来体验！",imageUrl:"../../static/images/logo.jpg",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})},getDetail:function(){var e=this;t.showLoading({title:"加载中..."}),t.request({url:this.apiUrl+"article/getArticle",method:"GET",data:{id:this.articleId},success:function(t){if(0==t.data.code){var i=t.data.data.content;t.data.data.content=i.replace(/\<img/gi,'<img style="width:100%;height:auto" '),e.articleView=t.data.data}},fail:function(){},complete:function(){t.hideLoading()}})},heart:function(){this.icon1=0===this.icon1?1:0,1===this.icon1?t.showToast({title:"收藏成功",icon:"none"}):t.showToast({title:"取消收藏",icon:"none"})},comment:function(){t.navigateTo({url:"/pages/article/comment?articleId="+this.articleId})}}};e.default=c}).call(this,i("6e42")["default"])},d71a:function(t,e,i){"use strict";i("1db4");var n=c(i("b0ce")),a=c(i("dbe7"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(a.default))},dbe7:function(t,e,i){"use strict";i.r(e);var n=i("4b7c"),a=i("5b47");for(var c in a)"default"!==c&&function(t){i.d(e,t,function(){return a[t]})}(c);i("fd15");var s=i("2877"),o=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,null,null);e["default"]=o.exports},fd15:function(t,e,i){"use strict";var n=i("4a50"),a=i.n(n);a.a}},[["d71a","common/runtime","common/vendor"]]]);