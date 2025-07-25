import{u as w,L as F,w as x}from"./Loading-DxPid0LA.js";import{_ as y,a as M,b as S,c as D,w as P,d as z,u as U}from"./index-BWiuQo5p.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./allscreen-DSqbzcG9.js";import"./loading-DmWqEEzi.js";const G=`
        varying vec2 vUv;
        void main()
        {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,N=`
        uniform sampler2D map;
        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;
        varying vec2 vUv;
        void main()
        {
          float depth = gl_FragCoord.z / gl_FragCoord.w;
          float fogFactor = smoothstep( fogNear, fogFar, depth );
          gl_FragColor = texture2D(map, vUv );
          gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
          gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
        }
      `,Z={__name:"Demo29",setup(b){const g=Date.now();let t=0;const p=({THREE:o,scene:e,camera:a})=>{t=5e3*15;const l=80,v=120;a.position.x=Math.floor(l/2),a.position.z=t;const r=new o.Fog("#1e4877",1,1e3),i=new o.PlaneGeometry(64,64),c=[],h=new o.TextureLoader().load("/home//public/images/cloud.png"),m=new o.ShaderMaterial({uniforms:{map:{type:"t",value:h},fogColor:{type:"c",value:r.color},fogNear:{type:"f",value:r.near},fogFar:{type:"f",value:r.far}},vertexShader:G,fragmentShader:N,transparent:!0});for(var n=0;n<5e3;n++){const d=i.clone();d.translate(Math.random()*l,-Math.random()*v,n*15),c.push(d)}const C=x(c);let _=new o.Mesh(C,m);e.add(_);let s=new o.Mesh(i,m);s.position.x=5,s.position.z=t-100,e.add(s)},f=({scene:o,camera:e,renderer:a})=>{e.position.z=t-(Date.now()-g)*.08%t,a.render(o,e)},{loading:u}=w({el:"#canvas",background:"#1e4877",cameraPosition:[0,0,0],control:!1,controlAutoSpeed:!1,helper:!0,light:!1,showStats:!1,creatMesh:p,animation:f});return M(()=>{console.log("销毁")}),(o,e)=>(S(),D(F,{loading:U(u)},{default:P(()=>e[0]||(e[0]=[z("canvas",{id:"canvas"},null,-1)])),_:1},8,["loading"]))}},Y=y(Z,[["__scopeId","data-v-7521fe72"]]);export{Y as default};
