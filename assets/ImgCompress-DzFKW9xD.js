import{_ as De,r as E,f as ke,i as Oe,o as C,j as P,a as g,m as j,t as M,h as G,H as X,k as K}from"./index-Cm5JOvaX.js";/*!
 * Compressor.js v1.2.1
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2023-02-28T14:09:41.732Z
 */function me(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(a);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(a,i).enumerable})),t.push.apply(t,r)}return t}function S(a){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?me(Object(t),!0).forEach(function(r){Ie(a,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):me(Object(t)).forEach(function(r){Object.defineProperty(a,r,Object.getOwnPropertyDescriptor(t,r))})}return a}function Fe(a,e){if(!(a instanceof e))throw new TypeError("Cannot call a class as a function")}function ge(a,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(a,xe(r.key),r)}}function Le(a,e,t){return e&&ge(a.prototype,e),t&&ge(a,t),Object.defineProperty(a,"prototype",{writable:!1}),a}function Ie(a,e,t){return e=xe(e),e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function H(){return H=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(a[r]=t[r])}return a},H.apply(this,arguments)}function Ce(a,e){if(typeof a!="object"||a===null)return a;var t=a[Symbol.toPrimitive];if(t!==void 0){var r=t.call(a,e||"default");if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(a)}function xe(a){var e=Ce(a,"string");return typeof e=="symbol"?e:String(e)}var Be={exports:{}};(function(a){typeof window>"u"||function(e){var t=e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype,r=e.Blob&&function(){try{return!!new Blob}catch{return!1}}(),i=r&&e.Uint8Array&&function(){try{return new Blob([new Uint8Array(100)]).size===100}catch{return!1}}(),o=e.BlobBuilder||e.WebKitBlobBuilder||e.MozBlobBuilder||e.MSBlobBuilder,h=/^data:((.*?)(;charset=.*?)?)(;base64)?,/,c=(r||o)&&e.atob&&e.ArrayBuffer&&e.Uint8Array&&function(u){var s,v,m,f,l,n,p,d,w;if(s=u.match(h),!s)throw new Error("invalid data URI");for(v=s[2]?s[1]:"text/plain"+(s[3]||";charset=US-ASCII"),m=!!s[4],f=u.slice(s[0].length),m?l=atob(f):l=decodeURIComponent(f),n=new ArrayBuffer(l.length),p=new Uint8Array(n),d=0;d<l.length;d+=1)p[d]=l.charCodeAt(d);return r?new Blob([i?p:n],{type:v}):(w=new o,w.append(n),w.getBlob(v))};e.HTMLCanvasElement&&!t.toBlob&&(t.mozGetAsFile?t.toBlob=function(u,s,v){var m=this;setTimeout(function(){v&&t.toDataURL&&c?u(c(m.toDataURL(s,v))):u(m.mozGetAsFile("blob",s))})}:t.toDataURL&&c&&(t.msToBlob?t.toBlob=function(u,s,v){var m=this;setTimeout(function(){(s&&s!=="image/png"||v)&&t.toDataURL&&c?u(c(m.toDataURL(s,v))):u(m.msToBlob(s))})}:t.toBlob=function(u,s,v){var m=this;setTimeout(function(){u(c(m.toDataURL(s,v)))})})),a.exports?a.exports=c:e.dataURLtoBlob=c}(window)})(Be);var pe=Be.exports,Pe=function(e){return typeof Blob>"u"?!1:e instanceof Blob||Object.prototype.toString.call(e)==="[object Blob]"},ye={strict:!0,checkOrientation:!0,retainExif:!1,maxWidth:1/0,maxHeight:1/0,minWidth:0,minHeight:0,width:void 0,height:void 0,resize:"none",quality:.8,mimeType:"auto",convertTypes:["image/png"],convertSize:5e6,beforeDraw:null,drew:null,success:null,error:null},je=typeof window<"u"&&typeof window.document<"u",B=je?window:{},W=function(e){return e>0&&e<1/0},Me=Array.prototype.slice;function q(a){return Array.from?Array.from(a):Me.call(a)}var Se=/^image\/.+$/;function $(a){return Se.test(a)}function He(a){var e=$(a)?a.substr(6):"";return e==="jpeg"&&(e="jpg"),".".concat(e)}var Ee=String.fromCharCode;function We(a,e,t){var r="",i;for(t+=e,i=e;i<t;i+=1)r+=Ee(a.getUint8(i));return r}var ze=B.btoa;function be(a,e){for(var t=[],r=8192,i=new Uint8Array(a);i.length>0;)t.push(Ee.apply(null,q(i.subarray(0,r)))),i=i.subarray(r);return"data:".concat(e,";base64,").concat(ze(t.join("")))}function _e(a){var e=new DataView(a),t;try{var r,i,o;if(e.getUint8(0)===255&&e.getUint8(1)===216)for(var h=e.byteLength,c=2;c+1<h;){if(e.getUint8(c)===255&&e.getUint8(c+1)===225){i=c;break}c+=1}if(i){var u=i+4,s=i+10;if(We(e,u,4)==="Exif"){var v=e.getUint16(s);if(r=v===18761,(r||v===19789)&&e.getUint16(s+2,r)===42){var m=e.getUint32(s+4,r);m>=8&&(o=s+m)}}}if(o){var f=e.getUint16(o,r),l,n;for(n=0;n<f;n+=1)if(l=o+n*12+2,e.getUint16(l,r)===274){l+=8,t=e.getUint16(l,r),e.setUint16(l,1,r);break}}}catch{t=1}return t}function Ve(a){var e=0,t=1,r=1;switch(a){case 2:t=-1;break;case 3:e=-180;break;case 4:r=-1;break;case 5:e=90,r=-1;break;case 6:e=90;break;case 7:e=90,t=-1;break;case 8:e=-90;break}return{rotate:e,scaleX:t,scaleY:r}}var Ne=/\.\d*(?:0|9){12}\d*$/;function we(a){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1e11;return Ne.test(a)?Math.round(a*e)/e:a}function I(a){var e=a.aspectRatio,t=a.height,r=a.width,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none",o=W(r),h=W(t);if(o&&h){var c=t*e;(i==="contain"||i==="none")&&c>r||i==="cover"&&c<r?t=r/e:r=t*e}else o?t=r/e:h&&(r=t*e);return{width:r,height:t}}function Ge(a){for(var e=q(new Uint8Array(a)),t=e.length,r=[],i=0;i+3<t;){var o=e[i],h=e[i+1];if(o===255&&h===218)break;if(o===255&&h===216)i+=2;else{var c=e[i+2]*256+e[i+3],u=i+c+2,s=e.slice(i,u);r.push(s),i=u}}return r.reduce(function(v,m){return m[0]===255&&m[1]===225?v.concat(m):v},[])}function Xe(a,e){var t=q(new Uint8Array(a));if(t[2]!==255||t[3]!==224)return a;var r=t[4]*256+t[5],i=[255,216].concat(e,t.slice(4+r));return new Uint8Array(i)}var Ke=B.ArrayBuffer,Y=B.FileReader,U=B.URL||B.webkitURL,Ye=/\.\w+$/,$e=B.Compressor,qe=function(){function a(e,t){Fe(this,a),this.file=e,this.exif=[],this.image=new Image,this.options=S(S({},ye),t),this.aborted=!1,this.result=null,this.init()}return Le(a,[{key:"init",value:function(){var t=this,r=this.file,i=this.options;if(!Pe(r)){this.fail(new Error("The first argument must be a File or Blob object."));return}var o=r.type;if(!$(o)){this.fail(new Error("The first argument must be an image File or Blob object."));return}if(!U||!Y){this.fail(new Error("The current browser does not support image compression."));return}Ke||(i.checkOrientation=!1,i.retainExif=!1);var h=o==="image/jpeg",c=h&&i.checkOrientation,u=h&&i.retainExif;if(U&&!c&&!u)this.load({url:U.createObjectURL(r)});else{var s=new Y;this.reader=s,s.onload=function(v){var m=v.target,f=m.result,l={},n=1;c&&(n=_e(f),n>1&&H(l,Ve(n))),u&&(t.exif=Ge(f)),c||u?!U||n>1?l.url=be(f,o):l.url=U.createObjectURL(r):l.url=f,t.load(l)},s.onabort=function(){t.fail(new Error("Aborted to read the image with FileReader."))},s.onerror=function(){t.fail(new Error("Failed to read the image with FileReader."))},s.onloadend=function(){t.reader=null},c||u?s.readAsArrayBuffer(r):s.readAsDataURL(r)}}},{key:"load",value:function(t){var r=this,i=this.file,o=this.image;o.onload=function(){r.draw(S(S({},t),{},{naturalWidth:o.naturalWidth,naturalHeight:o.naturalHeight}))},o.onabort=function(){r.fail(new Error("Aborted to load the image."))},o.onerror=function(){r.fail(new Error("Failed to load the image."))},B.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(B.navigator.userAgent)&&(o.crossOrigin="anonymous"),o.alt=i.name,o.src=t.url}},{key:"draw",value:function(t){var r=this,i=t.naturalWidth,o=t.naturalHeight,h=t.rotate,c=h===void 0?0:h,u=t.scaleX,s=u===void 0?1:u,v=t.scaleY,m=v===void 0?1:v,f=this.file,l=this.image,n=this.options,p=document.createElement("canvas"),d=p.getContext("2d"),w=Math.abs(c)%180===90,x=(n.resize==="contain"||n.resize==="cover")&&W(n.width)&&W(n.height),A=Math.max(n.maxWidth,0)||1/0,D=Math.max(n.maxHeight,0)||1/0,k=Math.max(n.minWidth,0)||0,O=Math.max(n.minHeight,0)||0,R=i/o,y=n.width,b=n.height;if(w){var Z=[D,A];A=Z[0],D=Z[1];var J=[O,k];k=J[0],O=J[1];var Q=[b,y];y=Q[0],b=Q[1]}x&&(R=y/b);var ee=I({aspectRatio:R,width:A,height:D},"contain");A=ee.width,D=ee.height;var te=I({aspectRatio:R,width:k,height:O},"cover");if(k=te.width,O=te.height,x){var re=I({aspectRatio:R,width:y,height:b},n.resize);y=re.width,b=re.height}else{var ae=I({aspectRatio:R,width:y,height:b}),ie=ae.width;y=ie===void 0?i:ie;var ne=ae.height;b=ne===void 0?o:ne}y=Math.floor(we(Math.min(Math.max(y,k),A))),b=Math.floor(we(Math.min(Math.max(b,O),D)));var Ue=-y/2,Re=-b/2,Te=y,Ae=b,z=[];if(x){var oe=0,le=0,_=i,V=o,se=I({aspectRatio:R,width:i,height:o},{contain:"cover",cover:"contain"}[n.resize]);_=se.width,V=se.height,oe=(i-_)/2,le=(o-V)/2,z.push(oe,le,_,V)}if(z.push(Ue,Re,Te,Ae),w){var ue=[b,y];y=ue[0],b=ue[1]}p.width=y,p.height=b,$(n.mimeType)||(n.mimeType=f.type);var fe="transparent";f.size>n.convertSize&&n.convertTypes.indexOf(n.mimeType)>=0&&(n.mimeType="image/jpeg");var ce=n.mimeType==="image/jpeg";if(ce&&(fe="#fff"),d.fillStyle=fe,d.fillRect(0,0,y,b),n.beforeDraw&&n.beforeDraw.call(this,d,p),!this.aborted&&(d.save(),d.translate(y/2,b/2),d.rotate(c*Math.PI/180),d.scale(s,m),d.drawImage.apply(d,[l].concat(z)),d.restore(),n.drew&&n.drew.call(this,d,p),!this.aborted)){var de=function(F){if(!r.aborted){var he=function(L){return r.done({naturalWidth:i,naturalHeight:o,result:L})};if(F&&ce&&n.retainExif&&r.exif&&r.exif.length>0){var ve=function(L){return he(pe(be(Xe(L,r.exif),n.mimeType)))};if(F.arrayBuffer)F.arrayBuffer().then(ve).catch(function(){r.fail(new Error("Failed to read the compressed image with Blob.arrayBuffer()."))});else{var T=new Y;r.reader=T,T.onload=function(N){var L=N.target;ve(L.result)},T.onabort=function(){r.fail(new Error("Aborted to read the compressed image with FileReader."))},T.onerror=function(){r.fail(new Error("Failed to read the compressed image with FileReader."))},T.onloadend=function(){r.reader=null},T.readAsArrayBuffer(F)}}else he(F)}};p.toBlob?p.toBlob(de,n.mimeType,n.quality):de(pe(p.toDataURL(n.mimeType,n.quality)))}}},{key:"done",value:function(t){var r=t.naturalWidth,i=t.naturalHeight,o=t.result,h=this.file,c=this.image,u=this.options;if(U&&c.src.indexOf("blob:")===0&&U.revokeObjectURL(c.src),o)if(u.strict&&!u.retainExif&&o.size>h.size&&u.mimeType===h.type&&!(u.width>r||u.height>i||u.minWidth>r||u.minHeight>i||u.maxWidth<r||u.maxHeight<i))o=h;else{var s=new Date;o.lastModified=s.getTime(),o.lastModifiedDate=s,o.name=h.name,o.name&&o.type!==h.type&&(o.name=o.name.replace(Ye,He(o.type)))}else o=h;this.result=o,u.success&&u.success.call(this,o)}},{key:"fail",value:function(t){var r=this.options;if(r.error)r.error.call(this,t);else throw t}},{key:"abort",value:function(){this.aborted||(this.aborted=!0,this.reader?this.reader.abort():this.image.complete?this.fail(new Error("The compression process has been aborted.")):(this.image.onload=null,this.image.onabort()))}}],[{key:"noConflict",value:function(){return window.Compressor=$e,a}},{key:"setDefaults",value:function(t){H(ye,t)}}]),a}();const Ze={class:"content"},Je={class:"width50"},Qe={style:{display:"flex"}},et={style:{"margin-left":"2rem"}},tt={for:"qualitySlider",style:{"margin-bottom":".2rem",display:"flex"}},rt={style:{"margin-top":"1rem",display:"flex","align-items":"center"}},at={style:{"margin-top":"1rem",display:"flex","align-items":"center"}},it={key:0,style:{"margin-top":"1rem"}},nt=["src"],ot={key:2},lt={__name:"ImgCompress",setup(a){const e=E(null),t=E(null),r=E(.6),i=E(null),o=E(null),h=E(null),c=E(null),s=((f,l)=>{let n=null;return function(...p){n&&clearTimeout(n),n=setTimeout(()=>{f.apply(this,p)},l)}})(()=>{t.value=null,v()},300);ke(()=>r.value,f=>{e.value&&s()});const v=()=>{if(!e.value){console.log("No file to compress");return}i.value=(e.value.size/1024).toFixed(2),new qe(e.value,{quality:parseFloat(r.value),maxWidth:parseInt(h.value),maxHeight:parseInt(c.value),convertSize:4e6,strict:!0,success(f){console.log("Compression successful"),o.value=(f.size/1024).toFixed(2);const l=new FileReader;l.onloadend=()=>{t.value=l.result},l.readAsDataURL(f)},error(f){console.error("Compression failed:",f.message)}})},m=()=>{const f=document.createElement("a");f.href=t.value,f.download="img.png",f.click(),f.remove()};return Oe(()=>{const f=document.getElementById("dropZone"),l=document.getElementById("fileInput");["dragenter","dragover","dragleave","drop"].forEach(d=>{f.addEventListener(d,n,!1)});function n(d){d.preventDefault(),d.stopPropagation()}["dragenter","dragover"].forEach(d=>{f.addEventListener(d,()=>f.classList.add("hover"),!1)}),["dragleave","drop"].forEach(d=>{f.addEventListener(d,()=>f.classList.remove("hover"),!1)}),f.addEventListener("click",()=>l.click(),!1),l.addEventListener("change",p,!1),f.addEventListener("drop",p,!1);function p(d){let w=d.dataTransfer,x=w?w.files:l.files;x.length>0&&(console.log(x),e.value=x[0],console.log("Selected file:",x[0].name),t.value=null,v())}}),(f,l)=>(C(),P("section",Ze,[g("div",Je,[l[9]||(l[9]=g("h1",null,"图片压缩",-1)),g("div",Qe,[l[8]||(l[8]=g("div",{id:"dropZone"},[j("将文件拖放到此处"),g("br"),j("或点击选择文件 "),g("input",{type:"file",style:{display:"none"},id:"fileInput"})],-1)),g("div",et,[g("div",null,[g("label",tt,[l[3]||(l[3]=j(" 选择压缩质量 (0.1 - 1.0)。 ")),g("span",null,"当前："+M(r.value),1)]),l[4]||(l[4]=j()),l[5]||(l[5]=g("br",null,null,-1)),G(g("input",{id:"qualitySlider",type:"range","onUpdate:modelValue":l[0]||(l[0]=n=>r.value=n),min:"0.1",max:"1.0",step:"0.1"},null,512),[[X,r.value]])]),g("div",rt,[l[6]||(l[6]=g("label",{for:"maxWidth"},"最大宽度:",-1)),G(g("input",{id:"maxWidth",type:"number",style:{height:"2rem",width:"100px","margin-left":"1rem","background-color":"#fff"},"onUpdate:modelValue":l[1]||(l[1]=n=>h.value=n),min:"1",step:"1"},null,512),[[X,h.value]])]),g("div",at,[l[7]||(l[7]=g("label",{for:"maxHeight"},"最大高度:",-1)),G(g("input",{id:"maxHeight",type:"number",style:{height:"2rem",width:"100px","margin-left":"1rem","background-color":"#fff"},"onUpdate:modelValue":l[2]||(l[2]=n=>c.value=n),min:"1",step:"1"},null,512),[[X,c.value]])])])]),i.value&&o.value?(C(),P("div",it,[g("p",null,"原始文件大小: "+M(i.value)+"KB",1),g("p",null,"压缩后文件大小: "+M(o.value)+"KB",1),g("p",null,"压缩率: "+M(((1-o.value/i.value)*100).toFixed(2))+"%",1)])):K("",!0),t.value?(C(),P("img",{key:1,class:"codeImage",src:t.value,onClick:m,alt:""},null,8,nt)):K("",!0),t.value?(C(),P("p",ot,"点击图片下载")):K("",!0)])]))}},ft=De(lt,[["__scopeId","data-v-97c3ba0d"]]);export{ft as default};