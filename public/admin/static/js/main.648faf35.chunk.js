(this["webpackJsonpdatta-able-rv18.0.4"]=this["webpackJsonpdatta-able-rv18.0.4"]||[]).push([[3],{1205:function(e,n){},1207:function(e,n){},1218:function(e,n){},1220:function(e,n){},1248:function(e,n){},1250:function(e,n){},1251:function(e,n){},1256:function(e,n){},1258:function(e,n){},1264:function(e,n){},1266:function(e,n){},1285:function(e,n){},1297:function(e,n){},1300:function(e,n){},1319:function(e,n,t){"use strict";t.r(n);var a=t(13),o=t.n(a),r=t(262),c=t.n(r),i=t(109),u=t(213),l=t(257),s=t(618),d=t(209),g=t(210),f=t(212),p=t(211),m=t(48),O=t(619),b=t.n(O),y=(t(640),t(351)),h=t(357),v=function(e){Object(f.a)(t,e);var n=Object(p.a)(t);function t(){return Object(d.a)(this,t),n.apply(this,arguments)}return Object(g.a)(t,[{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&window.scrollTo(0,0)}},{key:"render",value:function(){return this.props.children}}]),t}(o.a.Component),E=Object(m.g)(v),L=[{path:"/auth/signup-1",exact:!0,name:"Signup 1",component:o.a.lazy((function(){return Promise.all([t.e(1),t.e(12)]).then(t.bind(null,1400))}))},{path:"/",exact:!0,name:"Signin",component:o.a.lazy((function(){return Promise.all([t.e(8),t.e(1),t.e(18)]).then(t.bind(null,1401))}))},{path:"/",exact:!0,name:"verify",component:o.a.lazy((function(){return Promise.all([t.e(1),t.e(11)]).then(t.bind(null,1404))}))}],S=t(261),j=b()({loader:function(){return Promise.all([t.e(6),t.e(7)]).then(t.bind(null,1406))},loading:y.a}),T=function(e){Object(f.a)(t,e);var n=Object(p.a)(t);function t(){return Object(d.a)(this,t),n.call(this)}return Object(g.a)(t,[{key:"render",value:function(){var e=L.map((function(e,n){return e.component?o.a.createElement(m.b,{key:n,path:e.path,exact:e.exact,name:e.name,render:function(n){return o.a.createElement(e.component,n)}}):null}));return o.a.createElement(h.a,null,o.a.createElement(E,null,o.a.createElement(a.Suspense,{fallback:o.a.createElement(y.a,null)},o.a.createElement(m.d,null,e,this.props.data.logginStatus?o.a.createElement(m.b,{path:"/",component:j}):o.a.createElement(m.a,{to:"/"})))))}}]),t}(a.Component),k=Object(u.b)((function(e){return{data:e.loggedReducer}}),(function(e){return{IsRoundData:function(){e(Object(S.a)((void 0).state.user,(void 0).state.school,(void 0).state.userWiseAuthorization))}}}))(T);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var C=t(256),R=t(54),_=t(56),U=t(263),I=Object(R.a)(Object(R.a)({isOpen:[],isTrigger:[]},U.a),{},{isFullScreen:!1}),N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,n=arguments.length>1?arguments[1]:void 0,t=[],a=[];switch(n.type){case _.b:return Object(R.a)(Object(R.a)({},e),{},{collapseMenu:!e.collapseMenu});case _.c:if(console.log("reducer"),"sub"===n.menu.type){a=e.isOpen;var o=(t=e.isTrigger).indexOf(n.menu.id);o>-1&&(a=a.filter((function(e){return e!==n.menu.id})),t=t.filter((function(e){return e!==n.menu.id}))),-1===o&&(a=[].concat(Object(C.a)(a),[n.menu.id]),t=[].concat(Object(C.a)(t),[n.menu.id]))}else{a=e.isOpen;var r=e.isTrigger.indexOf(n.menu.id);t=-1===r?[n.menu.id]:[],a=-1===r?[n.menu.id]:[]}return console.log("reducer state"),console.log(e),Object(R.a)(Object(R.a)({},e),{},{isOpen:a,isTrigger:t});case _.i:return Object(R.a)(Object(R.a)({},e),{},{isOpen:a,isTrigger:t});case _.h:if("sub"===n.menu.type){a=e.isOpen;var c=(t=e.isTrigger).indexOf(n.menu.id);return c>-1&&(a=a.filter((function(e){return e!==n.menu.id})),t=t.filter((function(e){return e!==n.menu.id}))),Object(R.a)(Object(R.a)({},e),{},{isOpen:a,isTrigger:t})}return Object(R.a)({},e);case _.e:return Object(R.a)(Object(R.a)({},e),{},{isFullScreen:!e.isFullScreen});case _.f:return Object(R.a)(Object(R.a)({},e),{},{isFullScreen:!1});case _.a:return Object(R.a)(Object(R.a)({},e),{},{layout:n.layout});default:return e}},w={loading:!1,user:[],error:"",logginStatus:!1,logginStatusCode:""},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,n=arguments.length>1?arguments[1]:void 0;switch(console.log("action.type ---------------",n),n.type){case _.l:return console.log("action.type","USER_REQUEST_TO_LOGGIN"),Object(R.a)(Object(R.a)({},e),{},{loading:!0});case _.k:return console.log("action.type","SET_USER"),{loading:!1,user:n.payLoad,error:"",logginStatus:!0};case _.d:return console.log("action.type","ERRROR_LOGGIN"),{loading:!1,user:n.payLoad,error:"",logginStatus:!1};case _.j:return{loading:!1,user:n.payLoad,logginStatusCode:n.logginUserCode,error:"",logginStatus:!1};default:return"null"!=localStorage.getItem("accessToken")?(console.log("userd1"),console.log("action.type","Default"),{loading:!1,user:JSON.parse(localStorage.getItem("user")),error:"",logginStatus:!0}):(console.log("userd2"),console.log("action.type","return"),{loading:!1,user:[],error:n.payLoad,logginStatus:!1})}},G=Object(i.combineReducers)({reducers:N,loggedReducer:A}),x=(t(1317),t(1318),t(623)),F=Object(x.composeWithDevTools)({}),B=Object(i.createStore)(G,F(Object(i.applyMiddleware)(s.a))),P=o.a.createElement(u.a,{store:B},o.a.createElement(l.a,null,o.a.createElement(k,null)));c.a.render(P,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},260:function(e,n){e.exports={URL:"https://webnibm.herokuapp.com/api/v1/"}},261:function(e,n,t){"use strict";t.d(n,"d",(function(){return f})),t.d(n,"a",(function(){return m})),t.d(n,"e",(function(){return O})),t.d(n,"b",(function(){return y})),t.d(n,"c",(function(){return h}));t(642);var a=t(56),o=t(259),r=t.n(o),c=t(258),i=t.n(c),u=t(260),l=t.n(u),s=t(622),d=t.n(s),g=function(){return{type:a.l,payLoad:[],logginUserCode:0,message:"Error Loggin"}},f=function(){return{type:a.g,payLoad:[],logginUserCode:0,message:"Error Loggin Attempt"}},p=function(e,n){return{type:a.j,payLoad:e,logginUserCode:n,message:"Need to verficate OTP"}},m=function(e){return{type:a.k,payLoad:e,logginUserCode:0,message:"Loggin Success"}},O=function(){return localStorage.setItem("accessToken",null),function(e){var n;e((n="",{type:a.d,payLoad:n,logginUserCode:0,message:"Error Loggin"}))}},b=function(e,n){i()({message:e,type:n,displayTime:3e3,position:{at:"top right",offset:"50"}})},y=function(e,n){return function(t){t(g),r.a.post(l.a.URL+"auth/login",{email:e,password:n}).then((function(e){var n,o;e.data.success?(localStorage.setItem("accessToken",e.data.data.accessToken),e.data.data.accessToken=d.a.decode(e.data.data.accessToken),localStorage.setItem("user",JSON.stringify(e.data)),t((n=e.data,o=e.data.code,{type:a.k,payLoad:n,logginUserCode:o,message:"Loggin Success"}))):(console.log("user",e.data),503==e.data.code&&t(p(e.data,e.data.code)),b(e.data.error,"error"))})).catch((function(e){console.log("error",e),b("Login Fails","error")}))}},h=function(e,n){return console.log("user",e),function(t){t(g),r.a.post(l.a.URL+"otp/verify",{userId:e,otpCode:n}).then((function(e){e.data.success?t(p(e.data,e.data.code)):b(e.data.error,"error")})).catch((function(e){console.log("error",e),b("Login Fails","error")}))}}},263:function(e,n,t){"use strict";n.a={defaultPath:"/dashboard/default",basename:"",layout:"vertical",preLayout:null,collapseMenu:!1,layoutType:"menu-light",navIconColor:!1,headerBackColor:"header-default",navBackColor:"navbar-default",navBrandColor:"brand-default",navBackImage:!1,rtlLayout:!1,navFixedLayout:!0,headerFixedLayout:!0,boxLayout:!1,navDropdownIcon:"style1",navListIcon:"style1",navActiveListColor:"active-default",navListTitleColor:"title-default",navListTitleHide:!1,configBlock:!1,layout6Background:"linear-gradient(to right, #A445B2 0%, #D41872 52%, #FF0066 100%)",layout6BackSize:""}},351:function(e,n,t){"use strict";var a=t(13),o=t.n(a);n.a=function(){return o.a.createElement("div",{className:"loader-bg"},o.a.createElement("div",{className:"loader-track"},o.a.createElement("div",{className:"loader-fill"})))}},357:function(e,n,t){"use strict";n.a=function(e){return e.children}},56:function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"e",(function(){return r})),t.d(n,"f",(function(){return c})),t.d(n,"a",(function(){return i})),t.d(n,"i",(function(){return u})),t.d(n,"h",(function(){return l})),t.d(n,"k",(function(){return s})),t.d(n,"j",(function(){return d})),t.d(n,"d",(function(){return g})),t.d(n,"l",(function(){return f})),t.d(n,"g",(function(){return p}));var a="COLLAPSE_MENU",o="COLLAPSE_TOGGLE",r="FULL_SCREEN",c="FULL_SCREEN_EXIT",i="CHANGE_LAYOUT",u="NAV_CONTENT_LEAVE",l="NAV_COLLAPSE_LEAVE",s="SET_USER",d="OTP_VERIFICATION",g="ERRROR_LOGGIN",f="USER_REQUEST_TO_LOGGIN",p="GET_USER_LOGGIN_DATA"},631:function(e,n,t){e.exports=t(1319)}},[[631,4,5]]]);
//# sourceMappingURL=main.648faf35.chunk.js.map