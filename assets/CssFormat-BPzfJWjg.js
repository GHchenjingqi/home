import{s as d,c as B,o as w,g as o,e as F,f as R,x as C,K as $,F as V}from"./vue-vendor-C-eO5OHd.js";import{N as D}from"./Notification-kFUdJqKO.js";import{_ as E}from"./index-k_b31qc0.js";import"http://115.190.117.177:10086/mds/pathList.js";const M={class:"content"},Q={__name:"CssFormat",setup(T){const r=d(`textarea{
    width: calc(100% - 4rem);
    box-sizing: content-box;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.4rem;
}
h1{
    font-size: 1.2rem;
    margin-top: 2rem;
}`),c=d(""),b=()=>{let e=r.value;e=e.replace(/\/\*[\s\S]*?\*\//g,""),e=e.replace(/^\s+|\s+$/gm,""),e=e.replace(/\s+/g," "),e=e.replace(/\s*{\s*/g,"{").replace(/\s*}\s*/g,"}").replace(/\s*:\s*/g,":").replace(/\s*;\s*/g,";").replace(/;\}/g,"}"),e=e.replace(/0rem/g,"0"),e=e.replace(/0px/g,"0"),e=e.replace(/0em/g,"0"),e=e.trim(),c.value=e},h=(e=0)=>{let a=r.value;const g=" ".repeat(4),v=/([^{]+)\{([^}]+)\}/g,f=/@media\s+[^{]+\{([\s\S]*?)\}/g;function x(y,i=""){let l="",n;for(;(n=v.exec(y))!==null;){const m=n[1].trim(),u=n[2].trim();l+=`${i}${m} {
`;const z=u.split(";").filter(p=>p.trim()!=="");for(const p of z)l+=`${i}${g}${p.trim()};
`;l+=`${i}}

`}for(v.lastIndex=0;(n=f.exec(y))!==null;){const m=n[0].trim(),u=n[1].trim();l+=`${i}${m}
`,l+=x(u,i+g)}return f.lastIndex=0,l}const N=a.replace(/\s+/g," ").trim();c.value=x(N)},s=d({show:!1,message:"",type:""}),k=()=>{s.value.show=!1,s.value.message=""},S=async e=>{if(e)try{if(navigator.clipboard)await navigator.clipboard.writeText(e),s.value.message="复制成功",s.value.type="success";else{const t=document.createElement("input");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),s.value.message="复制成功",s.value.type="success"}s.value.show=!0}catch{s.value.message="复制失败，请重试",s.value.type="error",s.value.show=!0}};return(e,t)=>(w(),B(V,null,[o("section",M,[o("div",{class:"width50",onClick:t[4]||(t[4]=a=>e.w=1)},[t[5]||(t[5]=o("h1",null,"CSS代码压缩-美化",-1)),C(o("textarea",{"onUpdate:modelValue":t[0]||(t[0]=a=>r.value=a),placeholder:"输入CSS样式代码，双击清空",cols:"30",rows:"10",onDblclick:t[1]||(t[1]=a=>r.value="")},null,544),[[$,r.value]]),o("div",{style:{display:"flex","margin-top":"1rem"}},[o("button",{onClick:b},"压缩"),o("button",{onClick:h},"格式化")]),C(o("textarea",{"onUpdate:modelValue":t[2]||(t[2]=a=>c.value=a),placeholder:"双击复制",cols:"30",rows:"15",onDblclick:t[3]||(t[3]=a=>S(c.value))},null,544),[[$,c.value]])])]),s.value.show?(w(),F(D,{key:0,message:s.value.message,type:s.value.type,duration:3e3,onClosed:k},null,8,["message","type"])):R("",!0)],64))}},j=E(Q,[["__scopeId","data-v-4ee1148c"]]);export{j as default};
