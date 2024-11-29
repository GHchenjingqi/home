import{u as b,L as D}from"./Loading-CyCpiNBK.js";import{g as I}from"./lil-gui.module.min-Bc0DeA9g.js";import{_ as k,g as q,o as B,c as j,w as L,u as V,a as z}from"./index-TriM8-Ev.js";import"./allscreen-D-2nlg0b.js";import"./loading-CdZCm46-.js";const A={__name:"Demo26",setup(G){const r=new I;r.domElement.style.top="2rem",r.domElement.style.right="2rem";let g=null,a=null;const y=async({THREE:e,scene:o,controls:w,canvas:C,camera:t,renderer:N,clock:_})=>{g=_;let i={vTime:{value:0},vColor:{value:new e.Color(65280)},vPow:{value:2}};const v=`varying vec2 vUv;
        void main(){
            vUv = vec2(uv.x,uv.y);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,d=new e.PlaneGeometry(5,5),M=new e.ShaderMaterial({uniforms:i,vertexShader:v,fragmentShader:`varying vec2 vUv;
        uniform float vTime;
        uniform float vPow;
        uniform vec3 vColor;
        void main(){
            float vy = 1.0 - vUv.y;
            vy = pow(vy,vPow - abs(sin(vTime)));
            gl_FragColor = vec4(vColor,vy);
        }`,side:e.DoubleSide}),s=new e.Mesh(d,M);s.position.y=2.5,o.add(s);const n=s.clone();n.position.set(2.5,2.5,2.5),n.rotation.y=Math.PI/2,o.add(n);const m=n.clone();m.position.set(-2.5,2.5,2.5),m.rotation.y=Math.PI/2,o.add(m);const u={iPower:{value:10},iRadius:{value:.2}},x=new e.ShaderMaterial({uniforms:u,vertexShader:v,fragmentShader:`
        uniform float iPower;
        uniform float iRadius;
        float sdCircle( vec2 p, float r ){
            return length(p) - r;
        }
        varying vec2 vUv;
        void main(){
            float r = sdCircle(vUv - 0.5,iRadius);
            r = pow(1.0 - r,iPower);

            gl_FragColor = vec4(r,0.5,0.8,r);
        }`,side:e.DoubleSide}),c=new e.Mesh(d,x);c.position.set(5,0,2.5),c.rotation.x=Math.PI/2,o.add(c),a={vTime:{value:0},vFreq:{value:10},vSpeed:{value:.5},vColor:{value:new e.Color(65280)},vPower:{value:2}};const U=new e.ShaderMaterial({uniforms:a,vertexShader:v,fragmentShader:`varying vec2 vUv;
        uniform float vTime;
        uniform vec3 vColor;
        uniform float vSpeed;
        uniform float vPower;
        uniform float vFreq;
        float sdCircle( vec2 p, float r ){
            return length(p) - r;
        }
        void main(){
            vec2 aUv = (vUv - 0.5) * vFreq;
            float alp = fract(sdCircle(aUv, 0.5) - vTime * vSpeed);
            alp = pow(alp,vPower);
            gl_FragColor = vec4(vColor,alp);
        }`,side:e.DoubleSide}),f=new e.Mesh(d,U);f.position.z=2.5,f.rotation.x=Math.PI/2,o.add(f);let F={color:"00ff00"};r.addColor(F,"color").name("颜色").onChange(p=>{i.vColor.value=new e.Color(p)}),r.add(i.vPow,"value",0,10).name("颜色高度");const h=r.addFolder("圆");h.add(u.iPower,"value",0,10).name("圆扩散"),h.add(u.iRadius,"value",0,1).name("圆半径");const l=r.addFolder("动感光波");l.add(a.vPower,"value",0,10).name("扩散力度"),l.add(a.vFreq,"value",5,20).name("光波圈数"),l.add(a.vSpeed,"value",0,10).name("光波速度"),l.addColor(a.vColor,"value").name("光波颜色").onChange(p=>{a.vColor.value=new e.Color(p)})},P=({THREE:e,scene:o,camera:w,renderer:C,controls:t})=>{t&&t.update(),g.getElapsedTime(),a.vTime.value+=.01,C.render(o,w)},{loading:S}=b({el:"#canvas",background:"#fff",cameraPosition:[0,8,10],control:!0,controlAutoSpeed:!1,helper:!1,light:!1,showStats:!1,creatMesh:y,animation:P});return q(()=>{a=null,r.destroy()}),(e,o)=>(B(),j(D,{loading:V(S)},{default:L(()=>o[0]||(o[0]=[z("canvas",{id:"canvas"},null,-1)])),_:1},8,["loading"]))}},X=k(A,[["__scopeId","data-v-bc0456d1"]]);export{X as default};
