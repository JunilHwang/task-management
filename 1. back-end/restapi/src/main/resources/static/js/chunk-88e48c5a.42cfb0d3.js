(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-88e48c5a"],{"0ba4":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"task-tree"},[a("a",{staticClass:"close",attrs:{href:"#"},on:{click:function(e){t.$parent.treeOpen=!1}}},[t._v("X")]),a("span",{staticClass:"middle"}),a("taskTreeCard",{attrs:{tree:t.tree[0].children,step:0,max:t.max,parent:0}})],1)},n=[],r=(a("ac6a"),a("cadf"),a("551c"),a("097d"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ul",{class:"step"+(t.step+1)},t._l(t.tree,function(e,i){return a("li",{key:i},[a("div",{class:"color"+(e.data.state+1),on:{click:function(a){t.previewTask(e.data)}}},[t._v("\n      "+t._s(e.data.title)+"\n    ")]),t.step<t.max?a("taskTreeCard",{attrs:{tree:e.children,step:t.step+1,max:t.max}}):t._e()],1)}))}),s=[],c={name:"taskTreeCard",components:{taskTreeCard:d},methods:{previewTask:function(t){this.$store.commit("setState",["nowTask",t]),this.$store.commit("openLayer","taskMiniView")}},props:["tree","step","max","parent"]},o=c,l=(a("b899"),a("2877")),u=Object(l["a"])(o,r,s,!1,null,"2b43827b",null);u.options.__file="tree-card.vue";var d=u.exports,p={components:{taskTreeCard:d},created:function(){var t=this.$store.state.taskList,e=[];t.forEach(function(t){void 0===e[t.depth]&&(e[t.depth]=[]),e[t.depth].push(t)});var a={0:{children:{}}},i=e.length,n=function t(a){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;n<i&&e[n].forEach(function(e){if(e.parent===r){a[r].children[e.tidx]={children:{},data:e};var i=a[e.parent].children;t(i,n+1,e.tidx)}})};n(a),this.tree=a,this.max=i},data:function(){return{tree:{},max:0}}},f=p,h=(a("804e"),Object(l["a"])(f,i,n,!1,null,"4147e038",null));h.options.__file="tree.vue";e["default"]=h.exports},"0bba":function(t,e,a){},"804e":function(t,e,a){"use strict";var i=a("0bba"),n=a.n(i);n.a},ac6a:function(t,e,a){for(var i=a("cadf"),n=a("0d58"),r=a("2aba"),s=a("7726"),c=a("32e9"),o=a("84f2"),l=a("2b4c"),u=l("iterator"),d=l("toStringTag"),p=o.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},h=n(f),L=0;L<h.length;L++){var m,v=h[L],S=f[v],T=s[v],k=T&&T.prototype;if(k&&(k[u]||c(k,u,p),k[d]||c(k,d,v),o[v]=p,S))for(m in i)k[m]||r(k,m,i[m],!0)}},b899:function(t,e,a){"use strict";var i=a("ca48"),n=a.n(i);n.a},ca48:function(t,e,a){}}]);
//# sourceMappingURL=chunk-88e48c5a.42cfb0d3.js.map