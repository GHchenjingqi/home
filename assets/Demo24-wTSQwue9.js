import{u as I,L as N}from"./Loading-BVRw2vUq.js";import{_ as W,g as q,o as z,c as J,w as K,a as O,u as Q}from"./index-BawrebKO.js";import"./allscreen-_NF5mk1W.js";import"./loading-BXxcomvc.js";const X={__name:"Demo24",setup(Y){let i=`
void main(){
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
} `,d=`
void main()
{
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); // 这里改变颜色
}`,o=`
varying vec2 vUv;
void main() {
  vUv = uv; // 将 uv 值传递给片段着色器
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,c=`
varying vec2 vUv;
void main() {
    // 从左到右渐变
    // gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
    // 从上到下渐变
    // gl_FragColor = vec4(vUv.y, 0.0, 0.0, 1.0);
    // 左右黑白灰
    // gl_FragColor = vec4(vec3(vUv.x), 1.0);
    // 上下黑白灰
    // gl_FragColor = vec4(vec3(vUv.y), 1.0);
    // 青色红色
    // gl_FragColor = vec4(vUv, 0.0, 1.0);
    // 蓝色紫色
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // 颜色突变,左黑右白
    // float color = step(0.5, vUv.x);
    // gl_FragColor = vec4(vec3(color), 1.0);
    // 颜色突变,左白右黑
    // float color = step(vUv.x,0.5);
    // gl_FragColor = vec4(vec3(color), 1.0);
    // 重复条纹。 fract重复次数
    // gl_FragColor = vec4(vec3(fract(vUv.x * 3.0)), 1.0);
    // 重复条纹,颜色突变
    gl_FragColor = vec4(vec3(step(0.5, fract(vUv.y * 3.0))), 1.0);
}`,t=null,s=null;const B=async({THREE:e,scene:n,controls:m,canvas:g,camera:h,renderer:v,clock:l})=>{s=l;const r=new e.PlaneGeometry(2,2),u=new e.SphereGeometry(1),S=new e.BoxGeometry(1),a=new e.Group,P=new e.ShaderMaterial({vertexShader:i}),p=new e.Mesh(r,P);p.position.set(-9,0,0),a.add(p);const V=new e.ShaderMaterial({vertexShader:i,fragmentShader:d,side:e.DoubleSide}),_=new e.Mesh(r,V);_.position.set(3,0,0),a.add(_);const j=new e.ShaderMaterial({vertexShader:o,fragmentShader:c,side:e.DoubleSide}),w=new e.Mesh(r,j);w.position.set(-3,0,-3),a.add(w);const f=new e.Mesh(r,new e.ShaderMaterial({vertexShader:o,fragmentShader:`varying vec2 vUv;
        void main() {
            float strength = mod(vUv.y * 10.0,1.0);
            gl_FragColor = vec4(vec3(strength), 1.0);
        }`,side:e.DoubleSide}));f.position.set(-6,0,-3),a.add(f);const x=new e.Mesh(r,new e.ShaderMaterial({vertexShader:o,fragmentShader:`varying vec2 vUv;
        void main() {
            gl_FragColor = vec4(vUv, 1.0, 1.0);
        }`,side:e.DoubleSide}));x.position.set(0,0,0),a.add(x);const M=new e.Mesh(r,new e.ShaderMaterial({vertexShader:o,fragmentShader:`varying vec2 vUv;
        void main() {
           gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
        }`,side:e.DoubleSide}));M.position.set(-6,0,0),a.add(M);const U=new e.Mesh(r,new e.ShaderMaterial({vertexShader:o,fragmentShader:`varying vec2 vUv;
        void main() {
           gl_FragColor = vec4(vUv.y, 0.0, 0.0, 1.0);
        }`,side:e.DoubleSide}));U.position.set(-3,0,0),a.add(U),t=new e.ShaderMaterial({vertexShader:o,fragmentShader:`varying vec2 vUv;
        uniform vec2 u_resolution;
        uniform float u_time;
        void main() {
           gl_FragColor = vec4(vUv, 0.5 + 0.5 * sin(u_time), 1.0);
        }`,uniforms:{u_resolution:{value:new e.Vector2(window.innerWidth,window.innerHeight)},u_time:{value:0}},side:e.DoubleSide});const y=new e.Mesh(r,t);y.position.set(0,0,3),a.add(y);const C=new e.Mesh(S,t);C.position.set(-3,0,3),a.add(C);const F=new e.Mesh(u,t);F.position.set(3,0,3),a.add(F);const L=new e.ShaderMaterial({vertexShader:o,fragmentShader:c,side:e.DoubleSide}),b=new e.Mesh(S,L);b.position.set(0,0,-3),a.add(b);const A=new e.ShaderMaterial({vertexShader:o,fragmentShader:`
        varying vec2 vUv;
        void main() {
         gl_FragColor = vec4(vec3(step(0.5, fract(vUv.x * 8.0))), 1.0);
        }`,side:e.DoubleSide}),D=new e.Mesh(u,A);D.position.set(3,0,-3),a.add(D),n.add(a)},k=({THREE:e,scene:n,camera:m,renderer:g,stats:h,controls:v})=>{h.update(),v&&v.update();const l=s.getElapsedTime();t.uniforms.u_time.value=l,g.render(n,m)},{loading:G}=I({el:"#canvas",background:"#010826",cameraPosition:[0,3,8],control:!0,controlAutoSpeed:!1,helper:!0,light:!0,creatMesh:B,animation:k});return q(()=>{i=null,d=null,t=null,s=null}),(e,n)=>(z(),J(N,{loading:Q(G)},{default:K(()=>n[0]||(n[0]=[O("canvas",{id:"canvas"},null,-1)])),_:1},8,["loading"]))}},R=W(X,[["__scopeId","data-v-8af196c1"]]);export{R as default};
