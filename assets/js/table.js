<<<<<<< HEAD
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/table.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/table.js":
/*!*********************!*\
  !*** ./js/table.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _table = _interopRequireDefault(__webpack_require__(/*! ./table/table */ "./js/table/table.js"));

var _tooltips = _interopRequireDefault(__webpack_require__(/*! ./table/tooltips */ "./js/table/tooltips.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jQuery(document).ready(function ($) {
  ac_quickedit_events($);
  ac_set_column_classes($);
  ac_actions_column($, $('.column-actions'));
  ac_show_more($);
  ac_toggle_box($);
  ac_toggle_box_ajax_init($);
  ac_actions_tooltips($);
  AC.Table = new _table.default('.wp-list-table');
  AC.Tooltips = new _tooltips.default();
  $('.wp-list-table').on('updated', 'tr', function () {
    ac_set_column_classes($);
    ac_actions_column($, $(this).find('.column-actions'));
    ac_show_more($);
  });
});

function ac_actions_tooltips($) {
  $('.row-actions a').qtip({
    content: {
      text: function text() {
        return $(this).text();
      }
    },
    position: {
      my: 'top center',
      at: 'bottom center'
    },
    style: {
      tip: true,
      classes: 'qtip-tipsy'
    }
  });
}

function ac_toggle_box($) {
  $('.ac-toggle-box-link').click(function (e) {
    e.preventDefault();
    $(this).next('.ac-toggle-box-contents').toggle();
  });
}

function ac_toggle_box_ajax_init($) {
  /**
   * Toggle box
   */
  var do_toggle_value = function do_toggle_value(e) {
    e.preventDefault();
    $(this).next('.ac-toggle-box-contents-ajax').toggle();
  };
  /**
   * Retrieves the contents from the column through ajax
   */


  var do_retrieve_ajax_value = function do_retrieve_ajax_value(e) {
    e.preventDefault();
    var $this = $(this);
    var data = {
      action: 'ac_get_column_value',
      list_screen: AC.list_screen,
      layout: AC.layout,
      column: $this.data('column'),
      pk: $this.attr('data-item-id'),
      _ajax_nonce: AC.ajax_nonce
    };
    $this.addClass('loading');
    var xhr = $.post(ajaxurl, data, function (response) {
      if (response) {
        $this.after('<div class="ac-toggle-box-contents-ajax">' + response + '</div>'); // We only need to run the ajax request once. Unbind the event, and replace with a Toggle Box.

        $this.unbind('click', do_retrieve_ajax_value).bind('click', do_toggle_value); // Added hook on Table Cell

        $($this.parent('td')).trigger('ajax_column_value_ready'); // Re-init tooltips

        AC.Tooltips().init();
      }
    });
    xhr.always(function () {
      $this.removeClass('loading');
    });
  }; // Click event


  $('a[data-ajax-populate=1]').bind('click', do_retrieve_ajax_value);
}

function ac_show_more($) {
  $('.ac-more-link-show').click(function (e) {
    e.preventDefault();
    var td = $(this).hide().closest('td');
    td.find('.ac-show-more-block').show();
  });
  $('.ac-more-link-hide').click(function (e) {
    e.preventDefault();
    var td = $(this).closest('td');
    td.find('.ac-more-link-show').show();
    td.find('.ac-show-more-block').hide();
  });
}

function ac_actions_column($, $selector) {
  $($selector).each(function () {
    var $column = $(this);

    if ($column.find('.cpac_use_icons').length > 0) {
      $column.addClass('cpac_use_icons');
    }
  });
  $($selector).find('.cpac_use_icons + .hidden + .row-actions > span').each(function () {
    var $link = $(this).find('a');
    $link.attr('data-ac-tip', $link.text()).addClass('ac-tip');
  });
}

function ac_set_column_classes($) {
  for (var name in AC.column_types) {
    if (AC.column_types.hasOwnProperty(name)) {
      var type = AC.column_types[name];
      $('.wp-list-table td.' + name).addClass(type);
    }
  }
}

