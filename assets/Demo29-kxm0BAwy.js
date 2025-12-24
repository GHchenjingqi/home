import{u as w,L as F,m as x}from"./Loading-C_ZJTo4K.js";import{_ as y}from"./index-k_b31qc0.js";import{q as M,e as S,o as D,w as P,u as z,g as U}from"./vue-vendor-C-eO5OHd.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./_commonjs-dynamic-modules-TDtrdbi3.js";import"./three-vendor-FOuzmdZG.js";import"./loading-Dwx6fc8s.js";import"http://115.190.117.177:10086/mds/pathList.js";const G=`
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
      `,Z={__name:"Demo29",setup(k){const c=Date.now();let t=0;const p=({THREE:o,scene:e,camera:a})=>{t=5e3*15;const l=80,v=120;a.position.x=Math.floor(l/2),a.position.z=t;const r=new o.Fog("#1e4877",1,1e3),i=new o.PlaneGeometry(64,64),m=[],h=new o.TextureLoader().load("http://115.190.117.177:10086/images/cloud.png"),g=new o.ShaderMaterial({uniforms:{map:{type:"t",value:h},fogColor:{type:"c",value:r.color},fogNear:{type:"f",value:r.near},fogFar:{type:"f",value:r.far}},vertexShader:G,fragmentShader:N,transparent:!0});for(var n=0;n<5e3;n++){const d=i.clone();d.translate(Math.random()*l,-Math.random()*v,n*15),m.push(d)}const C=x(m);let _=new o.Mesh(C,g);e.add(_);let s=new o.Mesh(i,g);s.position.x=5,s.position.z=t-100,e.add(s)},f=({scene:o,camera:e,renderer:a})=>{e.position.z=t-(Date.now()-c)*.08%t,a.render(o,e)},{loading:u}=w({el:"#canvas",background:"#1e4877",cameraPosition:[0,0,0],control:!1,controlAutoSpeed:!1,helper:!0,light:!1,showStats:!1,creatMesh:p,animation:f});return M(()=>{console.log("销毁")}),(o,e)=>(D(),S(F,{loading:z(u)},{default:P(()=>[...e[0]||(e[0]=[U("canvas",{id:"canvas"},null,-1)])]),_:1},8,["loading"]))}},J=y(Z,[["__scopeId","data-v-e5ea98d3"]]);export{J as default};
