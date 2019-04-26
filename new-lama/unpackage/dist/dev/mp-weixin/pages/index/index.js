(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/index/index"],{

/***/ "../../../../new-lama/components/index-content/pageContent.vue":
/*!********************************************************************!*\
  !*** E:/晨儿/2.28/new-lama/components/index-content/pageContent.vue ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pageContent_vue_vue_type_template_id_a309eeca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageContent.vue?vue&type=template&id=a309eeca& */ "../../../../new-lama/components/index-content/pageContent.vue?vue&type=template&id=a309eeca&");
/* harmony import */ var _pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pageContent.vue?vue&type=script&lang=js& */ "../../../../new-lama/components/index-content/pageContent.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _pageContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pageContent.vue?vue&type=style&index=0&lang=scss& */ "../../../../new-lama/components/index-content/pageContent.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _pageContent_vue_vue_type_template_id_a309eeca___WEBPACK_IMPORTED_MODULE_0__["render"],
  _pageContent_vue_vue_type_template_id_a309eeca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "new-lama/components/index-content/pageContent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../../../new-lama/components/index-content/pageContent.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** E:/晨儿/2.28/new-lama/components/index-content/pageContent.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!./pageContent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/components/index-content/pageContent.vue?vue&type=script&lang=js&");
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../../../new-lama/components/index-content/pageContent.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************!*\
  !*** E:/晨儿/2.28/new-lama/components/index-content/pageContent.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--8-oneOf-1-2!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!./pageContent.vue?vue&type=style&index=0&lang=scss& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/components/index-content/pageContent.vue?vue&type=style&index=0&lang=scss&");
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../../../new-lama/components/index-content/pageContent.vue?vue&type=template&id=a309eeca&":
/*!***************************************************************************************************!*\
  !*** E:/晨儿/2.28/new-lama/components/index-content/pageContent.vue?vue&type=template&id=a309eeca& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_template_id_a309eeca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!./pageContent.vue?vue&type=template&id=a309eeca& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/components/index-content/pageContent.vue?vue&type=template&id=a309eeca&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_template_id_a309eeca___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_pageContent_vue_vue_type_template_id_a309eeca___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../../../../new-lama/main.js?{\"page\":\"pages%2Findex%2Findex\"}":
/*!********************************************************************!*\
  !*** E:/晨儿/2.28/new-lama/main.js?{"page":"pages%2Findex%2Findex"} ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__(/*! uni-pages */ "../../../../new-lama/pages.json");
var _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/index/index.vue */ "../../../../new-lama/pages/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
Page((0, _mpvuePageFactory.default)(_index.default));

/***/ }),

