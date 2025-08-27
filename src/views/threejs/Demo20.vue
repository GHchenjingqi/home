<script setup>
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
const init = async ({ THREE, scene, controls, transControls, camera, renderer }) => {
  // 盒子模型
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  // 长方体（参数：长宽高）
  const boxGeometry1 = new THREE.BoxGeometry(1, 5, 1);
  // 球体（参数：大小）
  const sphereGeometry = new THREE.SphereGeometry(1);
  // 圆柱体（参数：上大小，下大小，高度）
  const cylinderGeometry = new THREE.CylinderGeometry(1,2,5);
  // 圆锥体（参数：大小，高度，棱边数）
  const coneGeometry = new THREE.ConeGeometry(1,3,3);
  // 胶囊体（参数：半径大小，高度，圆角，棱边数）
  const capsule = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
  // 平面体（参数：宽、高, 宽细分，高细分）
  const plane = new THREE.PlaneGeometry( 2, 6);

  // 添加到场景
  const material = new THREE.MeshPhongMaterial({ color: 0xff0000 }); //材质
  const box = new THREE.Mesh(boxGeometry, material);
  const box1 = new THREE.Mesh(boxGeometry1, material);
  box1.position.x = 3
  const geo = new THREE.Mesh(sphereGeometry, material);
  geo.position.x = -3
  const cyl = new THREE.Mesh(cylinderGeometry, material);
  cyl.position.z = -3
  const cone = new THREE.Mesh(coneGeometry, material);
  cone.position.z = 3

  const cap = new THREE.Mesh(capsule, material);
  cap.position.z = -6
  cap.position.x = 4

  const planes = new THREE.Mesh(plane, material);
  planes.position.z = -6
  planes.position.x = -4

  // 圆形平面
  const Rgeometry = new THREE.CircleGeometry(2, 32 );
  const Rplanes = new THREE.Mesh(Rgeometry, material);
  Rplanes.position.set(0,2,-6)
  scene.add(Rplanes)
  scene.add(box)
  scene.add(box1)
  scene.add(geo)
  scene.add(cyl)
  scene.add(cone)
  scene.add(cap)
  scene.add(planes)
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
