(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b560b82"],{"5a8b":function(t,e,n){"use strict";var c=n("d4ec"),o=n("bee2"),a=(n("cadf"),n("551c"),n("097d"),n("bc3a")),r=n.n(a),u="/api",i=function(){function t(){Object(c["a"])(this,t)}return Object(o["a"])(t,[{key:"postMember",value:function(t){return r.a.post("".concat(u,"/member"),t)}},{key:"getMemberOnProject",value:function(t){return r.a.get("".concat(u,"/memberOnProject/").concat(t))}},{key:"getProjectList",value:function(t){return r.a.get("".concat(u,"/projects/").concat(t))}},{key:"getProject",value:function(t){return r.a.get("".concat(u,"/project/").concat(t))}},{key:"postProject",value:function(t){return r.a.post("".concat(u,"/project"),t)}},{key:"postProjectAccess",value:function(t){return r.a.post("".concat(u,"/project/access"),t)}},{key:"putProject",value:function(t){return r.a.put("".concat(u,"/project"),t)}},{key:"putProjectStar",value:function(t){return r.a.put("".concat(u,"/project/star"),t)}},{key:"deleteProject",value:function(t){return r.a.delete("".concat(u,"/project/").concat(t))}},{key:"postTask",value:function(t){return r.a.post("".concat(u,"/task"),t)}},{key:"getTaskList",value:function(t){return r.a.get("".concat(u,"/tasks/").concat(t))}},{key:"getTaskListRecently",value:function(t){return r.a.get("".concat(u,"/task/recently/").concat(t))}},{key:"getTask",value:function(t){return r.a.get("".concat(u,"/task/").concat(t))}},{key:"putTask",value:function(t){return r.a.put("".concat(u,"/task"),t)}},{key:"putTaskState",value:function(t){var e=["process","complete","error"],n="".concat(u,"/task/").concat(e[t.state]);return r.a.put("".concat(n,"/").concat(t.tidx))}},{key:"deleteTask",value:function(t){return r.a.delete("".concat(u,"/task/").concat(t))}},{key:"putViewDate",value:function(){throw"don't putViewDate impolemented"}},{key:"getCommentList",value:function(t){return r.a.get("".concat(u,"/comments/").concat(t))}},{key:"getCommentRecentlyList",value:function(t){return r.a.get("".concat(u,"/comment/recently/").concat(t))}},{key:"getComment",value:function(t){return r.a.get("".concat(u,"/comment/").concat(t))}},{key:"postComment",value:function(t){return r.a.post("".concat(u,"/comment/").concat(t.tidx),t)}},{key:"postCommentReply",value:function(t){return r.a.post("".concat(u,"/comment/reply"),t)}},{key:"putComment",value:function(t){return r.a.put("".concat(u,"/comment"),t)}},{key:"deleteComment",value:function(t){return r.a.delete("".concat(u,"/comment/").concat(t))}},{key:"getRepos",value:function(t){return r.a.get("".concat(u,"/github/repos/").concat(t))}},{key:"getCommits",value:function(t){return r.a.get("".concat(u,"/github/commit/").concat(t))}},{key:"postRepo",value:function(t){return r.a.post("".concat(u,"/github/repo"),t)}},{key:"postTaskCommit",value:function(t){return r.a.post("".concat(u,"/github/match"),t)}},{key:"deleteRepo",value:function(t){return r.a.delete("".concat(u,"/github/repo/").concat(t))}},{key:"deleteCommitOnTask",value:function(t,e){return r.a.delete("".concat(u,"/github/match/").concat(t,"/").concat(e))}}]),t}();e["a"]=new i},"5acb":function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},o=[],a=(n("7f7f"),n("96cf"),n("1da1")),r=(n("cadf"),n("551c"),n("097d"),n("5a8b")),u={created:function(){var t=this,e=n("a23c");e("/js/naver.sdk.js",function(){var e=new naver.LoginWithNaverId({clientId:"onePygBsyBG0fbTiQKSI",callbackUrl:"http://localhost:8080/naver/oauth",isPopup:!0,callbackHandle:!0});e.init();var n=function(t){return document.querySelector(t)};n("#btn-naver-custom");e.getLoginStatus(function(n){if(n){var c=e.user.getEmail();if(void 0==c||null==c)return alert("이메일은 필수정보입니다. 정보제공을 동의해주세요."),void e.reprompt();t.signInByNaver(e.user)}else console.log("callback 처리에 실패하였습니다.")})})},methods:{signInByNaver:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var n,c;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n={id:e.id,name:e.name,email:e.email,photo_src:e.profile_image,google_access_token:"",kakao_access_token:""},t.t0=this,t.next=4,r["a"].postMember(n);case 4:return t.t1=t.sent,t.next=7,t.t0.getApiData.call(t.t0,t.t1);case 7:c=t.sent,window.opener.naverCallback(c.member),window.close();case 10:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}},i=u,s=n("2877"),l=Object(s["a"])(i,c,o,!1,null,null,null);l.options.__file="naver-oauth.vue";e["default"]=l.exports},"7f7f":function(t,e,n){var c=n("86cc").f,o=Function.prototype,a=/^\s*function ([^ (]*)/,r="name";r in o||n("9e1e")&&c(o,r,{configurable:!0,get:function(){try{return(""+this).match(a)[1]}catch(t){return""}}})},a23c:function(t,e,n){var c,o;
/*!
  * $script.js JS loader & dependency manager
  * https://github.com/ded/script.js
  * (c) Dustin Diaz 2014 | License MIT
  */
/*!
  * $script.js JS loader & dependency manager
  * https://github.com/ded/script.js
  * (c) Dustin Diaz 2014 | License MIT
  */
(function(a,r){t.exports?t.exports=r():(c=r,o="function"===typeof c?c.call(e,n,e,t):c,void 0===o||(t.exports=o))})(0,function(){var t,e,n=document,c=n.getElementsByTagName("head")[0],o=!1,a="push",r="readyState",u="onreadystatechange",i={},s={},l={},f={};function p(t,e){for(var n=0,c=t.length;n<c;++n)if(!e(t[n]))return o;return 1}function m(t,e){p(t,function(t){return e(t),1})}function v(e,n,c){e=e[a]?e:[e];var o=n&&n.call,r=o?n:c,u=o?e.join(""):n,d=e.length;function g(t){return t.call?t():i[t]}function y(){if(!--d)for(var t in i[u]=1,r&&r(),l)p(t.split("|"),g)&&!m(l[t],g)&&(l[t]=[])}return setTimeout(function(){m(e,function e(n,c){return null===n?y():(c||/^https?:\/\//.test(n)||!t||(n=-1===n.indexOf(".js")?t+n+".js":t+n),f[n]?(u&&(s[u]=1),2==f[n]?y():setTimeout(function(){e(n,!0)},0)):(f[n]=1,u&&(s[u]=1),void k(n,y)))})},0),v}function k(t,o){var a,i=n.createElement("script");i.onload=i.onerror=i[u]=function(){i[r]&&!/^c|loade/.test(i[r])||a||(i.onload=i[u]=null,a=1,f[t]=2,o())},i.async=1,i.src=e?t+(-1===t.indexOf("?")?"?":"&")+e:t,c.insertBefore(i,c.lastChild)}return v.get=k,v.order=function(t,e,n){(function c(o){o=t.shift(),t.length?v(o,c):v(o,e,n)})()},v.path=function(e){t=e},v.urlArgs=function(t){e=t},v.ready=function(t,e,n){t=t[a]?t:[t];var c=[];return!m(t,function(t){i[t]||c[a](t)})&&p(t,function(t){return i[t]})?e():function(t){l[t]=l[t]||[],l[t][a](e),n&&n(c)}(t.join("|")),v},v.done=function(t){v([null],t)},v})},bee2:function(t,e,n){"use strict";function c(t,e){for(var n=0;n<e.length;n++){var c=e[n];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(t,c.key,c)}}function o(t,e,n){return e&&c(t.prototype,e),n&&c(t,n),t}n.d(e,"a",function(){return o})},d4ec:function(t,e,n){"use strict";function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",function(){return c})}}]);
//# sourceMappingURL=chunk-0b560b82.24006b52.js.map