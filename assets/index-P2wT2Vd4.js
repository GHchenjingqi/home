import{_ as h,r as p,i as _,j as a,a as t,m as f,F as g,p as v,s as x,o as r,t as k,x as B}from"./index-4p0r8sbT.js";const j="/home/assets/echart-Bj6lrckx.jpg",y={class:"content"},E={class:"box"},I={class:"list"},M=["onClick"],b=["src","alt"],C={__name:"index",setup(D){const i=B(),l=p([]),u=()=>{let e=x.menus.find(s=>s.name=="echart").children.filter(s=>s.path!=="/");l.value=e.map(s=>{const{img:o,...c}=s;return{img:"/home/"+o,...c}})},m=(n,e)=>{i.push(n),d(e)},d=n=>{const e=document.getElementById("menu");e&&(e.scrollTop=n*140)};return _(()=>{u()}),(n,e)=>(r(),a("div",y,[e[1]||(e[1]=t("div",{class:"file-title"},[t("img",{src:j,alt:""}),t("div",{class:"file-content"},[t("h1",null,[f("Echarts "),t("a",{href:"https://echarts.apache.org/zh/index.html",target:"_blank",rel:"noopener noreferrer"},"官方案例")]),t("p",null,"基于JavaScript 的开源可视化图表库")])],-1)),t("div",E,[e[0]||(e[0]=t("h3",null,"Demo常见案例",-1)),t("ul",I,[(r(!0),a(g,null,v(l.value,(s,o)=>(r(),a("li",{key:o,onClick:c=>m(s.path,o)},[t("img",{src:s.img,alt:s.name},null,8,b),t("h5",null,k(s.name),1)],8,M))),128))])])]))}},N=h(C,[["__scopeId","data-v-e5f47dd5"]]);export{N as default};