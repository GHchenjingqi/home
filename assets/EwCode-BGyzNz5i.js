import{_ as Ut,r as gt,o as Z,j as X,a as K,h as kt,G as vt,k as ht}from"./index-4p0r8sbT.js";var V={},Ft=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},Et={},T={};let at;const zt=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];T.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};T.getSymbolTotalCodewords=function(t){return zt[t]};T.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t};T.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');at=t};T.isKanjiModeEnabled=function(){return typeof at<"u"};T.toSJIS=function(t){return at(t)};var j={};(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+i)}}e.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},e.from=function(r,n){if(e.isValid(r))return r;try{return t(r)}catch{return n}}})(j);function Ct(){this.buffer=[],this.length=0}Ct.prototype={get:function(e){const t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let i=0;i<t;i++)this.putBit((e>>>t-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var Vt=Ct;function H(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}H.prototype.set=function(e,t,i,r){const n=e*this.size+t;this.data[n]=i,r&&(this.reservedBit[n]=!0)};H.prototype.get=function(e,t){return this.data[e*this.size+t]};H.prototype.xor=function(e,t,i){this.data[e*this.size+t]^=i};H.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var Ht=H,pt={};(function(e){const t=T.getSymbolSize;e.getRowColCoords=function(r){if(r===1)return[];const n=Math.floor(r/7)+2,o=t(r),s=o===145?26:Math.ceil((o-13)/(2*n-2))*2,u=[o-7];for(let a=1;a<n-1;a++)u[a]=u[a-1]-s;return u.push(6),u.reverse()},e.getPositions=function(r){const n=[],o=e.getRowColCoords(r),s=o.length;for(let u=0;u<s;u++)for(let a=0;a<s;a++)u===0&&a===0||u===0&&a===s-1||u===s-1&&a===0||n.push([o[u],o[a]]);return n}})(pt);var Bt={};const Kt=T.getSymbolSize,wt=7;Bt.getPositions=function(t){const i=Kt(t);return[[0,0],[i-wt,0],[0,i-wt]]};var At={};(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},e.from=function(n){return e.isValid(n)?parseInt(n,10):void 0},e.getPenaltyN1=function(n){const o=n.size;let s=0,u=0,a=0,c=null,l=null;for(let p=0;p<o;p++){u=a=0,c=l=null;for(let w=0;w<o;w++){let f=n.get(p,w);f===c?u++:(u>=5&&(s+=t.N1+(u-5)),c=f,u=1),f=n.get(w,p),f===l?a++:(a>=5&&(s+=t.N1+(a-5)),l=f,a=1)}u>=5&&(s+=t.N1+(u-5)),a>=5&&(s+=t.N1+(a-5))}return s},e.getPenaltyN2=function(n){const o=n.size;let s=0;for(let u=0;u<o-1;u++)for(let a=0;a<o-1;a++){const c=n.get(u,a)+n.get(u,a+1)+n.get(u+1,a)+n.get(u+1,a+1);(c===4||c===0)&&s++}return s*t.N2},e.getPenaltyN3=function(n){const o=n.size;let s=0,u=0,a=0;for(let c=0;c<o;c++){u=a=0;for(let l=0;l<o;l++)u=u<<1&2047|n.get(c,l),l>=10&&(u===1488||u===93)&&s++,a=a<<1&2047|n.get(l,c),l>=10&&(a===1488||a===93)&&s++}return s*t.N3},e.getPenaltyN4=function(n){let o=0;const s=n.data.length;for(let a=0;a<s;a++)o+=n.data[a];return Math.abs(Math.ceil(o*100/s/5)-10)*t.N4};function i(r,n,o){switch(r){case e.Patterns.PATTERN000:return(n+o)%2===0;case e.Patterns.PATTERN001:return n%2===0;case e.Patterns.PATTERN010:return o%3===0;case e.Patterns.PATTERN011:return(n+o)%3===0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(o/3))%2===0;case e.Patterns.PATTERN101:return n*o%2+n*o%3===0;case e.Patterns.PATTERN110:return(n*o%2+n*o%3)%2===0;case e.Patterns.PATTERN111:return(n*o%3+(n+o)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}e.applyMask=function(n,o){const s=o.size;for(let u=0;u<s;u++)for(let a=0;a<s;a++)o.isReserved(a,u)||o.xor(a,u,i(n,a,u))},e.getBestMask=function(n,o){const s=Object.keys(e.Patterns).length;let u=0,a=1/0;for(let c=0;c<s;c++){o(c),e.applyMask(c,n);const l=e.getPenaltyN1(n)+e.getPenaltyN2(n)+e.getPenaltyN3(n)+e.getPenaltyN4(n);e.applyMask(c,n),l<a&&(a=l,u=c)}return u}})(At);var G={};const R=j,J=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],Y=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];G.getBlocksCount=function(t,i){switch(i){case R.L:return J[(t-1)*4+0];case R.M:return J[(t-1)*4+1];case R.Q:return J[(t-1)*4+2];case R.H:return J[(t-1)*4+3];default:return}};G.getTotalCodewordsCount=function(t,i){switch(i){case R.L:return Y[(t-1)*4+0];case R.M:return Y[(t-1)*4+1];case R.Q:return Y[(t-1)*4+2];case R.H:return Y[(t-1)*4+3];default:return}};var It={},Q={};const F=new Uint8Array(512),O=new Uint8Array(256);(function(){let t=1;for(let i=0;i<255;i++)F[i]=t,O[t]=i,t<<=1,t&256&&(t^=285);for(let i=255;i<512;i++)F[i]=F[i-255]})();Q.log=function(t){if(t<1)throw new Error("log("+t+")");return O[t]};Q.exp=function(t){return F[t]};Q.mul=function(t,i){return t===0||i===0?0:F[O[t]+O[i]]};(function(e){const t=Q;e.mul=function(r,n){const o=new Uint8Array(r.length+n.length-1);for(let s=0;s<r.length;s++)for(let u=0;u<n.length;u++)o[s+u]^=t.mul(r[s],n[u]);return o},e.mod=function(r,n){let o=new Uint8Array(r);for(;o.length-n.length>=0;){const s=o[0];for(let a=0;a<n.length;a++)o[a]^=t.mul(n[a],s);let u=0;for(;u<o.length&&o[u]===0;)u++;o=o.slice(u)}return o},e.generateECPolynomial=function(r){let n=new Uint8Array([1]);for(let o=0;o<r;o++)n=e.mul(n,new Uint8Array([1,t.exp(o)]));return n}})(It);const Tt=It;function ct(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}ct.prototype.initialize=function(t){this.degree=t,this.genPoly=Tt.generateECPolynomial(this.degree)};ct.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(t.length+this.degree);i.set(t);const r=Tt.mod(i,this.genPoly),n=this.degree-r.length;if(n>0){const o=new Uint8Array(this.degree);return o.set(r,n),o}return r};var Jt=ct,Nt={},L={},lt={};lt.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var b={};const Mt="[0-9]+",Yt="[A-Z $%*+\\-./:]+";let z="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";z=z.replace(/u/g,"\\u");const Ot="(?:(?![A-Z0-9 $%*+\\-./:]|"+z+`)(?:.|[\r
]))+`;b.KANJI=new RegExp(z,"g");b.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");b.BYTE=new RegExp(Ot,"g");b.NUMERIC=new RegExp(Mt,"g");b.ALPHANUMERIC=new RegExp(Yt,"g");const $t=new RegExp("^"+z+"$"),jt=new RegExp("^"+Mt+"$"),Gt=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");b.testKanji=function(t){return $t.test(t)};b.testNumeric=function(t){return jt.test(t)};b.testAlphanumeric=function(t){return Gt.test(t)};(function(e){const t=lt,i=b;e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(o,s){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?o.ccBits[0]:s<27?o.ccBits[1]:o.ccBits[2]},e.getBestModeForData=function(o){return i.testNumeric(o)?e.NUMERIC:i.testAlphanumeric(o)?e.ALPHANUMERIC:i.testKanji(o)?e.KANJI:e.BYTE},e.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},e.isValid=function(o){return o&&o.bit&&o.ccBits};function r(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+n)}}e.from=function(o,s){if(e.isValid(o))return o;try{return r(o)}catch{return s}}})(L);(function(e){const t=T,i=G,r=j,n=L,o=lt,s=7973,u=t.getBCHDigit(s);function a(w,f,m){for(let y=1;y<=40;y++)if(f<=e.getCapacity(y,m,w))return y}function c(w,f){return n.getCharCountIndicator(w,f)+4}function l(w,f){let m=0;return w.forEach(function(y){const I=c(y.mode,f);m+=I+y.getBitsLength()}),m}function p(w,f){for(let m=1;m<=40;m++)if(l(w,m)<=e.getCapacity(m,f,n.MIXED))return m}e.from=function(f,m){return o.isValid(f)?parseInt(f,10):m},e.getCapacity=function(f,m,y){if(!o.isValid(f))throw new Error("Invalid QR Code version");typeof y>"u"&&(y=n.BYTE);const I=t.getSymbolTotalCodewords(f),h=i.getTotalCodewordsCount(f,m),E=(I-h)*8;if(y===n.MIXED)return E;const g=E-c(y,f);switch(y){case n.NUMERIC:return Math.floor(g/10*3);case n.ALPHANUMERIC:return Math.floor(g/11*2);case n.KANJI:return Math.floor(g/13);case n.BYTE:default:return Math.floor(g/8)}},e.getBestVersionForData=function(f,m){let y;const I=r.from(m,r.M);if(Array.isArray(f)){if(f.length>1)return p(f,I);if(f.length===0)return 1;y=f[0]}else y=f;return a(y.mode,y.getLength(),I)},e.getEncodedBits=function(f){if(!o.isValid(f)||f<7)throw new Error("Invalid QR Code version");let m=f<<12;for(;t.getBCHDigit(m)-u>=0;)m^=s<<t.getBCHDigit(m)-u;return f<<12|m}})(Nt);var bt={};const rt=T,Pt=1335,Qt=21522,mt=rt.getBCHDigit(Pt);bt.getEncodedBits=function(t,i){const r=t.bit<<3|i;let n=r<<10;for(;rt.getBCHDigit(n)-mt>=0;)n^=Pt<<rt.getBCHDigit(n)-mt;return(r<<10|n)^Qt};var St={};const qt=L;function _(e){this.mode=qt.NUMERIC,this.data=e.toString()}_.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};_.prototype.getLength=function(){return this.data.length};_.prototype.getBitsLength=function(){return _.getBitsLength(this.data.length)};_.prototype.write=function(t){let i,r,n;for(i=0;i+3<=this.data.length;i+=3)r=this.data.substr(i,3),n=parseInt(r,10),t.put(n,10);const o=this.data.length-i;o>0&&(r=this.data.substr(i),n=parseInt(r,10),t.put(n,o*3+1))};var Wt=_;const Zt=L,x=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function D(e){this.mode=Zt.ALPHANUMERIC,this.data=e}D.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};D.prototype.getLength=function(){return this.data.length};D.prototype.getBitsLength=function(){return D.getBitsLength(this.data.length)};D.prototype.write=function(t){let i;for(i=0;i+2<=this.data.length;i+=2){let r=x.indexOf(this.data[i])*45;r+=x.indexOf(this.data[i+1]),t.put(r,11)}this.data.length%2&&t.put(x.indexOf(this.data[i]),6)};var Xt=D;const xt=L;function U(e){this.mode=xt.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}U.getBitsLength=function(t){return t*8};U.prototype.getLength=function(){return this.data.length};U.prototype.getBitsLength=function(){return U.getBitsLength(this.data.length)};U.prototype.write=function(e){for(let t=0,i=this.data.length;t<i;t++)e.put(this.data[t],8)};var te=U;const ee=L,ne=T;function k(e){this.mode=ee.KANJI,this.data=e}k.getBitsLength=function(t){return t*13};k.prototype.getLength=function(){return this.data.length};k.prototype.getBitsLength=function(){return k.getBitsLength(this.data.length)};k.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let i=ne.toSJIS(this.data[t]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),e.put(i,13)}};var oe=k,Rt={exports:{}};(function(e){var t={single_source_shortest_paths:function(i,r,n){var o={},s={};s[r]=0;var u=t.PriorityQueue.make();u.push(r,0);for(var a,c,l,p,w,f,m,y,I;!u.empty();){a=u.pop(),c=a.value,p=a.cost,w=i[c]||{};for(l in w)w.hasOwnProperty(l)&&(f=w[l],m=p+f,y=s[l],I=typeof s[l]>"u",(I||y>m)&&(s[l]=m,u.push(l,m),o[l]=c))}if(typeof n<"u"&&typeof s[n]>"u"){var h=["Could not find a path from ",r," to ",n,"."].join("");throw new Error(h)}return o},extract_shortest_path_from_predecessor_list:function(i,r){for(var n=[],o=r;o;)n.push(o),i[o],o=i[o];return n.reverse(),n},find_path:function(i,r,n){var o=t.single_source_shortest_paths(i,r,n);return t.extract_shortest_path_from_predecessor_list(o,n)},PriorityQueue:{make:function(i){var r=t.PriorityQueue,n={},o;i=i||{};for(o in r)r.hasOwnProperty(o)&&(n[o]=r[o]);return n.queue=[],n.sorter=i.sorter||r.default_sorter,n},default_sorter:function(i,r){return i.cost-r.cost},push:function(i,r){var n={value:i,cost:r};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(Rt);var re=Rt.exports;(function(e){const t=L,i=Wt,r=Xt,n=te,o=oe,s=b,u=T,a=re;function c(h){return unescape(encodeURIComponent(h)).length}function l(h,E,g){const d=[];let C;for(;(C=h.exec(g))!==null;)d.push({data:C[0],index:C.index,mode:E,length:C[0].length});return d}function p(h){const E=l(s.NUMERIC,t.NUMERIC,h),g=l(s.ALPHANUMERIC,t.ALPHANUMERIC,h);let d,C;return u.isKanjiModeEnabled()?(d=l(s.BYTE,t.BYTE,h),C=l(s.KANJI,t.KANJI,h)):(d=l(s.BYTE_KANJI,t.BYTE,h),C=[]),E.concat(g,d,C).sort(function(A,N){return A.index-N.index}).map(function(A){return{data:A.data,mode:A.mode,length:A.length}})}function w(h,E){switch(E){case t.NUMERIC:return i.getBitsLength(h);case t.ALPHANUMERIC:return r.getBitsLength(h);case t.KANJI:return o.getBitsLength(h);case t.BYTE:return n.getBitsLength(h)}}function f(h){return h.reduce(function(E,g){const d=E.length-1>=0?E[E.length-1]:null;return d&&d.mode===g.mode?(E[E.length-1].data+=g.data,E):(E.push(g),E)},[])}function m(h){const E=[];for(let g=0;g<h.length;g++){const d=h[g];switch(d.mode){case t.NUMERIC:E.push([d,{data:d.data,mode:t.ALPHANUMERIC,length:d.length},{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.ALPHANUMERIC:E.push([d,{data:d.data,mode:t.BYTE,length:d.length}]);break;case t.KANJI:E.push([d,{data:d.data,mode:t.BYTE,length:c(d.data)}]);break;case t.BYTE:E.push([{data:d.data,mode:t.BYTE,length:c(d.data)}])}}return E}function y(h,E){const g={},d={start:{}};let C=["start"];for(let B=0;B<h.length;B++){const A=h[B],N=[];for(let S=0;S<A.length;S++){const M=A[S],v=""+B+S;N.push(v),g[v]={node:M,lastCount:0},d[v]={};for(let W=0;W<C.length;W++){const P=C[W];g[P]&&g[P].node.mode===M.mode?(d[P][v]=w(g[P].lastCount+M.length,M.mode)-w(g[P].lastCount,M.mode),g[P].lastCount+=M.length):(g[P]&&(g[P].lastCount=M.length),d[P][v]=w(M.length,M.mode)+4+t.getCharCountIndicator(M.mode,E))}}C=N}for(let B=0;B<C.length;B++)d[C[B]].end=0;return{map:d,table:g}}function I(h,E){let g;const d=t.getBestModeForData(h);if(g=t.from(E,d),g!==t.BYTE&&g.bit<d.bit)throw new Error('"'+h+'" cannot be encoded with mode '+t.toString(g)+`.
 Suggested mode is: `+t.toString(d));switch(g===t.KANJI&&!u.isKanjiModeEnabled()&&(g=t.BYTE),g){case t.NUMERIC:return new i(h);case t.ALPHANUMERIC:return new r(h);case t.KANJI:return new o(h);case t.BYTE:return new n(h)}}e.fromArray=function(E){return E.reduce(function(g,d){return typeof d=="string"?g.push(I(d,null)):d.data&&g.push(I(d.data,d.mode)),g},[])},e.fromString=function(E,g){const d=p(E,u.isKanjiModeEnabled()),C=m(d),B=y(C,g),A=a.find_path(B.map,"start","end"),N=[];for(let S=1;S<A.length-1;S++)N.push(B.table[A[S]].node);return e.fromArray(f(N))},e.rawSplit=function(E){return e.fromArray(p(E,u.isKanjiModeEnabled()))}})(St);const q=T,tt=j,ie=Vt,se=Ht,ue=pt,ae=Bt,it=At,st=G,ce=Jt,$=Nt,le=bt,fe=L,et=St;function de(e,t){const i=e.size,r=ae.getPositions(t);for(let n=0;n<r.length;n++){const o=r[n][0],s=r[n][1];for(let u=-1;u<=7;u++)if(!(o+u<=-1||i<=o+u))for(let a=-1;a<=7;a++)s+a<=-1||i<=s+a||(u>=0&&u<=6&&(a===0||a===6)||a>=0&&a<=6&&(u===0||u===6)||u>=2&&u<=4&&a>=2&&a<=4?e.set(o+u,s+a,!0,!0):e.set(o+u,s+a,!1,!0))}}function ge(e){const t=e.size;for(let i=8;i<t-8;i++){const r=i%2===0;e.set(i,6,r,!0),e.set(6,i,r,!0)}}function he(e,t){const i=ue.getPositions(t);for(let r=0;r<i.length;r++){const n=i[r][0],o=i[r][1];for(let s=-2;s<=2;s++)for(let u=-2;u<=2;u++)s===-2||s===2||u===-2||u===2||s===0&&u===0?e.set(n+s,o+u,!0,!0):e.set(n+s,o+u,!1,!0)}}function we(e,t){const i=e.size,r=$.getEncodedBits(t);let n,o,s;for(let u=0;u<18;u++)n=Math.floor(u/3),o=u%3+i-8-3,s=(r>>u&1)===1,e.set(n,o,s,!0),e.set(o,n,s,!0)}function nt(e,t,i){const r=e.size,n=le.getEncodedBits(t,i);let o,s;for(o=0;o<15;o++)s=(n>>o&1)===1,o<6?e.set(o,8,s,!0):o<8?e.set(o+1,8,s,!0):e.set(r-15+o,8,s,!0),o<8?e.set(8,r-o-1,s,!0):o<9?e.set(8,15-o-1+1,s,!0):e.set(8,15-o-1,s,!0);e.set(r-8,8,1,!0)}function me(e,t){const i=e.size;let r=-1,n=i-1,o=7,s=0;for(let u=i-1;u>0;u-=2)for(u===6&&u--;;){for(let a=0;a<2;a++)if(!e.isReserved(n,u-a)){let c=!1;s<t.length&&(c=(t[s]>>>o&1)===1),e.set(n,u-a,c),o--,o===-1&&(s++,o=7)}if(n+=r,n<0||i<=n){n-=r,r=-r;break}}}function ye(e,t,i){const r=new ie;i.forEach(function(a){r.put(a.mode.bit,4),r.put(a.getLength(),fe.getCharCountIndicator(a.mode,e)),a.write(r)});const n=q.getSymbolTotalCodewords(e),o=st.getTotalCodewordsCount(e,t),s=(n-o)*8;for(r.getLengthInBits()+4<=s&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);const u=(s-r.getLengthInBits())/8;for(let a=0;a<u;a++)r.put(a%2?17:236,8);return Ee(r,e,t)}function Ee(e,t,i){const r=q.getSymbolTotalCodewords(t),n=st.getTotalCodewordsCount(t,i),o=r-n,s=st.getBlocksCount(t,i),u=r%s,a=s-u,c=Math.floor(r/s),l=Math.floor(o/s),p=l+1,w=c-l,f=new ce(w);let m=0;const y=new Array(s),I=new Array(s);let h=0;const E=new Uint8Array(e.buffer);for(let A=0;A<s;A++){const N=A<a?l:p;y[A]=E.slice(m,m+N),I[A]=f.encode(y[A]),m+=N,h=Math.max(h,N)}const g=new Uint8Array(r);let d=0,C,B;for(C=0;C<h;C++)for(B=0;B<s;B++)C<y[B].length&&(g[d++]=y[B][C]);for(C=0;C<w;C++)for(B=0;B<s;B++)g[d++]=I[B][C];return g}function Ce(e,t,i,r){let n;if(Array.isArray(e))n=et.fromArray(e);else if(typeof e=="string"){let c=t;if(!c){const l=et.rawSplit(e);c=$.getBestVersionForData(l,i)}n=et.fromString(e,c||40)}else throw new Error("Invalid data");const o=$.getBestVersionForData(n,i);if(!o)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=o;else if(t<o)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+o+`.
