(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f7bbec2"],{"072e":function(t,e,s){},"15e6":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",[s("div",{staticClass:"setting-container"},[t._m(0),s("ul",{staticClass:"connected-list"},t._l(t.repos,function(e,a){return s("li",{key:a},[s("a",{staticClass:"close",attrs:{href:"#"},on:{click:function(s){t.deleteRepo(e.gridx)}}},[s("i",{staticClass:"fas fa-times-circle"})]),s("p",{staticClass:"full_name"},[t._m(1,!0),s("span",{staticClass:"icon-after",domProps:{innerHTML:t._s(e.full_name)}})]),s("p",{staticClass:"description"},[t._m(2,!0),s("span",{staticClass:"icon-after",domProps:{innerHTML:t._s(e.description||"설명이 없습니다.")}})]),s("p",{staticClass:"register_date"},[t._m(3,!0),s("span",{staticClass:"icon-after",domProps:{innerHTML:t._s(t.moment(e.register_date).format("MM. DD HH:mm"))}})])])})),s("form",{attrs:{action:"",method:"post"},on:{submit:t.openGitRepositoryAdd}},[t._m(4)])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",{staticClass:"setting-title"},[s("h3",[t._v("Github 연동")]),s("span",[t._v("Connect github")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon-wrap"},[s("i",{staticClass:"fab fa-github"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon-wrap"},[s("i",{staticClass:"fas fa-align-left"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"icon-wrap"},[s("i",{staticClass:"far fa-calendar-alt"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("fieldset",[s("ul",{staticClass:"fields"},[s("li",[s("label",{staticClass:"input-label"},[s("span",{staticClass:"pre"},[s("i",{staticClass:"fas fa-file-signature"})]),s("input",{staticClass:"full-width",attrs:{type:"text",name:"github_token",required:""}}),s("span",{staticClass:"lbl"},[t._v("Github Personal access tokens 입력")])])]),s("li",[s("button",{staticClass:"btn btn-full submit",attrs:{type:"submit"}},[t._v("Repository 선택")])]),s("li",[s("a",{staticClass:"btn btn-full default",attrs:{href:"https://github.com/settings/tokens/new",target:"_blank"}},[t._v("access token 생성")])])])])}],i=(s("96cf"),s("1da1")),r=(s("cadf"),s("551c"),s("097d"),s("5a8b")),c={computed:{repos:function(){return this.$store.state.repos}},created:function(){this.getRepos()},data:function(){return{pidx:this.$route.params.pidx}},methods:{openGitRepositoryAdd:function(t){this.$store.commit("setState",["githubToken",t.target.github_token.value]),this.$store.commit("openLayer","githubRepository")},getRepos:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getApiData(r["a"].getRepos(this.pidx));case 2:e=t.sent,this.$store.commit("setState",["repos",e.repos]);case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),deleteRepo:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(confirm("정말로 삭제하시겠습니까?")){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,this.getApiData(r["a"].deleteRepo(e));case 4:this.getRepos();case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},props:["projectData"]},o=c,l=(s("30e4"),s("2877")),u=Object(l["a"])(o,a,n,!1,null,null,null);u.options.__file="setting-github.vue";e["default"]=u.exports},"30e4":function(t,e,s){"use strict";var a=s("072e"),n=s.n(a);n.a}}]);
//# sourceMappingURL=chunk-1f7bbec2.cf7d4e8f.js.map