function ac_quickedit_events($) {
  $(document).ajaxComplete(function (event, request) {
    var ownerDocument = document.implementation.createHTMLDocument('quickeditevents');
    var $result = $('<div>', ownerDocument);
    $result.append(request.responseText);

    if ($result.find('tr.iedit').length === 1) {
      var id = $result.find('tr.iedit').attr('id');
      $('tr#' + id).trigger('updated');
    }
  });
}

/***/ }),

/***/ "./js/table/actions.js":
/*!*****************************!*\
  !*** ./js/table/actions.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Actions =
/*#__PURE__*/
function () {
  function Actions(el) {
    _classCallCheck(this, Actions);

    this.$el = jQuery(el);
    this.init();
  }

  _createClass(Actions, [{
    key: "init",
    value: function init() {
      var self = this;
      this.$el.on('update', function () {
        self.refresh();
      }).insertAfter(jQuery('.tablenav.top .actions:last')).trigger('update');
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var $buttons = this.$el.find('.ac-table-actions-buttons');
      $buttons.find('> a').removeClass('last');
      $buttons.find('> a:visible:last').addClass('last');
    }
  }]);

  return Actions;
}();

module.exports = Actions;

/***/ }),

/***/ "./js/table/table.js":
/*!***************************!*\
  !*** ./js/table/table.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _actions = _interopRequireDefault(__webpack_require__(/*! ./actions */ "./js/table/actions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = function Table(el) {
  _classCallCheck(this, Table);

  this.$table = jQuery(el);
  this.Buttons = new _actions.default('#ac-table-actions');
};

module.exports = Table;

/***/ }),

/***/ "./js/table/tooltips.js":
/*!******************************!*\
  !*** ./js/table/tooltips.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tooltips =
/*#__PURE__*/
function () {
  function Tooltips() {
    _classCallCheck(this, Tooltips);

    this.isEnabled = typeof jQuery.fn.qtip !== 'undefined';
    this.init();
  }

  _createClass(Tooltips, [{
    key: "init",
    value: function init() {
      if (!this.isEnabled) {
        console.log('Tooltips not loaded!');
        return;
      }

      jQuery('[data-ac-tip]').qtip({
        content: {
          attr: 'data-ac-tip'
        },
        position: {
          my: 'top center',
          at: 'bottom center'
        },
        style: {
          tip: true,
          classes: 'qtip-tipsy'
        }
      });
    }
  }]);

  return Tooltips;
}();

module.exports = Tooltips;

/***/ })

