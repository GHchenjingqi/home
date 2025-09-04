import{_ as B,r as d,l as F,b as w,d as l,c as R,m as V,h as C,K as b,F as D}from"./index-BIF3Vx7O.js";import{N as E}from"./Notification-3iZQWiAq.js";const M={class:"content"},Q={__name:"CssFormat",setup(T){const r=d(`textarea{
    width: calc(100% - 4rem);
    box-sizing: content-box;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.4rem;
}
h1{
    font-size: 1.2rem;
    margin-top: 2rem;
}`),c=d(""),$=()=>{let e=r.value;e=e.replace(/\/\*[\s\S]*?\*\//g,""),e=e.replace(/^\s+|\s+$/gm,""),e=e.replace(/\s+/g," "),e=e.replace(/\s*{\s*/g,"{").replace(/\s*}\s*/g,"}").replace(/\s*:\s*/g,":").replace(/\s*;\s*/g,";").replace(/;\}/g,"}"),e=e.replace(/0rem/g,"0"),e=e.replace(/0px/g,"0"),e=e.replace(/0em/g,"0"),e=e.trim(),c.value=e},h=(e=0)=>{let a=r.value;const g=" ".repeat(4),v=/([^{]+)\{([^}]+)\}/g,f=/@media\s+[^{]+\{([\s\S]*?)\}/g;function x(y,i=""){let o="",n;for(;(n=v.exec(y))!==null;){const m=n[1].trim(),u=n[2].trim();o+=`${i}${m} {
`;const z=u.split(";").filter(p=>p.trim()!=="");for(const p of z)o+=`${i}${g}${p.trim()};
`;o+=`${i}}

`}for(v.lastIndex=0;(n=f.exec(y))!==null;){const m=n[0].trim(),u=n[1].trim();o+=`${i}${m}
`,o+=x(u,i+g)}return f.lastIndex=0,o}const N=a.replace(/\s+/g," ").trim();c.value=x(N)},s=d({show:!1,message:"",type:""}),k=()=>{s.value.show=!1,s.value.message=""},S=async e=>{if(e)try{if(navigator.clipboard)await navigator.clipboard.writeText(e),s.value.message="复制成功",s.value.type="success";else{const t=document.createElement("input");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),s.value.message="复制成功",s.value.type="success"}s.value.show=!0}catch{s.value.message="复制失败，请重试",s.value.type="error",s.value.show=!0}};return(e,t)=>(w(),F(D,null,[l("section",M,[l("div",{class:"width50",onClick:t[4]||(t[4]=a=>e.w=1)},[t[5]||(t[5]=l("h1",null,"CSS代码压缩-美化",-1)),C(l("textarea",{"onUpdate:modelValue":t[0]||(t[0]=a=>r.value=a),placeholder:"输入CSS样式代码，双击清空",cols:"30",rows:"10",onDblclick:t[1]||(t[1]=a=>r.value="")},null,544),[[b,r.value]]),l("div",{style:{display:"flex","margin-top":"1rem"}},[l("button",{onClick:$},"压缩"),l("button",{onClick:h},"格式化")]),C(l("textarea",{"onUpdate:modelValue":t[2]||(t[2]=a=>c.value=a),placeholder:"双击复制",cols:"30",rows:"15",onDblclick:t[3]||(t[3]=a=>S(c.value))},null,544),[[b,c.value]])])]),s.value.show?(w(),R(E,{key:0,message:s.value.message,type:s.value.type,duration:3e3,onClosed:k},null,8,["message","type"])):V("",!0)],64))}},K=B(Q,[["__scopeId","data-v-4ee1148c"]]);export{K as default};
