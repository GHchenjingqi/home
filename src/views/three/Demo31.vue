<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useThree } from '@/mixin/useThree.js';
import Loading from '@/components/Loading.vue';
import { findMesh } from '@/utils/creatMesh.js'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'
// gui 控制参数
let gui = null
// 控制参数
let pointGui = {
  color: '0xffffff',
  glass: '0xcccccc'
}

const wheels = []
let carBody = null
const init = async ({ THREE, scene, camera , axesHelper}) => {
  axesHelper.visible = false
	scene.fog = new THREE.Fog( 0x333333, 10, 15 );
        
  const car = findMesh(scene.children, 'ferrari')
  const carModels = car?.children[0].children
  carBody = findMesh(carModels, 'body')
  carBody.material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 1.0, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03
  });

  const glass = findMesh(carModels[0].children, 'glass')
  glass.material = new THREE.MeshPhysicalMaterial({
    color: 0xcccccc, metalness: 0.25, roughness: 0, transmission: 1.0
  });

  gui.addColor(pointGui, 'color').name('车漆颜色').onChange((value) => {
    carBody.material.color.set(value);
  })
  gui.addColor(pointGui, 'glass').name('玻璃颜色').onChange((value) => {
    glass.material.color.set(value);
  })

  wheels.push(
    findMesh(carModels, 'wheel_fl'),
    findMesh(carModels, 'wheel_fr'),
    findMesh(carModels, 'wheel_rl'),
    findMesh(carModels, 'wheel_rr')
  );

}

const animation = ({ controls, scene, camera, renderer, stats ,gridHelper}) => {

  if (wheels && wheels.length > 0) {
    const time = - performance.now() / 1000;
    for (let i = 0; i < wheels.length; i++) {
      wheels[i].rotation.x = time * Math.PI * 2;
    }
    gridHelper.position.z = - ( time ) % 1;
  }

  stats?.update();
  controls?.update();
  renderer?.render(scene, camera);
}


const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#333333', // 背景色
  cameraPosition: [4, 2.5, -6], // 摄像机位置
  modelPath: ['ferrari.glb'],
  modelName: ['ferrari'], // 模型名称
  modelScale: [1.2, 1.2, 1.2],
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: true, // 辅佐线
  light: true, // 灯光
  showStats: true,
  creatMesh: init,
  animation: animation // 动画回调
})

onMounted(() => {
  gui = new GUI()
  gui.domElement.style.top = '6rem'
  gui.domElement.style.right = '100px'

})
onUnmounted(() => {
  gui.destroy()
  gui = null
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
