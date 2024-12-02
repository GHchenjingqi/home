import{_ as B,r as p,o as y,j as F,a as s,h as C,G as b,c as R,k as V,F as D}from"./index-C_oHrnUh.js";import{N as E}from"./Notification-H0-NapRi.js";const M={class:"content"},Q={__name:"CssFormat",setup(T){const r=p(`textarea{
    width: calc(100% - 4rem);
    box-sizing: content-box;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.4rem;
}
h1{
    font-size: 1.2rem;
    margin-top: 2rem;
}`),i=p(""),$=()=>{i.value=r.value.replace(/\s+/g,"")},k=(a=0)=>{let o=r.value;const v=" ".repeat(4),g=/([^{]+)\{([^}]+)\}/g,f=/@media\s+[^{]+\{([\s\S]*?)\}/g;function w(x,u=""){let l="",n;for(;(n=g.exec(x))!==null;){const m=n[1].trim(),c=n[2].trim();l+=`${u}${m} {
`;const z=c.split(";").filter(d=>d.trim()!=="");for(const d of z)l+=`${u}${v}${d.trim()};
`;l+=`${u}}

`}for(g.lastIndex=0;(n=f.exec(x))!==null;){const m=n[0].trim(),c=n[1].trim();l+=`${u}${m}
`,l+=w(c,u+v)}return f.lastIndex=0,l}const N=o.replace(/\s+/g," ").trim();i.value=w(N)},t=p({show:!1,message:"",type:""}),h=()=>{t.value.show=!1,t.value.message=""},S=async a=>{if(a)try{if(navigator.clipboard)await navigator.clipboard.writeText(a),t.value.message="复制成功",t.value.type="success";else{const e=document.createElement("input");e.value=a,document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),t.value.message="复制成功",t.value.type="success"}t.value.show=!0}catch{t.value.message="复制失败，请重试",t.value.type="error",t.value.show=!0}};return(a,e)=>(y(),F(D,null,[s("section",M,[s("div",{class:"width50",onClick:e[4]||(e[4]=o=>a.w=1)},[e[5]||(e[5]=s("h1",null,"CSS代码压缩-美化",-1)),C(s("textarea",{"onUpdate:modelValue":e[0]||(e[0]=o=>r.value=o),placeholder:"输入CSS样式代码，双击清空",cols:"30",rows:"10",onDblclick:e[1]||(e[1]=o=>r.value="")},null,544),[[b,r.value]]),e[6]||(e[6]=s("br",null,null,-1)),s("button",{onClick:$},"压缩"),s("button",{onClick:k},"格式化"),e[7]||(e[7]=s("br",null,null,-1)),C(s("textarea",{"onUpdate:modelValue":e[2]||(e[2]=o=>i.value=o),placeholder:"双击复制",cols:"30",rows:"15",onDblclick:e[3]||(e[3]=o=>S(i.value))},null,544),[[b,i.value]])])]),t.value.show?(y(),R(E,{key:0,message:t.value.message,type:t.value.type,duration:3e3,onClosed:h},null,8,["message","type"])):V("",!0)],64))}},G=B(Q,[["__scopeId","data-v-e27aaa15"]]);export{G as default};
