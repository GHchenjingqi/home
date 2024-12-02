import{c as Q,V as l,a as D,w as Y,P as Z,f as F,x as j,y as $,W as H,U as T,z as V,j as E,u as ee,L as te}from"./Loading-C2vwFjpW.js";import{p as oe,k as B}from"./creatMesh-BWgGA8gZ.js";import{_ as re,b as ae,o as ie,c as ne,w as le,a as se,u as A}from"./index-C_oHrnUh.js";import"./allscreen-DKMNClLa.js";import"./loading-D7GcMhyS.js";class ce extends Q{constructor(c,e={}){super(c),this.isWater=!0;const u=this,W=e.textureWidth!==void 0?e.textureWidth:512,z=e.textureHeight!==void 0?e.textureHeight:512,L=e.clipBias!==void 0?e.clipBias:0,a=e.alpha!==void 0?e.alpha:1,o=e.time!==void 0?e.time:0,p=e.waterNormals!==void 0?e.waterNormals:null,v=e.sunDirection!==void 0?e.sunDirection:new l(.70707,.70707,0),m=new D(e.sunColor!==void 0?e.sunColor:16777215),d=new D(e.waterColor!==void 0?e.waterColor:8355711),w=e.eye!==void 0?e.eye:new l(0,0,0),R=e.distortionScale!==void 0?e.distortionScale:20,G=e.side!==void 0?e.side:Y,q=e.fog!==void 0?e.fog:!1,g=new Z,f=new l,x=new l,N=new l,y=new F,S=new l(0,0,-1),s=new j,M=new l,_=new l,C=new j,b=new F,r=new $,k=new H(W,z),P={name:"MirrorShader",uniforms:T.merge([V.fog,V.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new F},sunColor:{value:new D(8355711)},sunDirection:{value:new l(.70707,.70707,0)},eye:{value:new l},waterColor:{value:new D(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`},i=new E({name:P.name,uniforms:T.clone(P.uniforms),vertexShader:P.vertexShader,fragmentShader:P.fragmentShader,lights:!0,side:G,fog:q});i.uniforms.mirrorSampler.value=k.texture,i.uniforms.textureMatrix.value=b,i.uniforms.alpha.value=a,i.uniforms.time.value=o,i.uniforms.normalSampler.value=p,i.uniforms.sunColor.value=m,i.uniforms.waterColor.value=d,i.uniforms.sunDirection.value=v,i.uniforms.distortionScale.value=R,i.uniforms.eye.value=w,u.material=i,u.onBeforeRender=function(t,X,h){if(x.setFromMatrixPosition(u.matrixWorld),N.setFromMatrixPosition(h.matrixWorld),y.extractRotation(u.matrixWorld),f.set(0,0,1),f.applyMatrix4(y),M.subVectors(x,N),M.dot(f)>0)return;M.reflect(f).negate(),M.add(x),y.extractRotation(h.matrixWorld),S.set(0,0,-1),S.applyMatrix4(y),S.add(N),_.subVectors(x,S),_.reflect(f).negate(),_.add(x),r.position.copy(M),r.up.set(0,1,0),r.up.applyMatrix4(y),r.up.reflect(f),r.lookAt(_),r.far=h.far,r.updateMatrixWorld(),r.projectionMatrix.copy(h.projectionMatrix),b.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),b.multiply(r.projectionMatrix),b.multiply(r.matrixWorldInverse),g.setFromNormalAndCoplanarPoint(f,x),g.applyMatrix4(r.matrixWorldInverse),s.set(g.normal.x,g.normal.y,g.normal.z,g.constant);const n=r.projectionMatrix;C.x=(Math.sign(s.x)+n.elements[8])/n.elements[0],C.y=(Math.sign(s.y)+n.elements[9])/n.elements[5],C.z=-1,C.w=(1+n.elements[10])/n.elements[14],s.multiplyScalar(2/s.dot(C)),n.elements[2]=s.x,n.elements[6]=s.y,n.elements[10]=s.z+1-L,n.elements[14]=s.w,w.setFromMatrixPosition(h.matrixWorld);const J=t.getRenderTarget(),K=t.xr.enabled,O=t.shadowMap.autoUpdate;u.visible=!1,t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,t.setRenderTarget(k),t.state.buffers.depth.setMask(!0),t.autoClear===!1&&t.clear(),t.render(X,r),u.visible=!0,t.xr.enabled=K,t.shadowMap.autoUpdate=O,t.setRenderTarget(J);const U=h.viewport;U!==void 0&&t.state.viewport(U)}}}const ue={__name:"Demo8",setup(I){let c=null,e=null;const u=({THREE:a,scene:o,renderer:p})=>{p.toneMapping=a.ACESFilmicToneMapping,p.toneMappingExposure=.5,o.background=new a.Color(14612223);try{const v=new a.PlaneGeometry(1e4,1e4);c=new ce(v,{textureWidth:512,textureHeight:512,waterNormals:new a.TextureLoader().load("/home//public/images/waternormals.jpg",function(w){w.wrapS=w.wrapT=a.RepeatWrapping}),sunDirection:new a.Vector3,sunColor:16777215,waterColor:7695,distortionScale:3.7,fog:o.fog!==void 0}),c.rotation.x=-Math.PI/2,o.add(c);let m=oe({type:"point",color:16777215,intensity:600,position:[2,4,-3]});o.add(m),e=B(o.children,"boat"),e.position.y=.5,e.position.z=12,e.rotation.y=Math.PI;let d=B(o.children,"lighthouse");d.scale.set(50,50,60),d.position.set(-28,9,-200),d.rotation.y=Math.PI/2}catch{alert("加载模型异常，请刷新页面")}},W=({scene:a,camera:o,renderer:p,controls:v,stats:m})=>{const d=performance.now()*.001;c&&(c.material.uniforms.time.value+=1/60),e&&(e.position.x=Math.sin(d)*2),v.update(),p.render(a,o),m==null||m.update()},{loading:z,pregress:L}=ee({el:"#canvas",background:"#333333",modelPath:["public/glbs/boat.glb","public/glbs/lighthouse.glb"],modelName:["boat","lighthouse"],modelScale:[10,10,10],cameraPosition:[0,4,10],controlAuto:!1,helper:!1,light:!1,creatMesh:u,animation:W});return ae(()=>{c=null,e=null}),(a,o)=>(ie(),ne(te,{loading:A(z),pregress:A(L)},{default:le(()=>o[0]||(o[0]=[se("canvas",{id:"canvas"},null,-1)])),_:1},8,["loading","pregress"]))}},ge=re(ue,[["__scopeId","data-v-b45c918b"]]);export{ge as default};
