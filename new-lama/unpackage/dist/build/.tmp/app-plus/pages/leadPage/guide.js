(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/leadPage/guide"],{"047d":function(t,e,i){"use strict";i("1db4");var a=n(i("b0ce")),s=n(i("9765"));function n(t){return t&&t.__esModule?t:{default:t}}Page((0,a.default)(s.default))},"0ba8":function(t,e,i){"use strict";i.r(e);var a=i("b067"),s=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,function(){return a[t]})}(n);e["default"]=s.a},9765:function(t,e,i){"use strict";i.r(e);var a=i("9794"),s=i("0ba8");for(var n in s)"default"!==n&&function(t){i.d(e,t,function(){return s[t]})}(n);i("e584");var c=i("2877"),u=Object(c["a"])(s["default"],a["a"],a["b"],!1,null,null,null);e["default"]=u.exports},9794:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("view",{staticClass:"content"},[i("view",{staticClass:"status",staticStyle:{position:"fixed"}}),i("swiper",{staticClass:"swiper header",style:"height:"+t.height+"px",attrs:{autoplay:t.autoplay,duration:t.duration}},[i("swiper-item",{attrs:{mpcomid:"41fa681c-0"}},[i("view",{staticClass:"swiper-item"},[i("view",{staticClass:"swiper-item-img"},[i("image",{attrs:{src:"http://static.lamamuying.com/static/guide/guide-1.jpg",mode:"widthFix"}})]),i("view",{staticClass:"jump-over",attrs:{eventid:"41fa681c-0"},on:{tap:function(e){t.launchFlag()}}},[t._v(t._s(t.jumpover))])])]),i("swiper-item",{attrs:{mpcomid:"41fa681c-1"}},[i("view",{staticClass:"swiper-item"},[i("view",{staticClass:"swiper-item-img"},[i("image",{attrs:{src:"http://static.lamamuying.com/static/guide/guide-2.jpg",mode:"widthFix"}})]),i("view",{staticClass:"jump-over",attrs:{eventid:"41fa681c-1"},on:{tap:function(e){t.launchFlag()}}},[t._v(t._s(t.jumpover))])])]),i("swiper-item",{attrs:{mpcomid:"41fa681c-2"}},[i("view",{staticClass:"swiper-item"},[i("view",{staticClass:"swiper-item-img"},[i("image",{attrs:{src:"http://static.lamamuying.com/static/guide/guide-3.jpg",mode:"widthFix"}})]),i("view",{staticClass:"jump-over",attrs:{eventid:"41fa681c-2"},on:{tap:function(e){t.launchFlag()}}},[t._v(t._s(t.jumpover))]),i("view",{staticClass:"experience",attrs:{eventid:"41fa681c-3"},on:{tap:function(e){t.launchFlag()}}},[t._v(t._s(t.experience))])])])],1)],1)},s=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return s})},b067:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{background:["color1","color2","color3"],autoplay:!1,duration:500,jumpover:"跳过",experience:"立即体验",height:""}},onShow:function(){this.height=t.getSystemInfoSync().windowHeight},methods:{launchFlag:function(){t.setStorage({key:"launchFlag",data:!0}),t.switchTab({url:"/pages/index/index"})}}};e.default=i}).call(this,i("6e42")["default"])},dee9:function(t,e,i){},e584:function(t,e,i){"use strict";var a=i("dee9"),s=i.n(a);s.a}},[["047d","common/runtime","common/vendor"]]]);