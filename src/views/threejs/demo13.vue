<script setup>
import { onUnmounted, ref, computed } from 'vue'
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';
import { JoltPhysics } from 'three/examples/jsm/physics/JoltPhysics.js';


let physics, position,timer
const init = async ({ THREE, scene, controls, transControls, camera, renderer }) => {
  // 物理引擎
  physics = await JoltPhysics();
  position = new THREE.Vector3();

  // 地球
  const earthGroup = new THREE.Group();
  let textureLoader = new THREE.TextureLoader();
  let texture = textureLoader.load(import.meta.env.VITE_BASE_URL+'http://115.190.117.177:10086/images/world.jpg');
  let textureat = textureLoader.load(import.meta.env.VITE_BASE_URL+'http://115.190.117.177:10086/images/atearth.webp');
  let geometry = new THREE.SphereGeometry(2, 40, 40);
  let material = new THREE.MeshLambertMaterial({
    map: texture,
    bumpMap: textureat, // 凹凸贴图
    bumpScale: 1
  });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'earth';
  earthGroup.add(mesh);

  let texture1 = textureLoader.load( import.meta.env.VITE_BASE_URL+'http://115.190.117.177:10086/images/cloud.png');
  let mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 40, 40),
    new THREE.MeshLambertMaterial({
      map: texture1,
      transparent: true,
      opacity: 0.4,
  }));
  mesh1.name = 'earthCloud';
  earthGroup.add(mesh1);
  scene.add(earthGroup);


  // 地面
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(10, 5, 10),
    new THREE.ShadowMaterial({ color: 0x444444 })
  );
  floor.position.y = - 5;
  floor.receiveShadow = true;
  floor.userData.physics = { mass: 0 };
  scene.add(floor);

  // 创建实例化网格
  const count = 100
  material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });

  // 实例化网格批量创建多个元素 InstancedMesh(几何体，材质，数量)
  let object = new THREE.InstancedMesh(new THREE.BoxGeometry(0.3, 0.3, 0.3, 2, 2, 2), material, count);
  object.instanceMatrix.setUsage(THREE.DynamicDrawUsage); // 矩阵会动态更新
  object.userData.physics = { mass: 1 }; // 物理属性，可以用于物体运动碰撞等
  const matrix = new THREE.Matrix4();
  const color = new THREE.Color();
  for (let i = 0; i < count; i++) {
    matrix.setPosition(Math.random() * 3 - 5, Math.random() * 3 - 5, Math.random() * 3 - 5);
    object.setMatrixAt(i, matrix);
    object.setColorAt(i, color.setHSL(i / count, 1, 0.5));
  }
  object.position.set(-0.5, 0, 1);
  scene.add(object);

  // 实例化小球
  let object2 = new THREE.InstancedMesh(new THREE.SphereGeometry(0.3, 30, 12), material, count);
  object2.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  object2.userData.physics = { mass: 1 };
  const matrix2 = new THREE.Matrix4();
  const color2 = new THREE.Color();
  for (let i = 0; i < count; i++) {
    matrix2.setPosition(Math.random() * 2 - 5, Math.random() * 2 - 5, Math.random() * 2 - 5);
    object2.setMatrixAt(i, matrix2);
    object2.setColorAt(i, color2.setHSL(i / count, 1, 0.5));
  }
  object2.position.set(-0.5, 0, 1);
  scene.add(object2);

  // 创建物理世界
  physics.addScene(scene);


  timer = setInterval(() => {
    let index = Math.floor(Math.random() * object.count);
    position.set(-3, Math.random() + 3, 0);
    physics.setMeshPosition(object, position, index);

    index = Math.floor(Math.random() * object2.count);
    position.set(5, Math.random() + 3, 0);
    physics.setMeshPosition(object2, position, index);
  }, 1000 / 60);
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  // background:'transparent',
  background: '#fff', // 背景色
  cameraPosition: [0, 2, 6], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: true, // 是否开启自动旋转
  helper: false, // 辅佐线
  light: true, // 灯光
  creatMesh: init,
})


onUnmounted(() => {
  physics = position = null;
  if (timer) {
    clearInterval(timer);
  }
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
