(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66b64db0","chunk-24e0a7fd"],{"28ee":function(t,e,n){},"5a8b":function(t,e,n){"use strict";var a=n("d4ec"),r=n("bee2"),c=(n("cadf"),n("551c"),n("097d"),n("bc3a")),o=n.n(c),s="/api",i=function(){function t(){Object(a["a"])(this,t)}return Object(r["a"])(t,[{key:"postMember",value:function(t){return o.a.post("".concat(s,"/member"),t)}},{key:"getMemberOnProject",value:function(t){return o.a.get("".concat(s,"/memberOnProject/").concat(t))}},{key:"putMemberGoogleToken",value:function(t){return o.a.put("".concat(s,"/member/google-token"),t)}},{key:"getProjectList",value:function(t){return o.a.get("".concat(s,"/projects/").concat(t))}},{key:"getProject",value:function(t){return o.a.get("".concat(s,"/project/").concat(t))}},{key:"postProject",value:function(t){return o.a.post("".concat(s,"/project"),t)}},{key:"postProjectAccess",value:function(t){return o.a.post("".concat(s,"/project/access"),t)}},{key:"putProject",value:function(t){return o.a.put("".concat(s,"/project"),t)}},{key:"putProjectStar",value:function(t){return o.a.put("".concat(s,"/project/star"),t)}},{key:"deleteProject",value:function(t){return o.a.delete("".concat(s,"/project/").concat(t))}},{key:"getTask",value:function(t){return o.a.get("".concat(s,"/task/").concat(t))}},{key:"getTaskList",value:function(t){return o.a.get("".concat(s,"/tasks/").concat(t))}},{key:"getTaskListRecently",value:function(t){return o.a.get("".concat(s,"/task/recently/").concat(t))}},{key:"getTaskByRange",value:function(t){return o.a.get("".concat(s,"/task-range"),{params:t})}},{key:"postTask",value:function(t){return o.a.post("".concat(s,"/task"),t)}},{key:"putTask",value:function(t){return o.a.put("".concat(s,"/task"),t)}},{key:"putTaskState",value:function(t){var e=["process","complete","error"],n="".concat(s,"/task/").concat(e[t.state]);return o.a.put("".concat(n,"/").concat(t.tidx))}},{key:"getTaskMember",value:function(t){return o.a.get("".concat(s,"/task/member"),{params:t})}},{key:"postTaskMember",value:function(t){return o.a.post("".concat(s,"/task/member"),t)}},{key:"deleteTaskMember",value:function(t){return o.a.delete("".concat(s,"/task/member"),{params:t})}},{key:"getTaskOnCalendar",value:function(t){return o.a.get("".concat(s,"/task-on-calendar"),{params:t})}},{key:"postTaskOnCalendar",value:function(t){return o.a.post("".concat(s,"/task-on-calendar"),t)}},{key:"putTaskOnCalendar",value:function(t){return o.a.put("".concat(s,"/task-on-calendar"),{params:t})}},{key:"deleteTaskOnCalendar",value:function(t){return o.a.delete("".concat(s,"/task-on-calendar/").concat(t))}},{key:"deleteTask",value:function(t){return o.a.delete("".concat(s,"/task/").concat(t))}},{key:"putViewDate",value:function(){throw"don't putViewDate impolemented"}},{key:"getCommentList",value:function(t){return o.a.get("".concat(s,"/comments/").concat(t))}},{key:"getCommentRecentlyList",value:function(t){return o.a.get("".concat(s,"/comment/recently/").concat(t))}},{key:"getComment",value:function(t){return o.a.get("".concat(s,"/comment/").concat(t))}},{key:"postComment",value:function(t){return o.a.post("".concat(s,"/comment/").concat(t.tidx),t)}},{key:"postCommentReply",value:function(t){return o.a.post("".concat(s,"/comment/reply"),t)}},{key:"putComment",value:function(t){return o.a.put("".concat(s,"/comment"),t)}},{key:"deleteComment",value:function(t){return o.a.delete("".concat(s,"/comment/").concat(t))}},{key:"getRepos",value:function(t){return o.a.get("".concat(s,"/github/repos/").concat(t))}},{key:"getCommits",value:function(t){return o.a.get("".concat(s,"/github/commit/").concat(t))}},{key:"postRepo",value:function(t){return o.a.post("".concat(s,"/github/repo"),t)}},{key:"postTaskCommit",value:function(t){return o.a.post("".concat(s,"/github/match"),t)}},{key:"deleteRepo",value:function(t){return o.a.delete("".concat(s,"/github/repo/").concat(t))}},{key:"deleteCommitOnTask",value:function(t,e){return o.a.delete("".concat(s,"/github/match/").concat(t,"/").concat(e))}}]),t}();e["a"]=new i},"8be6":function(t,e,n){},"97c5":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"comment-wrap"},[n("CustomLoading",{attrs:{loading:t.loading}}),t.loading?n("commentList",{attrs:{commentList:t.commentList}}):t._e(),t.loading?n("commentWrite",{attrs:{comment:null,type:"write"}}):t._e()],1)},r=[],c=(n("96cf"),n("1da1")),o=n("c428"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("header",{staticClass:"comment-header"},[n("strong",[t._v("댓글 "+t._s(t.commentList.length))])]),n("div",{staticClass:"comment-content"},[t.commentList.length?n("section",t._l(t.commentList,function(e,a){return n("article",{key:a,staticClass:"comment-component",style:{marginLeft:20*e.depth+"px"}},[n("header",[n("div",{staticClass:"writer"},[n("span",{staticClass:"photo",style:"background-image:url("+e.photo_src+")"}),n("strong",{domProps:{innerHTML:t._s(e.writer_name)}})]),n("div",{staticClass:"tag",class:{complete:"완료"===e.tag,error:"에러"===e.tag},domProps:{innerHTML:t._s(e.tag)}}),n("div",{staticClass:"reg_date"},[t._v(t._s(t.getFlowDate(e.register_date))+" 전")])]),n("div",{staticClass:"comment-text",domProps:{innerHTML:t._s((e.content+"").replace(/\n/gi,"<br />"))}}),n("footer",{staticClass:"comment-bottom"},[n("a",{class:{active:e.replySwitch},attrs:{href:"#"},on:{click:function(n){n.preventDefault(),t.toggleReplyComponent(e)}}},[t._v("답글")]),e.writer===t.$store.state.member.id?n("a",{class:{active:e.updateSwitch},attrs:{href:"#"},on:{click:function(n){n.preventDefault(),t.toggleUpdateComponent(e)}}},[t._v("수정")]):t._e(),e.writer===t.$store.state.member.id?n("a",{attrs:{href:"#"},on:{click:function(n){n.preventDefault(),t.commentDelete(e.cidx)}}},[t._v("삭제")]):t._e()]),e.updateSwitch?n("commentWrite",{attrs:{comment:e,type:"update"}}):t._e(),e.replySwitch?n("commentWrite",{attrs:{comment:e,type:"reply"}}):t._e()],1)})):n("p",{staticClass:"comment-component"},[t._v("등록된 댓글이 없습니다.")])])])},i=[],u=n("5a8b"),m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{attrs:{action:"",method:"post"},on:{submit:t.submitComment}},[n("fieldset",[n("legend",[t._v("댓글 작성")]),n("ul",{staticClass:"comment-write"},[n("div",{staticClass:"writer"},[n("div",{staticClass:"profile-box"},[n("span",{staticClass:"profile",style:"background-image:url("+t.$store.state.member.photo_src+")"}),n("span",{staticClass:"name"},[t._v(t._s(t.$store.state.member.name))])]),n("div",{staticClass:"tag-list"},[n("ul",t._l(t.tagList,function(e,a){return n("li",{key:a},[n("label",[n("input",{attrs:{type:"radio",name:"tag"},domProps:{value:e.value,checked:t.setChecked(a,e.value)}}),n("span",{domProps:{innerHTML:t._s(e.text)}})])])}))])]),n("li",{staticClass:"comment-input"},[n("textarea",{attrs:{name:"content",cols:"80",rows:"5",placeholder:"reply"===t.type?"답글을 입력해주세요":"댓글을 입력해주세요",wrap:"virtual",required:""},domProps:{innerHTML:t._s("update"===t.type?t.comment.content:null)}})]),t._m(0)])])])},l=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{staticClass:"comment-button"},[n("button",{attrs:{type:"submit"}},[t._v("댓글등록")])])}],p={props:["comment","type"],data:function(){return{tagList:[{value:"기타",text:"기타"},{value:"에러",text:"에러"},{value:"완료",text:"완료"}]}},methods:{submitComment:function(t){var e={write:this.postComment,update:this.putComment,reply:this.postCommentReply};e[this.type](t.target)},setChecked:function(t,e){return"update"===this.type?e===this.comment.tag:0===t},postComment:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n={tidx:this.$route.params.tidx,parent:0,depth:0,tag:e.tag.value,writer:this.$store.state.member.id,content:e.content.value},t.next=3,this.getApiData(u["a"].postComment(n));case 3:this.$parent.getCommentList(),e.content.value="";case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),putComment:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.comment.tag=e.tag.value,this.comment.content=e.content.value,t.next=4,this.getApiData(u["a"].postComment(this.comment));case 4:this.comment.updateSwitch=!1;case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),postCommentReply:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n={tidx:this.$route.params.tidx,parent:this.comment.cidx,depth:this.comment.depth+1,od:this.comment.od+1,tag:e.tag.value,writer:this.$store.state.member.id,content:e.content.value},t.next=3,this.getApiData(u["a"].postCommentReply(n));case 3:this.$parent.$parent.getCommentList();case 4:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()}},f=p,d=(n("fa9f"),n("2877")),g=Object(d["a"])(f,m,l,!1,null,"6bd46526",null);g.options.__file="write.vue";var h=g.exports,v={components:{commentWrite:h},created:function(){this.$parent.getCommentList()},methods:{toggleUpdateComponent:function(t){t.updateSwitch=!t.updateSwitch,t.replySwitch=!1},toggleReplyComponent:function(t){t.replySwitch=!t.replySwitch,t.updateSwitch=!1},commentDelete:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(confirm("정말로 삭제하시겠습니까?")){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,this.getApiData(u["a"].deleteComment(e));case 4:this.$parent.getCommentList();case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},props:["commentList"]},k=v,y=(n("da10"),Object(d["a"])(k,s,i,!1,null,"4c398c27",null));y.options.__file="list.vue";var b=y.exports,C={components:{commentList:b,commentWrite:h,CustomLoading:o["default"]},created:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.getCommentList();case 1:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),data:function(){return{loading:!1,commentList:[]}},methods:{getCommentList:function(){var t=Object(c["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.t0=this,t.next=3,u["a"].getCommentList(this.$route.params.tidx);case 3:return t.t1=t.sent,t.next=6,t.t0.getApiData.call(t.t0,t.t1);case 6:e=t.sent,e.list.map(function(t){t.updateSwitch=!1,t.replySwitch=!1}),this.commentList=e.list,this.loading=!0;case 10:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}},w=C,_=Object(d["a"])(w,a,r,!1,null,null,null);_.options.__file="index.vue";e["default"]=_.exports},bee2:function(t,e,n){"use strict";function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function r(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}n.d(e,"a",function(){return r})},d4ec:function(t,e,n){"use strict";function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",function(){return a})},da10:function(t,e,n){"use strict";var a=n("8be6"),r=n.n(a);r.a},fa9f:function(t,e,n){"use strict";var a=n("28ee"),r=n.n(a);r.a}}]);
//# sourceMappingURL=chunk-66b64db0.8b2aeb6a.js.map