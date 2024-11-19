import{i as ae,c as ne,B as oe,F as V,j as b,U as N,h as _,W as C,H as w,N as U,g as le,C as B,k as he,D as W,R as ue,f as fe,V as X,A as de,l as ce,m as pe,n as ge,o as ve,p as _e,q as Me,r as me,s as xe,t as Ce,u as Se,L as Te}from"./Loading-79aDrk5N.js";import{u as we}from"./useRay-CqR-vRIM.js";import{_ as be,g as ye,o as Pe,c as Be,w as ke,u as Oe,p as De,a as Ae,b as Re}from"./index-VRAcYr2a.js";import"./allscreen-BbwXwfjp.js";import"./loading-BwWTHRMq.js";const Z={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class D{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ee=new ae(-1,1,1,-1,0,1);class Ie extends oe{constructor(){super(),this.setAttribute("position",new V([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new V([0,2,0,0,2,0],2))}}const Ue=new Ie;class z{constructor(e){this._mesh=new ne(Ue,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ee)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Fe extends D{constructor(e,i){super(),this.textureID=i!==void 0?i:"tDiffuse",e instanceof b?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=N.clone(e.uniforms),this.material=new b({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new z(this.material)}render(e,i,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class q extends D{constructor(e,i){super(),this.scene=e,this.camera=i,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,i,r){const s=e.getContext(),n=e.state;n.buffers.color.setMask(!1),n.buffers.depth.setMask(!1),n.buffers.color.setLocked(!0),n.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),n.buffers.stencil.setTest(!0),n.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),n.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),n.buffers.stencil.setClear(o),n.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),n.buffers.color.setLocked(!1),n.buffers.depth.setLocked(!1),n.buffers.color.setMask(!0),n.buffers.depth.setMask(!0),n.buffers.stencil.setLocked(!1),n.buffers.stencil.setFunc(s.EQUAL,1,4294967295),n.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),n.buffers.stencil.setLocked(!0)}}class Ne extends D{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ze{constructor(e,i){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),i===void 0){const r=e.getSize(new _);this._width=r.width,this._height=r.height,i=new C(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:w}),i.texture.name="EffectComposer.rt1"}else this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Fe(Z),this.copyPass.material.blending=U,this.clock=new le}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,i){this.passes.splice(i,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const i=this.passes.indexOf(e);i!==-1&&this.passes.splice(i,1)}isLastEnabledPass(e){for(let i=e+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const i=this.renderer.getRenderTarget();let r=!1;for(let s=0,n=this.passes.length;s<n;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),a.needsSwap){if(r){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}q!==void 0&&(a instanceof q?r=!0:a instanceof Ne&&(r=!1))}}this.renderer.setRenderTarget(i)}reset(e){if(e===void 0){const i=this.renderer.getSize(new _);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,i){this._width=e,this._height=i;const r=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(r,s),this.renderTarget2.setSize(r,s);for(let n=0;n<this.passes.length;n++)this.passes[n].setSize(r,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ge extends D{constructor(e,i,r=null,s=null,n=null){super(),this.scene=e,this.camera=i,this.overrideMaterial=r,this.clearColor=s,this.clearAlpha=n,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new B}render(e,i,r){const s=e.autoClear;e.autoClear=!1;let n,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(n=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(n),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}}class S extends D{constructor(e,i,r,s){super(),this.renderScene=i,this.renderCamera=r,this.selectedObjects=s!==void 0?s:[],this.visibleEdgeColor=new B(1,1,1),this.hiddenEdgeColor=new B(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this.resolution=e!==void 0?new _(e.x,e.y):new _(256,256);const n=Math.round(this.resolution.x/this.downSampleRatio),a=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new C(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new he,this.depthMaterial.side=W,this.depthMaterial.depthPacking=ue,this.depthMaterial.blending=U,this.prepareMaskMaterial=this.getPrepareMaskMaterial(),this.prepareMaskMaterial.side=W,this.prepareMaskMaterial.fragmentShader=u(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new C(this.resolution.x,this.resolution.y,{type:w}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new C(n,a,{type:w}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new C(n,a,{type:w}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new C(Math.round(n/2),Math.round(a/2),{type:w}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this.getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new C(n,a,{type:w}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new C(Math.round(n/2),Math.round(a/2),{type:w}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const o=4,l=4;this.separableBlurMaterial1=this.getSeperableBlurMaterial(o),this.separableBlurMaterial1.uniforms.texSize.value.set(n,a),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this.getSeperableBlurMaterial(l),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(n/2),Math.round(a/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=l,this.overlayMaterial=this.getOverlayMaterial();const f=Z;this.copyUniforms=N.clone(f.uniforms),this.materialCopy=new b({uniforms:this.copyUniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader,blending:U,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new B,this.oldClearAlpha=1,this.fsQuad=new z(null),this.tempPulseColor1=new B,this.tempPulseColor2=new B,this.textureMatrix=new fe;function u(h,d){const c=d.isPerspectiveCamera?"perspective":"orthographic";return h.replace(/DEPTH_TO_VIEW_Z/g,c+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this.fsQuad.dispose()}setSize(e,i){this.renderTargetMaskBuffer.setSize(e,i),this.renderTargetDepthBuffer.setSize(e,i);let r=Math.round(e/this.downSampleRatio),s=Math.round(i/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(r,s),this.renderTargetBlurBuffer1.setSize(r,s),this.renderTargetEdgeBuffer1.setSize(r,s),this.separableBlurMaterial1.uniforms.texSize.value.set(r,s),r=Math.round(r/2),s=Math.round(s/2),this.renderTargetBlurBuffer2.setSize(r,s),this.renderTargetEdgeBuffer2.setSize(r,s),this.separableBlurMaterial2.uniforms.texSize.value.set(r,s)}changeVisibilityOfSelectedObjects(e){const i=this._visibilityCache;function r(s){s.isMesh&&(e===!0?s.visible=i.get(s):(i.set(s,s.visible),s.visible=e))}for(let s=0;s<this.selectedObjects.length;s++)this.selectedObjects[s].traverse(r)}changeVisibilityOfNonSelectedObjects(e){const i=this._visibilityCache,r=[];function s(a){a.isMesh&&r.push(a)}for(let a=0;a<this.selectedObjects.length;a++)this.selectedObjects[a].traverse(s);function n(a){if(a.isMesh||a.isSprite){let o=!1;for(let l=0;l<r.length;l++)if(r[l].id===a.id){o=!0;break}if(o===!1){const l=a.visible;(e===!1||i.get(a)===!0)&&(a.visible=e),i.set(a,l)}}else(a.isPoints||a.isLine)&&(e===!0?a.visible=i.get(a):(i.set(a,a.visible),a.visible=e))}this.renderScene.traverse(n)}updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}render(e,i,r,s,n){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,n&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this.changeVisibilityOfSelectedObjects(!1);const o=this.renderScene.background;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this.updateTextureMatrix(),this.changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this.renderScene.overrideMaterial=null,this.changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this.renderScene.background=o,this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this.fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const l=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(l),this.tempPulseColor2.multiplyScalar(l)}this.fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=S.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=S.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=S.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this.fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=S.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,n&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(r),this.fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}this.renderToScreen&&(this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=r.texture,e.setRenderTarget(null),this.fsQuad.render(e))}getPrepareMaskMaterial(){return new b({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new _(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif
					
					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}getEdgeDetectionMaterial(){return new b({uniforms:{maskTexture:{value:null},texSize:{value:new _(.5,.5)},visibleEdgeColor:{value:new X(1,1,1)},hiddenEdgeColor:{value:new X(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}getSeperableBlurMaterial(e){return new b({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new _(.5,.5)},direction:{value:new _(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}getOverlayMaterial(){return new b({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:de,depthTest:!1,depthWrite:!1,transparent:!0})}}S.BlurDirectionX=new _(1,0);S.BlurDirectionY=new _(0,1);const je={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Le extends D{constructor(){super();const e=je;this.uniforms=N.clone(e.uniforms),this.material=new ce({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new z(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,i,r){this.uniforms.tDiffuse.value=r.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},pe.getTransfer(this._outputColorSpace)===ge&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ve?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===_e?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Me?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===me?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===xe?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ce&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}var O=Object.freeze({Linear:Object.freeze({None:function(t){return t},In:function(t){return t},Out:function(t){return t},InOut:function(t){return t}}),Quadratic:Object.freeze({In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}}),Cubic:Object.freeze({In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}}),Quartic:Object.freeze({In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}}),Quintic:Object.freeze({In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}}),Sinusoidal:Object.freeze({In:function(t){return 1-Math.sin((1-t)*Math.PI/2)},Out:function(t){return Math.sin(t*Math.PI/2)},InOut:function(t){return .5*(1-Math.sin(Math.PI*(.5-t)))}}),Exponential:Object.freeze({In:function(t){return t===0?0:Math.pow(1024,t-1)},Out:function(t){return t===1?1:1-Math.pow(2,-10*t)},InOut:function(t){return t===0?0:t===1?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2)}}),Circular:Object.freeze({In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}}),Elastic:Object.freeze({In:function(t){return t===0?0:t===1?1:-Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI)},Out:function(t){return t===0?0:t===1?1:Math.pow(2,-10*t)*Math.sin((t-.1)*5*Math.PI)+1},InOut:function(t){return t===0?0:t===1?1:(t*=2,t<1?-.5*Math.pow(2,10*(t-1))*Math.sin((t-1.1)*5*Math.PI):.5*Math.pow(2,-10*(t-1))*Math.sin((t-1.1)*5*Math.PI)+1)}}),Back:Object.freeze({In:function(t){var e=1.70158;return t===1?1:t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return t===0?0:--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?.5*(t*t*((e+1)*t-e)):.5*((t-=2)*t*((e+1)*t+e)+2)}}),Bounce:Object.freeze({In:function(t){return 1-O.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?O.Bounce.In(t*2)*.5:O.Bounce.Out(t*2-1)*.5+.5}}),generatePow:function(t){return t===void 0&&(t=4),t=t<Number.EPSILON?Number.EPSILON:t,t=t>1e4?1e4:t,{In:function(e){return Math.pow(e,t)},Out:function(e){return 1-Math.pow(1-e,t)},InOut:function(e){return e<.5?Math.pow(e*2,t)/2:(1-Math.pow(2-e*2,t))/2+.5}}}}),A=function(){return performance.now()},Qe=function(){function t(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];this._tweens={},this._tweensAddedDuringUpdate={},this.add.apply(this,e)}return t.prototype.getAll=function(){var e=this;return Object.keys(this._tweens).map(function(i){return e._tweens[i]})},t.prototype.removeAll=function(){this._tweens={}},t.prototype.add=function(){for(var e,i=[],r=0;r<arguments.length;r++)i[r]=arguments[r];for(var s=0,n=i;s<n.length;s++){var a=n[s];(e=a._group)===null||e===void 0||e.remove(a),a._group=this,this._tweens[a.getId()]=a,this._tweensAddedDuringUpdate[a.getId()]=a}},t.prototype.remove=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];for(var r=0,s=e;r<s.length;r++){var n=s[r];n._group=void 0,delete this._tweens[n.getId()],delete this._tweensAddedDuringUpdate[n.getId()]}},t.prototype.allStopped=function(){return this.getAll().every(function(e){return!e.isPlaying()})},t.prototype.update=function(e,i){e===void 0&&(e=A()),i===void 0&&(i=!0);var r=Object.keys(this._tweens);if(r.length!==0)for(;r.length>0;){this._tweensAddedDuringUpdate={};for(var s=0;s<r.length;s++){var n=this._tweens[r[s]],a=!i;n&&n.update(e,a)===!1&&!i&&this.remove(n)}r=Object.keys(this._tweensAddedDuringUpdate)}},t}(),k={Linear:function(t,e){var i=t.length-1,r=i*e,s=Math.floor(r),n=k.Utils.Linear;return e<0?n(t[0],t[1],r):e>1?n(t[i],t[i-1],i-r):n(t[s],t[s+1>i?i:s+1],r-s)},Bezier:function(t,e){for(var i=0,r=t.length-1,s=Math.pow,n=k.Utils.Bernstein,a=0;a<=r;a++)i+=s(1-e,r-a)*s(e,a)*t[a]*n(r,a);return i},CatmullRom:function(t,e){var i=t.length-1,r=i*e,s=Math.floor(r),n=k.Utils.CatmullRom;return t[0]===t[i]?(e<0&&(s=Math.floor(r=i*(1+e))),n(t[(s-1+i)%i],t[s],t[(s+1)%i],t[(s+2)%i],r-s)):e<0?t[0]-(n(t[0],t[0],t[1],t[1],-r)-t[0]):e>1?t[i]-(n(t[i],t[i],t[i-1],t[i-1],r-i)-t[i]):n(t[s?s-1:0],t[s],t[i<s+1?i:s+1],t[i<s+2?i:s+2],r-s)},Utils:{Linear:function(t,e,i){return(e-t)*i+t},Bernstein:function(t,e){var i=k.Utils.Factorial;return i(t)/i(e)/i(t-e)},Factorial:function(){var t=[1];return function(e){var i=1;if(t[e])return t[e];for(var r=e;r>1;r--)i*=r;return t[e]=i,i}}(),CatmullRom:function(t,e,i,r,s){var n=(i-t)*.5,a=(r-e)*.5,o=s*s,l=s*o;return(2*e-2*i+n+a)*l+(-3*e+3*i-2*n-a)*o+n*s+e}}},Ve=function(){function t(){}return t.nextId=function(){return t._nextId++},t._nextId=0,t}(),F=new Qe,We=function(){function t(e,i){this._isPaused=!1,this._pauseStart=0,this._valuesStart={},this._valuesEnd={},this._valuesStartRepeat={},this._duration=1e3,this._isDynamic=!1,this._initialRepeat=0,this._repeat=0,this._yoyo=!1,this._isPlaying=!1,this._reversed=!1,this._delayTime=0,this._startTime=0,this._easingFunction=O.Linear.None,this._interpolationFunction=k.Linear,this._chainedTweens=[],this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._id=Ve.nextId(),this._isChainStopped=!1,this._propertiesAreSetUp=!1,this._goToEnd=!1,this._object=e,typeof i=="object"?(this._group=i,i.add(this)):i===!0&&(this._group=F,F.add(this))}return t.prototype.getId=function(){return this._id},t.prototype.isPlaying=function(){return this._isPlaying},t.prototype.isPaused=function(){return this._isPaused},t.prototype.getDuration=function(){return this._duration},t.prototype.to=function(e,i){if(i===void 0&&(i=1e3),this._isPlaying)throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");return this._valuesEnd=e,this._propertiesAreSetUp=!1,this._duration=i<0?0:i,this},t.prototype.duration=function(e){return e===void 0&&(e=1e3),this._duration=e<0?0:e,this},t.prototype.dynamic=function(e){return e===void 0&&(e=!1),this._isDynamic=e,this},t.prototype.start=function(e,i){if(e===void 0&&(e=A()),i===void 0&&(i=!1),this._isPlaying)return this;if(this._repeat=this._initialRepeat,this._reversed){this._reversed=!1;for(var r in this._valuesStartRepeat)this._swapEndStartRepeatValues(r),this._valuesStart[r]=this._valuesStartRepeat[r]}if(this._isPlaying=!0,this._isPaused=!1,this._onStartCallbackFired=!1,this._onEveryStartCallbackFired=!1,this._isChainStopped=!1,this._startTime=e,this._startTime+=this._delayTime,!this._propertiesAreSetUp||i){if(this._propertiesAreSetUp=!0,!this._isDynamic){var s={};for(var n in this._valuesEnd)s[n]=this._valuesEnd[n];this._valuesEnd=s}this._setupProperties(this._object,this._valuesStart,this._valuesEnd,this._valuesStartRepeat,i)}return this},t.prototype.startFromCurrentValues=function(e){return this.start(e,!0)},t.prototype._setupProperties=function(e,i,r,s,n){for(var a in r){var o=e[a],l=Array.isArray(o),f=l?"array":typeof o,u=!l&&Array.isArray(r[a]);if(!(f==="undefined"||f==="function")){if(u){var h=r[a];if(h.length===0)continue;for(var d=[o],c=0,p=h.length;c<p;c+=1){var y=this._handleRelativeValue(o,h[c]);if(isNaN(y)){u=!1,console.warn("Found invalid interpolation list. Skipping.");break}d.push(y)}u&&(r[a]=d)}if((f==="object"||l)&&o&&!u){i[a]=l?[]:{};var T=o;for(var g in T)i[a][g]=T[g];s[a]=l?[]:{};var h=r[a];if(!this._isDynamic){var R={};for(var g in h)R[g]=h[g];r[a]=h=R}this._setupProperties(T,i[a],h,s[a],n)}else(typeof i[a]>"u"||n)&&(i[a]=o),l||(i[a]*=1),u?s[a]=r[a].slice().reverse():s[a]=i[a]||0}}},t.prototype.stop=function(){return this._isChainStopped||(this._isChainStopped=!0,this.stopChainedTweens()),this._isPlaying?(this._isPlaying=!1,this._isPaused=!1,this._onStopCallback&&this._onStopCallback(this._object),this):this},t.prototype.end=function(){return this._goToEnd=!0,this.update(this._startTime+this._duration),this},t.prototype.pause=function(e){return e===void 0&&(e=A()),this._isPaused||!this._isPlaying?this:(this._isPaused=!0,this._pauseStart=e,this)},t.prototype.resume=function(e){return e===void 0&&(e=A()),!this._isPaused||!this._isPlaying?this:(this._isPaused=!1,this._startTime+=e-this._pauseStart,this._pauseStart=0,this)},t.prototype.stopChainedTweens=function(){for(var e=0,i=this._chainedTweens.length;e<i;e++)this._chainedTweens[e].stop();return this},t.prototype.group=function(e){return e?(e.add(this),this):(console.warn("tween.group() without args has been removed, use group.add(tween) instead."),this)},t.prototype.remove=function(){var e;return(e=this._group)===null||e===void 0||e.remove(this),this},t.prototype.delay=function(e){return e===void 0&&(e=0),this._delayTime=e,this},t.prototype.repeat=function(e){return e===void 0&&(e=0),this._initialRepeat=e,this._repeat=e,this},t.prototype.repeatDelay=function(e){return this._repeatDelayTime=e,this},t.prototype.yoyo=function(e){return e===void 0&&(e=!1),this._yoyo=e,this},t.prototype.easing=function(e){return e===void 0&&(e=O.Linear.None),this._easingFunction=e,this},t.prototype.interpolation=function(e){return e===void 0&&(e=k.Linear),this._interpolationFunction=e,this},t.prototype.chain=function(){for(var e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];return this._chainedTweens=e,this},t.prototype.onStart=function(e){return this._onStartCallback=e,this},t.prototype.onEveryStart=function(e){return this._onEveryStartCallback=e,this},t.prototype.onUpdate=function(e){return this._onUpdateCallback=e,this},t.prototype.onRepeat=function(e){return this._onRepeatCallback=e,this},t.prototype.onComplete=function(e){return this._onCompleteCallback=e,this},t.prototype.onStop=function(e){return this._onStopCallback=e,this},t.prototype.update=function(e,i){var r=this,s;if(e===void 0&&(e=A()),i===void 0&&(i=t.autoStartOnUpdate),this._isPaused)return!0;var n;if(!this._goToEnd&&!this._isPlaying)if(i)this.start(e,!0);else return!1;if(this._goToEnd=!1,e<this._startTime)return!0;this._onStartCallbackFired===!1&&(this._onStartCallback&&this._onStartCallback(this._object),this._onStartCallbackFired=!0),this._onEveryStartCallbackFired===!1&&(this._onEveryStartCallback&&this._onEveryStartCallback(this._object),this._onEveryStartCallbackFired=!0);var a=e-this._startTime,o=this._duration+((s=this._repeatDelayTime)!==null&&s!==void 0?s:this._delayTime),l=this._duration+this._repeat*o,f=function(){if(r._duration===0||a>l)return 1;var y=Math.trunc(a/o),T=a-y*o,g=Math.min(T/r._duration,1);return g===0&&a===r._duration?1:g},u=f(),h=this._easingFunction(u);if(this._updateProperties(this._object,this._valuesStart,this._valuesEnd,h),this._onUpdateCallback&&this._onUpdateCallback(this._object,u),this._duration===0||a>=this._duration)if(this._repeat>0){var d=Math.min(Math.trunc((a-this._duration)/o)+1,this._repeat);isFinite(this._repeat)&&(this._repeat-=d);for(n in this._valuesStartRepeat)!this._yoyo&&typeof this._valuesEnd[n]=="string"&&(this._valuesStartRepeat[n]=this._valuesStartRepeat[n]+parseFloat(this._valuesEnd[n])),this._yoyo&&this._swapEndStartRepeatValues(n),this._valuesStart[n]=this._valuesStartRepeat[n];return this._yoyo&&(this._reversed=!this._reversed),this._startTime+=o*d,this._onRepeatCallback&&this._onRepeatCallback(this._object),this._onEveryStartCallbackFired=!1,!0}else{this._onCompleteCallback&&this._onCompleteCallback(this._object);for(var c=0,p=this._chainedTweens.length;c<p;c++)this._chainedTweens[c].start(this._startTime+this._duration,!1);return this._isPlaying=!1,!1}return!0},t.prototype._updateProperties=function(e,i,r,s){for(var n in r)if(i[n]!==void 0){var a=i[n]||0,o=r[n],l=Array.isArray(e[n]),f=Array.isArray(o),u=!l&&f;u?e[n]=this._interpolationFunction(o,s):typeof o=="object"&&o?this._updateProperties(e[n],a,o,s):(o=this._handleRelativeValue(a,o),typeof o=="number"&&(e[n]=a+(o-a)*s))}},t.prototype._handleRelativeValue=function(e,i){return typeof i!="string"?i:i.charAt(0)==="+"||i.charAt(0)==="-"?e+parseFloat(i):parseFloat(i)},t.prototype._swapEndStartRepeatValues=function(e){var i=this._valuesStartRepeat[e],r=this._valuesEnd[e];typeof r=="string"?this._valuesStartRepeat[e]=this._valuesStartRepeat[e]+parseFloat(r):this._valuesStartRepeat[e]=this._valuesEnd[e],this._valuesEnd[e]=i},t.autoStartOnUpdate=!1,t}(),M=F;M.getAll.bind(M);M.removeAll.bind(M);M.add.bind(M);M.remove.bind(M);M.update.bind(M);const Xe=t=>(De("data-v-85906780"),t=t(),Ae(),t),qe=Xe(()=>Re("canvas",{id:"canvas"},null,-1)),Ze={__name:"Demo22",setup(t){let e=null,i=null,r=null;const s=async({THREE:o,scene:l,controls:f,canvas:u,camera:h,renderer:d})=>{i=new ze(d);const c=new Ge(l,h);i.addPass(c);const p=new S(new o.Vector2(u.clientWidth,u.clientHeight),l,h);p.visibleEdgeColor.set(16711680),p.edgeThickness=5,p.edgeGlow=2,p.usePatternTexture=!0,i.addPass(p);const y=new Le;i.addPass(y);const T=new o.BoxGeometry(1,1,1),g=new o.BoxGeometry(1,5,1),R=new o.SphereGeometry(1),K=new o.CylinderGeometry(1,2,5),Y=new o.ConeGeometry(1,3,3),J=new o.CapsuleGeometry(1,1,4,8),$=new o.PlaneGeometry(2,6),H=new o.Mesh(T,new o.MeshPhongMaterial({color:16711680})),G=new o.Mesh(g,new o.MeshPhongMaterial({color:16776960}));G.position.x=3;const j=new o.Mesh(R,new o.MeshPhongMaterial({color:16711935}));j.position.x=-3;const L=new o.Mesh(K,new o.MeshPhongMaterial({color:255}));L.position.z=-3;const Q=new o.Mesh(Y,new o.MeshPhongMaterial({color:65280}));Q.position.z=3;const E=new o.Mesh(J,new o.MeshPhongMaterial({color:1044735}));E.position.z=-6,E.position.x=4;const I=new o.Mesh($,new o.MeshPhongMaterial({color:15732495}));I.position.z=-6,I.position.x=-4;const m=new o.Group;m.add(H),m.add(G),m.add(j),m.add(L),m.add(Q),m.add(E),m.add(I),l.add(m);const ee=(x,v,ie)=>{x.position.x,x.position.y,x.position.z;const re={x:v.x,y:v.y,z:v.z};r=new We(x.position).to(re,ie*1e3).onUpdate(function(){x.lookAt(v)}).onComplete(function(){console.log("Camera animation complete");let se=setTimeout(()=>{x.position.set(0,3,8),x.lookAt(v),clearTimeout(se)},10)}).easing(O.Quadratic.Out),r.start()};let P=[];const te=async x=>{if(P.length){for(let v=0;v<P.length;v++)P[v].object.material.color.set(P[v].object.material.oldcolor);p.selectedObjects=[]}P=[],e=await we({el:"#canvas",camera:h,group:m,event:x}),e!=null&&e.object&&e.object.type==="Mesh"&&(e.object.material.oldcolor=JSON.parse(JSON.stringify(e.object.material.color)),e.object.material.color=new o.Color(.5,.5,.5),p.selectedObjects=[e.object],ee(h,e.object.position,2),P.push(e))};d.domElement.addEventListener("click",te)},n=({THREE:o,scene:l,camera:f,renderer:u,stats:h,controls:d})=>{h.update(),u.render(l,f),r&&r.update(),d&&d.update(),i.render()},{loading:a}=Se({el:"#canvas",background:"#333",cameraPosition:[0,3,8],control:!0,controlAutoSpeed:!0,helper:!0,light:!0,creatMesh:s,animation:n});return ye(()=>{i&&i.dispose()}),(o,l)=>(Pe(),Be(Te,{loading:Oe(a)},{default:ke(()=>[qe]),_:1},8,["loading"]))}},et=be(Ze,[["__scopeId","data-v-85906780"]]);export{et as default};
