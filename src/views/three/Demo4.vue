<script setup>
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';

const {loading, pregress} = useThree({
    el: '#canvas', // 元素
    background:'#ffeeee',
    cameraPosition: [0, 4, 6], // 摄像机位置
    modelPath: '/public/glbs/demo4.glb', // 模型
    modelScale:[.6,.6,.6], // 模型缩放
    controlAuto: false,  // 自动旋转
    helper: false, // 辅佐线
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
