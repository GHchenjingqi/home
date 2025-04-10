<script setup>
import { onUnmounted, ref, computed } from 'vue'
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';
import CANNON from 'cannon';

let world, sphereMesh, sphereBody, meshBody, meshList = []
const init = async ({ THREE, scene, controls, transControls, camera, renderer }) => {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
  // 创建 Three.js 几何体和材质
  const sphereGeometry = new THREE.SphereGeometry(1);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(import.meta.env.VITE_BASE_URL+"/public/images/lq.gif");
  const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xc96802, map: texture});
  sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.y = 15;
  sphereMesh.castShadow = true;
  scene.add(sphereMesh);

  const planeGroup = new THREE.Group();
  const planeGeometry = new THREE.PlaneGeometry(100, 50);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
  const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
  // 与 Cannon.js 中的平面旋转对应
  planeMesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
  planeMesh.castShadow = true;
  planeMesh.receiveShadow = true;
  planeGroup.add(planeMesh);

  // 正方体
  let num = 80
  let cubeGeo = new THREE.BoxGeometry(1, 1, 1, 10, 10);
  for (let i = 0; i < num; i++) {
    const cubeMesh = new THREE.Mesh(cubeGeo, planeMaterial);
    cubeMesh.castShadow = true;
    cubeMesh.position.set(Math.random() * 10 - 5, 0, Math.random() * 10 - 2);
    meshList.push(cubeMesh);
    planeGroup.add(cubeMesh);
  }
  scene.add(planeGroup);

  let light = new THREE.PointLight(0xffffff, 500, 100)
  light.position.set(0, 10, 5)
  scene.add(light)
  // 设置阴影
  light.castShadow = true;

  // 创建物理世界
  world = new CANNON.World()
  world.gravity.set(0, -9.82, 0);
  world.quatNormalizeSkip = 0;
  world.quatNormalizeFast = false;
  world.broadphase = new CANNON.NaiveBroadphase();
  // 创建 Cannon.js 物体
  const meshShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
  let meshmaterial = new CANNON.Material();
  meshBody = new CANNON.Body({
    mass: 5,
    shape: meshShape,
    material: meshmaterial
  });
  meshBody.position.set(0, 10, 2);
  world.addBody(meshBody);
  // 球体
  const sphereShape = new CANNON.Sphere(1);
  // 设置刚体材质
  const sphereShapematerial = new CANNON.Material();
  sphereBody = new CANNON.Body({
    mass: 1,
    shape: sphereShape,
    material: sphereShapematerial
  });
  sphereBody.position.set(0, 15, 0);
  world.addBody(sphereBody);
  // 平面刚体
  const planeShape = new CANNON.Plane();
  // 平面材质
  const planeShapematerial = new CANNON.Material();
  const planeBody = new CANNON.Body({
    mass: 0, // 地面通常质量为 0，静态不动
    shape: planeShape,
    material: planeShapematerial
  });
  // 与 Three.js 中的平面旋转对应
  planeBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),
    -Math.PI / 2
  );
  world.addBody(planeBody);

  // 设置材质关联系数
  const contactMaterial = new CANNON.ContactMaterial(planeShapematerial, sphereShapematerial, {
    restitution: 0.8 //反弹恢复系数
  })
  // 把关联的材质添加到物理世界中
  world.addContactMaterial(contactMaterial)


  // 空格提示
  const spaceHandeler = () => {
    // 小球位置及刚体
    sphereMesh.position.y = 15;
    sphereBody.position.set(0, 15, 0);

    // 物体随机及刚体位置
    meshList.forEach((mesh) => {
      mesh.position.set(Math.random() * 10 - 5,0, Math.random() * 10 - 5);
    })
  }
 
  // 空格开灯
  document.body.addEventListener('keydown', onKeyDown);
}

const onKeyDown = function (event) {
    switch (event.code) {
      case 'Space':
        spaceHandeler()
        break;
    }
  }
const animation = ({ THREE, scene, controls, transControls, camera, renderer, stats }) => {
  // 更新物理世界
  world.step(1 / 60);
  // 更新 Three.js 物体的位置和旋转以匹配 Cannon.js 物体
  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);

  controls.update();
  renderer.render(scene, camera);
  stats.update();
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#111', // 背景色
  cameraPosition: [0, 10, 20], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: true, // 是否开启自动旋转
  helper: false, // 辅佐线
  light: false, // 灯光
  creatMesh: init,
  animation: animation
})


onUnmounted(() => {
  world = null
  document.body.removeEventListener('keydown', onKeyDown);
})
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
    <canvas id="canvas"></canvas>
    <div class="text-box">
      <p>按”空格“重复播放碰撞动画</p>
    </div>
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

.text-box {
  color: #fff;
  position: absolute;
  left: 0;
  bottom: 10px;
  text-align: center;
  width: 100%;
}
</style>
