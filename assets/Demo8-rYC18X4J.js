import{c as Q,V as l,C as W,v as Y,P as Z,f as k,w as j,x as $,W as H,U as T,y as V,j as E,u as ee,L as te}from"./Loading-79aDrk5N.js";import{n as oe,o as B}from"./creatMesh-osWYknU5.js";import{_ as re,d as ae,o as ie,c as ne,w as le,u as A,p as se,a as ce,b as ue}from"./index-VRAcYr2a.js";import"./allscreen-BbwXwfjp.js";import"./loading-BwWTHRMq.js";class me extends Q{constructor(c,e={}){super(c),this.isWater=!0;const u=this,L=e.textureWidth!==void 0?e.textureWidth:512,N=e.textureHeight!==void 0?e.textureHeight:512,z=e.clipBias!==void 0?e.clipBias:0,r=e.alpha!==void 0?e.alpha:1,a=e.time!==void 0?e.time:0,f=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new l(.70707,.70707,0),w=new W(e.sunColor!==void 0?e.sunColor:16777215),m=new W(e.waterColor!==void 0?e.waterColor:8355711),y=e.eye!==void 0?e.eye:new l(0,0,0),R=e.distortionScale!==void 0?e.distortionScale:20,G=e.side!==void 0?e.side:Y,q=e.fog!==void 0?e.fog:!1,p=new Z,d=new l,v=new l,F=new l,_=new k,C=new l(0,0,-1),s=new j,M=new l,b=new l,S=new j,P=new k,o=new $,I=new H(L,N),D={name:"MirrorShader",uniforms:T.merge([V.fog,V.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new k},sunColor:{value:new W(8355711)},sunDirection:{value:new l(.70707,.70707,0)},eye:{value:new l},waterColor:{value:new W(5592405)}}]),vertexShader:`
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
				}`},i=new E({name:D.name,uniforms:T.clone(D.uniforms),vertexShader:D.vertexShader,fragmentShader:D.fragmentShader,lights:!0,side:G,fog:q});i.uniforms.mirrorSampler.value=I.texture,i.uniforms.textureMatrix.value=P,i.uniforms.alpha.value=r,i.uniforms.time.value=a,i.uniforms.normalSampler.value=f,i.uniforms.sunColor.value=w,i.uniforms.waterColor.value=m,i.uniforms.sunDirection.value=h,i.uniforms.distortionScale.value=R,i.uniforms.eye.value=y,u.material=i,u.onBeforeRender=function(t,X,g){if(v.setFromMatrixPosition(u.matrixWorld),F.setFromMatrixPosition(g.matrixWorld),_.extractRotation(u.matrixWorld),d.set(0,0,1),d.applyMatrix4(_),M.subVectors(v,F),M.dot(d)>0)return;M.reflect(d).negate(),M.add(v),_.extractRotation(g.matrixWorld),C.set(0,0,-1),C.applyMatrix4(_),C.add(F),b.subVectors(v,C),b.reflect(d).negate(),b.add(v),o.position.copy(M),o.up.set(0,1,0),o.up.applyMatrix4(_),o.up.reflect(d),o.lookAt(b),o.far=g.far,o.updateMatrixWorld(),o.projectionMatrix.copy(g.projectionMatrix),P.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),P.multiply(o.projectionMatrix),P.multiply(o.matrixWorldInverse),p.setFromNormalAndCoplanarPoint(d,v),p.applyMatrix4(o.matrixWorldInverse),s.set(p.normal.x,p.normal.y,p.normal.z,p.constant);const n=o.projectionMatrix;S.x=(Math.sign(s.x)+n.elements[8])/n.elements[0],S.y=(Math.sign(s.y)+n.elements[9])/n.elements[5],S.z=-1,S.w=(1+n.elements[10])/n.elements[14],s.multiplyScalar(2/s.dot(S)),n.elements[2]=s.x,n.elements[6]=s.y,n.elements[10]=s.z+1-z,n.elements[14]=s.w,y.setFromMatrixPosition(g.matrixWorld);const J=t.getRenderTarget(),K=t.xr.enabled,O=t.shadowMap.autoUpdate;u.visible=!1,t.xr.enabled=!1,t.shadowMap.autoUpdate=!1,t.setRenderTarget(I),t.state.buffers.depth.setMask(!0),t.autoClear===!1&&t.clear(),t.render(X,o),u.visible=!0,t.xr.enabled=K,t.shadowMap.autoUpdate=O,t.setRenderTarget(J);const U=g.viewport;U!==void 0&&t.state.viewport(U)}}}const de=x=>(se("data-v-efd6fc1c"),x=x(),ce(),x),fe=de(()=>ue("canvas",{id:"canvas"},null,-1)),pe={__name:"Demo8",setup(x){let c=null,e=null;const u=({THREE:r,scene:a,renderer:f})=>{f.toneMapping=r.ACESFilmicToneMapping,f.toneMappingExposure=.5,a.background=new r.Color(14612223);const h=new r.PlaneGeometry(1e4,1e4);c=new me(h,{textureWidth:512,textureHeight:512,waterNormals:new r.TextureLoader().load("/public/images/waternormals.jpg",function(y){y.wrapS=y.wrapT=r.RepeatWrapping}),sunDirection:new r.Vector3,sunColor:16777215,waterColor:7695,distortionScale:3.7,fog:a.fog!==void 0}),c.rotation.x=-Math.PI/2,a.add(c);let w=oe({type:"point",color:16777215,intensity:600,position:[2,4,-3]});a.add(w),e=B(a.children,"boat"),e.position.y=.5,e.position.z=12,e.rotation.y=Math.PI;let m=B(a.children,"lighthouse");m.scale.set(50,50,60),m.position.set(-28,9,-200),m.rotation.y=Math.PI/2},L=({scene:r,camera:a,renderer:f,controls:h,stats:w})=>{const m=performance.now()*.001;c&&(c.material.uniforms.time.value+=1/60),e&&(e.position.x=Math.sin(m)*2),h.update(),f.render(r,a),w.update()},{loading:N,pregress:z}=ee({el:"#canvas",background:"#333333",modelPath:["/public/glbs/boat.glb","/public/glbs/lighthouse.glb"],modelName:["boat","lighthouse"],modelScale:[10,10,10],cameraPosition:[0,4,10],controlAuto:!1,helper:!1,light:!1,creatMesh:u,animation:L});return ae(()=>{c=null,e=null}),(r,a)=>(ie(),ne(te,{loading:A(N),pregress:A(z)},{default:le(()=>[fe]),_:1},8,["loading","pregress"]))}},ye=re(pe,[["__scopeId","data-v-efd6fc1c"]]);export{ye as default};
