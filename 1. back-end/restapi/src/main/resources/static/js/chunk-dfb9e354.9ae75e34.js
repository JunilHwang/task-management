(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dfb9e354","chunk-3572c70a"],{"06ac":function(t,e,n){"use strict";var a=n("1645"),r=n.n(a);r.a},"0a69":function(t,e,n){"use strict";n("96cf");var a=n("1da1"),r=n("d4ec"),s=n("bee2"),i=(n("cadf"),n("551c"),n("097d"),n("5a8b")),c=function(){function t(){Object(r["a"])(this,t)}return Object(s["a"])(t,null,[{key:"init",value:function(e){t.instance=e}},{key:"getList",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(n){var a,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.instance,e.next=3,a.getApiData(i["a"].getTaskList(n||a.$route.params.pidx));case 3:return r=e.sent,a.$store.commit("setState",["taskList",r.list]),e.abrupt("return",r.list);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(n){var a,r,s,c,o,u,l,m,p,f;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.instance,r=n.target,s=r.title.value,c=r.parent.value,o="".concat(r.start.value," ").concat(r.start_h.value,":").concat(r.start_m.value,":00"),u="".concat(r.limit.value," ").concat(r.limit_h.value,":").concat(r.limit_m.value,":00"),l=r.description.value,m=a.$route.params.pidx,p={pidx:m,parent:c,title:s,start_date:o,limit_date:u,description:l},e.next=6,a.getApiData(i["a"].postTask(p));case 6:return e.next=8,a.getApiData(i["a"].getTaskList(a.$route.params.pidx));case 8:f=e.sent,a.$store.commit("setState",["taskList",f.list]),a.$store.commit("closeLayer"),alert("완료되었습니다.");case 12:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"setState",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(n){var a,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.instance,r=a.$route.params.tidx||a.task.tidx,e.next=4,a.getApiData(i["a"].putTaskState({state:n,tidx:r}));case 4:t.getOne();case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getOne",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var n,a,r,s,c=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=c.length>0&&void 0!==c[0]?c[0]:null,a=t.instance,r=n||a.$route.params.tidx,e.next=5,a.getApiData(i["a"].getTask(r));case 5:return s=e.sent,null==n&&a.$store.commit("setState",["nowTask",s.task]),e.abrupt("return",s.task);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getMember",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var n,a,r,s,c=arguments;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=c.length>0&&void 0!==c[0]?c[0]:null,a=t.instance,r={tidx:n||a.$store.state.nowTask.tidx,midx:a.$store.state.member.midx},e.next=5,a.getApiData(i["a"].getTaskMember(r));case 5:return s=e.sent,null===n&&a.$store.commit("setState",["taskMember",s.list]),e.abrupt("return",s.list);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"delete",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(confirm("정말로 삭제하시겠습니까?")){e.next=2;break}return e.abrupt("return");case 2:return n=t.instance,e.next=5,n.getApiData(i["a"].deleteTask(n.task.tidx));case 5:n.$router.push("/project/view/"+n.task.pidx);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"update",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(n){var a,r,s,c,o,u,l,m;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a=t.instance,r=n.target,s=r.title.value,c="".concat(r.start.value," ").concat(r.start_h.value,":").concat(r.start_m.value,":00"),o="".concat(r.limit.value," ").concat(r.limit_h.value,":").concat(r.limit_m.value,":00"),u=r.description.value,l=a.tidx,m={tidx:l,title:s,start_date:c,limit_date:o,description:u},e.next=6,a.getApiData(i["a"].putTask(m));case 6:alert("완료되었습니다."),a.$store.commit("closeLayer"),t.getOne(),null!==a.calendarConn&&a.updateCalendar(m);case 10:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getCommits",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var n,a,r,s,c;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.instance,a=n.task,r=a.tidx,s=a.parent,e.next=6,n.getApiData(i["a"].getCommits(r));case 6:if(c=e.sent,!a.parent){e.next=13;break}return e.next=10,t.getOne(s);case 10:e.t0=e.sent,e.next=14;break;case 13:e.t0=null;case 14:n.parent=e.t0,n.commits=c.commits;case 16:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getOnCalendar",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){var n,a,r,s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.instance,a=n.task.tidx,r=n.$store.state.member.midx,e.next=5,n.getApiData(i["a"].getTaskOnCalendar({tidx:a,midx:r}));case 5:s=e.sent,n.calendarConn=s.data;case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}]),t}();e["a"]=c},"0ba4":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"task-tree"},[n("a",{staticClass:"close",attrs:{href:"#"},on:{click:function(e){t.$parent.treeOpen=!1}}},[t._v("X")]),n("span",{staticClass:"middle"}),n("taskTreeCard",{attrs:{tree:t.tree[0].children,step:0,max:t.max,parent:0}})],1)},r=[],s=(n("ac6a"),n("cadf"),n("551c"),n("097d"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{class:"step"+(t.step+1)+" "+(t.max===t.step?"last":"")},t._l(t.tree,function(e,a,r){return n("li",{key:r,class:{last:!t.emptyCheck(e.children),first:0===t.step}},[t.step>0?n("span",{staticClass:"line before"}):t._e(),t.step>0?n("span",{staticClass:"line after"}):t._e(),n("div",{class:"color"+(e.data.state+1),on:{click:function(n){t.previewTask(e.data)}}},[t._v("\n      "+t._s(e.data.title)+"\n    ")]),t.emptyCheck(e.children)?n("taskTreeCard",{attrs:{tree:e.children,step:t.step+1,max:t.max}}):t._e()],1)}))}),i=[],c=(n("456d"),{name:"taskTreeCard",components:{taskTreeCard:m},methods:{previewTask:function(t){this.$store.commit("setState",["nowTask",t]),this.$store.commit("openLayer","taskMiniView")},emptyCheck:function(t){var e=0;return Object.keys(t).map(function(){e++}),e}},props:["tree","step","max","parent"]}),o=c,u=(n("c22b"),n("2877")),l=Object(u["a"])(o,s,i,!1,null,"01a06359",null);l.options.__file="tree-card.vue";var m=l.exports,p={components:{taskTreeCard:m},created:function(){var t=this.$store.state.taskList,e=[];t.forEach(function(t){void 0===e[t.depth]&&(e[t.depth]=[]),e[t.depth].push(t)});var n={0:{children:{}}},a=e.length,r=function t(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;r<a&&e[r].forEach(function(e){if(e.parent===s){n[s].children[e.tidx]={children:{},data:e};var a=n[e.parent].children;t(a,r+1,e.tidx)}})};r(n),this.tree=n,this.max=a},data:function(){return{tree:{},max:0}}},f=p,d=(n("7cfb"),Object(u["a"])(f,a,r,!1,null,"5d1e85e2",null));d.options.__file="tree.vue";e["default"]=d.exports},"0bfb":function(t,e,n){"use strict";var a=n("cb7c");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},1645:function(t,e,n){},"1cda":function(t,e,n){},3846:function(t,e,n){n("9e1e")&&"g"!=/./g.flags&&n("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:n("0bfb")})},"416c":function(t,e,n){},"456d":function(t,e,n){var a=n("4bf8"),r=n("0d58");n("5eda")("keys",function(){return function(t){return r(a(t))}})},"5a8b":function(t,e,n){"use strict";var a=n("d4ec"),r=n("bee2"),s=(n("cadf"),n("551c"),n("097d"),n("bc3a")),i=n.n(s),c="/api",o=function(){function t(){Object(a["a"])(this,t)}return Object(r["a"])(t,[{key:"postMember",value:function(t){return i.a.post("".concat(c,"/member"),t)}},{key:"getMemberOnProject",value:function(t){return i.a.get("".concat(c,"/memberOnProject/").concat(t))}},{key:"putMemberGoogleToken",value:function(t){return i.a.put("".concat(c,"/member/google-token"),t)}},{key:"getProjectList",value:function(t){return i.a.get("".concat(c,"/projects/").concat(t))}},{key:"getProject",value:function(t){return i.a.get("".concat(c,"/project/").concat(t))}},{key:"postProject",value:function(t){return i.a.post("".concat(c,"/project"),t)}},{key:"postProjectAccess",value:function(t){return i.a.post("".concat(c,"/project/access"),t)}},{key:"putProject",value:function(t){return i.a.put("".concat(c,"/project"),t)}},{key:"putProjectStar",value:function(t){return i.a.put("".concat(c,"/project/star"),t)}},{key:"deleteProject",value:function(t){return i.a.delete("".concat(c,"/project/").concat(t))}},{key:"getTask",value:function(t){return i.a.get("".concat(c,"/task/").concat(t))}},{key:"getTaskList",value:function(t){return i.a.get("".concat(c,"/tasks/").concat(t))}},{key:"getTaskListRecently",value:function(t){return i.a.get("".concat(c,"/task/recently/").concat(t))}},{key:"getTaskByRange",value:function(t){return i.a.get("".concat(c,"/task-range"),{params:t})}},{key:"postTask",value:function(t){return i.a.post("".concat(c,"/task"),t)}},{key:"putTask",value:function(t){return i.a.put("".concat(c,"/task"),t)}},{key:"putTaskState",value:function(t){var e=["process","complete","error"],n="".concat(c,"/task/").concat(e[t.state]);return i.a.put("".concat(n,"/").concat(t.tidx))}},{key:"getTaskMember",value:function(t){return i.a.get("".concat(c,"/task/member"),{params:t})}},{key:"postTaskMember",value:function(t){return i.a.post("".concat(c,"/task/member"),t)}},{key:"deleteTaskMember",value:function(t){return i.a.delete("".concat(c,"/task/member"),{params:t})}},{key:"getTaskOnCalendar",value:function(t){return i.a.get("".concat(c,"/task-on-calendar"),{params:t})}},{key:"postTaskOnCalendar",value:function(t){return i.a.post("".concat(c,"/task-on-calendar"),t)}},{key:"putTaskOnCalendar",value:function(t){return i.a.put("".concat(c,"/task-on-calendar"),{params:t})}},{key:"deleteTaskOnCalendar",value:function(t){return i.a.delete("".concat(c,"/task-on-calendar/").concat(t))}},{key:"deleteTask",value:function(t){return i.a.delete("".concat(c,"/task/").concat(t))}},{key:"putViewDate",value:function(){throw"don't putViewDate impolemented"}},{key:"getCommentList",value:function(t){return i.a.get("".concat(c,"/comments/").concat(t))}},{key:"getCommentRecentlyList",value:function(t){return i.a.get("".concat(c,"/comment/recently/").concat(t))}},{key:"getComment",value:function(t){return i.a.get("".concat(c,"/comment/").concat(t))}},{key:"postComment",value:function(t){return i.a.post("".concat(c,"/comment/").concat(t.tidx),t)}},{key:"postCommentReply",value:function(t){return i.a.post("".concat(c,"/comment/reply"),t)}},{key:"putComment",value:function(t){return i.a.put("".concat(c,"/comment"),t)}},{key:"deleteComment",value:function(t){return i.a.delete("".concat(c,"/comment/").concat(t))}},{key:"getRepos",value:function(t){return i.a.get("".concat(c,"/github/repos/").concat(t))}},{key:"getCommits",value:function(t){return i.a.get("".concat(c,"/github/commit/").concat(t))}},{key:"postRepo",value:function(t){return i.a.post("".concat(c,"/github/repo"),t)}},{key:"postTaskCommit",value:function(t){return i.a.post("".concat(c,"/github/match"),t)}},{key:"deleteRepo",value:function(t){return i.a.delete("".concat(c,"/github/repo/").concat(t))}},{key:"deleteCommitOnTask",value:function(t,e){return i.a.delete("".concat(c,"/github/match/").concat(t,"/").concat(e))}}]),t}();e["a"]=new o},"5eda":function(t,e,n){var a=n("5ca1"),r=n("8378"),s=n("79e5");t.exports=function(t,e){var n=(r.Object||{})[t]||Object[t],i={};i[t]=e(n),a(a.S+a.F*s(function(){n(1)}),"Object",i)}},6919:function(t,e,n){"use strict";var a=n("76e9"),r=n.n(a);r.a},"6b54":function(t,e,n){"use strict";n("3846");var a=n("cb7c"),r=n("0bfb"),s=n("9e1e"),i="toString",c=/./[i],o=function(t){n("2aba")(RegExp.prototype,i,t,!0)};n("79e5")(function(){return"/a/b"!=c.call({source:"a",flags:"b"})})?o(function(){var t=a(this);return"/".concat(t.source,"/","flags"in t?t.flags:!s&&t instanceof RegExp?r.call(t):void 0)}):c.name!=i&&o(function(){return c.call(this)})},"6b6f":function(t,e,n){"use strict";var a=n("ccae"),r=n.n(a);r.a},7220:function(t,e,n){"use strict";var a=n("1cda"),r=n.n(a);r.a},"76e9":function(t,e,n){},"7cfb":function(t,e,n){"use strict";var a=n("9753"),r=n.n(a);r.a},"7f7f":function(t,e,n){var a=n("86cc").f,r=Function.prototype,s=/^\s*function ([^ (]*)/,i="name";i in r||n("9e1e")&&a(r,i,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},8388:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"project-view-wrap"},[n("header",{staticClass:"project-header"},[n("h4",{staticClass:"content-title",domProps:{innerHTML:t._s(t.projectData.title)}}),n("p",{domProps:{innerHTML:t._s(t.projectData.description)}})]),n("div",{staticClass:"btn-group tree"},[n("a",{staticClass:"btn mobile-btn-full submit",attrs:{href:"#"},domProps:{innerHTML:t._s("Task Tree")},on:{click:function(e){t.treeOpen=!0}}})]),"undefined"!==typeof t.projectData.pidx?n("section",{staticClass:"project-view"},[n("section",{staticClass:"tasks"},[n("taskList",{attrs:{matching:t.matching}})],1),n("projectGithubRepos"),n("customLoading",{attrs:{loading:t.loading}}),n("div",{staticClass:"btn-group mobile-btn-group"},[n("router-link",{staticClass:"btn mobile-btn-full point",attrs:{to:"/"}},[t._v("프로젝트 목록")]),n("router-link",{staticClass:"btn mobile-btn-full point",attrs:{to:"/project/setting/"+t.projectData.pidx}},[t._v("프로젝트 설정")]),n("a",{staticClass:"btn mobile-btn-full submit",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.$store.commit("openLayer","taskCreate")}}},[t._v("테스크 추가")]),n("a",{staticClass:"btn mobile-btn-full submit",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.copyToken(e)}}},[t._v("토큰 복사")])],1)],1):t._e(),t.treeOpen?n("taskTree"):t._e()],1)},r=[],s=(n("96cf"),n("1da1")),i=(n("cadf"),n("551c"),n("097d"),n("5a8b")),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.repos.length?n("section",{staticClass:"project-github-repos"},t._l(t.repos,function(e,a){return n("article",{key:a},[n("header",[n("div",{staticClass:"title"},[t._m(0,!0),n("strong",{staticClass:"repo-name",domProps:{innerHTML:t._s(e.full_name)}}),n("span",{staticClass:"repo-desc",domProps:{innerHTML:t._s(e.description)}})]),n("div",{staticClass:"sel"},[n("a",{class:{active:t.shows[a]},attrs:{href:"#"},domProps:{innerHTML:t._s(t.shows[a]?"접기":"열기")},on:{click:function(e){e.preventDefault(),t.showSet(a)}}}),t._l(t.limits,function(e,r){return n("a",{key:r,class:{active:t.nowLimit[a]===e},attrs:{href:"#"},domProps:{innerHTML:t._s(e+"개")},on:{click:function(n){n.preventDefault(),t.limitSet(a,e)}}})})],2)]),t.shows[a]?n("ul",[t._l(e.commits,function(e,r){return r<t.nowLimit[a]?n("li",{key:r,class:{active:t.$parent.matching.state&&t.$parent.matching.commit==e}},[n("span",{staticClass:"image",style:{backgroundImage:"url("+e.image+")"}}),n("span",{staticClass:"author",domProps:{innerHTML:t._s(e.name)}}),n("span",{staticClass:"message"},[n("a",{attrs:{href:e.html_url,target:"_blank"},domProps:{innerHTML:t._s(e.message)}})]),n("span",{staticClass:"register_date",domProps:{innerHTML:t._s(t.getFlowDate(e.register_date))}}),n("a",{staticClass:"plug",attrs:{href:"#"},on:{click:function(n){n.preventDefault(),t.matchCommit(e)}}},[n("i",{staticClass:"fas fa-plug"})])]):t._e()}),e.commits?t._e():n("li",[t._v("\n        등록된 commit이 없습니다.\n      ")])],2):t._e()])})):t._e()},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"git-icon"},[n("i",{staticClass:"fab fa-github"})])}],u=(n("7f7f"),n("ac6a"),{created:function(){this.getRepos()},data:function(){return{repos:[],nowLimit:[],shows:[],limits:[10,30,50,100]}},methods:{getRepos:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,n,a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getApiData(i["a"].getRepos(this.$route.params.pidx));case 2:e=t.sent,this.$parent.loading=!0,n=e.repos,this.repos=n,n.forEach(function(t){a.nowLimit.push(10),a.shows.push(!1);var e="".concat(t.access_url,"?per_page=100&access_token=").concat(t.access_token);a.$http.get(e).then(function(e){t.commits=e.data,t.commits.forEach(function(e,n){return a.getFilter(e,n,t)}),a.$forceUpdate()})});case 7:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getFilter:function(t,e,n){var a=t.sha,r=t.commit.author.name,s=t.commit.author.date,i=t.author?t.author.avatar_url:"",c=t.commit.message,o=t.html_url;n.commits[e]={sha:a,name:r,image:i,message:c,register_date:s,html_url:o}},matchCommit:function(t){this.$parent.matchingOn(!0,t)},limitSet:function(t,e){this.$set(this.nowLimit,t,e)},showSet:function(t){this.$set(this.shows,t,!this.shows[t])}}}),l=u,m=(n("6919"),n("2877")),p=Object(m["a"])(l,c,o,!1,null,"d928606c",null);p.options.__file="github-repos.vue";var f=p.exports,d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"task-list"},[n("div",{staticClass:"list-header float-wrap"},[n("p",{staticClass:"cnt"},[t._v(t._s(t.tasks.length)+"개의 task가 존재합니다.")]),n("div",{staticClass:"color-description"},[n("a",{staticClass:"btn mini",class:t.mine?"default":"submit",attrs:{href:"#"},domProps:{innerHTML:t._s(t.mine?"전체":"담당")},on:{click:function(e){e.preventDefault(),t.mine=!t.mine}}}),n("a",{staticClass:"btn mini",class:t.folding?"default":"submit",attrs:{href:"#"},domProps:{innerHTML:t._s(t.folding?"접기":"열기")},on:{click:function(e){e.preventDefault(),t.folding=!t.folding}}}),t._l(["진행","완료","에러"],function(e,a){return n("span",{key:a,staticClass:"color-label workflow",class:"color"+(a+1)+" "+(t.colorState===a?"active":"")},[n("span",{domProps:{innerHTML:t._s(e)},on:{click:function(e){t.workflowSelect(a)}}})])})],2)]),t.tasks.length?n("div",[t.$parent.matching.state?n("div",{staticClass:"matching"},[n("div",[t._v("["+t._s(t.$parent.matching.commit.message)+"] 과 매칭할 Task를 선택해주세요")]),n("div",{staticClass:"btns"},[t.matchList.length?n("a",{staticClass:"btn white mini",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.matchingComplete(e)}}},[t._v("완료")]):t._e(),n("a",{staticClass:"btn white mini",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.matchingOff(e)}}},[t._v("취소")])])]):t._e(),n("ul",{staticClass:"float-wrap"},t._l(t.tasks,function(e,a){return(null===t.colorState||null!==t.colorState&&e.state===t.colorState)&&t.getMine(e.midxs)?n("li",{key:a},[n("taskCard",{attrs:{task:e,folding:t.folding}})],1):t._e()}))]):n("p",{staticClass:"none"},[t._v("task가 존재하지 않습니다.")])])},h=[],g=(n("6b54"),n("0a69")),k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("dl",{class:{active:-1!==t.$parent.matchList.indexOf(t.task.tidx)},on:{click:function(e){e.preventDefault(),t.$parent.$parent.matching.state?t.$parent.matchSelect(t.task.tidx):t.$router.push("/task/view/"+t.task.tidx)}}},[n("dt",{staticClass:"title"},[n("span",{class:"color-label color"+(t.task.state+1)}),n("span",{staticClass:"task-name",domProps:{innerHTML:t._s(t.task.title)}}),n("span",{staticClass:"comment_cnt",domProps:{innerHTML:t._s(t.task.comment_cnt)}}),t.taskMember?n("p",{staticClass:"members"},t._l(t.taskMember,function(t,e){return n("span",{key:e,staticClass:"images",style:{backgroundImage:"url("+t.photo_src+")"}})})):t._e()]),n("dd",{directives:[{name:"show",rawName:"v-show",value:t.folding,expression:"folding"}]},[n("p",{staticClass:"list-content"},[t._m(0),n("span",{domProps:{innerHTML:t._s(t.contentPreview(t.task.description,20))}})]),n("p",{staticClass:"date range"},[t._m(1),n("span",{domProps:{innerHTML:t._s(t.getRange(t.task.start_date,t.task.limit_date))}}),n("span",{staticClass:"remaining",class:t.getRemaining(t.task.limit_date,!1)<0?"before":"after",domProps:{innerHTML:t._s(t.getRemaining(t.task.limit_date))}})]),n("p",{staticClass:"date register"},[t._m(2),n("span",[t._v(t._s(t.moment(t.task.register_date).format("M. D HH:mm")))])])])])},v=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fas fa-align-left"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"far fa-clock"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"far fa-calendar-alt"})])}],b={props:["task","folding"],created:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return g["a"].init(this),t.next=3,g["a"].getMember(this.task.tidx);case 3:this.taskMember=t.sent;case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),data:function(){return{taskMember:[]}}},_=b,y=(n("6b6f"),Object(m["a"])(_,k,v,!1,null,"95626314",null));y.options.__file="card.vue";var C=y.exports,x={created:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:g["a"].init(this),g["a"].getList();case 2:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),components:{taskCard:C},computed:{tasks:function(){return this.$store.state.taskList}},data:function(){return{matchList:[],colorState:null,folding:!1,mine:!1}},methods:{matchSelect:function(t){var e=this.matchList,n=e.indexOf(t);-1===n?e.push(t):e.splice(n,1),this.$forceUpdate()},matchingComplete:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.$parent.matching.commit,e.register_date=this.moment(new Date(e.register_date)).format("YYYY-MM-DD HH:mm:00"),e.tidx=this.matchList.toString(),t.next=5,this.getApiData(i["a"].postTaskCommit(e));case 5:if(n=t.sent,!n.msg){t.next=9;break}return alert(n.msg),t.abrupt("return");case 9:alert("task와 commit을 매칭하였습니다."),this.matchList=[],this.matchingOff();case 12:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),matchingOff:function(){this.matchList=[],this.$parent.matchingOff()},workflowSelect:function(t){this.colorState=t===this.colorState?null:t},getMine:function(t){return!this.mine||this.mine&&t&&-1!==t.indexOf(this.$store.state.member.midx)}}},w=x,L=(n("7220"),Object(m["a"])(w,d,h,!1,null,"51c2b215",null));L.options.__file="list.vue";var T=L.exports,j=n("c428"),O=n("0ba4"),$={components:{projectGithubRepos:f,taskList:T,customLoading:j["default"],taskTree:O["default"]},computed:{projectData:function(){return this.$store.state.projectData}},created:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.$route.params.pidx,t.next=3,this.getApiData(i["a"].getProject(e));case 3:n=t.sent,this.$store.commit("setState",["projectData",n.project]),this.$store.commit("setState",["pidx",n.project.idx]);case 6:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),data:function(){return{matching:{state:!1,commit:null},loading:!1,treeOpen:!1}},methods:{copyToken:function(){var t=document.createElement("input");t.type="text",t.value=this.projectData.access_token,t.id="copy",document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove(),alert("토큰이 복사되었습니다.")},matchingOn:function(t,e){this.matching={state:t,commit:e}},matchingOff:function(){this.matching={state:!1,commit:null}}}},R=$,S=(n("06ac"),Object(m["a"])(R,a,r,!1,null,null,null));S.options.__file="view.vue";e["default"]=S.exports},9753:function(t,e,n){},ac6a:function(t,e,n){for(var a=n("cadf"),r=n("0d58"),s=n("2aba"),i=n("7726"),c=n("32e9"),o=n("84f2"),u=n("2b4c"),l=u("iterator"),m=u("toStringTag"),p=o.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},d=r(f),h=0;h<d.length;h++){var g,k=d[h],v=f[k],b=i[k],_=b&&b.prototype;if(_&&(_[l]||c(_,l,p),_[m]||c(_,m,k),o[k]=p,v))for(g in a)_[g]||s(_,g,a[g],!0)}},bee2:function(t,e,n){"use strict";function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function r(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}n.d(e,"a",function(){return r})},c22b:function(t,e,n){"use strict";var a=n("416c"),r=n.n(a);r.a},ccae:function(t,e,n){},d4ec:function(t,e,n){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",function(){return a})}}]);
//# sourceMappingURL=chunk-dfb9e354.9ae75e34.js.map