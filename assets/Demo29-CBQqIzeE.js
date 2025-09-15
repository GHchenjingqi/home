import{u as w,L as F,w as x}from"./Loading-fvwP1RP7.js";import{_ as y,a as M,c as S,b as D,w as P,u as z,d as U}from"./index-GomNjU0M.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./allscreen-CUko5Aew.js";import"./loading-CARvSZNY.js";import"https://ghchenjingqi.github.io/resources/mds/pathList.js";const G=`
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
      `,Z={__name:"Demo29",setup(b){const g=Date.now();let t=0;const p=({THREE:o,scene:e,camera:a})=>{t=5e3*15;const l=80,v=120;a.position.x=Math.floor(l/2),a.position.z=t;const r=new o.Fog("#1e4877",1,1e3),i=new o.PlaneGeometry(64,64),m=[],h=new o.TextureLoader().load("/home//public/images/cloud.png"),c=new o.ShaderMaterial({uniforms:{map:{type:"t",value:h},fogColor:{type:"c",value:r.color},fogNear:{type:"f",value:r.near},fogFar:{type:"f",value:r.far}},vertexShader:G,fragmentShader:N,transparent:!0});for(var n=0;n<5e3;n++){const d=i.clone();d.translate(Math.random()*l,-Math.random()*v,n*15),m.push(d)}const C=x(m);let _=new o.Mesh(C,c);e.add(_);let s=new o.Mesh(i,c);s.position.x=5,s.position.z=t-100,e.add(s)},u=({scene:o,camera:e,renderer:a})=>{e.position.z=t-(Date.now()-g)*.08%t,a.render(o,e)},{loading:f}=w({el:"#canvas",background:"#1e4877",cameraPosition:[0,0,0],control:!1,controlAutoSpeed:!1,helper:!0,light:!1,showStats:!1,creatMesh:p,animation:u});return M(()=>{console.log("销毁")}),(o,e)=>(D(),S(F,{loading:z(f)},{default:P(()=>[...e[0]||(e[0]=[U("canvas",{id:"canvas"},null,-1)])]),_:1},8,["loading"]))}},q=y(Z,[["__scopeId","data-v-666761a5"]]);export{q as default};