/***/ "../../../../new-lama/pages/index/index.vue":
/*!*************************************************!*\
  !*** E:/晨儿/2.28/new-lama/pages/index/index.vue ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_322dbb1f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=322dbb1f& */ "../../../../new-lama/pages/index/index.vue?vue&type=template&id=322dbb1f&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "../../../../new-lama/pages/index/index.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=less& */ "../../../../new-lama/pages/index/index.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_322dbb1f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_322dbb1f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "new-lama/pages/index/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../../../../new-lama/pages/index/index.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** E:/晨儿/2.28/new-lama/pages/index/index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/pages/index/index.vue?vue&type=script&lang=js&");
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../../../new-lama/pages/index/index.vue?vue&type=style&index=0&lang=less&":
/*!***********************************************************************************!*\
  !*** E:/晨儿/2.28/new-lama/pages/index/index.vue?vue&type=style&index=0&lang=less& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/css-loader??ref--10-oneOf-1-2!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--10-oneOf-1-3!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&lang=less& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/pages/index/index.vue?vue&type=style&index=0&lang=less&");
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_10_oneOf_1_1_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_10_oneOf_1_2_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_3_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_4_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "../../../../new-lama/pages/index/index.vue?vue&type=template&id=322dbb1f&":
/*!********************************************************************************!*\
  !*** E:/晨儿/2.28/new-lama/pages/index/index.vue?vue&type=template&id=322dbb1f& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_322dbb1f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../HBuilderX/HBuilderX/plugins/uniapp-cli/node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=322dbb1f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/pages/index/index.vue?vue&type=template&id=322dbb1f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_322dbb1f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_322dbb1f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/components/index-content/pageContent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!E:/晨儿/2.28/new-lama/components/index-content/pageContent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













































var _twoGoods = _interopRequireDefault(__webpack_require__(/*! @/components/lama-goods-vue/two-goods.vue */ "../../../../new-lama/components/lama-goods-vue/two-goods.vue"));
var _uniLoadMore = _interopRequireDefault(__webpack_require__(/*! @/components/uni-load-more.vue */ "../../../../new-lama/components/uni-load-more.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var cate;var _default =
{
  props: {
    type: String,
    recGoods: Array,
    goodsList: Array,
    loadMoreText: String,
    showLoadMore: Boolean,
    cateid: String,
    chidCategory: Array,
    loadingType: Number },

  components: {
    twoGoods: _twoGoods.default,
    uniLoadMore: _uniLoadMore.default },

  data: function data() {
    return {};


  },
  onLoad: function onLoad() {
  },
  methods: {} };exports.default = _default;

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/pages/index/index.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!E:/晨儿/2.28/new-lama/pages/index/index.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


















































var _headerSearch = _interopRequireDefault(__webpack_require__(/*! @/components/common/header-search.vue */ "../../../../new-lama/components/common/header-search.vue"));
var _indexContent = _interopRequireDefault(__webpack_require__(/*! @/components/index-content/indexContent.vue */ "../../../../new-lama/components/index-content/indexContent.vue"));
var _pageContent = _interopRequireDefault(__webpack_require__(/*! @/components/index-content/pageContent.vue */ "../../../../new-lama/components/index-content/pageContent.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var userInfo, shop;var _default =
{
  components: {
    headerSearch: _headerSearch.default,
    indexCon: _indexContent.default,
    pageCon: _pageContent.default },

  data: function data() {
    return {
      cateid: '0',
      headerPosition: 'fixed',
      category: [],
      chidCategory: [],
      cateCurrentIndex: 0,
      //轮播
      swiperList: [
      {
        sid: 0,
        cid: 7100,
        src: '自定义src0',
        // img: 'file:///E:/xjj-work/xjj4-11/new-lama/static/images/banner/images/banner/011.jpg'
        // img: 'http://static.lamamuying.com/static/images/banner/011.jpg'
        img: 'http://static.lamamuying.com/static/images/banner/banner1.jpg' },

      {
        sid: 1,
        cid: 7109,
        src: '自定义src1',
        img: 'http://static.lamamuying.com/static/images/banner/banner2.jpg' },

      {
        sid: 2,
        cid: 7095,
        src: '自定义src2',
        img: 'http://static.lamamuying.com/static/images/banner/banner3.jpg' },

      {
        sid: 3,
        cid: 7909,
        src: '自定义src3',
        img: 'http://static.lamamuying.com/static/images/banner/banner4.jpg' }],


      goodsList: [], //商品列表
      recGoods: [], //推荐商品
      loadingType: 1,
      page: 1,
      identity: 1,
      shopOrd: '',
      showLoadMore: false };

  },
  // 监听页面加载
  onLoad: function onLoad() {var _this = this;
    //uni.removeStorageSync('userLoginInfo');
    //uni.removeStorageSync('locationShop');
    //uni.removeStorageSync('referee');
    //this.locationShop();
    //console.log(uni.getStorageSync('userLoginInfo'));
    //console.log(this.locationShop());
    //console.log(uni.getStorageSync('referee'));
    //uni.setStorageSync('testInfo','lll');
    //console.log(uni.getStorageSync('testInfo'));
    //this.locationShop();
    userInfo = uni.getStorageSync('userLoginInfo');
    shop = uni.getStorageSync('locationShop');
    if (shop.id == undefined) {
      uni.getLocation({
        type: 'gcj02', //返回可以用于uni.openLocation的经纬度
        success: function success(locationRes) {
          var userLoginInfo = uni.getStorageSync('userLoginInfo');
          var latitude = locationRes.latitude;
          var longitude = locationRes.longitude;
          //console.log(res)
          uni.request({
            url: _this.apiUrl + 'user/getLocation',
            method: 'GET',
            data: {
              lat: latitude,
              lng: longitude,
              uid: userLoginInfo.id },

            success: function success(res) {
              shop = res.data.data;
              _this.shopOrd = shop;
              uni.setStorageSync('locationShop', shop);
              if (userInfo.identity) {
                _this.identity = userInfo.identity;
              }
              _this.page = 1;
              _this.goodsList = [];
              _this.recGoods = [];
              _this.getRecGoodsData();
              _this.getGoodsCategory();
              _this.getGoodsList();
            },
            fail: function fail() {
              console.log('无法获取定位');
            } });

        },
        fail: function fail(e) {
          console.log(JSON.stringify(e));
          console.log('获取定位失败');
        } });

    } else {
      this.shopOrd = shop;
      if (userInfo.identity) {
        this.identity = userInfo.identity;
      }
      this.page = 1;
      this.goodsList = [];
      this.recGoods = [];
      this.getRecGoodsData();
      this.getGoodsCategory();
      this.getGoodsList();
    }
  },
  onShow: function onShow() {},
  // 监听页面卸载
  onUnload: function onUnload() {
    this.goodsList = [], this.loadMoreText = '加载更多', this.showLoadMore = false;
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function onReachBottom() {
    //console.log("onReachBottom");
    this.getGoodsList();
  },
  methods: {
    scanCode: function scanCode() {var _this2 = this;
      uni.scanCode({
        success: function success(res) {
          //console.log('条码类型：' + res.scanType);
          //console.log('条码内容：' + res.result);
          uni.request({
            url: _this2.apiUrl + 'user/getUser',
            method: 'GET',
            data: {
              uid: res.result },

            success: function success(result) {
              //console.log(result);
              uni.setStorageSync('referee', result.data.data.id);
              uni.setStorageSync('locationShop', result.data.data.shop);
              _this2.goodsList = [];
              _this2.recGoods = [];
              _this2.page = 1;
              _this2.getGoodsList();
              _this2.getRecGoodsData();
            },
            fail: function fail() {},
            complete: function complete() {} });

          uni.showToast({
            title: '扫描成功' });

          uni.switchTab({
            url: '/pages/index/index' });

        } });

    },
    // 商品分类事件
    tabChange: function tabChange(e) {
      this.loadingType = 1;
      // 分类id
      var cateid = e.currentTarget.dataset.cateid;
      //console.log(cateid);
      // 分类的index值 0~1，2，3
      var index = e.currentTarget.dataset.index;
      if (this.cateCurrentIndex === index) {
        return false;
      }
      this.cateCurrentIndex = index;
      this.page = 1;
      this.cateid = cateid;

      this.goodsList = [];
      this.getGoodsList();
      // tabbar下级分类
      // this.chidCategory = [];
      this.getGoodsCategory();
      this.getChildCategory();
    },
    //获取tabbar下级分类
    getChildCategory: function getChildCategory() {
      if (this.cateid > 0) {
        for (var i = 0; this.category.length > i; i++) {
          if (this.category[i].cid == this.cateid) {
            this.chidCategory = this.category[i].child;
          }
        }
      }
    },
    // 获取Category分类
    getGoodsCategory: function getGoodsCategory() {var _this3 = this;
      uni.request({
        url: this.apiUrl + 'goods/getCategory',
        method: 'GET',
        data: {},
        success: function success(res) {
          if (res.data.code == 0) {
            // 获取首页各大分类
            res.data.data.unshift({
              cid: 0,
              cat_name: '全部',
              pid: 0 });

            _this3.category = res.data.data;
            // console.log(this.category);
          }
        } });

    },
    // 获取商品列表
    getGoodsList: function getGoodsList() {var _this4 = this;
      //console.log(this.cateid);
      if (this.page < 2) {
        uni.showLoading({
          title: '数据加载中...' });

      }
      // console.log(shop);
      uni.request({
        url: this.apiUrl + 'goods/getGoodsList',
        method: 'GET',
        data: {
          shop_id: shop.id,
          page: this.page,
          cid: this.cateid,
          identity: this.identity,
          limit: 10 },

        success: function success(res) {
          if (res.data.code == 0) {
            if (Array.isArray(res.data.data) && res.data.data.length === 0) {
              _this4.loadingType = 2;
              return;
            }
            _this4.showLoadMore = true;
            _this4.page++;
            var goodsData = [];
            res.data.data.forEach(function (goods) {
              goodsData.push(goods);
            });
            _this4.goodsList = _this4.goodsList.concat(goodsData);
          }
        },
        fail: function fail() {
          uni.showToast({
            title: '获取数据失败',
            icon: 'none' });

        },
        complete: function complete() {
          uni.hideLoading();
        } });

    },
    // 获取热门推荐
    getRecGoodsData: function getRecGoodsData() {var _this5 = this;
      uni.request({
        url: this.apiUrl + 'goods/getGoods',
        method: 'GET',
        data: {
          shop_id: shop.id,
          rec: 1,
          identity: this.identity },

        success: function success(res) {
          if (res.data.code == 0) {
            _this5.recGoods = res.data.data;
            // console.log(this.recGoods)
          }
        },
        fail: function fail() {
          uni.showToast({
            title: '获取数据失败',
            icon: 'none' });

        },
        complete: function complete() {} });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/pages/index/index.vue?vue&type=style&index=0&lang=less&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--10-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--10-oneOf-1-1!./node_modules/css-loader??ref--10-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--10-oneOf-1-3!./node_modules/less-loader/dist/cjs.js??ref--10-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!E:/晨儿/2.28/new-lama/pages/index/index.vue?vue&type=style&index=0&lang=less& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/components/index-content/pageContent.vue?vue&type=style&index=0&lang=scss&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!E:/晨儿/2.28/new-lama/components/index-content/pageContent.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/components/index-content/pageContent.vue?vue&type=template&id=a309eeca&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!E:/晨儿/2.28/new-lama/components/index-content/pageContent.vue?vue&type=template&id=a309eeca& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("view", [
    _vm.cateid == 0
      ? _c(
          "view",
          { staticStyle: { "padding-top": "0", background: "#FFFFFF" } },
          [
            _c(
              "view",
              {
                staticClass: "uni-flex uni-row",
                staticStyle: {
                  width: "100%",
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center"
                }
              },
              [
                _c(
                  "scroll-view",
                  {
                    staticClass: "scroll-view_H",
                    attrs: { "scroll-x": "true", "scroll-left": "100" }
                  },
                  _vm._l(_vm.recGoods, function(recGoodsItem, recGoodIndex) {
                    return _c(
                      "navigator",
                      {
                        key: recGoodIndex,
                        staticClass: "uni-product",
                        staticStyle: {
                          display: "inline-block",
                          "-webkit-box-align": "center"
                        },
                        attrs: {
                          "hover-class": "none",
                          url:
                            "/pages/goods/goods_detail?goods_id=" +
                            recGoodsItem.id
                        }
                      },
                      [
                        _c(
                          "view",
                          {
                            staticClass: "image-view",
                            staticStyle: { width: "240rpx", height: "240rpx" }
                          },
                          [
                            _c("image", {
                              staticStyle: { width: "100%", height: "100%" },
                              attrs: { src: recGoodsItem.image }
                            })
                          ]
                        ),
                        _c(
                          "view",
                          {
                            staticClass: "uni-product-title rec_pageTitle",
                            staticStyle: { width: "240rpx" }
                          },
                          [_vm._v(_vm._s(recGoodsItem.name))]
                        ),
                        _c("view", [
                          _c(
                            "text",
                            { staticClass: "uni-product-price-original" },
                            [_vm._v("￥" + _vm._s(recGoodsItem.price))]
                          ),
                          _c(
                            "text",
                            { staticClass: "uni-product-price-favour" },
                            [_vm._v("￥" + _vm._s(recGoodsItem.market_price))]
                          )
                        ])
                      ]
                    )
                  })
                )
              ],
              1
            )
          ]
        )
      : _vm._e(),
    _vm.cateid > 0
      ? _c(
          "view",
          {
            staticStyle: {
              padding: "20rpx",
              "padding-top": "0",
              background: "#FFFFFF"
            }
          },
          [
            _c(
              "view",
              {
                staticClass: "uni-flex uni-row",
                staticStyle: {
                  width: "100%",
                  display: "flex",
                  "justify-content": "center",
                  "align-items": "center"
                }
              },
              [
                _c(
                  "scroll-view",
                  {
                    staticClass: "scroll-view_H",
                    attrs: { "scroll-x": "true", "scroll-left": "100" }
                  },
                  _vm._l(_vm.chidCategory, function(
                    childCateItem,
                    childCateIndex
                  ) {
                    return _c(
                      "navigator",
                      {
                        key: childCateIndex,
                        staticClass: "uni-product",
                        staticStyle: {
                          display: "inline-block",
                          "-webkit-box-align": "center"
                        },
                        attrs: {
                          "hover-class": "none",
                          url:
                            "/pages/goods/goods_list?cid=" + childCateItem.cid
                        }
                      },
                      [
                        _c(
                          "view",
                          {
                            staticClass: "image-view",
                            staticStyle: { width: "240rpx", height: "240rpx" }
                          },
                          [
                            _c("image", {
                              staticStyle: { width: "100%", height: "100%" },
                              attrs: { src: childCateItem.image }
                            })
                          ]
                        ),
                        _c(
                          "view",
                          {
                            staticClass: "uni-product-title rec_pageTitle",
                            staticStyle: {
                              width: "240rpx",
                              "text-align": "center"
                            }
                          },
                          [_vm._v(_vm._s(childCateItem.cat_name))]
                        )
                      ]
                    )
                  })
                )
              ],
              1
            )
          ]
        )
      : _vm._e(),
    _c(
      "view",
      { staticStyle: { width: "100%", background: "#F6F6F6" } },
      [
        _c("image", {
          staticStyle: {
            width: "100%",
            height: "66rpx",
            "margin-top": "20rpx"
          },
          attrs: {
            src: "http://static.lamamuying.com/static/images/lam-14_r2_c1.png"
          }
        }),
        _c(
          "view",
          {
            staticClass: "uni-product-list home_conter",
            staticStyle: { "justify-content": "flex-start" }
          },
          _vm._l(_vm.goodsList, function(goodsItem, goodsIndex) {
            return _c(
              "navigator",
              {
                key: goodsIndex,
                attrs: {
                  "hover-class": "none",
                  url: "/pages/goods/goods_detail?goods_id=" + goodsItem.id
                }
              },
              [
                _c("two-goods", {
                  attrs: {
                    data: goodsItem,
                    mpcomid: "7193ae6f-0-" + goodsIndex
                  }
                })
              ],
              1
            )
          })
        ),
        _c("uni-load-more", {
          attrs: {
            color: "#333",
            loadingType: _vm.loadingType,
            mpcomid: "7193ae6f-1"
          }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!../../../../new-lama/pages/index/index.vue?vue&type=template&id=322dbb1f&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!E:/晨儿/2.28/new-lama/pages/index/index.vue?vue&type=template&id=322dbb1f& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "view",
    [
      _c("header-search", {
        attrs: { type: "home", eventid: "80d316ca-0", mpcomid: "80d316ca-0" },
        on: { scanCode: _vm.scanCode }
      }),
      _c(
        "view",
        { staticClass: "home-header-cate" },
        [
          _c(
            "scroll-view",
            {
              staticClass: "home-tab-title lama-center",
              attrs: { "scroll-x": "true", id: "home-tab-title" }
            },
            _vm._l(_vm.category, function(cate, index) {
              return _c(
                "view",
                {
                  key: index,
                  class: [
                    _vm.cateCurrentIndex === index ? "home-tab-current" : ""
                  ],
                  attrs: {
                    "data-cateid": cate.cid,
                    "data-index": index,
                    eventid: "80d316ca-1-" + index
                  },
                  on: { click: _vm.tabChange }
                },
                [_vm._v(_vm._s(cate.cat_name))]
              )
            })
          )
        ],
        1
      ),
      _c(
        "view",
        [
          _c(
            "view",
            {
              staticClass: "swiper-view",
              attrs: { eventid: "80d316ca-2" },
              on: { click: _vm.goGoods }
            },
            [
              _c(
                "swiper",
                {
                  staticClass: "swiper",
                  attrs: {
                    "indicator-dots": "true",
                    autoplay: "true",
                    circular: "true",
                    "indicator-active-color": "#ffffff"
                  }
                },
                _vm._l(_vm.swiperList, function(swiper, index0) {
                  return _c(
                    "swiper-item",
                    {
                      key: swiper.sid,
                      attrs: { mpcomid: "80d316ca-1-" + index0 }
                    },
                    [
                      _c("image", {
                        attrs: { mode: "aspectFill widthFix", src: swiper.img }
                      })
                    ]
                  )
                })
              ),
              _c("view", { staticClass: "keep-out" })
            ],
            1
          ),
          _vm.cateid == 0
            ? _c("index-con", {
                attrs: { type: "home", mpcomid: "80d316ca-2" }
              })
            : _vm._e(),
          _c("view", { staticClass: "store" }, [
            _c("view", { staticClass: "uni-flex uni-row storeName" }, [
              _c("view", { staticClass: "img" }, [
                _c("image", { attrs: { src: _vm.shopOrd.shop_logo } })
              ]),
              _c("view", { staticClass: "uni-flex uni-column name " }, [
                _c(
                  "text",
                  {
                    staticStyle: { "font-size": "34rpx", "font-weight": "500" }
                  },
                  [_vm._v(_vm._s(_vm.shopOrd.shop_name))]
                ),
                _c("text", { staticClass: "shopping" }, [
                  _vm._v("辣妈母婴合作门店")
                ])
              ])
            ])
          ]),
          _c("page-con", {
            attrs: {
              recGoods: _vm.recGoods,
              goodsList: _vm.goodsList,
              chidCategory: _vm.chidCategory,
              cateid: _vm.cateid,
              loadingType: _vm.loadingType,
              showLoadMore: _vm.showLoadMore,
              mpcomid: "80d316ca-3"
            }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

},[["../../../../new-lama/main.js?{\"page\":\"pages%2Findex%2Findex\"}","common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map