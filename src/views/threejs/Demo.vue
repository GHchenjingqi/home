<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useThree } from '@/mixin/useThree.js';
import Loading from '@/components/Loading.vue';
const init = async ({ THREE, scene, camera , axesHelper}) => {

}

const animation = ({ controls, scene, camera, renderer, stats ,gridHelper}) => {

 
  stats?.update();
  controls?.update();
  renderer?.render(scene, camera);
}


const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#333333', // 背景色
  cameraPosition: [4, 2.5, -6], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: true, // 是否开启自动旋转
  helper: true, // 辅佐线
  light: true, // 灯光
  showStats: true,
  creatMesh: init,
  animation: animation // 动画回调
})

onMounted(() => {
})
onUnmounted(() => {
})
</script>

<template>
  <Loading :loading="loading">
    <div id="canvas"></div>
  </Loading>
</template>

<style scoped>
#canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>
