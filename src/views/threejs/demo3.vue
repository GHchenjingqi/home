<script setup>
import { useThree } from '@/mixin/useThree';
import Loading from '@/components/Loading.vue';

const {loading, pregress} = useThree({
    el: '#canvas', // 元素
    background:'#ffeeff',
    cameraPosition: [0, 6, 8], // 摄像机位置
    modelPath: 'demo3.glb', // 模型
    modelScale:[2,2,2], // 模型缩放
    controlAuto: true,  // 自动旋转
    controlAutoSpeed: -0.2, // 旋转速度
    helper: true, // 辅佐线
    light: true, // 灯光
})
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
    <canvas id="canvas"></canvas>
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
