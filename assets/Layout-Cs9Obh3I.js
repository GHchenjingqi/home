import{N as V}from"./Notification-PuiIG-1A.js";import{h as N}from"./highlight.pack-Pye1uBh_.js";import{_ as y,r as v,J as R,i as C,E as T,o as r,j as u,a as i,t as b,c as k,k as p,F as w,x as S,f as L,y as B,s as x,p as E,n as F,u as f,C as $,G as I,I as H}from"./index-BuZSTuB0.js";import{u as M}from"./loading-Cldb6aZY.js";import{u as z,a as D}from"./allscreen-B5_i54WS.js";import"./_commonjsHelpers-Cpj98o6Y.js";const O="data:image/svg+xml,%3c?xml%20version='1.0'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20t='1726219226906'%20class='icon'%20viewBox='0%200%201024%201024'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20p-id='4270'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20width='32'%20height='32'%3e%3cpath%20d='M749.248%20704H864a32%2032%200%201%200%200-64H672a32%2032%200%200%200-32%2032v192a32%2032%200%201%200%2064%200v-114.752l137.36%20137.36a32%2032%200%201%200%2045.232-45.264L749.248%20704zM320%20749.248V864a32%2032%200%201%200%2064%200V672a32%2032%200%200%200-32-32H160a32%2032%200%201%200%200%2064h114.752l-137.36%20137.36a32%2032%200%201%200%2045.264%2045.232L320%20749.248zM749.248%20320H864a32%2032%200%201%201%200%2064H672a32%2032%200%200%201-32-32V160a32%2032%200%201%201%2064%200v114.752l137.36-137.36a32%2032%200%201%201%2045.232%2045.264L749.248%20320zM320%20274.752V160a32%2032%200%201%201%2064%200v192a32%2032%200%200%201-32%2032H160a32%2032%200%201%201%200-64h114.752l-137.36-137.36a32%2032%200%201%201%2045.264-45.232L320%20274.752z'%20fill='%23231815'%20p-id='4271'%3e%3c/path%3e%3c/svg%3e",j={class:"language-javascript"},G={__name:"LightCode",props:{code:{type:String,required:!0}},setup(_){const m=_,o=v({show:!1,message:"",type:""}),a=()=>{o.value.show=!1,o.value.message=""},n=()=>{const c=document.querySelectorAll("pre code");c&&c.length>0&&c.forEach(e=>{N.highlightBlock(e)})},d=async()=>{const c=document.querySelector("pre code");if(c)try{if(navigator.clipboard)await navigator.clipboard.writeText(c.innerText),o.value.message="复制成功",o.value.type="success";else{const e=document.createElement("input");e.value=c.innerText,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),o.value.message="复制成功",o.value.type="success"}o.value.show=!0}catch{o.value.message="复制失败，请重试",o.value.type="error",o.value.show=!0}else o.value.message="未找到代码块",o.value.type="warning",o.value.show=!0};return R(async()=>{await T(),n()}),C(async()=>{await T(),m.code&&n()}),(c,e)=>(r(),u(w,null,[i("pre",null,[i("code",j,b(m.code),1)]),i("div",{class:"copy",onClick:d},"复制代码"),o.value.show?(r(),k(V,{key:0,message:o.value.message,type:o.value.type,duration:3e3,onClosed:a},null,8,["message","type"])):p("",!0)],64))}},q=y(G,[["__scopeId","data-v-b187e2fa"]]),A={class:"code"},P={__name:"Code",emits:["close"],setup(_,{emit:m}){const o=S(),a=v("");C(async()=>{var e;const c=o.currentRoute.value;if(c.name!="home"){const s="/home//src/views"+c.path+".vue";try{const t=await fetch(s);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const l=await t.text();let g=((e=l.split("__expose();")[1])==null?void 0:e.split("const __returned__"))??["",""];a.value=g[0].trim()?g[0].trim():l}catch(t){console.error("Error fetching or processing Vue file:",t)}}});const n=m,d=()=>{n("close")};return(c,e)=>(r(),u(w,null,[i("div",{class:"box",onClick:d}),i("div",A,[a.value?(r(),k(q,{key:0,code:a.value},null,8,["code"])):p("",!0)])],64))}},J=y(P,[["__scopeId","data-v-02b90c7c"]]),U={class:"menus",id:"menu"},W=["onClick"],X=["src"],Y={__name:"Menus",setup(_){const m=M(),o=S(),a=v([]),n=v(-1),d=(e,s)=>{if(m.getLoadingStatus)return alert("正在加载中，请稍后"),!1;n.value=s,o.push(e),c(s)},c=e=>{const s=document.getElementById("menu");s.scrollTop=e*140};return L(()=>o.currentRoute.value.path,e=>{const s=setTimeout(()=>{for(let t=0;t<a.value.length;t++)a.value[t].path===e&&(n.value=t),clearTimeout(s)},100)},{immediate:!0}),B(()=>{const{path:e}=o.currentRoute.value,s=e.split("/")[1]?e.split("/")[1]:null;if(s&&x.filesName.includes(s)){const t=x.menus.find(l=>l.name==s);a.value=t.children.map(l=>{const{img:h,...g}=l;return{img:"/home/"+h,...g}})}}),C(()=>{const e=document.getElementById("menu");for(let t=0;t<a.length;t++)a.value[t].path===path&&(n.value=t);const s=setTimeout(()=>{n.value+1>5&&e.scrollTo({top:n.value*160,behavior:"smooth"}),clearTimeout(s)},500)}),(e,s)=>(r(),u("div",U,[(r(!0),u(w,null,E(a.value,(t,l)=>(r(),u("div",{class:F(["item",n.value===l?"active":"gray"]),key:l,onClick:h=>d(t.path,l)},[i("img",{src:t.img,alt:"item.name"},null,8,X),i("p",null,b(t.name),1)],10,W))),128))]))}},K=y(Y,[["__scopeId","data-v-e9c870ad"]]),Q={class:"menus",id:"menu"},Z=["onClick"],ee=["src"],te={__name:"Menus2",setup(_){const m=M(),o=S(),a=v([]),n=v(-1),d=(e,s)=>{if(m.getLoadingStatus)return alert("正在加载中，请稍后"),!1;n.value=s,o.push(e),c(s)},c=e=>{const s=document.getElementById("menu");s.scrollTop=e*140};return L(()=>o.currentRoute.value.path,e=>{for(let s=0;s<a.length;s++)a.value[s].path===e&&(n.value=s)}),C(()=>{const{path:e}=o.currentRoute.value,s=e.split("/")[1]?e.split("/")[1]:null;if(s&&x.filesName.includes(s)){const t=x.menus.find(l=>l.name==s);a.value=t.children.map(l=>{const{icon:h,...g}=l;return{icon:"/home/"+h,...g}})}for(let t=0;t<a.value.length;t++)a.value[t].path===e&&(n.value=t)}),(e,s)=>(r(),u("div",Q,[(r(!0),u(w,null,E(a.value,(t,l)=>(r(),u("div",{class:F(["item",n.value===l?"active":"gray"]),key:l,onClick:h=>d(t.path,l)},[i("img",{src:t.icon,alt:""},null,8,ee),i("p",null,b(t.name),1)],10,Z))),128))]))}},se=y(te,[["__scopeId","data-v-df429ae4"]]),oe={class:"wrap"},ae={key:1,class:"code-box"},ne={__name:"Layout",setup(_){const m=S(),o=v(0),a=z(),n=D(),d=()=>{a.setFlagStatus(!1)};B(()=>{const e=m.currentRoute.value;e.path.indexOf("knowledge")>-1&&(o.value=1),e.path.indexOf("page")>-1&&(o.value=2)});const c=()=>{n.setFlagStatus(!1)};return(e,s)=>{const t=H("router-view");return r(),u(w,null,[i("section",oe,[f(a).getFlagStatus?p("",!0):(r(),u("aside",{key:0,style:$({width:o.value==2?"160px":"300px"})},[o.value==0?(r(),k(K,{key:0})):p("",!0),o.value==2?(r(),k(se,{key:1})):p("",!0)],4)),i("div",{class:"main",style:$({"max-width":f(a).getFlagStatus?"100%":"calc(100% - 300px)",padding:f(a).getFlagStatus?"0":"1rem"})},[I(t)],4)]),f(a).getFlagStatus?(r(),u("div",{key:0,class:"outAllscreen",onClick:d},s[0]||(s[0]=[i("img",{src:O,alt:"退出全屏",title:"退出全屏"},null,-1)]))):p("",!0),f(n).getFlagStatus?(r(),u("div",ae,[I(J,{onClose:c})])):p("",!0)],64)}}},de=y(ne,[["__scopeId","data-v-d0ab0cbf"]]);export{de as default};