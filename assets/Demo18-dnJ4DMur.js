import{u as F,L as W}from"./Loading-DjZ_rs0O.js";import{_ as I,b as N,o as J,c as O,w as j,u as q,a as p}from"./index-QqtBQE-u.js";import"./allscreen-CZ_cm7qQ.js";import"./loading-Ddf1HDxE.js";const Q={__name:"Demo18",setup(X){let u=null,g=null,a=null,s=null,w=null,r,v=!1,y=!1,b=!1;const k=async({THREE:e,scene:o,controls:c,transControls:M,camera:L,renderer:h})=>{h.shadowMap.enabled=!0,h.shadowMap.type=e.PCFSoftShadowMap,u=new e.Group;let t=new e.Group,i=new e.Group;const n=new e.SphereGeometry(.2,36,18);s=new e.Mesh(n,new e.MeshBasicMaterial({color:16736767})),s.position.set(-15,0,0),t.add(s),t.position.y=.2,t.position.z=.4,o.add(t),w=new e.Mesh(n,new e.MeshBasicMaterial({color:25087})),w.position.set(-15,0,0),i.add(w),i.position.y=.2,i.position.z=-.4,o.add(i),r=s.position,a=new e.CatmullRomCurve3([new e.Vector3(-55,0,0),new e.Vector3(-15,0,0),new e.Vector3(-5,1,0),new e.Vector3(0,0,0),new e.Vector3(.5,.5,0),new e.Vector3(1,.5,0),new e.Vector3(2,1,0),new e.Vector3(3,1.5,0),new e.Vector3(5,0,0),new e.Vector3(6,1,0),new e.Vector3(10,2,0),new e.Vector3(15,2,5),new e.Vector3(8,2,5),new e.Vector3(4,1,6),new e.Vector3(0,0,5)]);const K=new e.PlaneGeometry(500,500),m=new e.TextureLoader().load("/public/images/grass.png");m.wrapS=e.RepeatWrapping,m.wrapT=e.RepeatWrapping,m.repeat.set(1e3,1e3);const P=new e.MeshBasicMaterial({color:65280,map:m}),d=new e.Mesh(K,P);d.quaternion.setFromAxisAngle(new e.Vector3(1,0,0),-Math.PI/2),d.castShadow=!0,d.receiveShadow=!0,d.position.y=-.5,o.add(d);const U=new e.TubeGeometry(a,120,.8,2,!1),B=new e.MeshBasicMaterial({color:5658198}),V=new e.Mesh(U,B);u.add(V),V.castShadow=!0,o.add(u);const C=new e.TubeGeometry(a,120,.2,2,!1),D=new e.ShaderMaterial({uniforms:{diffuse:{value:new e.Color(16777062)},dashLength:{value:.6},gapLength:{value:2.15}},vertexShader:`
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
       `}),x=new e.Mesh(C,D);x.position.y=.01,x.position.z=-.12,o.add(x),document.addEventListener("keydown",A),document.addEventListener("keyup",_)},A=function(e){switch(e.code){case"ArrowUp":case"KeyW":v=!0,l+=.01;break;case"ArrowLeft":case"KeyA":y=!0;break;case"ArrowDown":case"KeyS":break;case"ArrowRight":case"KeyD":b=!0;break;case"Space":S();break}},S=()=>{let e=document.getElementById("box");e.style.display="none"},_=function(e){switch(e.code){case"ArrowUp":case"KeyW":v=!1;break;case"ArrowLeft":case"KeyA":y=!1;break;case"ArrowDown":case"KeyS":break;case"ArrowRight":case"KeyD":b=!1;break}};let f=0,l=0;const G=({THREE:e,scene:o,camera:c,renderer:M,stats:L})=>{if(L.update(),M.render(o,c),f<1){const h=a.getPointAt(f);if(w.position.copy(h),l<1){r=a.getPointAt(l),a.getPoints(a.points.length);const i=.1,n=new e.Vector3;v&&(n.x+=1),y&&(n.z-=1),b&&(n.z+=1),r.x=r.x+n.x*i,r.z=r.z+n.z*i,s.position.copy(r)}else l=0;let t=JSON.parse(JSON.stringify(s.position));t.x>5?c.position.set(t.x+6,t.y+2,t.z-2):l==0?c.lookAt(0,0,0):(c.position.set(t.x-3,t.y+1,t.z),c.lookAt(s.position)),f+=.001}else f=0},{loading:z}=F({el:"#canvas",background:"#d3e3f3",cameraPosition:[-10,2,0],control:!0,controlAutoSpeed:!1,helper:!1,light:!0,creatMesh:k,animation:G});return N(()=>{g=u=null,g&&document.body.removeEventListener("click",g)}),(e,o)=>(J(),O(W,{loading:q(z)},{default:j(()=>o[0]||(o[0]=[p("canvas",{id:"canvas"},null,-1),p("div",{id:"box"},[p("div",{class:"box"},[p("p",null,"空格开始"),p("p",null,"w 控制小球前进")])],-1)])),_:1},8,["loading"]))}},H=I(Q,[["__scopeId","data-v-22b61b71"]]);export{H as default};