`);const s=ye(t,i,n),u=q.getSymbolSize(t),a=new se(u);return de(a,t),ge(a),he(a,t),nt(a,i,0),t>=7&&we(a,t),me(a,s),isNaN(r)&&(r=it.getBestMask(a,nt.bind(null,a,i))),it.applyMask(r,a),nt(a,i,r),{modules:a,version:t,errorCorrectionLevel:i,maskPattern:r,segments:n}}Et.create=function(t,i){if(typeof t>"u"||t==="")throw new Error("No input text");let r=tt.M,n,o;return typeof i<"u"&&(r=tt.from(i.errorCorrectionLevel,tt.M),n=$.from(i.version),o=it.from(i.maskPattern),i.toSJISFunc&&q.setToSJISFunction(i.toSJISFunc)),Ce(t,n,r,o)};var Lt={},ft={};(function(e){function t(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let r=i.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+i);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(o){return[o,o]}))),r.length===6&&r.push("F","F");const n=parseInt(r.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+r.slice(0,6).join("")}}e.getOptions=function(r){r||(r={}),r.color||(r.color={});const n=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,o=r.width&&r.width>=21?r.width:void 0,s=r.scale||4;return{width:o,scale:o?4:s,margin:n,color:{dark:t(r.color.dark||"#000000ff"),light:t(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},e.getScale=function(r,n){return n.width&&n.width>=r+n.margin*2?n.width/(r+n.margin*2):n.scale},e.getImageWidth=function(r,n){const o=e.getScale(r,n);return Math.floor((r+n.margin*2)*o)},e.qrToImageData=function(r,n,o){const s=n.modules.size,u=n.modules.data,a=e.getScale(s,o),c=Math.floor((s+o.margin*2)*a),l=o.margin*a,p=[o.color.light,o.color.dark];for(let w=0;w<c;w++)for(let f=0;f<c;f++){let m=(w*c+f)*4,y=o.color.light;if(w>=l&&f>=l&&w<c-l&&f<c-l){const I=Math.floor((w-l)/a),h=Math.floor((f-l)/a);y=p[u[I*s+h]?1:0]}r[m++]=y.r,r[m++]=y.g,r[m++]=y.b,r[m]=y.a}}})(ft);(function(e){const t=ft;function i(n,o,s){n.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=s,o.width=s,o.style.height=s+"px",o.style.width=s+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(o,s,u){let a=u,c=s;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),s||(c=r()),a=t.getOptions(a);const l=t.getImageWidth(o.modules.size,a),p=c.getContext("2d"),w=p.createImageData(l,l);return t.qrToImageData(w.data,o,a),i(p,c,l),p.putImageData(w,0,0),c},e.renderToDataURL=function(o,s,u){let a=u;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),a||(a={});const c=e.render(o,s,a),l=a.type||"image/png",p=a.rendererOpts||{};return c.toDataURL(l,p.quality)}})(Lt);var _t={};const pe=ft;function yt(e,t){const i=e.a/255,r=t+'="'+e.hex+'"';return i<1?r+" "+t+'-opacity="'+i.toFixed(2).slice(1)+'"':r}function ot(e,t,i){let r=e+t;return typeof i<"u"&&(r+=" "+i),r}function Be(e,t,i){let r="",n=0,o=!1,s=0;for(let u=0;u<e.length;u++){const a=Math.floor(u%t),c=Math.floor(u/t);!a&&!o&&(o=!0),e[u]?(s++,u>0&&a>0&&e[u-1]||(r+=o?ot("M",a+i,.5+c+i):ot("m",n,0),n=0,o=!1),a+1<t&&e[u+1]||(r+=ot("h",s),s=0)):n++}return r}_t.render=function(t,i,r){const n=pe.getOptions(i),o=t.modules.size,s=t.modules.data,u=o+n.margin*2,a=n.color.light.a?"<path "+yt(n.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",c="<path "+yt(n.color.dark,"stroke")+' d="'+Be(s,o,n.margin)+'"/>',l='viewBox="0 0 '+u+" "+u+'"',w='<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+l+' shape-rendering="crispEdges">'+a+c+`</svg>
`;return typeof r=="function"&&r(null,w),w};const Ae=Ft,ut=Et,Dt=Lt,Ie=_t;function dt(e,t,i,r,n){const o=[].slice.call(arguments,1),s=o.length,u=typeof o[s-1]=="function";if(!u&&!Ae())throw new Error("Callback required as last argument");if(u){if(s<2)throw new Error("Too few arguments provided");s===2?(n=i,i=t,t=r=void 0):s===3&&(t.getContext&&typeof n>"u"?(n=r,r=void 0):(n=r,r=i,i=t,t=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(i=t,t=r=void 0):s===2&&!t.getContext&&(r=i,i=t,t=void 0),new Promise(function(a,c){try{const l=ut.create(i,r);a(e(l,t,r))}catch(l){c(l)}})}try{const a=ut.create(i,r);n(null,e(a,t,r))}catch(a){n(a)}}V.create=ut.create;V.toCanvas=dt.bind(null,Dt.render);V.toDataURL=dt.bind(null,Dt.renderToDataURL);V.toString=dt.bind(null,function(e,t,i){return Ie.render(e,i)});const Te={class:"content"},Ne={class:"width50"},Me=["src"],be={key:1},Pe={__name:"EwCode",setup(e){const t=gt(""),i=gt(""),r=()=>{if(!t.value)return!1;const o=document.createElement("canvas");V.toCanvas(o,t.value,{width:200},function(s){s&&console.error(s);const u=o.toDataURL("image/png");i.value=u})},n=()=>{const o=document.createElement("a");o.href=i.value,o.download="qrcode.png",o.click(),o.remove()};return(o,s)=>(Z(),X("section",Te,[K("div",Ne,[s[2]||(s[2]=K("h1",null,"二维码在线生成工具",-1)),kt(K("textarea",{"onUpdate:modelValue":s[0]||(s[0]=u=>t.value=u),placeholder:"输入二维码内容或网址，双击清空",cols:"30",rows:"5",onDblclick:s[1]||(s[1]=u=>t.value="")},null,544),[[vt,t.value]]),K("button",{onClick:r},"生成二维码"),i.value?(Z(),X("img",{key:0,class:"codeImage",src:i.value,onClick:n,alt:"",style:{width:"100px",height:"100px"}},null,8,Me)):ht("",!0),i.value?(Z(),X("p",be,"点击二维码图片下载")):ht("",!0)])]))}},Re=Ut(Pe,[["__scopeId","data-v-b6d5dce0"]]);export{Re as default};