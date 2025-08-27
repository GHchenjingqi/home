<script setup>
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';

const init = async ({ THREE, scene, controls, transControls, camera, renderer }) => {
  const geometry = new THREE.BufferGeometry()
  const pointsArray = new Float32Array([
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
    -1.0,  1.0, -1.0
  ])
  // 顶点颜色
  const colors = new Float32Array([
    1.0, 0.0, 0.0, 1.0, // 红色
    0.0, 1.0, 0.0, 1.0, // 绿色
    0.0, 0.0, 1.0, 1.0, // 蓝色
    1.0, 1.0, 0.0, 1.0, // 黄色
    1.0, 0.0, 1.0, 1.0, // 紫色
    0.0, 1.0, 1.0, 1.0, // 青色
    1.0, 1.0, 1.0, 1.0, // 白色
    0.5, 0.5, 0.0, 1.0  // 棕色
  ]);

  // 立方体的面（每个面由两个三角形组成，每个三角形3个顶点）
  const indices = new Uint32Array([
      0, 1, 2,  2, 3, 0,    // 前面
      4, 5, 6,  6, 7, 4,    // 后面
      4, 5, 1,  1, 0, 4,    // 左面
      7, 6, 2,  2, 3, 7,    // 右面
      4, 0, 3,  3, 7, 4,    // 上面
      5, 1, 2,  2, 6, 5     // 下面
  ]);

  geometry.attributes.position = new THREE.BufferAttribute(pointsArray, 3)
  geometry.attributes.color = new THREE.BufferAttribute(colors, 3)
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));

  const material = new THREE.PointsMaterial({
    vertexColors: colors,
    side: THREE.DoubleSide,
    size: 0.2 // 顶点大小
  })
  const points = new THREE.Points(geometry, material)
  // 向左平移2.5个单位
  scene.add(points)

  // 网格颜色
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

const animation = ({ THREE, scene, camera, renderer, stats, controls }) => {
  stats.update();
  renderer.render(scene, camera);
  controls.update();
}

const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#ddddff', // 背景色
  cameraPosition: [0, 4, 5], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: true, // 辅佐线
  light: true, // 灯光
  creatMesh: init,
  animation: animation
})
</script>
<template>
  <Loading :loading="loading">
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
