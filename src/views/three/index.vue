<script setup>
import { ref, onMounted } from 'vue'
import { config } from '@/config'
import { useRouter} from 'vue-router'
const router = useRouter()

const menus = ref([])
const menusHandle=()=>{
  const threeMenus = config.menus.find(item => item.name == 'three')
  menus.value = threeMenus.children.filter(item => item.path !== '/')
}

const go = (path,index) => {
  router.push(path)
  gotoItem(index)
}

const gotoItem = (index) => {
  const menu = document.getElementById('menu')
  if (menu) {
    menu.scrollTop =  index * 140
  }
}
onMounted(() => {
  menusHandle()
})
</script>

<template>
    <div class="content">
        <div class="file-title">
            <img src="/public/images/three.png" alt="">
            <div class="file-content">
                <h1>ThreeJS <a href="https://threejs.org/docs/index.html" target="_blank" rel="noopener noreferrer">官方文档</a></h1>
                <p>ThreeJS+Blender 实现3D场景效果</p>
            </div>
        </div>
        <div class="box">
            <div class="left">
                <h3>demo案例</h3>
                <ul class="list">
                    <li v-for="(item,index) in menus" :key="index" @click="go(item.path,index)">{{ item.name }}</li>
                </ul>
            </div>
            <div class="right">
                <h3>工具类</h3>
                <ul class="list">
                    <li><a href="https://polyhaven.com/hdris/skies" target="_blank" rel="noopener noreferrer">360全景图</a></li>
                    <li><a href="https://matheowis.github.io/HDRI-to-CubeMap/" target="_blank" rel="noopener noreferrer">3D图分割</a></li>
                    <li><a href="https://polyhaven.com/textures" target="_blank" rel="noopener noreferrer">textures贴图</a></li>
                    <li><a href="https://polyhaven.com/models" target="_blank" rel="noopener noreferrer">免费模型</a></li>
                    <li><a href="https://sketchfab.com/" target="_blank" rel="noopener noreferrer">免费模型</a></li>
                    <li><a href="https://gltf.report/" target="_blank" rel="noopener noreferrer">glb模型压缩</a></li>
                    <li><a href="https://gero3.github.io/facetype.js/" target="_blank" rel="noopener noreferrer">字体转JSON</a></li>
                    <li><a href="https://www.shadertoy.com/browse" target="_blank" rel="noopener noreferrer">shader着色器案例源码</a></li>
                    <li><a href="https://editor.thebookofshaders.com/" target="_blank" rel="noopener noreferrer">shader着色器在线编辑器</a></li>
                    <li><a href="https://glslsandbox.com/" target="_blank" rel="noopener noreferrer">webgl着色器案例源码</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.file-title{
    margin-top: 1rem;
    margin-bottom: 1rem;
    background: #fff;
    height: 180px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;

    img{
        height: 100%;
        margin-right: 2rem;
    }

    .file-content {
        h1{
            a{
                margin-left: .5rem;
                display: inline-block;
                padding: 4px 12px;
                background: var(--mainColor);
                font-size: 12px;
                text-decoration: none;
                border-radius: 4px;
                vertical-align: top;
                color: #fff;
            }
        }
    }
}


.box {
    background: #fff;
    padding: 1rem 2rem;
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    .left{
        width: 60%;
        padding-right: 2rem;
        box-sizing: border-box;
    }
    .right{
        width: 40%;
        padding-right: 2rem;
        box-sizing: border-box;
    }
    ul.list{
        max-height: 580px;
        overflow-y: auto;
    }
    ul li{
        line-height: 2;
        cursor: pointer;
        &:hover{
            color: var(--mainColor);
        }
    }
}
</style>
