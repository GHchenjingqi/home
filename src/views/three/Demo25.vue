<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import { findMesh } from '../../utils/creatMesh.js'

let heart = null, star = null
let group; // 需要监听点击元素的组
const init = async ({ THREE, scene, controls, canvas, camera, renderer, }) => {
    group = new THREE.Group();
    // 获取心模型
    heart = findMesh(scene.children,'heart')
    // 隐藏模型
    heart.visible = false

    star = findMesh(scene.children,'star')
    star.visible = false

    group.add(heart)
    group.add(star)
    scene.add(group)
}

const meshMove=(mesh)=>{
    if(mesh.scale.x<10){
        mesh.scale.x += 0.1
        mesh.scale.y += 0.1
        mesh.scale.z += 0.1
    }

    if(Math.floor(mesh.scale.x)==10){
        if(mesh.rotation.y < 2*Math.PI){
            mesh.rotation.y +=0.138
        }
    }
}

const animation = ({ THREE, scene, camera, renderer, controls })=>{
    if (controls) {
        controls.update();
    }
    if(zan.value){
        meshMove(heart)
    }
    if(cang.value){
        meshMove(star)
    }
    // 按秒
    renderer.render(scene, camera);
}

// 点赞事件句柄
const zan = ref(false);
const zanHandle=()=>{
    zan.value = !zan.value
    if(zan.value){
        if(cang.value) {
            star.visible = false
        }
        heart.visible = true
        heart.scale.set(1,1,1)
        heart.rotation.y = 0
    }else {
        heart.visible = false
    }
}

const cang = ref(false);
const cangHandle=()=>{
    cang.value = !cang.value
    if(cang.value){
        if(zan.value) {
            heart.visible = false
        }
        star.visible = true
        star.scale.set(1,1,1)
        star.rotation.y = 0
    }else{
        star.visible = false
    }
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#fff', // 背景色
  cameraPosition: [0, 0, 8], // 摄像机位置
  modelPath:  ['heart.glb','star.glb'], // 模型
  modelName: ['heart','star'], // 模型名称
  modelScale:[1,1,1],
  control: false, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: false, // 辅佐线
  light: true, // 灯光
  showStats:false,
  creatMesh: init,
  animation: animation // 动画回调
})

onBeforeUnmount(() => {
    heart = null
    star = null
});
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
    <canvas id="canvas"></canvas>

    <div class="oper">
        <div class="row">JS与3D元素交互</div>
        <div class="item zan" :class="{'active': zan}" @click="zanHandle">
            <img v-show="!zan" src="/public/hart.svg" alt="">
            <img v-show="zan" src="/public/heart.svg" alt="">
            <span>{{zan?'已赞':'赞一下'}}</span>
        </div>
        <div class="item cang" :class="{'active': cang}" @click="cangHandle">
            <img v-show="!cang" src="/public/cang.svg" alt="">
            <img v-show="cang" src="/public/chang.svg" alt="">
            <span>{{cang?'已收藏':'收藏'}}</span>
        </div>
    </div>
  </Loading>
</template>
<style scoped>
#canvas {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 0;
}
.oper{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 420px;
    .row{
        width: 100%;
        position: absolute;
        text-align: center;
        margin-top:15rem;
    }
    .item{
        display: inline-flex;
        margin: 0 20px;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img{
            width: 24px;
            height: 24px;
            margin-right: 0.4rem;
        }
        &.zan.active{
            color: red
        }
        &.cang.active{
            color: #fb5021;
        }
    }
}
</style>
