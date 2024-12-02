import{_ as B,r as p,o as w,j as F,a as o,h as C,G as b,c as R,k as V,F as D}from"./index-BpAziHYO.js";import{N as E}from"./Notification-pzSON-32.js";const M={class:"content"},Q={__name:"CssFormat",setup(T){const r=p(`textarea{
    width: calc(100% - 4rem);
    box-sizing: content-box;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.4rem;
}
h1{
    font-size: 1.2rem;
    margin-top: 2rem;
}`),i=p(""),h=()=>{i.value=r.value.replace(/\s+/g,"")},$=(a=0)=>{let s=r.value;const v=" ".repeat(4),g=/([^{]+)\{([^}]+)\}/g,f=/@media\s+[^{]+\{([\s\S]*?)\}/g;function y(x,c=""){let l="",n;for(;(n=g.exec(x))!==null;){const m=n[1].trim(),u=n[2].trim();l+=`${c}${m} {
`;const z=u.split(";").filter(d=>d.trim()!=="");for(const d of z)l+=`${c}${v}${d.trim()};
`;l+=`${c}}

`}for(g.lastIndex=0;(n=f.exec(x))!==null;){const m=n[0].trim(),u=n[1].trim();l+=`${c}${m}
`,l+=y(u,c+v)}return f.lastIndex=0,l}const N=s.replace(/\s+/g," ").trim();i.value=y(N)},t=p({show:!1,message:"",type:""}),k=()=>{t.value.show=!1,t.value.message=""},S=async a=>{if(a)try{if(navigator.clipboard)await navigator.clipboard.writeText(a),t.value.message="复制成功",t.value.type="success";else{const e=document.createElement("input");e.value=a,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),t.value.message="复制成功",t.value.type="success"}t.value.show=!0}catch{t.value.message="复制失败，请重试",t.value.type="error",t.value.show=!0}};return(a,e)=>(w(),F(D,null,[o("section",M,[o("div",{class:"width50",onClick:e[4]||(e[4]=s=>a.w=1)},[e[5]||(e[5]=o("h1",null,"CSS代码压缩-美化",-1)),C(o("textarea",{"onUpdate:modelValue":e[0]||(e[0]=s=>r.value=s),placeholder:"输入CSS样式代码，双击清空",cols:"30",rows:"10",onDblclick:e[1]||(e[1]=s=>r.value="")},null,544),[[b,r.value]]),o("div",{style:{display:"flex","margin-top":"1rem"}},[o("button",{onClick:h},"压缩"),o("button",{onClick:$},"格式化")]),C(o("textarea",{"onUpdate:modelValue":e[2]||(e[2]=s=>i.value=s),placeholder:"双击复制",cols:"30",rows:"15",onDblclick:e[3]||(e[3]=s=>S(i.value))},null,544),[[b,i.value]])])]),t.value.show?(w(),R(E,{key:0,message:t.value.message,type:t.value.type,duration:3e3,onClosed:k},null,8,["message","type"])):V("",!0)],64))}},j=B(Q,[["__scopeId","data-v-7e743be8"]]);export{j as default};
