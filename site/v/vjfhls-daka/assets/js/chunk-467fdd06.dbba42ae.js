(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-467fdd06"],{"0e48":function(t,e,o){"use strict";var n=o("5de0"),i=o.n(n);i.a},"17ea":function(t,e,o){},"1d97":function(t,e){t.exports=function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=e,o.i=function(t){return t},o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=224)}({0:function(t,e){t.exports=function(t,e,o,n,i){var s,r=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(s=t,r=t.default);var c,l="function"===typeof r?r.options:r;if(e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns),n&&(l._scopeId=n),i?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},l._ssrRegister=c):o&&(c=o),c){var u=l.functional,d=u?l.render:l.beforeCreate;u?l.render=function(t,e){return c.call(e),d(t,e)}:l.beforeCreate=d?[].concat(d,c):[c]}return{esModule:s,exports:r,options:l}}},10:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={computed:{spinnerColor:function(){return this.color||this.$parent.color||"#ccc"},spinnerSize:function(){return(this.size||this.$parent.size||28)+"px"}},props:{size:Number,color:String}}},11:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(6),i=o.n(n);e["default"]={name:"fading-circle",mixins:[i.a],created:function(){if(!this.$isServer){this.styleNode=document.createElement("style");var t=".circle-color-"+this._uid+" > div::before { background-color: "+this.spinnerColor+"; }";this.styleNode.type="text/css",this.styleNode.rel="stylesheet",this.styleNode.title="fading circle style",document.getElementsByTagName("head")[0].appendChild(this.styleNode),this.styleNode.appendChild(document.createTextNode(t))}},destroyed:function(){this.styleNode&&this.styleNode.parentNode.removeChild(this.styleNode)}}},124:function(t,e){},14:function(t,e){},142:function(t,e,o){function n(t){o(124)}var i=o(0)(o(64),o(194),n,null,null);t.exports=i.exports},15:function(t,e,o){function n(t){o(14)}var i=o(0)(o(11),o(16),n,null,null);t.exports=i.exports},16:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{class:["mint-spinner-fading-circle circle-color-"+t._uid],style:{width:t.spinnerSize,height:t.spinnerSize}},t._l(12,(function(t){return o("div",{staticClass:"mint-spinner-fading-circle-circle",class:["is-circle"+(t+1)]})})))},staticRenderFns:[]}},194:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"mint-loadmore"},[o("div",{staticClass:"mint-loadmore-content",class:{"is-dropped":t.topDropped||t.bottomDropped},style:{transform:t.transform}},[t._t("top",[t.topMethod?o("div",{staticClass:"mint-loadmore-top"},["loading"===t.topStatus?o("spinner",{staticClass:"mint-loadmore-spinner",attrs:{size:20,type:"fading-circle"}}):t._e(),t._v(" "),o("span",{staticClass:"mint-loadmore-text"},[t._v(t._s(t.topText))])],1):t._e()]),t._v(" "),t._t("default"),t._v(" "),t._t("bottom",[t.bottomMethod?o("div",{staticClass:"mint-loadmore-bottom"},["loading"===t.bottomStatus?o("spinner",{staticClass:"mint-loadmore-spinner",attrs:{size:20,type:"fading-circle"}}):t._e(),t._v(" "),o("span",{staticClass:"mint-loadmore-text"},[t._v(t._s(t.bottomText))])],1):t._e()])],2)])},staticRenderFns:[]}},224:function(t,e,o){t.exports=o(32)},32:function(t,e,o){"use strict";var n=o(142),i=o.n(n);Object.defineProperty(e,"__esModule",{value:!0}),o.d(e,"default",(function(){return i.a}))},6:function(t,e,o){var n=o(0)(o(10),null,null,null,null);t.exports=n.exports},64:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(15),i=o.n(n);e["default"]={name:"mt-loadmore",components:{spinner:i.a},props:{maxDistance:{type:Number,default:0},autoFill:{type:Boolean,default:!0},distanceIndex:{type:Number,default:2},topPullText:{type:String,default:"下拉刷新"},topDropText:{type:String,default:"释放更新"},topLoadingText:{type:String,default:"加载中..."},topDistance:{type:Number,default:70},topMethod:{type:Function},bottomPullText:{type:String,default:"上拉刷新"},bottomDropText:{type:String,default:"释放更新"},bottomLoadingText:{type:String,default:"加载中..."},bottomDistance:{type:Number,default:70},bottomMethod:{type:Function},bottomAllLoaded:{type:Boolean,default:!1}},data:function(){return{translate:0,scrollEventTarget:null,containerFilled:!1,topText:"",topDropped:!1,bottomText:"",bottomDropped:!1,bottomReached:!1,direction:"",startY:0,startScrollTop:0,currentY:0,topStatus:"",bottomStatus:""}},computed:{transform:function(){return 0===this.translate?null:"translate3d(0, "+this.translate+"px, 0)"}},watch:{topStatus:function(t){switch(this.$emit("top-status-change",t),t){case"pull":this.topText=this.topPullText;break;case"drop":this.topText=this.topDropText;break;case"loading":this.topText=this.topLoadingText;break}},bottomStatus:function(t){switch(this.$emit("bottom-status-change",t),t){case"pull":this.bottomText=this.bottomPullText;break;case"drop":this.bottomText=this.bottomDropText;break;case"loading":this.bottomText=this.bottomLoadingText;break}}},methods:{onTopLoaded:function(){var t=this;this.translate=0,setTimeout((function(){t.topStatus="pull"}),200)},onBottomLoaded:function(){var t=this;this.bottomStatus="pull",this.bottomDropped=!1,this.$nextTick((function(){t.scrollEventTarget===window?document.body.scrollTop+=50:t.scrollEventTarget.scrollTop+=50,t.translate=0})),this.bottomAllLoaded||this.containerFilled||this.fillContainer()},getScrollEventTarget:function(t){var e=t;while(e&&"HTML"!==e.tagName&&"BODY"!==e.tagName&&1===e.nodeType){var o=document.defaultView.getComputedStyle(e).overflowY;if("scroll"===o||"auto"===o)return e;e=e.parentNode}return window},getScrollTop:function(t){return t===window?Math.max(window.pageYOffset||0,document.documentElement.scrollTop):t.scrollTop},bindTouchEvents:function(){this.$el.addEventListener("touchstart",this.handleTouchStart),this.$el.addEventListener("touchmove",this.handleTouchMove),this.$el.addEventListener("touchend",this.handleTouchEnd)},init:function(){this.topStatus="pull",this.bottomStatus="pull",this.topText=this.topPullText,this.scrollEventTarget=this.getScrollEventTarget(this.$el),"function"===typeof this.bottomMethod&&(this.fillContainer(),this.bindTouchEvents()),"function"===typeof this.topMethod&&this.bindTouchEvents()},fillContainer:function(){var t=this;this.autoFill&&this.$nextTick((function(){t.scrollEventTarget===window?t.containerFilled=t.$el.getBoundingClientRect().bottom>=document.documentElement.getBoundingClientRect().bottom:t.containerFilled=t.$el.getBoundingClientRect().bottom>=t.scrollEventTarget.getBoundingClientRect().bottom,t.containerFilled||(t.bottomStatus="loading",t.bottomMethod())}))},checkBottomReached:function(){return this.scrollEventTarget===window?document.body.scrollTop+document.documentElement.clientHeight>=document.body.scrollHeight:this.$el.getBoundingClientRect().bottom<=this.scrollEventTarget.getBoundingClientRect().bottom+1},handleTouchStart:function(t){this.startY=t.touches[0].clientY,this.startScrollTop=this.getScrollTop(this.scrollEventTarget),this.bottomReached=!1,"loading"!==this.topStatus&&(this.topStatus="pull",this.topDropped=!1),"loading"!==this.bottomStatus&&(this.bottomStatus="pull",this.bottomDropped=!1)},handleTouchMove:function(t){if(!(this.startY<this.$el.getBoundingClientRect().top&&this.startY>this.$el.getBoundingClientRect().bottom)){this.currentY=t.touches[0].clientY;var e=(this.currentY-this.startY)/this.distanceIndex;this.direction=e>0?"down":"up","function"===typeof this.topMethod&&"down"===this.direction&&0===this.getScrollTop(this.scrollEventTarget)&&"loading"!==this.topStatus&&(t.preventDefault(),t.stopPropagation(),this.maxDistance>0?this.translate=e<=this.maxDistance?e-this.startScrollTop:this.translate:this.translate=e-this.startScrollTop,this.translate<0&&(this.translate=0),this.topStatus=this.translate>=this.topDistance?"drop":"pull"),"up"===this.direction&&(this.bottomReached=this.bottomReached||this.checkBottomReached()),"function"===typeof this.bottomMethod&&"up"===this.direction&&this.bottomReached&&"loading"!==this.bottomStatus&&!this.bottomAllLoaded&&(t.preventDefault(),t.stopPropagation(),this.maxDistance>0?this.translate=Math.abs(e)<=this.maxDistance?this.getScrollTop(this.scrollEventTarget)-this.startScrollTop+e:this.translate:this.translate=this.getScrollTop(this.scrollEventTarget)-this.startScrollTop+e,this.translate>0&&(this.translate=0),this.bottomStatus=-this.translate>=this.bottomDistance?"drop":"pull"),this.$emit("translate-change",this.translate)}},handleTouchEnd:function(){"down"===this.direction&&0===this.getScrollTop(this.scrollEventTarget)&&this.translate>0&&(this.topDropped=!0,"drop"===this.topStatus?(this.translate="50",this.topStatus="loading",this.topMethod()):(this.translate="0",this.topStatus="pull")),"up"===this.direction&&this.bottomReached&&this.translate<0&&(this.bottomDropped=!0,this.bottomReached=!1,"drop"===this.bottomStatus?(this.translate="-50",this.bottomStatus="loading",this.bottomMethod()):(this.translate="0",this.bottomStatus="pull")),this.$emit("translate-change",this.translate),this.direction=""}},mounted:function(){this.init()}}}})},"5de0":function(t,e,o){},"66e0":function(t,e,o){t.exports=o.p+"assets/img/img-none.7af0957b.jpg"},"6d78":function(t,e,o){"use strict";var n=o("17ea"),i=o.n(n);i.a},"84bf":function(t,e,o){"use strict";o.d(e,"a",(function(){return i})),o.d(e,"b",(function(){return s}));var n=o("b775");function i(){return Object(n["b"])({url:"/daylottery/currPrize",method:"post",data:{}})}function s(t){return Object(n["b"])({url:"/daylottery/queryPrizeRecord",method:"post",data:t})}},a15b:function(t,e,o){"use strict";var n=o("23e7"),i=o("44ad"),s=o("fc6a"),r=o("b301"),a=[].join,c=i!=Object,l=r("join",",");n({target:"Array",proto:!0,forced:c||l},{join:function(t){return a.call(s(this),void 0===t?",":t)}})},b242:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"no-prize-box"},[n("img",{attrs:{src:o("66e0"),alt:""}}),n("span",[t._t("default",[t._v("你还没有中奖记录呦～")])],2)])},i=[],s={name:"NoRecord"},r=s,a=(o("0e48"),o("2877")),c=Object(a["a"])(r,n,i,!1,null,"36e7c404",null);e["a"]=c.exports},b301:function(t,e,o){"use strict";var n=o("d039");t.exports=function(t,e){var o=[][t];return!o||!n((function(){o.call(null,e||function(){throw 1},1)}))}},b727:function(t,e,o){var n=o("f8c2"),i=o("44ad"),s=o("7b0b"),r=o("50c4"),a=o("65f0"),c=[].push,l=function(t){var e=1==t,o=2==t,l=3==t,u=4==t,d=6==t,h=5==t||d;return function(p,f,m,g){for(var b,v,T=s(p),x=i(T),_=n(f,m,3),y=r(x.length),S=0,C=g||a,j=e?C(p,y):o?C(p,0):void 0;y>S;S++)if((h||S in x)&&(b=x[S],v=_(b,S,T),t))if(e)j[S]=v;else if(v)switch(t){case 3:return!0;case 5:return b;case 6:return S;case 2:c.call(j,b)}else if(u)return!1;return d?-1:l||u?u:j}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},d277:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"myprize-wrap"},[t.prizeList.length?n("Loadmore",{ref:"loadmore",staticClass:"prize-list",attrs:{"bottom-method":t.loadBottom,"bottom-all-loaded":t.allLoaded,bottomPullText:""}},[t._l(t.prizeList,(function(e,i){return n("div",{key:i,staticClass:"list-item-box"},[n("div",{staticClass:"prize-img-box"},[n("div",{staticClass:"img-box flex"},[e.ticketImg?n("img",{attrs:{src:t.img_baseUrl+e.ticketImg,alt:""}}):t._e()]),n("div",{staticClass:"person-info flex"},[n("span",{staticClass:"info-desc"},[t._v("中奖人")]),n("div",{staticClass:"line-vertical"}),e.headImgUrl?n("img",{attrs:{src:e.headImgUrl,alt:""}}):n("img",{attrs:{src:o("76cb"),alt:""}}),n("span",{staticClass:"info-nickname one-txt-cut"},[t._v(t._s(e.nickName))])])]),n("div",{staticClass:"prize-detail-text"},[n("div",{staticClass:"prize-name txt-cut"},[t._v(t._s(e.ticketName))]),n("div",{staticClass:"price-box"},[n("span",{staticClass:"text-left"},[t._v("市场价值：")]),n("span",{staticClass:"text-price"},[t._v(t._s(e.marketPrice))]),n("span",{staticClass:"text-unit"},[t._v(" 元")])]),n("div",{staticClass:"time-box flex-start"},[n("span",{staticClass:"price-time"},[t._v(t._s(t._f("formatTime")(e.earnTime))+"期")]),e.cornerTag?n("ButtonM",{staticClass:"prize-tag"},[t._v("当期")]):t._e()],1)])])})),t.prizeList.length&&t.allLoaded?n("div",{staticClass:"no-more"},[t._v("无更多数据")]):t._e()],2):t._e(),t.noRecord?n("NoRecord",[t._v("还没有任何中奖记录呦～")]):t._e()],1)},i=[],s=(o("99af"),o("d81d"),o("0d03"),o("ac1f"),o("5319"),o("1276"),o("e6f8"),o("1d97")),r=o.n(s),a=o("e0df"),c=o("b242"),l=o("84bf"),u=o("b775"),d=o("b893"),h=o("ea00"),p={name:"past-prize",components:{ButtonM:a["a"],Loadmore:r.a,NoRecord:c["a"]},data:function(){return{prizeList:[],allLoaded:!1,bottomStatus:"",img_baseUrl:u["a"].imgURL,noRecord:!1,curPage:1}},methods:{loadBottom:function(){var t=this;this.loadBottom.prevent||(this.loadBottom.prevent=!0,this.bottomStatus="loading",this.curPage++,this.queryList().then((function(){t.$refs.loadmore.onBottomLoaded(),t.loadBottom.prevent=!1})))},queryList:function(){var t=this,e={currPeriodFlag:0,currentPage:this.curPage,count:20};return Object(l["b"])(e).then((function(e){var o=e.result,n=e.reply;"0"===o.businessCode?(n.map((function(t){Object(d["g"])(new Date(t.earnTime))&&(t.cornerTag="当期")})),t.prizeList=t.prizeList.concat(n),t.prizeList.length||(t.noRecord=!0),n.length<20&&(t.allLoaded=!0)):"2"===o.businessCode&&(t.prizeList.length||(t.noRecord=!0),t.allLoaded=!0)}))}},filters:{formatTime:function(t){return t?t.split(" ")[0].replace(/\-/g,"."):""}},created:function(){this.queryList(),Object(h["b"])("天天抽奖",["vjf-h5-log","transTime","openid","好物好生活平",location.href.split("?")[0],"往期奖品页","进入往期奖品页"])}},f=p,m=(o("6d78"),o("2877")),g=Object(m["a"])(f,n,i,!1,null,"1a4ab432",null);e["default"]=g.exports},d81d:function(t,e,o){"use strict";var n=o("23e7"),i=o("b727").map,s=o("1dde");n({target:"Array",proto:!0,forced:!s("map")},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},e0df:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"button-box flex",style:t.bgUrl,on:{click:t.click}},[o("span",[t._t("default")],2)])},i=[],s={name:"button-m",props:{text:{type:String,default:""},bgImg:{type:[String,Object],default:""}},methods:{click:function(){this.$emit("click")}},computed:{bgUrl:function(){return this.bgImg?{backgroundImage:this.bgImg}:""}}},r=s,a=o("2877"),c=Object(a["a"])(r,n,i,!1,null,"cfd653a6",null);e["a"]=c.exports},e6f8:function(t,e,o){},ea00:function(t,e,o){"use strict";o.d(e,"d",(function(){return r})),o.d(e,"e",(function(){return a})),o.d(e,"a",(function(){return c})),o.d(e,"i",(function(){return l})),o.d(e,"h",(function(){return u})),o.d(e,"f",(function(){return d})),o.d(e,"g",(function(){return h})),o.d(e,"c",(function(){return p})),o.d(e,"b",(function(){return f}));o("a15b"),o("0d03");var n=o("b775"),i=o("4360"),s=i["a"].state.userInfo.openid;function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign(t,{openid:s}),Object(n["b"])({url:"/punchin/myPunchin",method:"post",data:{openid:s}})}function a(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign(t,{openid:s}),Object(n["b"])({url:"/punchin/myPunchinRecord",method:"post",data:t})}function c(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign(t,{openid:s}),Object(n["b"])({url:"/punchin/changeRemind",method:"post",data:t})}function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign(t,{openid:s}),Object(n["b"])({url:"/punchin/punchinToday",method:"post",data:t})}function u(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign(t,{openid:s}),Object(n["b"])({url:"/punchin/myStatistics",method:"post",data:t})}function d(){var t={openid:s};return Object(n["b"])({url:"/punchin/getCard",method:"post",data:t})}function h(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign(t,{openid:s}),Object(n["b"])({url:"/punchin/punchinSign",method:"post",data:t})}function p(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign(t,{openid:s}),Object(n["b"])({url:"/punchin/findCourse",method:"post",data:t})}function f(t,e){var o=new Date,i=o.getMonth()+1<10?"0"+(o.getMonth()+1):o.getMonth()+1,r=o.getDate()<10?"0"+o.getDate():o.getDate(),a=o.getHours()<10?"0"+o.getHours():o.getHours(),c=o.getMinutes()<10?"0"+o.getMinutes():o.getMinutes(),l=o.getSeconds()<10?"0"+o.getSeconds():o.getSeconds();e[1]=o.getFullYear()+"-"+i+"-"+r+"T"+a+":"+c+":"+l,e[2]=s;var u=new Date,d=encodeURIComponent(location.pathname),h=encodeURIComponent(e.join(" ")),p=[u.getHours(),u.getMinutes(),u.getSeconds()].join(":");return Object(n["b"])({baseURL:n["a"].vClog,url:"/clog?"+t+p+d+"="+h,method:"get"})}}}]);
//# sourceMappingURL=chunk-467fdd06.dbba42ae.js.map