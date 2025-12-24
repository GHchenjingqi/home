<script setup>
import { ref, onMounted } from 'vue'
import { config } from '@/config'
import { useRouter } from 'vue-router'
const router = useRouter()

const menus = ref([])
const menusHandle = () => {
    const threeMenus = config.menus.find(item => item.name == 'threejs')
    menus.value = threeMenus.children.filter(item => item.path !== '/')
}

const go = (path, index) => {
    router.push(path)
    gotoItem(index)
}

const gotoItem = (index) => {
    const menu = document.getElementById('menu')
    if (menu) {
        menu.scrollTop = index * 140
    }
}
onMounted(() => {
    menusHandle()
})
</script>

<template>
    <div class="content">
        <div class="file-title">
            <img src="http://115.190.117.177:10086/images/threejs.jpg" alt="">
            <div class="file-content">
                <h1>ThreeJS <a href="https://threejs.org/docs/index.html" target="_blank"
                        rel="noopener noreferrer">官方文档</a></h1>
                <p>ThreeJS+Blender 实现3D场景效果</p>
            </div>
        </div>
        <div class="box">
            <div class="left">
                <h3>Demo案例</h3>
                <ul class="list">
                    <li v-for="(item, index) in menus" :key="index" @click="go(item.path, index)">{{ item.name }}</li>
                </ul>
            </div>
            <div class="right">
                <h3>工具类</h3>
                <div class="tools">
                    <div class="item"><a href="https://polyhaven.com/hdris/skies" target="_blank"
                            rel="noopener noreferrer">360全景图</a>
                    </div>
                    <div class="item"><a href="https://matheowis.github.io/HDRI-to-CubeMap/" target="_blank"
                            rel="noopener noreferrer">3D图分割</a></div>
                    <div class="item"><a href="https://polyhaven.com/textures" target="_blank"
                            rel="noopener noreferrer">textures贴图</a></div>
                    <div class="item"><a href="https://polyhaven.com/models" target="_blank"
                            rel="noopener noreferrer">免费模型</a></div>
                    <div class="item"><a href="https://sketchfab.com/" target="_blank"
                            rel="noopener noreferrer">免费模型</a></div>
                    <div class="item"><a href="https://gltf.report/" target="_blank"
                            rel="noopener noreferrer">glb模型压缩</a></div>
                    <div class="item"><a href="https://gero3.github.io/facetype.js/" target="_blank"
                            rel="noopener noreferrer">字体转JSON</a></div>
                    <div class="item"><a href="https://www.shadertoy.com/browse" target="_blank"
                            rel="noopener noreferrer">shader着色器案例源码</a></div>
                    <div class="item"><a href="https://editor.thebookofshaders.com/" target="_blank"
                            rel="noopener noreferrer">shader着色器在线编辑器</a></div>
                    <div class="item"><a href="https://glslsandbox.com/" target="_blank"
                            rel="noopener noreferrer">webgl着色器案例源码</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.file-title {
    margin-top: 1rem;
    padding: 1rem 2rem;
    box-sizing: border-box;
    margin-bottom: 1rem;
    background: #fff;
    height: 180px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;

    img {
        height: 100%;
        margin-right: 2rem;
    }

    .file-content {
        h1 {
            a {
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
    display: flex;
    justify-content: flex-start;
    h3{
        margin-top: 0rem;
    }
    .left {
        width: 84%;
        box-sizing: border-box;
        padding: 1rem 2rem;
        background-color: #fff;
        border-radius: 8px;
    }

    .right {
        margin-left: 1%;
        width: 16%;
        padding: 1rem 2rem;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
    }

    ul.list {
        max-height: 580px;
        overflow-y: auto;
    }

    ul li {
        line-height: 2;
        cursor: pointer;
        padding-left: 0;
        box-sizing: border-box;
        font-size: 1rem;
        width: 48%;
        float: left;

        &:hover {
            color: var(--mainColor);
        }
    }

    .tools .item a{
        font-size: 0.8rem;
        line-height: 2;
        color: #333;
    }
}
</style>
