webpackJsonp([2],{GMrE:function(t,e,n){"use strict";e.a={fetch:function(t){t.store.dispatch("loadTeams")},name:"team-page",computed:{teams:function(){return this.$store.getters.teams.filter(function(t,e){return e<30})}}}},N2Tf:function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,"h1,h2{font-weight:400}ul{list-style-type:none;padding:0}li{display:inline-block;margin:0 10px}a{color:#35495e}",""])},XBO2:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[t.teams?n("div",t._l(t.teams,function(e){return n("div",[n("router-link",{attrs:{to:"teams/"+e.team_id}},[t._v(t._s(e.name)+" - "+t._s(e.rating)+" - "+t._s(e.winRate)+"%")])],1)})):t._e()])},i=[],r={render:s,staticRenderFns:i};e.a=r},gNxM:function(t,e,n){"use strict";function s(t){n("hvXV")}Object.defineProperty(e,"__esModule",{value:!0});var i=n("GMrE"),r=n("XBO2"),a=n("VU/8"),o=s,c=a(i.a,r.a,o,null,null);e.default=c.exports},hvXV:function(t,e,n){var s=n("N2Tf");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);n("rjj0")("5c35b035",s,!0)}});
//# sourceMappingURL=index.c74e37393ef1eba9c69f.js.map