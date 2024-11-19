import{u as z,L as B}from"./Loading-79aDrk5N.js";import{u as U}from"./useRay-CqR-vRIM.js";import{_ as P,d as I,o as A,c as N,w as D,u as F,p as J,a as j,b as O}from"./index-VRAcYr2a.js";import"./allscreen-BbwXwfjp.js";import"./loading-BwWTHRMq.js";const q=i=>(J("data-v-f1eb0946"),i=i(),j(),i),K=q(()=>O("canvas",{id:"canvas"},null,-1)),Q={__name:"Demo17",setup(i){let s=null,r=null,c=null,n=null,a=null,l=null;const g=async({THREE:e,scene:o,controls:w,transControls:m,camera:f,renderer:t})=>{t.shadowMap.enabled=!0,t.shadowMap.type=e.PCFSoftShadowMap,s=new e.Group;let u=new e.Group,p=new e.Group;const v=new e.SphereGeometry(.2,36,18);a=new e.Mesh(v,new e.MeshBasicMaterial({color:16736767})),a.position.set(-15,0,0),u.add(a),u.position.y=.2,u.position.z=.4,o.add(u),l=new e.Mesh(v,new e.MeshBasicMaterial({color:25087})),l.position.set(-15,0,0),p.add(l),p.position.y=.2,p.position.z=-.4,o.add(p),c=new e.CatmullRomCurve3([new e.Vector3(-15,0,0),new e.Vector3(-5,1,0),new e.Vector3(0,0,0),new e.Vector3(.5,.5,0),new e.Vector3(1,.5,0),new e.Vector3(2,1,0),new e.Vector3(3,1.5,0),new e.Vector3(5,0,0),new e.Vector3(6,1,0),new e.Vector3(10,2,0),new e.Vector3(15,2,5),new e.Vector3(8,2,5),new e.Vector3(4,1,6),new e.Vector3(0,0,5)]);const _=new e.TubeGeometry(c,120,.8,2,!1),b=new e.MeshBasicMaterial({color:5658198}),x=new e.Mesh(_,b);s.add(x),o.add(s);const V=new e.TubeGeometry(c,120,.2,2,!1),L=new e.ShaderMaterial({uniforms:{diffuse:{value:new e.Color(16777062)},dashLength:{value:.6},gapLength:{value:2.15}},vertexShader:`
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
       `}),h=new e.Mesh(V,L);h.position.y=.01,h.position.z=-.12,o.add(h),r=document.body.addEventListener("click",async S=>{if(n=await U({el:"#canvas",camera:f,group:s,event:S}),n!=null&&n.object){const{x:G,y:k,z:C}=n.point;l.position.set(G,k,C)}})};let d=0;const y=({scene:e,camera:o,renderer:w,stats:m})=>{if(m.update(),w.render(e,o),d<1){const f=c.getPointAt(d);a.position.copy(f);let t=JSON.parse(JSON.stringify(a.position));t.x>5?o.position.set(t.x+6,t.y+2,t.z-2):o.position.set(t.x-8,t.y+2,t.z+2),o.lookAt(a.position),d+=.001}else d=0},{loading:M}=z({el:"#canvas",background:"#111",cameraPosition:[-19,2,0],control:!0,controlAutoSpeed:!1,helper:!0,light:!0,creatMesh:g,animation:y});return I(()=>{r=s=null,n=null,r&&document.body.removeEventListener("click",r)}),(e,o)=>(A(),N(B,{loading:F(M)},{default:D(()=>[K]),_:1},8,["loading"]))}},T=P(Q,[["__scopeId","data-v-f1eb0946"]]);export{T as default};
