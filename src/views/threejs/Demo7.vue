<script setup>
import { onUnmounted } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import { creatPointsMesh, creatBoxMesh,randomColor } from '../../utils/creatMesh.js'


let meshs = null
const meshfn = ({ THREE, scene, camera, renderer, controls, stats }) => {
  // 星星配置
  let starList = [
    { nubmer: 600, color: 0x9c9c9c, size: 1.5  },
    { nubmer: 300, color: 0xffeeff, size: 2.2 },
    { nubmer: 100, color: 0xffff00, size: 0.5 },
    { nubmer: 600, color: 0xff0000, size: 2 ,scalar: 1},
    { nubmer: 500, color: 0x00ffff, size: 0.6 ,scalar: 2},
    { nubmer: 850, color: 0xffff00, size: 0.3 ,scalar: 3}
  ]

  for (let index = 0; index < starList.length; index++) {
    const stars = creatPointsMesh(starList[index]) ;
    stars.rotation.x = Math.random() * 6;
    stars.rotation.y = Math.random() * 6;
    stars.rotation.z = Math.random() * 6;

    stars.matrixAutoUpdate = false;
    stars.updateMatrix();
    scene.add(stars);
  }

  // 创建盒子
  meshs = creatBoxMesh({
    color: 0xffff00,
    type: 'lambert',
    size: [1,1,1]
  })
  scene.add(meshs);
}


// 回调动画
const animation = ({ scene, camera, renderer, controls, stats,clock }) => {
  controls.update();
  const delta = clock.getDelta(); // 毫米
  meshs.rotation.x += delta * 0.5;
  meshs.rotation.y += delta * 0.2;

  renderer.render(scene, camera);
  stats.update();
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#333333',
  cameraPosition: [0, 4, 10], // 摄像机位置
  controlAuto: true,  // 自动旋转
  helper: false, // 辅佐线
  light: true, // 灯光
  creatMesh: meshfn,  // 回调
  animation: animation // 动画回调
})


onUnmounted(() => {
  meshs = null
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

.msgbox {
  width: 100%;
  height: 10vh;
  line-height: 10vh;
  font-size: 20px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>
