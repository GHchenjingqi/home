<script setup>
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';

const init = async ({ THREE, scene, controls, transControls, camera, renderer }) => {
  const geometry = new THREE.BufferGeometry()
  const pointsArray = [
    2,0,0,
    1,0,-1,
    0,0,0,
    0,0,1,
    1,0,2,
    2.5,0,3,
    4,0,2,
    5,0,1,
    5,0,0,
    4,0,-1,
    3,0,0
  ]
  geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(pointsArray),3)

  // 点 渲染
  const points = new THREE.Points(geometry, new THREE.PointsMaterial({
    color: 0xffff00,
    size: 0.4
  }))
  // 向左平移2.5个单位
  points.position.x = -2.5
  scene.add(points)

  // 线渲染 Line 不会闭合
  const lines = new THREE.Line(geometry, new THREE.LineBasicMaterial({
    color: 0xff0000
  }))
  // 线渲染 LineLoop 收尾相连
  const lines2 = new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({
    color: 0xff00ff
  }))
  lines2.position.z = - 5
  scene.add(lines)
  scene.add(lines2)

  // 三角形面
  // 网格模型Mesh其实就一个一个三角形(面)拼接构成
  const geometry2 = new THREE.BufferGeometry();
  const vertices = new Float32Array( [
    0,0,0,
    2,0,0,
    1,0,-1,

    0,0,0,
    0,0,1,
    1,0,2,

    0,0,0,
    2,0,0,
    1,0,2,

    2,0,0,
    1,0,2,
    3,0,0,

    1,0,2,
    2.5,0,3,
    4,0,-1,

    4,0,-1,
    2.5,0,3,
    4,0,2,

    4,0,-1,
    5,0,1,
    4,0,2,

    4,0,-1,
    5,0,1,
    5,0,0
  ]);
  geometry2.attributes.position = new THREE.BufferAttribute(vertices, 3);
  const material = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry2, material);
  scene.add(mesh);

  // 面索引
  const geometry3 = new THREE.BufferGeometry();
  const vertices3 = new Float32Array([
      0, 0, 0,
      2, 0, 0,
      2, 0, 2,

      // 0, 0, 0,
      0, 0, 2,
      // 2, 0, 2,
  ]);

  // 下面索引值对应顶点位置数据中的顶点坐标
  // 第 0、1、2这三个点构成一个三角形
  // 第 0、3、2这三个点构成一个三角形
  const indexes = new Uint16Array([
      0, 1, 2, 0, 3, 2,
  ])

  geometry3.index = new THREE.BufferAttribute(indexes, 1);
  geometry3.attributes.position = new THREE.BufferAttribute(vertices3, 3);
  const mesh2 = new THREE.Mesh(geometry3, material);
  mesh2.position.x = -2
  mesh2.position.z = -2
  scene.add(mesh2);
}

const animation = ({THREE, scene, camera, renderer, stats,controls }) => {
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
