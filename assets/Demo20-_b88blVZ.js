import{u as B,L as C}from"./Loading-DAo7TaJl.js";import{_ as v,o as z,c as k,w as P,u as D,a as L}from"./index-BF_flwVJ.js";import"./allscreen-tnsuxPjc.js";import"./loading-BRGM20Sj.js";const S={__name:"Demo20",setup(A){const u=async({THREE:o,scene:e,controls:s,transControls:r,camera:i,renderer:c})=>{const h=new o.BoxGeometry(1,1,1),x=new o.BoxGeometry(1,5,1),f=new o.SphereGeometry(1),G=new o.CylinderGeometry(1,2,5),_=new o.ConeGeometry(1,3,3),M=new o.CapsuleGeometry(1,1,4,8),g=new o.PlaneGeometry(2,6),t=new o.MeshPhongMaterial({color:16711680}),b=new o.Mesh(h,t),d=new o.Mesh(x,t);d.position.x=3;const p=new o.Mesh(f,t);p.position.x=-3;const l=new o.Mesh(G,t);l.position.z=-3;const m=new o.Mesh(_,t);m.position.z=3;const n=new o.Mesh(M,t);n.position.z=-6,n.position.x=4;const a=new o.Mesh(g,t);a.position.z=-6,a.position.x=-4,e.add(b),e.add(d),e.add(p),e.add(l),e.add(m),e.add(n),e.add(a)},w=({THREE:o,scene:e,camera:s,renderer:r,stats:i,controls:c})=>{i.update(),r.render(e,s),c.update()},{loading:y}=B({el:"#canvas",background:"#ddddff",cameraPosition:[0,4,5],control:!0,controlAutoSpeed:!1,helper:!0,light:!0,creatMesh:u,animation:w});return(o,e)=>(z(),k(C,{loading:D(y)},{default:P(()=>e[0]||(e[0]=[L("canvas",{id:"canvas"},null,-1)])),_:1},8,["loading"]))}},q=v(S,[["__scopeId","data-v-5df58916"]]);export{q as default};