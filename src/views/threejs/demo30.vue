<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useThree } from '@/mixin/useThree.js';
import Loading from '@/components/Loading.vue';

let cloudParticles = [];
onUnmounted(() => {
  cloudParticles = [];
})
const init = async ({ THREE, scene, camera }) => {
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  // 加载环境贴图
  const loader = new THREE.TextureLoader();
  const envMapTexture = await loader.load(import.meta.env.VITE_BASE_URL + 'http://115.190.117.177:10086/images/sky.webp');

  // 球体
  const sphere = new THREE.SphereGeometry(10, 32, 32);
  sphere.scale(-1, 1, 1);  // 反转 X 轴法线

  const sphereMaterial = new THREE.MeshPhysicalMaterial({
    map: envMapTexture,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
  scene.add(sphereMesh);

  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
  scene.add(ambientLight);
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, .6);
  directionalLight.position.set(0, 0, 0);
  scene.add(directionalLight);


  // 加载云彩贴图
  const texture = await loader.load(import.meta.env.VITE_BASE_URL + 'http://115.190.117.177:10086/images/cloud.png');
  const cloudGeo = new THREE.PlaneGeometry(5, 3);

  const cloudMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    normalMap: texture,
    color: 0xffffff,
    transparent: true,
    opacity: 0.6,
    alphaTest: 0.2  // 设置透明度阈值
  });

  for (let p = 0; p < 5; p++) {
    const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    const radius = 9; // 确保云在球体内部
    const theta = Math.random() * Math.PI * 2; // 随机角度
    const phi = Math.random() * Math.PI; // 随机角度

    cloud.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );
    cloud.lookAt(new THREE.Vector3(0, 0, 0));  // 让云面朝球体中心
    cloudParticles.push(cloud);
    scene.add(cloud);
  }
}

const animation = ({ controls, scene, camera, renderer, stats }) => {
  cloudParticles.forEach(p => {
    p.rotation.z -= 0.001;
  });
  stats?.update();
  controls?.update();
  renderer?.render(scene, camera);
}


const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#fff', // 背景色
  cameraPosition: [0, 0, 0], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: false, // 辅佐线
  light: false, // 灯光
  showStats: true,
  creatMesh: init,
  animation: animation // 动画回调
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