/******/ });
//# sourceMappingURL=table.js.map
=======
!function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)e.d(o,r,function(n){return t[n]}.bind(null,r));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=82)}([function(t,n,e){"use strict";var o=e(15),r=e(30)(5),i=!0;"find"in[]&&Array(1).find(function(){i=!1}),o(o.P+o.F*i,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),e(25)("find")},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n,e){var o=e(8),r=e(19);t.exports=e(4)?function(t,n,e){return o.f(t,n,r(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,e){t.exports=!e(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n,e){var o=e(23)("wks"),r=e(9),i=e(1).Symbol,c="function"==typeof i;(t.exports=function(t){return o[t]||(o[t]=c&&i[t]||(c?i:r)("Symbol."+t))}).store=o},function(t,n){var e=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=e)},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,e){var o=e(14),r=e(27),i=e(28),c=Object.defineProperty;n.f=e(4)?Object.defineProperty:function(t,n,e){if(o(t),n=i(n,!0),o(e),r)try{return c(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n){var e=0,o=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+o).toString(36))}},function(t,n,e){var o=e(1),r=e(2),i=e(11),c=e(9)("src"),u=Function.toString,a=(""+u).split("toString");e(6).inspectSource=function(t){return u.call(t)},(t.exports=function(t,n,e,u){var f="function"==typeof e;f&&(i(e,"name")||r(e,"name",n)),t[n]!==e&&(f&&(i(e,c)||r(e,c,t[n]?""+t[n]:a.join(String(n)))),t===o?t[n]=e:u?t[n]?t[n]=e:r(t,n,e):(delete t[n],r(t,n,e)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[c]||u.call(this)})},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var o=e(29);t.exports=function(t,n,e){if(o(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,o){return t.call(n,e,o)};case 3:return function(e,o,r){return t.call(n,e,o,r)}}return function(){return t.apply(n,arguments)}}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n,e){var o=e(3);t.exports=function(t){if(!o(t))throw TypeError(t+" is not an object!");return t}},function(t,n,e){var o=e(1),r=e(6),i=e(2),c=e(10),u=e(12),a=function(t,n,e){var f,s,l,p,d=t&a.F,v=t&a.G,y=t&a.S,h=t&a.P,b=t&a.B,m=v?o:y?o[n]||(o[n]={}):(o[n]||{}).prototype,x=v?r:r[n]||(r[n]={}),g=x.prototype||(x.prototype={});for(f in v&&(e=n),e)l=((s=!d&&m&&void 0!==m[f])?m:e)[f],p=b&&s?u(l,o):h&&"function"==typeof l?u(Function.call,l):l,m&&c(m,f,l,t&a.U),x[f]!=l&&i(x,f,p),h&&g[f]!=l&&(g[f]=l)};o.core=r,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,n,e){var o=e(17);t.exports=function(t){return Object(o(t))}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n,e){var o=e(3),r=e(1).document,i=o(r)&&o(r.createElement);t.exports=function(t){return i?r.createElement(t):{}}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,e){var o=e(13);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==o(t)?t.split(""):Object(t)}},function(t,n,e){var o=e(22),r=Math.min;t.exports=function(t){return t>0?r(o(t),9007199254740991):0}},function(t,n){var e=Math.ceil,o=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?o:e)(t)}},function(t,n,e){var o=e(6),r=e(1),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});(t.exports=function(t,n){return i[t]||(i[t]=void 0!==n?n:{})})("versions",[]).push({version:o.version,mode:e(24)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,n){t.exports=!1},function(t,n,e){var o=e(5)("unscopables"),r=Array.prototype;void 0==r[o]&&e(2)(r,o,{}),t.exports=function(t){r[o][t]=!0}},function(t,n,e){var o=e(8).f,r=Function.prototype,i=/^\s*function ([^ (]*)/;"name"in r||e(4)&&o(r,"name",{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},function(t,n,e){t.exports=!e(4)&&!e(7)(function(){return 7!=Object.defineProperty(e(18)("div"),"a",{get:function(){return 7}}).a})},function(t,n,e){var o=e(3);t.exports=function(t,n){if(!o(t))return t;var e,r;if(n&&"function"==typeof(e=t.toString)&&!o(r=e.call(t)))return r;if("function"==typeof(e=t.valueOf)&&!o(r=e.call(t)))return r;if(!n&&"function"==typeof(e=t.toString)&&!o(r=e.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n,e){var o=e(12),r=e(20),i=e(16),c=e(21),u=e(31);t.exports=function(t,n){var e=1==t,a=2==t,f=3==t,s=4==t,l=6==t,p=5==t||l,d=n||u;return function(n,u,v){for(var y,h,b=i(n),m=r(b),x=o(u,v,3),g=c(m.length),_=0,w=e?d(n,g):a?d(n,0):void 0;g>_;_++)if((p||_ in m)&&(h=x(y=m[_],_,b),t))if(e)w[_]=h;else if(h)switch(t){case 3:return!0;case 5:return y;case 6:return _;case 2:w.push(y)}else if(s)return!1;return l?-1:f||s?s:w}}},function(t,n,e){var o=e(32);t.exports=function(t,n){return new(o(t))(n)}},function(t,n,e){var o=e(3),r=e(33),i=e(5)("species");t.exports=function(t){var n;return r(t)&&("function"!=typeof(n=t.constructor)||n!==Array&&!r(n.prototype)||(n=void 0),o(n)&&null===(n=n[i])&&(n=void 0)),void 0===n?Array:n}},function(t,n,e){var o=e(13);t.exports=Array.isArray||function(t){return"Array"==o(t)}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,n,e){"use strict";e(26),e(0);var o=i(e(83)),r=i(e(85));function i(t){return t&&t.__esModule?t:{default:t}}function c(t){t(".ac-more-link-show").click(function(n){n.preventDefault(),t(this).hide().closest("td").find(".ac-show-more-block").show()}),t(".ac-more-link-hide").click(function(n){n.preventDefault();var e=t(this).closest("td");e.find(".ac-more-link-show").show(),e.find(".ac-show-more-block").hide()})}function u(t,n){t(n).each(function(){var n=t(this);n.find(".cpac_use_icons").length>0&&n.addClass("cpac_use_icons")}),t(n).find(".cpac_use_icons + .hidden + .row-actions > span").each(function(){var n=t(this).find("a");n.attr("data-ac-tip",n.text()).addClass("ac-tip")})}function a(t){for(var n in AC.column_types)if(AC.column_types.hasOwnProperty(n)){var e=AC.column_types[n];t(".wp-list-table td."+n).addClass(e)}}jQuery(document).ready(function(t){!function(t){t(document).ajaxComplete(function(n,e){var o=document.implementation.createHTMLDocument("quickeditevents"),r=t("<div>",o);if(r.append(e.responseText),1===r.find("tr.iedit").length){var i=r.find("tr.iedit").attr("id");t("tr#"+i).trigger("updated")}})}(t),a(t),u(t,t(".column-actions")),c(t),function(t){t(".ac-toggle-box-link").click(function(n){n.preventDefault(),t(this).next(".ac-toggle-box-contents").toggle()})}(t),function(t){var n=function(n){n.preventDefault(),t(this).next(".ac-toggle-box-contents-ajax").toggle()};t("a[data-ajax-populate=1]").bind("click",function e(o){o.preventDefault();var r=t(this),i={action:"ac_get_column_value",list_screen:AC.list_screen,layout:AC.layout,column:r.data("column"),pk:r.attr("data-item-id"),_ajax_nonce:AC.ajax_nonce};r.addClass("loading"),t.post(ajaxurl,i,function(o){o&&(r.after('<div class="ac-toggle-box-contents-ajax">'+o+"</div>"),r.unbind("click",e).bind("click",n),t(r.parent("td")).trigger("ajax_column_value_ready"),AC.Tooltips().init())}).always(function(){r.removeClass("loading")})})}(t),function(t){t(".row-actions a").qtip({content:{text:function(){return t(this).text()}},position:{my:"top center",at:"bottom center"},style:{tip:!0,classes:"qtip-tipsy"}})}(t),AC.Table=new o.default(".wp-list-table"),AC.Tooltips=new r.default,t(".wp-list-table").on("updated","tr",function(){a(t),u(t,t(this).find(".column-actions")),c(t)})})},function(t,n,e){"use strict";var o=function(t){return t&&t.__esModule?t:{default:t}}(e(84));t.exports=function t(n){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.$table=jQuery(n),this.Buttons=new o.default("#ac-table-actions")}},function(t,n,e){"use strict";function o(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}e(0);var r=function(){function t(n){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.$el=jQuery(n),this.init()}return function(t,n,e){n&&o(t.prototype,n),e&&o(t,e)}(t,[{key:"init",value:function(){var t=this;this.$el.on("update",function(){t.refresh()}).appendTo(jQuery(".tablenav.top .actions:last")).trigger("update")}},{key:"refresh",value:function(){var t=this.$el.find(".ac-table-actions-buttons");t.find("> a").removeClass("last"),t.find("> a:visible:last").addClass("last")}}]),t}();t.exports=r},function(t,n,e){"use strict";function o(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var r=function(){function t(){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.isEnabled=void 0!==jQuery.fn.qtip,this.init()}return function(t,n,e){n&&o(t.prototype,n),e&&o(t,e)}(t,[{key:"init",value:function(){this.isEnabled?jQuery("[data-ac-tip]").qtip({content:{attr:"data-ac-tip"},position:{my:"top center",at:"bottom center"},style:{tip:!0,classes:"qtip-tipsy"}}):console.log("Tooltips not loaded!")}}]),t}();t.exports=r}]);
>>>>>>> develop
