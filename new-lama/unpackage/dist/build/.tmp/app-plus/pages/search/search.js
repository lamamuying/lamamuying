(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search"],{"185d":function(e,t,o){"use strict";o.r(t);var a=o("1d4f"),s=o("3279");for(var i in s)"default"!==i&&function(e){o.d(t,e,function(){return s[e]})}(i);o("e33f");var n=o("2877"),r=Object(n["a"])(s["default"],a["a"],a["b"],!1,null,null,null);t["default"]=r.exports},"1d4f":function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("view",[o("view",{staticClass:"status",style:{position:e.headerPosition}}),o("view",{staticClass:"header"},[o("view",{staticClass:"icon-item scan arrow-left-mp",attrs:{eventid:"019c1696-0"},on:{click:e.navigateBack}},[o("span",{staticClass:"iconfont icon scan",staticStyle:{"font-size":"46rpx",color:"#fff"}},[e._v("")])]),o("view",{staticClass:"input"},[o("span",{staticClass:"iconfont icon search",staticStyle:{"font-size":"56rpx"}},[e._v("")]),o("input",{directives:[{name:"model",rawName:"v-model",value:e.keyword,expression:"keyword"}],attrs:{focus:"",placeholder:e.defaultKeyword,"placeholder-class":"placeholder-class",eventid:"019c1696-1"},domProps:{value:e.keyword},on:{input:function(t){t.target.composing||(e.keyword=t.target.value)}}})]),o("view",{staticClass:"icon-item",staticStyle:{color:"#FFFFFF","margin-left":"20rpx"},attrs:{"hover-class":"none",eventid:"019c1696-2"},on:{tap:function(t){e.doSearch(e.keyword)}}},[o("span",{staticClass:"iconfont",staticStyle:{"font-size":"50rpx"}},[e._v("")])])]),o("view",{staticClass:"place"}),o("view",{staticClass:"search-keyword"},[o("scroll-view",{staticClass:"keyword-box",attrs:{"scroll-y":""}},[e.oldKeywordList.length>0?o("view",{staticClass:"keyword-block"},[o("view",{staticClass:"keyword-list-header"},[o("view",[e._v("历史搜索")]),o("view",[o("image",{attrs:{src:"http://static.lamamuying.com/static/images/delete.png",eventid:"019c1696-3"},on:{tap:e.oldDelete}})])]),o("view",{staticClass:"keyword"},e._l(e.oldKeywordList,function(t,a){return o("view",{key:t,attrs:{eventid:"019c1696-4-"+a},on:{tap:function(o){e.doSearch(t)}}},[e._v(e._s(t))])}))]):e._e()])],1)])},s=[];o.d(t,"a",function(){return a}),o.d(t,"b",function(){return s})},"31ff":function(e,t,o){},3279:function(e,t,o){"use strict";o.r(t);var a=o("95c7"),s=o.n(a);for(var i in a)"default"!==i&&function(e){o.d(t,e,function(){return a[e]})}(i);t["default"]=s.a},"5a8b":function(e,t,o){"use strict";o("1db4");var a=i(o("b0ce")),s=i(o("185d"));function i(e){return e&&e.__esModule?e:{default:e}}Page((0,a.default)(s.default))},"95c7":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(o("56be")),s=r(o("80c7")),i=r(o("3e35")),n=r(o("a3f5"));function r(e){return e&&e.__esModule?e:{default:e}}var c={data:function(){return{headerPosition:"fixed",defaultKeyword:"",keyword:"",oldKeywordList:[],hotKeywordList:[],keywordList:[],forbid:"",isShowKeywordList:!0}},onLoad:function(){this.init()},components:{mSearch:a.default,twoGoods:s.default,headerSearch:n.default,uniIcon:i.default},methods:{navigateBack:function(){e.navigateBack()},init:function(){this.loadDefaultKeyword(),this.loadOldKeyword()},loadDefaultKeyword:function(){this.defaultKeyword="请输入关键字查询"},loadOldKeyword:function(){var t=this;e.getStorage({key:"searchOldKey",success:function(e){var o=JSON.parse(e.data);t.oldKeywordList=o}})},setkeyword:function(e){this.keyword=e.keyword},oldDelete:function(){var t=this;e.showModal({content:"确定清除历史搜索记录？",success:function(o){o.confirm?(t.oldKeywordList=[],e.removeStorage({key:"searchOldKey"})):o.cancel}})},doSearch:function(t){t=t||(this.keyword?this.keyword:this.defaultKeyword),this.keyword=t,this.saveKeyword(t),e.showToast({title:t,icon:"none",duration:2e3}),e.navigateTo({url:"../goods/goods_list?keyword="+t})},saveKeyword:function(t){var o=this;e.getStorage({key:"searchOldKey",success:function(a){var s=JSON.parse(a.data),i=s.indexOf(t);-1==i?s.unshift(t):(s.splice(i,1),s.unshift(t)),s.length>10&&s.pop(),e.setStorage({key:"searchOldKey",data:JSON.stringify(s)}),o.oldKeywordList=s},fail:function(a){var s=[t];e.setStorage({key:"searchOldKey",data:JSON.stringify(s)}),o.oldKeywordList=s}})}}};t.default=c}).call(this,o("6e42")["default"])},e33f:function(e,t,o){"use strict";var a=o("31ff"),s=o.n(a);s.a}},[["5a8b","common/runtime","common/vendor"]]]);