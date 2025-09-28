class l{constructor(e={}){this.images=e.images||[],this.currentIndex=e.thumbnailIndex||0,this.onCloseCallback=e.onClose||null,this.init()}init(){this.images.length!==0&&(this.createPreviewOverlay(),this.updateThumbnailList(),this.openPreview(this.currentIndex),this.addEventListeners())}injectStyles(){const e=document.createElement("style");e.textContent=`
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
        `,document.head.appendChild(e)}createPreviewOverlay(){if(document.getElementById("previewOverlay"))return;this.injectStyles();const t=document.createElement("div");t.id="previewOverlay";const i=document.createElement("img");i.id="previewImage";const n=document.createElement("span");n.id="closeBtn",n.innerHTML="&times;";const r=document.createElement("div");r.id="navLeft",r.innerHTML="&#10094;",r.style.left="20px";const s=document.createElement("div");s.id="navRight",s.innerHTML="&#10095;",s.style.right="20px";const o=document.createElement("div");o.id="counter";const a=document.createElement("div");a.id="thumbnailList",t.appendChild(i),t.appendChild(r),t.appendChild(s),t.appendChild(n),t.appendChild(o),t.appendChild(a),document.body.appendChild(t)}updateThumbnailList(){const e=document.getElementById("thumbnailList");e&&(e.innerHTML="",this.images.forEach((t,i)=>{const n=document.createElement("img");n.src=t,n.setAttribute("data-index",i),n.style.border=i===this.currentIndex?"2px solid var(--mainColor)":"2px solid transparent",n.addEventListener("click",()=>this.openPreview(i)),e.appendChild(n)}))}openPreview(e){this.currentIndex=e;const t=document.getElementById("previewOverlay"),i=document.getElementById("previewImage"),n=document.getElementById("counter");i.src=this.images[this.currentIndex],n.innerText=`第 ${this.currentIndex+1} 张 / 共 ${this.images.length} 张`,this.updateThumbnailList(),t.style.display="flex"}closePreview(e){const t=document.getElementById("previewOverlay");t.style.display="none",typeof e=="function"?e():typeof this.onCloseCallback=="function"&&this.onCloseCallback()}showNext(){this.currentIndex<this.images.length-1&&this.openPreview(this.currentIndex+1)}showPrev(){this.currentIndex>0&&this.openPreview(this.currentIndex-1)}addEventListeners(){const e=document.getElementById("previewOverlay");e.querySelector("#closeBtn")?.addEventListener("click",()=>{this.closePreview()}),e.addEventListener("click",t=>{t.target===e&&this.closePreview()}),e.querySelector("#navLeft")?.addEventListener("click",()=>this.showPrev()),e.querySelector("#navRight")?.addEventListener("click",()=>this.showNext()),window.addEventListener("keydown",t=>{if(e.style.display==="flex")switch(t.key){case"ArrowLeft":this.showPrev();break;case"ArrowRight":this.showNext();break;case"Escape":this.closePreview();break}})}reset(e,t={}){this.images=e||[],this.currentIndex=t.thumbnailIndex||0,this.onCloseCallback=t.onCloseCallback||null,this.updateThumbnailList(),this.openPreview(this.currentIndex)}}typeof window<"u"&&(window.ImageZoomPlugin=l);export{l as I};
