(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/article/article"],{"002f":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(a("a34a")),r=s(a("24c2")),i=s(a("343a"));function s(t){return t&&t.__esModule?t:{default:t}}function c(t,e,a,n,r,i,s){try{var c=t[i](s),o=c.value}catch(u){return void a(u)}c.done?e(o):Promise.resolve(o).then(n,r)}function o(t){return function(){var e=this,a=arguments;return new Promise(function(n,r){var i=t.apply(e,a);function s(t){c(i,n,r,s,o,"next",t)}function o(t){c(i,n,r,s,o,"throw",t)}s(void 0)})}}var u={components:{mediaList:r.default,uniLoadMore:i.default},data:function(){return{loadingText:{contentdown:"上拉加载更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"},scrollLeft:0,newsList:[],tabIndex:0,tabBars:[]}},onLoad:function(){this.getTabBars()},methods:{getTabBars:function(){var e=this;t.request({url:this.apiUrl+"article/getCategory",method:"GET",data:{pid:1},success:function(t){0==t.data.code&&(e.tabBars=t.data.data,e.tabBars.forEach(function(t){e.newsList.push({data:[],requestParams:{cid:t.cid,page:1},loadingText:"加载中...",loadingType:1})}),e.getList())}})},getList:function(){var e=this.newsList[this.tabIndex];t.request({url:this.apiUrl+"article/getArticleList",data:e.requestParams,success:function(t){if(0==t.data.code){0==t.data.data.length&&(e.loadingType=2);var a=t.data.data.map(function(t){return{id:t.id,title:t.title,image:t.image,addtime:t.addtime,is_show:t.is_show,comment_num:t.comment_num}});1===e.requestParams.page?e.data=a:a.forEach(function(t){e.data.push(t)}),++e.requestParams.page}}})},changeTab:function(){var e=o(n.default.mark(function e(a){var r,i,s,c,o,u,l,d,f,h;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(r=a.detail.current,this.tabIndex!==r){e.next=3;break}return e.abrupt("return");case 3:return this.tabIndex=r,e.next=6,this.getElSize("tab-bar");case 6:i=e.sent,s=i.scrollLeft,c=0,o=0;case 10:if(!(o<r)){e.next=18;break}return e.next=13,this.getElSize(this.tabBars[o].ref);case 13:u=e.sent,c+=u.width;case 15:o++,e.next=10;break;case 18:return l=t.getSystemInfoSync().windowWidth,e.next=21,this.getElSize(this.tabBars[r].ref);case 21:d=e.sent,f=d.width,c+f-s>l&&(this.scrollLeft=c+f-l),c<s&&(this.scrollLeft=c),h=this.newsList[this.tabIndex],0===h.data.length&&this.getList();case 27:case"end":return e.stop()}},e,this)}));function a(t){return e.apply(this,arguments)}return a}(),tapTab:function(){var t=o(n.default.mark(function t(e){var a,r,i;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.tabIndex!==e){t.next=4;break}return t.abrupt("return",!1);case 4:return t.next=6,this.getElSize("tab-bar");case 6:a=t.sent,r=a.scrollLeft,this.scrollLeft=r,this.tabIndex=e,i=this.newsList[this.tabIndex],0===i.data.length&&this.getList();case 12:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),loadMore:function(){this.getList()},getElSize:function(e){return new Promise(function(a,n){t.createSelectorQuery().select("#"+e).fields({size:!0,scrollOffset:!0},function(t){a(t)}).exec()})}}};e.default=u}).call(this,a("6e42")["default"])},"0926":function(t,e,a){"use strict";var n=a("fdc8"),r=a.n(n);r.a},3149:function(t,e,a){"use strict";a("1db4");var n=i(a("b0ce")),r=i(a("38dd"));function i(t){return t&&t.__esModule?t:{default:t}}Page((0,n.default)(r.default))},"38dd":function(t,e,a){"use strict";a.r(e);var n=a("b5f0"),r=a("c8b0");for(var i in r)"default"!==i&&function(t){a.d(e,t,function(){return r[t]})}(i);a("0926");var s=a("2877"),c=Object(s["a"])(r["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},b5f0:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("view",{staticClass:"uni-tab-bar"},[a("scroll-view",{staticClass:"uni-swiper-tab",attrs:{id:"tab-bar","scroll-x":"","scroll-left":t.scrollLeft}},t._l(t.tabBars,function(e,n){return a("view",{key:e.ref,class:["swiper-tab-list",t.tabIndex==n?"active":""],attrs:{id:e.ref,"data-current":n,eventid:"5925a823-0-"+n},on:{click:function(e){t.tapTab(n)}}},[t._v(t._s(e.cat_name))])})),a("swiper",{staticClass:"swiper-box",attrs:{current:t.tabIndex,duration:"300",eventid:"5925a823-2"},on:{change:t.changeTab}},t._l(t.newsList,function(e,n){return a("swiper-item",{key:n,attrs:{mpcomid:"5925a823-2-"+n}},[a("scroll-view",{staticClass:"list",attrs:{"scroll-y":"",eventid:"5925a823-1-"+n},on:{scrolltolower:function(e){t.loadMore(n)}}},[t._l(e.data,function(t,e){return a("block",{key:e,staticClass:"inf_news table-view"},[a("navigator",{attrs:{url:"./article_detail?id="+t.id,"hover-class":"navigator-hover"}},[a("media-list",{staticClass:"inf_news mui-table-view",attrs:{data:t,mpcomid:"5925a823-0-"+n+"-"+e}})],1)],1)}),a("view",{staticClass:"uni-tab-bar-loading"},[a("uni-load-more",{attrs:{loadingType:e.loadingType,mpcomid:"5925a823-1-"+n}})],1)],2)],1)}))],1)},r=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return r})},c8b0:function(t,e,a){"use strict";a.r(e);var n=a("002f"),r=a.n(n);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);e["default"]=r.a},fdc8:function(t,e,a){}},[["3149","common/runtime","common/vendor"]]]);