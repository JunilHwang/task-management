(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-518f7812"],{"06de":function(t,e,a){},"0e29":function(t,e,a){"use strict";var s=a("bd7f"),i=a.n(s);i.a},"1a6e":function(t,e,a){},"243c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project-create"},[a("h3",{staticClass:"layer-title"},[t._v("프로젝트 생성")]),a("form",{attrs:{action:"",method:"post",id:"projectCreate"},on:{submit:t.projectCreate,keyup:t.requiredCheck}},[a("fieldset",[a("legend",[t._v("프로젝트 생성")]),a("ul",{staticClass:"fields"},[t._m(0),t._m(1),t.required?a("li",[a("button",{staticClass:"btn btn-full submit",attrs:{type:"submit"}},[t._v("작성완료")])]):t._e()])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("label",{staticClass:"input-label"},[a("span",{staticClass:"pre"},[a("i",{staticClass:"fas fa-file-signature"})]),a("input",{staticClass:"full-width",attrs:{type:"text",name:"title",required:""}}),a("span",{staticClass:"lbl"},[t._v("제목")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("label",{staticClass:"input-label"},[a("span",{staticClass:"pre"},[a("i",{staticClass:"fas fa-align-left"})]),a("input",{staticClass:"full-width",attrs:{type:"text",name:"description",required:""}}),a("span",{staticClass:"lbl"},[t._v("간략 설명")])])])}],n=(a("96cf"),a("1da1")),r=(a("cadf"),a("551c"),a("097d"),a("5a8b")),c={data:function(){return{required:!1}},methods:{projectCreate:function(){var t=Object(n["a"])(regeneratorRuntime.mark(function t(e){var a,s,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=e.target,s=this.$store.state.member.id,i={title:a.title.value,description:a.description.value,writer:s},t.next=5,this.getApiData(r["a"].postProject(i));case 5:alert("프로젝트가 추가되었습니다."),window.setProjectList&&window.setProjectList(),this.$store.commit("closeLayer");case 8:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),requiredCheck:function(){var t=document.querySelector("#projectCreate");this.required=t.title.value.length>0&&t.description.value.length>0}},mounted:function(){document.querySelector("#projectCreate").title.focus()}},l=c,o=(a("2a5e"),a("2877")),u=Object(o["a"])(l,s,i,!1,null,"2b68e5de",null);u.options.__file="create.vue";e["default"]=u.exports},"2a5e":function(t,e,a){"use strict";var s=a("ccd8"),i=a.n(s);i.a},3697:function(t,e,a){},7207:function(t,e,a){"use strict";var s=a("1a6e"),i=a.n(s);i.a},"72e6":function(t,e,a){"use strict";var s=a("edee"),i=a.n(s);i.a},"742d":function(t,e,a){},"7f94":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrap"},[a("siteHeader"),a("div",{staticClass:"site-content"},[a("div",{staticClass:"container"},[a("div",{staticClass:"container-inner"},[t.$store.state.member?a("router-view"):[a("div",{staticClass:"main-login-wrap"},[a("memberLogin")],1)]],2)])]),a("siteFooter"),a("layerTemplate")],1)},i=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("header",{staticClass:"header"},[a("div",{staticClass:"container"},[a("h3",{staticClass:"logo"},[a("router-link",{attrs:{to:"/"}},[t._v("Project Task Management")])],1),a("ul",{staticClass:"gnb"},[t.$store.state.member?[a("li",[a("router-link",{attrs:{to:"/"}},[t._v("프로젝트 관리")])],1),a("li",[a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.openProjectAccess(e)}}},[t._v("프로젝트 엑세스")])]),a("li",[a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.openProjectPopup(e)}}},[t._v("프로젝트 생성")])]),a("li",[a("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.logout(e)}}},[t._v("로그아웃")])])]:t._e()],2)])])},r=[],c={methods:{openLogin:function(){this.$store.commit("openLayer","login")},openProjectPopup:function(){this.$store.commit("openLayer","projectCreate")},openProjectAccess:function(){this.$store.commit("openLayer","projectAccess")},logout:function(){this.$store.commit("setState",["projectList",[]]),this.$store.commit("logout"),alert("로그아웃 되었습니다"),this.$router.push("/")}}},l=c,o=(a("8069"),a("2877")),u=Object(o["a"])(l,n,r,!1,null,"777f9064",null);u.options.__file="header.vue";var p=u.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("footer",{staticClass:"footer"},[t._v("\n  Copyright © 2018 DKU.SW.SEQ All Right Reserved\n")])},f=[],d=(a("72e6"),{}),h=Object(o["a"])(d,m,f,!1,null,"1922891a",null);h.options.__file="footer.vue";var v=h.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return!1!==t.$store.state.layerState?a("div",{staticClass:"layer"},[a("span",{staticClass:"middle"}),a("div",[a("a",{staticClass:"close",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.close(e)}}},[t._v("X")]),a(t.$store.state.layerState,{tag:"component"})],1)]):t._e()},g=[],_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("h3",{staticClass:"layer-title"},[t._v("사이트 로그인")]),a("ul",{staticClass:"social-buttons"},[a("li",[a("button",{staticClass:"btn btn-social-google full-width",attrs:{type:"button"},on:{click:t.signInByGoogle}},[t._m(0),t._v("\n        Login with Google\n      ")])]),a("li",[a("a",{staticClass:"btn btn-social-naver full-width",attrs:{href:"#",id:"btn-naver-custom"},on:{click:function(e){return e.preventDefault(),t.centerPopupOpen(e)}}},[t._m(1),t._v("\n        Login with Naver\n      ")])]),t._m(2),a("li",[a("a",{staticClass:"btn btn-social-kakao full-width",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.loginWithKakao(e)}}},[t._m(3),t._v("\n        Login with Kakao\n      ")])])])])},C=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"btn-icon"},[a("i",{staticClass:"fab fa-google"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"btn-icon"},[s("img",{attrs:{src:a("e0f7"),alt:"n",height:"16"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("button",{staticClass:"btn btn-social-facebook full-width",attrs:{type:"button"}},[a("span",{staticClass:"btn-icon"},[a("i",{staticClass:"fab fa-facebook-f"})]),t._v("\n        Login with Facebook\n      ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"btn-icon"},[a("i",{staticClass:"fas fa-comment"})])}],w=(a("96cf"),a("1da1")),k=a("5a8b"),y={props:["send"],created:function(){this.naverInit()},data:function(){return{Kakao:null}},methods:{naverInit:function(){var t=this,e=a("a23c");e("/js/naver.sdk.js",function(){var e=new window.naver.LoginWithNaverId({clientId:"onePygBsyBG0fbTiQKSI",callbackUrl:"http://localhost:8080/naver/oauth",isPopup:!0});e.init(),document.querySelector("#btn-naver-custom").href=e.generateAuthorizeUrl(),window.naverCallback=function(e){return t.naverCallback(e)}})},kakaoInit:function(){var t=a("a23c");t("/js/kakao.sdk.js",function(){window.Kakao.init("6304630a23985088f334f209161baec1")})},loginWithKakao:function(){var t=this,e=function(e){var a=e.access_token,s="https://kapi.kakao.com/v2/user/me";t.$http({method:"get",url:s,header:{authorization:"Bearer ".concat(a),contentType:"application/x-www-form-urlencoded;charset=utf-8"}}).then(function(t){throw t})},a=function(t){return alert(JSON.stringify(t))};window.Kakao.Auth.login({success:e,fail:a})},centerPopupOpen:function(t){var e=t.target.href,a=window.screenLeft||window.screenX,s=window.screenTop||window.screenY,i=window.innerWidth||document.documentElement.clientWidth||screen.width,n=window.innerHeight||document.documentElement.clientHeight||screen.height,r=600,c=600,l=i/2-r/2+a,o=n/2-c/2+s;window.open(e,"login popup","scrollbars=yes, width=".concat(r,", height=").concat(c,", top=").concat(o,", left=").concat(l))},signInByGoogle:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(){var e,a,s,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$gAuth.signIn();case 2:return e=t.sent,a={google_access_token:e.Zi.access_token,id:e.El,name:e.w3.ig,email:e.w3.U3,photo_src:e.w3.Paa},t.next=6,this.getApiData(k["a"].postMember(a));case 6:return s=t.sent,t.next=9,this.getApiData(k["a"].getProjectList(a.id));case 9:i=t.sent,this.$store.commit("loggedIn",s.member),this.$store.commit("closeLayer"),this.$store.commit("setState",["projectList",i.list]);case 13:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),naverCallback:function(t){this.$store.commit("loggedIn",t)}}},j=y,A=(a("7207"),Object(o["a"])(j,_,C,!1,null,"620edb86",null));A.options.__file="login.vue";var x=A.exports,E=a("243c"),R=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project-create"},[a("h3",{staticClass:"layer-title"},[t._v("프로젝트 엑세스")]),a("form",{attrs:{action:"",method:"post",name:"access"},on:{submit:t.projectAccess,keyup:t.requiredCheck}},[a("fieldset",[a("legend",[t._v("프로젝트 엑세스")]),a("ul",{staticClass:"fields"},[t._m(0),t.required?a("li",[a("button",{staticClass:"btn btn-full submit",attrs:{type:"submit"}},[t._v("작성완료")])]):t._e()])])])])},L=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("label",{staticClass:"input-label"},[a("span",{staticClass:"pre"},[a("i",{staticClass:"fas fa-file-signature"})]),a("input",{staticClass:"full-width",attrs:{type:"text",name:"access_token",required:""}}),a("span",{staticClass:"lbl"},[t._v("엑세스 토큰 입력")])])])}],D={data:function(){return{required:!1}},methods:{projectAccess:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(e){var a,s,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=e.target.access_token.value,s=this.$store.state.member.id,t.next=4,this.getApiData(k["a"].postProjectAccess({access_token:a,mid:s}));case 4:if(i=t.sent,!i.msg){t.next=8;break}return alert(i.msg),t.abrupt("return");case 8:alert("프로젝트가 추가되었습니다."),window.setProjectList&&window.setProjectList(),this.$store.commit("closeLayer");case 11:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),requiredCheck:function(){this.required=document.forms.access.access_token.value.length}},mounted:function(){document.forms.access.access_token.focus()}},M=D,T=(a("0e29"),Object(o["a"])(M,R,L,!1,null,"819cdd22",null));T.options.__file="access.vue";var I=T.exports,$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"github-repo-add"},[a("h3",{staticClass:"layer-title"},[t._v("Repository 추가")]),a("ul",t._l(t.repos,function(e,s){return a("li",{key:s},[a("p",{staticClass:"full_name"},[t._m(0,!0),a("span",{staticClass:"icon-after",domProps:{innerHTML:t._s(e.full_name)}})]),a("p",{staticClass:"description"},[t._m(1,!0),a("span",{staticClass:"icon-after",domProps:{innerHTML:t._s(e.description||"설명이 없습니다.")}})]),a("p",[a("a",{staticClass:"btn submit mini",attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.selectRepo(e)}}},[t._v("선택")]),a("a",{staticClass:"btn point mini",attrs:{href:"https://github.com/"+e.full_name,target:"_blank"}},[t._v("조회")])])])}))])},S=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon-wrap"},[a("i",{staticClass:"fab fa-github"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon-wrap"},[a("i",{staticClass:"fas fa-align-left"})])}],N={created:function(){this.getRepos()},data:function(){return{repos:[]}},methods:{getRepos:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(){var e,a,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e="https://api.github.com/user/repos",a=this.$store.state.githubToken,t.next=4,this.$http.get("".concat(e,"?access_token=").concat(a));case 4:s=t.sent,this.repos=s.data;case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),selectRepo:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(e){var a,s,i,n,r,c,l;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a="https://api.github.com/repos/".concat(e.full_name,"/commits"),s=e.full_name,i=this.$store.state.githubToken,n=this.$route.params.pidx,r=e.description||"No Description",c={pidx:n,access_url:a,full_name:s,access_token:i,description:r},t.next=8,this.getApiData(k["a"].postRepo(c));case 8:if(l=t.sent,!l.msg){t.next=12;break}return alert("이미 등록된 repository입니다."),t.abrupt("return");case 12:alert("github repository가 등록되었습니다."),this.$store.commit("closeLayer"),this.setRepos();case 15:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),setRepos:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getApiData(k["a"].getRepos(this.$route.params.pidx));case 2:e=t.sent,this.$store.commit("setState",["repos",e.repos]);case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}},P=N,Y=(a("9cd1"),Object(o["a"])(P,$,S,!1,null,"9d4dcd70",null));Y.options.__file="github-select.vue";var Z=Y.exports,G=a("4ac5"),O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("div",{staticClass:"requirement-create"},[a("h3",{staticClass:"requirement-title"},[t._v("Task 수정")]),a("form",{attrs:{action:"",method:"post",name:"task"},on:{submit:t.TaskCore.update,keyup:t.requiredCheck,change:t.requiredCheck}},[a("fieldset",[a("legend",[t._v("Task 수정")]),a("ul",{staticClass:"fields"},[a("li",[a("label",{staticClass:"input-label"},[t._m(0),a("select",{staticClass:"full-width",attrs:{name:"parent"}},[a("option",{attrs:{value:"0"}},[t._v("상위 task 선택")]),t._l(t.tasks,function(e,s){return e.tidx!==t.task.tidx?a("option",{key:s,domProps:{value:e.tidx,selected:e.tidx===t.task.parent,innerHTML:t._s(e.title)}}):t._e()})],2)])]),a("li",[a("label",{staticClass:"input-label"},[t._m(1),a("input",{staticClass:"full-width",attrs:{type:"text",name:"title",required:""},domProps:{value:t.task.title}}),a("span",{staticClass:"lbl"},[t._v("제목")])])]),a("li",{staticClass:"datepicker"},[a("div",{staticClass:"input-label inline half"},[t._m(2),a("Datepicker",{staticClass:"full-width",attrs:{highlighted:{dates:[new Date]},disabledDates:t.disableStart,format:"yyyy-MM-dd",value:t.start,placeholder:"시작날짜",name:"start",required:""},on:{selected:t.setLimitDisable}})],1),a("label",{staticClass:"input-label inline"},[t._m(3),a("select",{attrs:{name:"start_h",required:""}},[a("option",{attrs:{value:""}},[t._v("시간 선택")]),t._l(24,function(e){return a("option",{key:e,domProps:{value:t.digit(e-1),selected:t.digit(e-1)===t.start_h,innerHTML:t._s(t.digit(e-1)+" 시")}})})],2)]),a("label",{staticClass:"input-label inline"},[t._m(4),a("select",{attrs:{name:"start_m",required:""}},[a("option",{attrs:{value:""}},[t._v("분 선택")]),t._l(60,function(e){return a("option",{key:e,domProps:{value:t.digit(e-1),selected:t.digit(e-1)===t.start_m,innerHTML:t._s(t.digit(e-1)+" 분")}})})],2)])]),a("li",{staticClass:"datepicker"},[a("div",{staticClass:"input-label inline half"},[t._m(5),a("Datepicker",{staticClass:"full-width",attrs:{highlighted:{dates:[new Date]},disabledDates:t.disableLimit,format:"yyyy-MM-dd",value:t.limit,placeholder:"완료날짜 선택",name:"limit",required:""},on:{selected:t.setStartDisable}})],1),a("label",{staticClass:"input-label inline"},[t._m(6),a("select",{attrs:{name:"limit_h",required:""}},[a("option",{attrs:{value:""}},[t._v("시간 선택")]),t._l(24,function(e){return a("option",{key:e,domProps:{value:t.digit(e-1),selected:t.digit(e-1)===t.limit_h,innerHTML:t._s(t.digit(e-1)+" 시")}})})],2)]),a("label",{staticClass:"input-label inline"},[t._m(7),a("select",{attrs:{name:"limit_m",required:""}},[a("option",{attrs:{value:""}},[t._v("분 선택")]),t._l(60,function(e){return a("option",{key:e,domProps:{value:t.digit(e-1),selected:t.digit(e-1)===t.limit_m,innerHTML:t._s(t.digit(e-1)+" 분")}})})],2)])]),a("li",[a("label",{staticClass:"input-label"},[t._m(8),a("textarea",{staticClass:"full-width",attrs:{type:"text",name:"description",cols:"80",rows:"10",required:""},domProps:{innerHTML:t._s(t.task.description)}}),a("span",{staticClass:"lbl"},[t._v("간략 설명")])])]),t.required?a("li",[a("button",{staticClass:"btn btn-full submit",attrs:{type:"submit"}},[t._v("작성완료")])]):t._e()])])])])])},U=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"pre"},[a("i",{staticClass:"fas fa-arrow-up"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"pre"},[a("i",{staticClass:"fas fa-file-signature"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"pre"},[a("i",{staticClass:"far fa-calendar-alt"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"pre"},[a("i",{staticClass:"far fa-clock"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"pre"},[a("i",{staticClass:"far fa-clock"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"pre"},[a("i",{staticClass:"far fa-calendar-alt"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"pre"},[a("i",{staticClass:"far fa-clock"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"pre"},[a("i",{staticClass:"far fa-clock"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"pre"},[a("i",{staticClass:"fas fa-align-left"})])}],q=a("0a69"),H=a("fa33"),J={components:{Datepicker:H["a"]},created:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return q["a"].init(this),this.task=this.$store.state.nowTask,t.next=4,q["a"].getList(this.task.pidx);case 4:return this.getNow(),t.next=7,q["a"].getOnCalendar();case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),computed:{tasks:function(){return this.$store.state.taskList}},data:function(){var t=null,e=!0,a={},s=null,i=null,n=null,r=null,c=null,l=null,o=null;return{TaskCore:q["a"],tidx:t,required:e,task:a,start:s,start_h:i,start_m:n,limit:r,limit_h:c,limit_m:l,calendarConn:o,disableStart:{to:this.getSubDay(),from:null},disableLimit:{to:this.getSubDay()}}},methods:{getSubDay:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return new Date(this.moment(t).subtract(1,"days").format())},setStartDisable:function(t){this.disableStart.from=t},setLimitDisable:function(t){this.disableLimit.to=t},requiredCheck:function(){var t=document.forms.task,e=t.title.value.length>0,a=t.start.value.length>0,s=t.start_h.value.length>0,i=t.start_m.value.length>0,n=t.limit.value.length>0,r=t.limit_h.value.length>0,c=t.limit_m.value.length>0,l=t.description.value.length>0;this.required=e&&a&&s&&i&&n&&r&&c&&l},getNow:function(){var t=this.task,e=this.moment(t.start_date),a=this.moment(t.limit_date);this.tidx=this.task.tidx,this.start=e.format("YYYY-MM-DD"),this.start_h=e.format("HH"),this.start_m=e.format("mm"),this.limit=a.format("YYYY-MM-DD"),this.limit_h=a.format("HH"),this.limit_m=a.format("mm"),this.setStartDisable(new Date(a.format())),this.setLimitDisable(new Date(e.format()))},updateCalendar:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(e){var a,s,i,n,r,c,l,o,u,p,m;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=this.$store.state.member,s="Asia/Seoul",i="[PTM][".concat(this.task.project_title,"] ").concat(e.title),n=e.description,r=a.email,c=this.moment(e.start_date).format(),l=this.moment(e.limit_date).format(),o="primary",u=this.calendarConn.id,p={summary:i,description:n,start:{dateTime:c,timeZone:s},end:{dateTime:l,timeZone:s},attendees:[{email:r}]},t.next=12,this.gapiInit();case 12:m=t.sent,m.events.update({calendarId:o,eventId:u,resource:p});case 14:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),gapiInit:function(){var t=Object(w["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise(function(t){window.gapi.load("client:auth2",Object(w["a"])(regeneratorRuntime.mark(function a(){return regeneratorRuntime.wrap(function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,window.gapi.client.init(e.getGoogleConfig());case 2:e.gapiCalendar=window.gapi.client.calendar,t(window.gapi.client.calendar);case 4:case"end":return a.stop()}},a,this)})))}));case 1:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}},W=J,F=(a("be36"),Object(o["a"])(W,O,U,!1,null,null,null));F.options.__file="update.vue";var V=F.exports,Q={components:{login:x,projectCreate:E["default"],projectAccess:I,githubRepository:Z,taskCreate:G["default"],taskUpdate:V},methods:{close:function(){this.$store.commit("closeLayer")}}},B=Q,z=Object(o["a"])(B,b,g,!1,null,null,null);z.options.__file="layerTemplate.vue";var X=z.exports,K={components:{siteHeader:p,siteFooter:v,layerTemplate:X,memberLogin:x}},tt=K,et=(a("bdfe"),Object(o["a"])(tt,s,i,!1,null,null,null));et.options.__file="main.vue";e["default"]=et.exports},8069:function(t,e,a){"use strict";var s=a("742d"),i=a.n(s);i.a},"835b":function(t,e,a){},"9cd1":function(t,e,a){"use strict";var s=a("06de"),i=a.n(s);i.a},bd7f:function(t,e,a){},bdfe:function(t,e,a){"use strict";var s=a("835b"),i=a.n(s);i.a},be36:function(t,e,a){"use strict";var s=a("3697"),i=a.n(s);i.a},ccd8:function(t,e,a){},e0f7:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA3CAYAAABQOymxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUYxM0I5MjJFNEM5MTFFODk0M0VGREU0NTYyNjUxNUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUYxM0I5MjNFNEM5MTFFODk0M0VGREU0NTYyNjUxNUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RjEzQjkyMEU0QzkxMUU4OTQzRUZERTQ1NjI2NTE1RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RjEzQjkyMUU0QzkxMUU4OTQzRUZERTQ1NjI2NTE1RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl/QZ3gAAAIUSURBVHja5Js9SBxBGIa/OxV/MP43gqCFAVERTC3WiYUISkARFfEHsTRpxEKxy6EoWASD/4Jon0ItRDsLEbHxpxALm4Q7UFExYNb3Y0e4fmfdPd4Xnt3uu3m42dmbm5mI4zjTItIL7sV7PoAT0AQeLNRrBT/BM3A81soF++m4lIN8g400ghnQb6FWMSgRe/kYxeVO7KcPfLZQ59FyuxJR8S+LIMNjjYjlNkX8FC4FvyRkifpcvxs0MwlrlkEek3AhWGAS1rSBFiZhzZIZyGiEC8LQtaPv/HlfwCCTsGYWlDEJZ4INJmFNAxhgEtbMBTFqBymsE4stJuG3rv2NSVgTA9VMwpo1NuFPYJJJWDMG6piENZtswlXgB5Ow5rt5pjVpDMLJXTvOIlwJhsCl7cLpPjT2CNSALI91psBeKgjHzBRwxWOdbHHXqELfpSvAKjgN47Pih3CRuX9lEX4x9zMwziCcnAlwzCSsaU/61imEz8Eok7CY38eHTMKaLjbhCwl41SGI39LzYJtJWNMBnpiEExLQqkOQ08N1sMMkrOkUO7v1Ukb4r5nk0whr9A/4LSZhMQNYnEn4VtwNbDTCmt/i7s2kERYzgP1hEv5nXlU0wppdcXfA0whrhsFVKgl7PZvwH/T45OuosO2tvTbqHYi7y8d2inTl4dq8C72eatHt+jngxlLjRkAtqBc7J270VMvlqwADAC3WTxET0UJ4AAAAAElFTkSuQmCC"},edee:function(t,e,a){}}]);
//# sourceMappingURL=chunk-518f7812.8e0a12fa.js.map