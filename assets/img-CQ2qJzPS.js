class c{constructor(e={}){this.images=e.images||[],this.currentIndex=e.thumbnailIndex||0,this.onCloseCallback=e.onClose||null,this.init()}init(){this.images.length!==0&&(this.createPreviewOverlay(),this.updateThumbnailList(),this.openPreview(this.currentIndex),this.addEventListeners())}injectStyles(){const e=document.createElement("style");e.textContent=`
            #previewOverlay {
                display: none;
                position: fixed;
                top: 0; left: 0;
                width: 100vw; height: 100vh;
                background-color: rgba(0,0,0,0.9);
                z-index: 999999;
                justify-content: center;
                align-items: center;
            }
            #previewImage {
                max-width: 90vw;
                max-height: 90vh;
                user-select: none;
                image-rendering: auto;
                transition: transform 0.3s ease;
            }
            #navLeft, #navRight {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 32px;
                color: white;
                cursor: pointer;
                z-index: 9999999;
                user-select: none;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            #navLeft:hover, #navRight:hover {
                opacity: 1;
            }
            #closeBtn {
                position: absolute;
                top: 20px;
                right: 30px;
                color: white;
                font-size: 24px;
                cursor: pointer;
                z-index: 9999999;
                font-weight: bold;
            }
            #counter {
                position: absolute;
                top: 20px;
                left: 30px;
                color: white;
                font-size: 16px;
                z-index: 9999999;
                user-select: none;
            }
            #thumbnailList {
                display: flex;
                overflow-x: auto;
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                gap: 8px;
                padding: 8px;
                background-color: rgba(0,0,0,0.5);
                border-radius: 8px;
                max-width: 90vw;
            }
            #thumbnailList img {
                width: 60px;
                height: 60px;
                object-fit: cover;
                cursor: pointer;
                border-radius: 4px;
            }
        `,document.head.appendChild(e)}createPreviewOverlay(){if(document.getElementById("previewOverlay"))return;this.injectStyles();const t=document.createElement("div");t.id="previewOverlay";const n=document.createElement("img");n.id="previewImage";const i=document.createElement("span");i.id="closeBtn",i.innerHTML="&times;";const p=document.createElement("div");p.id="navLeft",p.innerHTML="&#10094;",p.style.left="20px";const s=document.createElement("div");s.id="navRight",s.innerHTML="&#10095;",s.style.right="20px";const g=document.createElement("div");g.id="counter";const r=document.createElement("div");r.id="thumbnailList",t.appendChild(n),t.appendChild(p),t.appendChild(s),t.appendChild(i),t.appendChild(g),t.appendChild(r),document.body.appendChild(t)}updateThumbnailList(){const e=document.getElementById("thumbnailList");e&&(e.innerHTML="",this.images.forEach((t,n)=>{const i=document.createElement("img");i.src=t,i.setAttribute("data-index",n),i.style.border=n===this.currentIndex?"2px solid var(--mainColor)":"2px solid transparent",i.addEventListener("click",()=>this.openPreview(n)),e.appendChild(i)}))}openPreview(e){this.currentIndex=e;const t=document.getElementById("previewOverlay"),n=document.getElementById("previewImage"),i=document.getElementById("counter");n.src=this.images[this.currentIndex],i.innerText=`第 ${this.currentIndex+1} 张 / 共 ${this.images.length} 张`,this.updateThumbnailList(),t.style.display="flex"}closePreview(e){const t=document.getElementById("previewOverlay");t.style.display="none",typeof e=="function"?e():typeof this.onCloseCallback=="function"&&this.onCloseCallback()}showNext(){this.currentIndex<this.images.length-1&&this.openPreview(this.currentIndex+1)}showPrev(){this.currentIndex>0&&this.openPreview(this.currentIndex-1)}addEventListeners(){const e=document.getElementById("previewOverlay");e.querySelector("#closeBtn")?.addEventListener("click",()=>{this.closePreview()}),e.addEventListener("click",t=>{t.target===e&&this.closePreview()}),e.querySelector("#navLeft")?.addEventListener("click",()=>this.showPrev()),e.querySelector("#navRight")?.addEventListener("click",()=>this.showNext()),window.addEventListener("keydown",t=>{if(e.style.display==="flex")switch(t.key){case"ArrowLeft":this.showPrev();break;case"ArrowRight":this.showNext();break;case"Escape":this.closePreview();break}})}reset(e,t={}){this.images=e||[],this.currentIndex=t.thumbnailIndex||0,this.onCloseCallback=t.onCloseCallback||null,this.updateThumbnailList(),this.openPreview(this.currentIndex)}}typeof window<"u"&&(window.ImageZoomPlugin=c);const a=[{id:100,name:"智慧地磅系统",des:"贵州磷化地磅称重系统",resumeID:"101",path:"https://ghchenjingqi.github.io/resources/dfsj/db/",cover:"003.jpg",imgs:["001.jpg","002.jpg","003.jpg","004.jpg","006.jpg","007.jpg","008.jpg","009.jpg","010.jpg","011.jpg","012.jpg","013.jpg","014.jpg","015.jpg","016.jpg","017.jpg","018.jpg","019.jpg","020.jpg","021.jpg","022.jpg","023.jpg","024.jpg","025.jpg","026.jpg"]},{id:200,name:"非现中心平台-web",des:"非现场治超管理平台",resumeID:"201",path:"https://ghchenjingqi.github.io/resources/dfsj/feixian/web/",cover:"pc02.jpg",imgs:["openpage01.png","openpage02.png","pc01.jpg","pc02.jpg","pc03.jpg","pc04.jpg","pc05.jpg","pc06.jpg","pc06_1.jpg","pc07.jpg","pc08.jpg","pc08_1.jpg","pc09.jpg","pc09_1.jpg","pc09_2.jpg","pc10.jpg","pc11.jpg","pc12.jpg","pc13.jpg","pc14.jpg","pc15.jpg","pc16.jpg","pc17.jpg","pc18.jpg","pc19.jpg","publicpage01.jpg","publicpage02.jpg","publicpage03.jpg"]},{id:210,name:"非现中心平台-web新版",des:"非现场治超管理平台",resumeID:"201",path:"https://ghchenjingqi.github.io/resources/dfsj/feixian/webnew/",cover:"004.jpg",imgs:["001.jpg","002.jpg","003.jpg","004.jpg","005.jpg","006.jpg","007.jpg","008.jpg","009.jpg","010.jpg","011.jpg","012.jpg","013.jpg","014.jpg","015.jpg","016.jpg","017.jpg","018.jpg","019.jpg","020.jpg","020_1.jpg","021.jpg","022.jpg","023.jpg","024.jpg","025.jpg","026.jpg","027.jpg","028.jpg","029.jpg","030.jpg","031.jpg","032.jpg","033.jpg","034.jpg"]},{id:220,name:"非现中心平台-App/小程序",des:"非现场治超管理平台",resumeID:"201",isApp:!0,path:"https://ghchenjingqi.github.io/resources/dfsj/feixian/xcx/",cover:"xcx01.jpg",imgs:["xcx00.jpg","xcx01.jpg","xcx02.jpg","xcx03.jpg","xcx04.jpg","xcx05.jpg","xcx06.jpg","xcx07.jpg","xcx08.jpg","xcx09.jpg","xcx10.jpg","xcx11.jpg","xcx12.jpg","xcx13.jpg","xcx14.jpg"]},{id:310,name:"智慧服务区安心停车-小程序",des:"山东葛洲坝集团《人工智能技术在高速公路场景研究及应用》智慧服务区场景",resumeID:"301",isApp:!0,path:"https://ghchenjingqi.github.io/resources/dfsj/gzb/xcx/",cover:"003.jpg",imgs:["001.jpg","002.jpg","003.jpg","004.jpg","005.jpg","006.jpg","007.jpg","008.jpg"]},{id:320,name:"智慧服务区：安心停车-小程序管理端",des:"山东葛洲坝集团《人工智能技术在高速公路场景研究及应用》智慧服务区场景",resumeID:"301",path:"https://ghchenjingqi.github.io/resources/dfsj/gzb/xcxweb/",cover:"001.jpg",imgs:["001.jpg","002.jpg","003.png","004.jpg","005.png","006.jpg"]},{id:330,name:"智慧收费站：超限提示应用",des:"山东葛洲坝集团《人工智能技术在高速公路场景研究及应用》智慧收费站场景",resumeID:"301",path:"https://ghchenjingqi.github.io/resources/dfsj/gzb/cx/",cover:"002.png",imgs:["001.png","002.png","003.png","004.jpg"]},{id:330,name:"智慧高速：事件告警平台",des:"山东葛洲坝集团《人工智能技术在高速公路场景研究及应用》智慧高速场景",resumeID:"301",path:"https://ghchenjingqi.github.io/resources/dfsj/gzb/sj/",cover:"002.png",imgs:["001.png","002.png","003.png","004.png","005.png","006.png"]}];export{c as I,a as d};
