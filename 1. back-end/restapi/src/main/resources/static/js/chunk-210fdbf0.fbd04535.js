(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-210fdbf0","chunk-88e48c5a"],{"06ac":function(t,e,a){"use strict";var n=a("1645"),r=a.n(n);r.a},"0a69":function(t,e,a){"use strict";a("96cf");var n=a("1da1"),r=a("d4ec"),s=a("bee2"),c=(a("cadf"),a("551c"),a("097d"),a("5a8b")),i=function(){function t(){Object(r["a"])(this,t)}return Object(s["a"])(t,null,[{key:"init",value:function(e){t.instance=e}},{key:"getList",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(a){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.instance,e.next=3,n.getApiData(c["a"].getTaskList(a||n.$route.params.pidx));case 3:return r=e.sent,n.$store.commit("setState",["taskList",r.list]),e.abrupt("return",r.list);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(a){var n,r,s,i,o,u,l,p,m,f;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.instance,r=a.target,s=r.title.value,i=r.parent.value,o="".concat(r.start.value," ").concat(r.start_h.value,":").concat(r.start_m.value,":00"),u="".concat(r.limit.value," ").concat(r.limit_h.value,":").concat(r.limit_m.value,":00"),l=r.description.value,p=n.$route.params.pidx,m={pidx:p,parent:i,title:s,start_date:o,limit_date:u,description:l},e.next=6,n.getApiData(c["a"].postTask(m));case 6:return e.next=8,n.getApiData(c["a"].getTaskList(n.$route.params.pidx));case 8:f=e.sent,n.$store.commit("setState",["taskList",f.list]),n.$store.commit("closeLayer"),alert("완료되었습니다.");case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"setState",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(a){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.instance,r=n.$route.params.tidx||n.task.tidx,e.next=4,n.getApiData(c["a"].putTaskState({state:a,tidx:r}));case 4:t.getOne();case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getOne",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var a,n,r,s,i=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=i.length>0&&void 0!==i[0]?i[0]:null,n=t.instance,r=a||n.$route.params.tidx,e.next=5,n.getApiData(c["a"].getTask(r));case 5:return s=e.sent,null==a&&n.$store.commit("setState",["nowTask",s.task]),e.abrupt("return",s.task);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(confirm("정말로 삭제하시겠습니까?")){e.next=2;break}return e.abrupt("return");case 2:return a=t.instance,e.next=5,a.getApiData(c["a"].deleteTask(a.task.tidx));case 5:a.$router.push("/project/view/"+a.task.pidx);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"update",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(a){var n,r,s,i,o,u,l,p;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.instance,r=a.target,s=r.title.value,i="".concat(r.start.value," ").concat(r.start_h.value,":").concat(r.start_m.value,":00"),o="".concat(r.limit.value," ").concat(r.limit_h.value,":").concat(r.limit_m.value,":00"),u=r.description.value,l=n.tidx,p={tidx:l,title:s,start_date:i,limit_date:o,description:u},e.next=6,n.getApiData(c["a"].putTask(p));case 6:alert("완료되었습니다."),n.$store.commit("closeLayer"),t.getOne(),null!==n.calendarConn&&n.updateCalendar(p);case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getCommits",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var a,n,r,s,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.instance,n=a.task,r=n.tidx,s=n.parent,e.next=6,a.getApiData(c["a"].getCommits(r));case 6:if(i=e.sent,!n.parent){e.next=13;break}return e.next=10,t.getOne(s);case 10:e.t0=e.sent,e.next=14;break;case 13:e.t0=null;case 14:a.parent=e.t0,a.commits=i.commits;case 16:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getOnCalendar",value:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var a,n,r,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.instance,n=a.task.tidx,r=a.$store.state.member.midx,e.next=5,a.getApiData(c["a"].getTaskOnCalendar({tidx:n,midx:r}));case 5:s=e.sent,a.calendarConn=s.data;case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),t}();e["a"]=i},"0ba4":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"task-tree"},[a("a",{staticClass:"close",attrs:{href:"#"},on:{click:function(e){t.$parent.treeOpen=!1}}},[t._v("X")]),a("span",{staticClass:"middle"}),a("taskTreeCard",{attrs:{tree:t.tree[0].children,step:0,max:t.max,parent:0}})],1)},r=[],s=(a("ac6a"),a("cadf"),a("551c"),a("097d"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{class:"step"+(t.step+1)},t._l(t.tree,function(e,n){return a("li",{key:n},[a("div",{class:"color"+(e.data.state+1),on:{click:function(a){t.previewTask(e.data)}}},[t._v("\n      "+t._s(e.data.title)+"\n    ")]),t.step<t.max?a("taskTreeCard",{attrs:{tree:e.children,step:t.step+1,max:t.max}}):t._e()],1)}))}),c=[],i={name:"taskTreeCard",components:{taskTreeCard:p},methods:{previewTask:function(t){this.$store.commit("setState",["nowTask",t]),this.$store.commit("openLayer","taskMiniView")}},props:["tree","step","max","parent"]},o=i,u=(a("b899"),a("2877")),l=Object(u["a"])(o,s,c,!1,null,"2b43827b",null);l.options.__file="tree-card.vue";var p=l.exports,m={components:{taskTreeCard:p},created:function(){var t=this.$store.state.taskList,e=[];t.forEach(function(t){void 0===e[t.depth]&&(e[t.depth]=[]),e[t.depth].push(t)});var a={0:{children:{}}},n=e.length,r=function t(a){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;r<n&&e[r].forEach(function(e){if(e.parent===s){a[s].children[e.tidx]={children:{},data:e};var n=a[e.parent].children;t(n,r+1,e.tidx)}})};r(a),this.tree=a,this.max=n},data:function(){return{tree:{},max:0}}},f=m,h=(a("804e"),Object(u["a"])(f,n,r,!1,null,"4147e038",null));h.options.__file="tree.vue";e["default"]=h.exports},"0bba":function(t,e,a){},"0bfb":function(t,e,a){"use strict";var n=a("cb7c");t.exports=function(){var t=n(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},1645:function(t,e,a){},3846:function(t,e,a){a("9e1e")&&"g"!=/./g.flags&&a("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:a("0bfb")})},"5a8b":function(t,e,a){"use strict";var n=a("d4ec"),r=a("bee2"),s=a("bc3a"),c=a.n(s),i="/api",o=function(){function t(){Object(n["a"])(this,t)}return Object(r["a"])(t,[{key:"postMember",value:function(t){return c.a.post("".concat(i,"/member"),t)}},{key:"getMemberOnProject",value:function(t){return c.a.get("".concat(i,"/memberOnProject/").concat(t))}},{key:"putMemberGoogleToken",value:function(t){return c.a.put("".concat(i,"/member/google-token"),t)}},{key:"getProjectList",value:function(t){return c.a.get("".concat(i,"/projects/").concat(t))}},{key:"getProject",value:function(t){return c.a.get("".concat(i,"/project/").concat(t))}},{key:"postProject",value:function(t){return c.a.post("".concat(i,"/project"),t)}},{key:"postProjectAccess",value:function(t){return c.a.post("".concat(i,"/project/access"),t)}},{key:"putProject",value:function(t){return c.a.put("".concat(i,"/project"),t)}},{key:"putProjectStar",value:function(t){return c.a.put("".concat(i,"/project/star"),t)}},{key:"deleteProject",value:function(t){return c.a.delete("".concat(i,"/project/").concat(t))}},{key:"postTask",value:function(t){return c.a.post("".concat(i,"/task"),t)}},{key:"getTask",value:function(t){return c.a.get("".concat(i,"/task/").concat(t))}},{key:"getTaskList",value:function(t){return c.a.get("".concat(i,"/tasks/").concat(t))}},{key:"getTaskListRecently",value:function(t){return c.a.get("".concat(i,"/task/recently/").concat(t))}},{key:"getTaskByRange",value:function(t){return c.a.get("".concat(i,"/task-range"),{params:t})}},{key:"putTask",value:function(t){return c.a.put("".concat(i,"/task"),t)}},{key:"putTaskState",value:function(t){var e=["process","complete","error"],a="".concat(i,"/task/").concat(e[t.state]);return c.a.put("".concat(a,"/").concat(t.tidx))}},{key:"getTaskOnCalendar",value:function(t){return c.a.get("".concat(i,"/task-on-calendar"),{params:t})}},{key:"postTaskOnCalendar",value:function(t){return c.a.post("".concat(i,"/task-on-calendar"),t)}},{key:"putTaskOnCalendar",value:function(t){return c.a.put("".concat(i,"/task-on-calendar"),{params:t})}},{key:"deleteTaskOnCalendar",value:function(t){return c.a.delete("".concat(i,"/task-on-calendar/").concat(t))}},{key:"deleteTask",value:function(t){return c.a.delete("".concat(i,"/task/").concat(t))}},{key:"putViewDate",value:function(){throw"don't putViewDate impolemented"}},{key:"getCommentList",value:function(t){return c.a.get("".concat(i,"/comments/").concat(t))}},{key:"getCommentRecentlyList",value:function(t){return c.a.get("".concat(i,"/comment/recently/").concat(t))}},{key:"getComment",value:function(t){return c.a.get("".concat(i,"/comment/").concat(t))}},{key:"postComment",value:function(t){return c.a.post("".concat(i,"/comment/").concat(t.tidx),t)}},{key:"postCommentReply",value:function(t){return c.a.post("".concat(i,"/comment/reply"),t)}},{key:"putComment",value:function(t){return c.a.put("".concat(i,"/comment"),t)}},{key:"deleteComment",value:function(t){return c.a.delete("".concat(i,"/comment/").concat(t))}},{key:"getRepos",value:function(t){return c.a.get("".concat(i,"/github/repos/").concat(t))}},{key:"getCommits",value:function(t){return c.a.get("".concat(i,"/github/commit/").concat(t))}},{key:"postRepo",value:function(t){return c.a.post("".concat(i,"/github/repo"),t)}},{key:"postTaskCommit",value:function(t){return c.a.post("".concat(i,"/github/match"),t)}},{key:"deleteRepo",value:function(t){return c.a.delete("".concat(i,"/github/repo/").concat(t))}},{key:"deleteCommitOnTask",value:function(t,e){return c.a.delete("".concat(i,"/github/match/").concat(t,"/").concat(e))}}]),t}();e["a"]=new o},"6a0f":function(t,e,a){},"6b54":function(t,e,a){"use strict";a("3846");var n=a("cb7c"),r=a("0bfb"),s=a("9e1e"),c="toString",i=/./[c],o=function(t){a("2aba")(RegExp.prototype,c,t,!0)};a("79e5")(function(){return"/a/b"!=i.call({source:"a",flags:"b"})})?o(function(){var t=n(this);return"/".concat(t.source,"/","flags"in t?t.flags:!s&&t instanceof RegExp?r.call(t):void 0)}):i.name!=c&&o(function(){return i.call(this)})},"7f7f":function(t,e,a){var n=a("86cc").f,r=Function.prototype,s=/^\s*function ([^ (]*)/,c="name";c in r||a("9e1e")&&n(r,c,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},"804e":function(t,e,a){"use strict";var n=a("0bba"),r=a.n(n);r.a},8199:function(t,e,a){"use strict";var n=a("b314"),r=a.n(n);r.a},8388:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("header",{staticClass:"project-header"},[a("h4",{staticClass:"content-title",domProps:{innerHTML:t._s(t.projectData.title)}}),a("p",{domProps:{innerHTML:t._s(t.projectData.description)}})]),a("div",{staticClass:"btn-group tree"},[a("a",{staticClass:"btn submit",attrs:{href:"#"},domProps:{innerHTML:t._s("Task Tree")},on:{click:function(e){t.treeOpen=!0}}})]),"undefined"!==typeof t.projectData.pidx?a("section",{staticClass:"project-view"},[a("section",{staticClass:"tasks"},[a("taskList",{attrs:{matching:t.matching}})],1),a("projectGithubRepos"),a("customLoading",{attrs:{loading:t.loading}}),a("div",{staticClass:"btn-group"},[a("router-link",{staticClass:"btn point",attrs:{to:"/"}},[t._v("프로젝트 목록")]),a("router-link",{staticClass:"btn point",attrs:{to:"/project/setting/"+t.projectData.pidx}},[t._v("프로젝트 설정")]),a("a",{staticClass:"btn submit",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.$store.commit("openLayer","taskCreate")}}},[t._v("테스크 추가")]),a("a",{staticClass:"btn submit",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.copyToken(e)}}},[t._v("토큰 복사")])],1)],1):t._e(),t.treeOpen?a("taskTree"):t._e()],1)},r=[],s=(a("96cf"),a("1da1")),c=a("5a8b"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.repos.length?a("section",{staticClass:"project-github-repos"},t._l(t.repos,function(e,n){return a("article",{key:n},[a("header",[a("div",{staticClass:"title"},[t._m(0,!0),a("strong",{staticClass:"repo-name",domProps:{innerHTML:t._s(e.full_name)}}),a("span",{staticClass:"repo-desc",domProps:{innerHTML:t._s(e.description)}})]),a("div",{staticClass:"sel"},[a("a",{class:{active:t.shows[n]},attrs:{href:"#"},domProps:{innerHTML:t._s(t.shows[n]?"접기":"열기")},on:{click:function(e){e.preventDefault(),t.showSet(n)}}}),t._l(t.limits,function(e,r){return a("a",{key:r,class:{active:t.nowLimit[n]===e},attrs:{href:"#"},domProps:{innerHTML:t._s(e+"개")},on:{click:function(a){a.preventDefault(),t.limitSet(n,e)}}})})],2)]),t.shows[n]?a("ul",[t._l(e.commits,function(e,r){return r<t.nowLimit[n]?a("li",{key:r,class:{active:t.$parent.matching.state&&t.$parent.matching.commit==e}},[a("span",{staticClass:"image",style:{backgroundImage:"url("+e.image+")"}}),a("span",{staticClass:"author",domProps:{innerHTML:t._s(e.name)}}),a("span",{staticClass:"message"},[a("a",{attrs:{href:e.html_url,target:"_blank"},domProps:{innerHTML:t._s(e.message)}})]),a("span",{staticClass:"register_date",domProps:{innerHTML:t._s(t.getFlowDate(e.register_date))}}),a("a",{staticClass:"plug",attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.matchCommit(e)}}},[a("i",{staticClass:"fas fa-plug"})])]):t._e()}),e.commits?t._e():a("li",[t._v("\n        등록된 commit이 없습니다.\n      ")])],2):t._e()])})):t._e()},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"git-icon"},[a("i",{staticClass:"fab fa-github"})])}],u=(a("7f7f"),a("ac6a"),{created:function(){this.getRepos()},data:function(){return{repos:[],nowLimit:[],shows:[],limits:[10,30,50,100]}},methods:{getRepos:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,a,n=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getApiData(c["a"].getRepos(this.$route.params.pidx));case 2:e=t.sent,this.$parent.loading=!0,a=e.repos,this.repos=a,a.forEach(function(t){n.nowLimit.push(10),n.shows.push(!1);var e="".concat(t.access_url,"?per_page=100&access_token=").concat(t.access_token);n.$http.get(e).then(function(e){t.commits=e.data,t.commits.forEach(function(e,a){return n.getFilter(e,a,t)}),n.$forceUpdate()})});case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getFilter:function(t,e,a){var n=t.sha,r=t.commit.author.name,s=t.commit.author.date,c=t.author?t.author.avatar_url:"",i=t.commit.message,o=t.html_url;a.commits[e]={sha:n,name:r,image:c,message:i,register_date:s,html_url:o}},matchCommit:function(t){this.$parent.matchingOn(!0,t)},limitSet:function(t,e){this.$set(this.nowLimit,t,e)},showSet:function(t){this.$set(this.shows,t,!this.shows[t])}}}),l=u,p=(a("fae4"),a("2877")),m=Object(p["a"])(l,i,o,!1,null,"25a3cd2a",null);m.options.__file="github-repos.vue";var f=m.exports,h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"task-list"},[a("div",{staticClass:"list-header float-wrap"},[a("p",{staticClass:"cnt"},[t._v(t._s(t.tasks.length)+"개의 task가 존재합니다.")]),a("div",{staticClass:"color-description"},t._l(["진행","완료","에러"],function(e,n){return a("span",{key:n,staticClass:"color-label workflow",class:"color"+(n+1)+" "+(t.colorState===n?"active":"")},[a("span",{domProps:{innerHTML:t._s(e)},on:{click:function(e){t.workflowSelect(n)}}})])}))]),t.tasks.length?a("div",[t.$parent.matching.state?a("div",{staticClass:"matching"},[a("div",[t._v("["+t._s(t.$parent.matching.commit.message)+"] 과 매칭할 Task를 선택해주세요")]),a("div",{staticClass:"btns"},[t.matchList.length?a("a",{staticClass:"btn white mini",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.matchingComplete(e)}}},[t._v("완료")]):t._e(),a("a",{staticClass:"btn white mini",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.matchingOff(e)}}},[t._v("취소")])])]):t._e(),a("ul",{staticClass:"float-wrap"},t._l(t.tasks,function(e,n){return null===t.colorState||null!==t.colorState&&e.state===t.colorState?a("li",{key:n},[a("dl",{class:{active:-1!==t.matchList.indexOf(e.tidx)},on:{click:function(a){a.preventDefault(),t.$parent.matching.state?t.matchSelect(e.tidx):t.$router.push("/task/view/"+e.tidx)}}},[a("dt",{staticClass:"title"},[a("span",{class:"color-label color"+(e.state+1)}),a("span",{staticClass:"task-name",domProps:{innerHTML:t._s(e.title)}}),a("span",{staticClass:"comment_cnt",domProps:{innerHTML:t._s(e.comment_cnt)}})]),a("dd",[a("p",{staticClass:"list-content"},[t._m(0,!0),a("span",{domProps:{innerHTML:t._s(t.contentPreview(e.description,20))}})]),a("p",{staticClass:"date range"},[t._m(1,!0),a("span",{domProps:{innerHTML:t._s(t.getRange(e.start_date,e.limit_date))}}),a("span",{staticClass:"remaining",class:t.getRemaining(e.limit_date,!1)<0?"before":"after",domProps:{innerHTML:t._s(t.getRemaining(e.limit_date))}})]),a("p",{staticClass:"date register"},[t._m(2,!0),a("span",[t._v(t._s(t.moment(e.register_date).format("M. D HH:mm")))])])])])]):t._e()}))]):a("p",{staticClass:"none"},[t._v("task가 존재하지 않습니다.")])])},d=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"fas fa-align-left"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"far fa-clock"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("span",{staticClass:"icon"},[a("i",{staticClass:"far fa-calendar-alt"})])}],g=(a("6b54"),a("0a69")),v={created:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:g["a"].init(this),g["a"].getList();case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),computed:{tasks:function(){return this.$store.state.taskList}},data:function(){return{matchList:[],colorState:null}},methods:{matchSelect:function(t){var e=this.matchList,a=e.indexOf(t);-1===a?e.push(t):e.splice(a,1),this.$forceUpdate()},matchingComplete:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.$parent.matching.commit,e.register_date=this.moment(new Date(e.register_date)).format("YYYY-MM-DD HH:mm:00"),e.tidx=this.matchList.toString(),t.next=5,this.getApiData(c["a"].postTaskCommit(e));case 5:if(a=t.sent,!a.msg){t.next=9;break}return alert(a.msg),t.abrupt("return");case 9:alert("task와 commit을 매칭하였습니다."),this.matchList=[],this.matchingOff();case 12:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),matchingOff:function(){this.matchList=[],this.$parent.matchingOff()},workflowSelect:function(t){this.colorState=t===this.colorState?null:t}}},k=v,_=(a("8199"),Object(p["a"])(k,h,d,!1,null,"2e913ba4",null));_.options.__file="list.vue";var b=_.exports,y=a("c428"),C=a("0ba4"),w={components:{projectGithubRepos:f,taskList:b,customLoading:y["default"],taskTree:C["default"]},computed:{projectData:function(){return this.$store.state.projectData}},created:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.$route.params.pidx,t.next=3,this.getApiData(c["a"].getProject(e));case 3:a=t.sent,this.$store.commit("setState",["projectData",a.project]),this.$store.commit("setState",["pidx",a.project.idx]);case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),data:function(){return{matching:{state:!1,commit:null},loading:!1,treeOpen:!1}},methods:{copyToken:function(){var t=document.createElement("input");t.type="text",t.value=this.projectData.access_token,t.id="copy",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove(),alert("토큰이 복사되었습니다.")},matchingOn:function(t,e){this.matching={state:t,commit:e}},matchingOff:function(){this.matching={state:!1,commit:null}}}},x=w,L=(a("06ac"),Object(p["a"])(x,n,r,!1,null,null,null));L.options.__file="view.vue";e["default"]=L.exports},ac6a:function(t,e,a){for(var n=a("cadf"),r=a("0d58"),s=a("2aba"),c=a("7726"),i=a("32e9"),o=a("84f2"),u=a("2b4c"),l=u("iterator"),p=u("toStringTag"),m=o.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=r(f),d=0;d<h.length;d++){var g,v=h[d],k=f[v],_=c[v],b=_&&_.prototype;if(b&&(b[l]||i(b,l,m),b[p]||i(b,p,v),o[v]=m,k))for(g in n)b[g]||s(b,g,n[g],!0)}},b314:function(t,e,a){},b899:function(t,e,a){"use strict";var n=a("ca48"),r=a.n(n);r.a},bee2:function(t,e,a){"use strict";function n(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function r(t,e,a){return e&&n(t.prototype,e),a&&n(t,a),t}a.d(e,"a",function(){return r})},ca48:function(t,e,a){},d4ec:function(t,e,a){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}a.d(e,"a",function(){return n})},fae4:function(t,e,a){"use strict";var n=a("6a0f"),r=a.n(n);r.a}}]);
//# sourceMappingURL=chunk-210fdbf0.fbd04535.js.map