import{u as C,L as z}from"./Loading-BGSnBwrz.js";import{u as B}from"./useRay-BPRoHxsu.js";import{_ as U,b as P,o as A,c as N,w as D,a as F,u as J}from"./index-DjPK_fIO.js";import"./allscreen-CVpBhY3y.js";import"./loading-R4W6sHtF.js";const j={__name:"Demo17",setup(I){let s=null,i=null,r=null,n=null,a=null,l=null;const v=async({THREE:e,scene:o,controls:m,transControls:w,camera:p,renderer:t})=>{t.shadowMap.enabled=!0,t.shadowMap.type=e.PCFSoftShadowMap,s=new e.Group;let d=new e.Group,u=new e.Group;const h=new e.SphereGeometry(.2,36,18);a=new e.Mesh(h,new e.MeshBasicMaterial({color:16736767})),a.position.set(-15,0,0),d.add(a),d.position.y=.2,d.position.z=.4,o.add(d),l=new e.Mesh(h,new e.MeshBasicMaterial({color:25087})),l.position.set(-15,0,0),u.add(l),u.position.y=.2,u.position.z=-.4,o.add(u),r=new e.CatmullRomCurve3([new e.Vector3(-15,0,0),new e.Vector3(-5,1,0),new e.Vector3(0,0,0),new e.Vector3(.5,.5,0),new e.Vector3(1,.5,0),new e.Vector3(2,1,0),new e.Vector3(3,1.5,0),new e.Vector3(5,0,0),new e.Vector3(6,1,0),new e.Vector3(10,2,0),new e.Vector3(15,2,5),new e.Vector3(8,2,5),new e.Vector3(4,1,6),new e.Vector3(0,0,5)]);const M=new e.TubeGeometry(r,120,.8,2,!1),x=new e.MeshBasicMaterial({color:5658198}),V=new e.Mesh(M,x);s.add(V),o.add(s);const b=new e.TubeGeometry(r,120,.2,2,!1),L=new e.ShaderMaterial({uniforms:{diffuse:{value:new e.Color(16777062)},dashLength:{value:.6},gapLength:{value:2.15}},vertexShader:`
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
       `}),f=new e.Mesh(b,L);f.position.y=.01,f.position.z=-.12,o.add(f),i=document.body.addEventListener("click",async _=>{if(n=await B({el:"#canvas",camera:p,group:s,event:_}),n!=null&&n.object){const{x:G,y:S,z:k}=n.point;l.position.set(G,S,k)}})};let c=0;const g=({scene:e,camera:o,renderer:m,stats:w})=>{if(w.update(),m.render(e,o),c<1){const p=r.getPointAt(c);a.position.copy(p);let t=JSON.parse(JSON.stringify(a.position));t.x>5?o.position.set(t.x+6,t.y+2,t.z-2):o.position.set(t.x-8,t.y+2,t.z+2),o.lookAt(a.position),c+=.001}else c=0},{loading:y}=C({el:"#canvas",background:"#111",cameraPosition:[-19,2,0],control:!1,controlAutoSpeed:!1,helper:!0,light:!0,creatMesh:v,animation:g});return P(()=>{i=s=null,n=null,i&&document.body.removeEventListener("click",i)}),(e,o)=>(A(),N(z,{loading:J(y)},{default:D(()=>o[0]||(o[0]=[F("canvas",{id:"canvas"},null,-1)])),_:1},8,["loading"]))}},X=U(j,[["__scopeId","data-v-416f5fd8"]]);export{X as default};
