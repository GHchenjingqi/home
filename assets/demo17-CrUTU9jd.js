import{u as C,L as z}from"./Loading-DqHcFzpL.js";import{u as B}from"./useRay-vavrxsca.js";import{_ as U,a as P,c as j,b as A,w as N,u as O,d as F}from"./index-Bvcxl4rW.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./allscreen-CP3ARXoZ.js";import"./loading-QOaArefD.js";import"https://ghchenjingqi.github.io/resources/mds/pathList.js";const J={__name:"demo17",setup(I){let a=null,s=null,i=null,r=null,n=null,l=null;const v=async({THREE:e,scene:o,controls:m,transControls:w,camera:p,renderer:t})=>{t.shadowMap.enabled=!0,t.shadowMap.type=e.PCFSoftShadowMap,a=new e.Group;let d=new e.Group,u=new e.Group;const h=new e.SphereGeometry(.2,36,18);n=new e.Mesh(h,new e.MeshBasicMaterial({color:16736767})),n.position.set(-15,0,0),d.add(n),d.position.y=.2,d.position.z=.4,o.add(d),l=new e.Mesh(h,new e.MeshBasicMaterial({color:25087})),l.position.set(-15,0,0),u.add(l),u.position.y=.2,u.position.z=-.4,o.add(u),i=new e.CatmullRomCurve3([new e.Vector3(-15,0,0),new e.Vector3(-5,1,0),new e.Vector3(0,0,0),new e.Vector3(.5,.5,0),new e.Vector3(1,.5,0),new e.Vector3(2,1,0),new e.Vector3(3,1.5,0),new e.Vector3(5,0,0),new e.Vector3(6,1,0),new e.Vector3(10,2,0),new e.Vector3(15,2,5),new e.Vector3(8,2,5),new e.Vector3(4,1,6),new e.Vector3(0,0,5)]);const M=new e.TubeGeometry(i,120,.8,2,!1),b=new e.MeshBasicMaterial({color:5658198}),x=new e.Mesh(M,b);a.add(x),o.add(a);const V=new e.TubeGeometry(i,120,.2,2,!1),L=new e.ShaderMaterial({uniforms:{diffuse:{value:new e.Color(16777062)},dashLength:{value:.6},gapLength:{value:2.15}},vertexShader:`
           varying vec2 vUv;
           void main() {
               vUv = uv;
               gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
           }
       `,fragmentShader:`
           varying vec2 vUv;
           uniform vec3 diffuse;
           uniform float dashLength;
           uniform float gapLength;
           void main() {
               float distance = mod(vUv.x * dashLength + vUv.y * gapLength, dashLength + gapLength);
               if (distance < dashLength) {
                   gl_FragColor = vec4(diffuse, 1.0);
               } else {
                   discard;
               }
           }
       `}),f=new e.Mesh(V,L);f.position.y=.01,f.position.z=-.12,o.add(f),s=document.body.addEventListener("click",async _=>{if(r=await B({el:"#canvas",camera:p,group:a,event:_}),r?.object){const{x:G,y:S,z:k}=r.point;l.position.set(G,S,k)}})};let c=0;const g=({scene:e,camera:o,renderer:m,stats:w})=>{if(w.update(),m.render(e,o),c<1){const p=i.getPointAt(c);n.position.copy(p);let t=JSON.parse(JSON.stringify(n.position));t.x>5?o.position.set(t.x+6,t.y+2,t.z-2):o.position.set(t.x-8,t.y+2,t.z+2),o.lookAt(n.position),c+=.001}else c=0},{loading:y}=C({el:"#canvas",background:"#111",cameraPosition:[-19,2,0],control:!1,controlAutoSpeed:!1,helper:!0,light:!0,creatMesh:v,animation:g});return P(()=>{s=a=null,r=null,s&&document.body.removeEventListener("click",s)}),(e,o)=>(A(),j(z,{loading:O(y)},{default:N(()=>[...o[0]||(o[0]=[F("canvas",{id:"canvas"},null,-1)])]),_:1},8,["loading"]))}},$=U(J,[["__scopeId","data-v-094256f5"]]);export{$ as default};
