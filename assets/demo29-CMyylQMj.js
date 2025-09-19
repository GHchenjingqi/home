import{u as w,L as F,w as x}from"./Loading-DX6OrYVO.js";import{_ as y,a as M,c as S,b as P,w as z,u as U,d as b}from"./index-DpGVNEm0.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./allscreen-Ccov-lO2.js";import"./loading-Vx-oxiet.js";import"https://ghchenjingqi.github.io/resources/mds/pathList.js";const D=`
        varying vec2 vUv;
        void main()
        {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `,G=`
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
      `,N={__name:"demo29",setup(Z){const m=Date.now();let t=0;const p=({THREE:o,scene:e,camera:a})=>{t=5e3*15;const i=80,v=120;a.position.x=Math.floor(i/2),a.position.z=t;const r=new o.Fog("#1e4877",1,1e3),l=new o.PlaneGeometry(64,64),g=[],h=new o.TextureLoader().load("/home/https://ghchenjingqi.github.io/resources/images/cloud.png"),c=new o.ShaderMaterial({uniforms:{map:{type:"t",value:h},fogColor:{type:"c",value:r.color},fogNear:{type:"f",value:r.near},fogFar:{type:"f",value:r.far}},vertexShader:D,fragmentShader:G,transparent:!0});for(var n=0;n<5e3;n++){const d=l.clone();d.translate(Math.random()*i,-Math.random()*v,n*15),g.push(d)}const C=x(g);let _=new o.Mesh(C,c);e.add(_);let s=new o.Mesh(l,c);s.position.x=5,s.position.z=t-100,e.add(s)},u=({scene:o,camera:e,renderer:a})=>{e.position.z=t-(Date.now()-m)*.08%t,a.render(o,e)},{loading:f}=w({el:"#canvas",background:"#1e4877",cameraPosition:[0,0,0],control:!1,controlAutoSpeed:!1,helper:!0,light:!1,showStats:!1,creatMesh:p,animation:u});return M(()=>{console.log("销毁")}),(o,e)=>(P(),S(F,{loading:U(f)},{default:z(()=>[...e[0]||(e[0]=[b("canvas",{id:"canvas"},null,-1)])]),_:1},8,["loading"]))}},Y=y(N,[["__scopeId","data-v-05b10e5f"]]);export{Y as default};
