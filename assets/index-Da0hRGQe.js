import{_ as M,r as a,f as C,i as T,b as L,o as d,j as p,a as n,F as y,p as E,n as x,t as b,y as S,z as w,c as B,k as F,x as $,A as q,B as H,C as R}from"./index-XHW_bCmA.js";import{h as z}from"./highlight.pack-Pye1uBh_.js";import"./_commonjsHelpers-Cpj98o6Y.js";const A={class:"sub-ml"},N=["onClick"],j=["id"],I={__name:"FolderMenu",props:{items:Array},setup(g){const f=a(""),m=g,h=a(!1),o=document.querySelector(".know-box"),t=a([]);C(()=>m.items,l=>{l&&l.length>0&&(t.value=l,t.value&&t.value.length>0&&(f.value=t.value[0].id))},{immediate:!0});const u=l=>{f.value=l.id,o.scrollTo({top:l.pixel,behavior:"smooth"})},i=a(null),c=()=>{let l=o.scrollTop+o.offsetTop+1+135;const r=t.value.reduce((e,s)=>s.pixel<=l&&(e===null||l-s.pixel<l-e.pixel)?s:e,null);if(r){let e=i.value.scrollHeight*r.pixel/o.scrollHeight-10;i.value.scrollTo({top:e,behavior:"smooth"}),f.value=r.id}h.value=!0},_=()=>{o.addEventListener("scroll",c,{passive:!0})};return T(()=>{t.value=m.items,i.value=document.querySelector(".sub-ml"),t.value&&t.value.length>0&&(f.value=t.value[0].id),_()}),L(()=>{h.value&&(o.removeEventListener("scroll",c),h.value=!1)}),(l,r)=>(d(),p(y,null,[r[0]||(r[0]=n("h3",{class:"sub-class"},"导航器",-1)),n("div",A,[n("ul",null,[(d(!0),p(y,null,E(t.value,e=>(d(),p("li",{key:e.id,class:x(e.class),onClick:s=>u(e)},[n("span",{id:e.id,class:x({active:f.value==e.id})},b(e.title),11,j)],10,N))),128))])])],64))}},D=M(I,[["__scopeId","data-v-2fcc4e9b"]]),K=["title","onClick"],U={class:"content-box"},G=["innerHTML"],J={__name:"index",setup(g){const f=$(),m=a([]),h=a(null),o=a(""),t=async e=>{if(e==o.value)return!1;c.value=-1,l.value=[],u.value&&(u.value.scrollTop=0),h.value=await q(e),o.value=e;let s=setTimeout(()=>{const v=document.querySelectorAll("pre code");v&&v.length>0&&v.forEach(k=>{z.highlightBlock(k)}),clearTimeout(s),r()},0)},u=a(null),i=a(!1),c=a(0),_=()=>{u.value.scrollTop>100?i.value=!0:i.value=!1},l=a([]),r=async()=>{const e=document.querySelector(".contenter");if(!e)return!1;c.value<0?c.value=Math.floor(Math.random()*1e3):c.value++,l.value=await H(e)};return T(()=>{u.value&&u.value.addEventListener("scroll",_)}),L(()=>{u.value&&u.value.removeEventListener("scroll",_)}),S(async()=>{const s=f.currentRoute.value.query.name||"";m.value=w(),m.value.length>0&&(s?await t(s):await t(m.value[0])),c.value=1001,r()}),(e,s)=>(d(),p("div",{class:"know-box",ref_key:"knowsElement",ref:u},[n("div",{class:x(["mulu",{"fixed-sidebar":i.value}])},[s[0]||(s[0]=n("div",{class:"ml-title"},[n("h4",null,"技术目录")],-1)),n("ul",null,[(d(!0),p(y,null,E(m.value,(v,k)=>(d(),p("li",{style:R({color:v==o.value?"red":""}),key:k,title:v,onClick:O=>t(v)},b(v),13,K))),128))])],2),n("div",U,[n("h1",null,b(o.value),1),n("div",{id:"codebox",class:"contenter",innerHTML:h.value},null,8,G)]),c.value>0?(d(),p("div",{key:0,class:x(["sub-mulu",{"fixed-sidebar":i.value}])},[(d(),B(D,{items:l.value,key:c.value},null,8,["items"]))],2)):F("",!0)],512))}},W=M(J,[["__scopeId","data-v-e5ecbd7b"]]);export{W as default};