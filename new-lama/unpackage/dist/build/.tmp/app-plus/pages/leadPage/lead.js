(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/leadPage/lead"],{"47e5":function(e,t,a){"use strict";a("1db4");var n=c(a("b0ce")),u=c(a("e724"));function c(e){return e&&e.__esModule?e:{default:e}}Page((0,n.default)(u.default))},"6a04":function(e,t,a){"use strict";a.r(t);var n=a("8653"),u=a.n(n);for(var c in n)"default"!==c&&function(e){a.d(t,e,function(){return n[e]})}(c);t["default"]=u.a},"715b":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("view",{staticClass:"content"})},u=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return u})},8653:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{}},onLoad:function(){this.loadExecution()},methods:{loadExecution:function(){try{var t=e.getStorageSync("launchFlag");t?1==t?e.switchTab({url:"/pages/index/index"}):e.redirectTo({url:"/pages/leadPage/guide"}):(e.setStorage({key:"launchFlag",data:!0,success:function(){console.log("存储launchFlag")}}),e.redirectTo({url:"/pages/leadPage/guide"}))}catch(a){e.setStorage({key:"launchFlag",data:!0,success:function(){console.log("error时存储launchFlag")}}),e.redirectTo({url:"/pages/leadPage/guide"})}}}};t.default=a}).call(this,a("6e42")["default"])},e724:function(e,t,a){"use strict";a.r(t);var n=a("715b"),u=a("6a04");for(var c in u)"default"!==c&&function(e){a.d(t,e,function(){return u[e]})}(c);var o=a("2877"),r=Object(o["a"])(u["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports}},[["47e5","common/runtime","common/vendor"]]]);