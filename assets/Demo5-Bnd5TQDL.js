import{u as y,L as B}from"./Loading-Bfq2l_iC.js";import{u as D}from"./useRay-CsXcHqIM.js";import{_ as C,r as P,b as j,o as k,c as G,w as L,u as p,a as w,t as z}from"./index-3EjIAIhU.js";import"./allscreen-DKy1I2Ca.js";import"./loading-CH_AHdTN.js";const F={class:"msgbox"},A={__name:"Demo5",setup(I){let l=P(""),r,d=null,a=null;const g=({THREE:e,scene:o,camera:m,renderer:c})=>{r=new e.Group,c.shadowMap.enabled=!0,c.shadowMap.type=e.PCFSoftShadowMap;const f=new e.BoxGeometry(3,3,3),x=new e.MeshBasicMaterial({color:4278231767}),M=new e.MeshBasicMaterial({color:4292076541}),t=new e.Mesh(f,x),n=new e.Mesh(f,M);t.position.set(0,0,0),t.name="方块1",n.position.set(2,0,0),n.name="方块2",t.position.x=-2,t.position.y=1.5,n.position.y=1.5,t.castShadow=!0,n.castShadow=!0,t.receiveShadow=!0,n.receiveShadow=!0,r.add(t),r.add(n),o.add(r);let s=new e.DirectionalLight(16777215,1);s.position.set(50,50,-50),s.castShadow=!0,s.shadow.mapSize.width=1024,s.shadow.mapSize.height=1024,s.shadow.camera.near=1,s.shadow.camera.far=100,o.add(s);var h=new e.BoxHelper(m,16711680);h.visible=!1,o.add(h),c.domElement.addEventListener("click",async u=>{a=await D({el:"#canvas",camera:m,group:r,event:u}),a!=null&&a.object&&(d&&(d.material.color=new e.Color(13886461)),a.object.material.color=new e.Color(16711680),d=a.object,l.value=a.object.name)}),_();function _(){var u=new e.PlaneGeometry(200,200,2),S=new e.MeshPhongMaterial({color:"#C7DAFF",side:e.DoubleSide}),i=new e.Mesh(u,S);i.rotateX(-Math.PI/2),i.receiveShadow=!0,i.position.z=-1,i.name="地面",o.add(i)}},{loading:v,pregress:b}=y({el:"#canvas",background:"#3e3e3a",cameraPosition:[0,5,10],controlAuto:!1,helper:!1,light:!0,creatMesh:g});return j(()=>{l=null,r=null,a=null}),(e,o)=>(k(),G(B,{loading:p(v),pregress:p(b)},{default:L(()=>[o[0]||(o[0]=w("canvas",{id:"canvas"},null,-1)),w("div",F,z(p(l)),1)]),_:1},8,["loading","pregress"]))}},J=C(A,[["__scopeId","data-v-9bc5640b"]]);export{J as default};