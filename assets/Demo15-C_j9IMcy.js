import{u as b,L as g}from"./Loading-Bfq2l_iC.js";import{f as h,a as y}from"./creatMesh-DAIwXCwj.js";import{_ as z,r as k,b as w,o as E,c as T,w as L,u as B,a as r}from"./index-3EjIAIhU.js";import"./allscreen-DKy1I2Ca.js";import"./loading-CH_AHdTN.js";const C={__name:"Demo15",setup(M){let e=null;const n=k(!1),c=async({THREE:s,scene:o,controls:u,transControls:_,camera:t,renderer:d})=>{e=await h({font:"/home//public/fonts/KaiTi_Regular.json",text:"君不见黄河之水天上来奔流到海不复回君不见高堂明镜悲白发朝如青丝暮成雪人生得意须尽欢莫使金樽空对月天生我材必有用千金散尽还复来烹羊宰牛且为乐会须一饮三百杯岑夫子丹丘生将进酒杯莫停与君歌一曲请君为我倾耳听钟鼓馔玉不足贵但愿长醉不复醒古来圣贤皆寂寞唯有饮者留其名陈王昔时宴平乐斗酒十千恣欢谑主人何为言少钱径须沽取对君酌五花马千金裘呼儿将出换美酒与尔同销万古愁",fontSize:1,depth:.1,color:16777215,backColor:16711680}),e.position.set(0,0,0),o.add(e),t.lookAt(e.position);const x=y({size:[1,1,1],color:65280,position:[0,0,0],type:"basic"});o.add(x),document.addEventListener("keydown",l)},f=()=>{n.value=!n.value},l=function(s){switch(s.code){case"Space":f();break}};let a=!0,i=!1;const m=({THREE:s,scene:o,controls:u,transControls:_,camera:t,renderer:d,stats:p})=>{p.update(),u.update(),d.render(o,t),!n.value&&(t.position.z+=.1,a&&(t.position.z<15?t.position.z+=.1:(a=!1,i=!0)),i&&(o.rotation.y<Math.PI*2?(t.position.z=15,o.rotation.y+=.01,o.rotation.z+=.01):(a=!0,i=!1,t.position.z=5,o.rotation.y=0,o.rotation.z=0)))},{loading:v}=b({el:"#canvas",background:"#111",cameraPosition:[0,0,5],control:!0,controlAutoSpeed:!1,helper:!1,light:!0,creatMesh:c,animation:m});return w(()=>{e=null,n.value=null,document.body.removeEventListener("keydown",l)}),(s,o)=>(E(),T(g,{loading:B(v)},{default:L(()=>o[0]||(o[0]=[r("canvas",{id:"canvas"},null,-1),r("div",{class:"text-box"},[r("p",null,"按”空格“动画暂停/继续")],-1)])),_:1},8,["loading"]))}},I=z(C,[["__scopeId","data-v-2e6c191b"]]);export{I as default};