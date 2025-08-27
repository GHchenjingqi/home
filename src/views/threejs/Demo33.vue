<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useThree } from '@/mixin/useThree.js';
import Loading from '@/components/Loading.vue';
import {  getRandomNumber } from '@/utils/comfun.js';

let box = null, group = null,threeobj = null;
let boxObj = null, boxObj2 = null, boxHelper = null, boxHelper2 = null;
let helperColor = 0x00ff00;

const boxposition = ref([0, 0, 0]);
// box3 只能做简单碰撞检测，返回布尔值，不能获取碰撞信息（比如什么方向发生碰撞）
const init = async ({ THREE, scene, camera, axesHelper }) => {
  threeobj = THREE
  let floorGeometry = new THREE.PlaneGeometry(20, 20, 100, 100);
  floorGeometry.rotateX(- Math.PI / 2);
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  scene.add(floor);


  // 创建移动盒子
  let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  let boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(getRandomNumber(-3,3),0,getRandomNumber(1,4) )
  scene.add(box);

  // 盒子堆障碍物
  group = new THREE.Group();
  let box2 = new THREE.Mesh(boxGeometry, boxMaterial);
  box2.position.x = 1
  box2.material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
  let box3 = box2.clone()
  box3.position.x = -1
  let box4 = box2.clone()
  box4.position.x = 0
  box4.position.z = -1
  let boxplace = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  boxplace.rotateX(- Math.PI / 2).translateZ(-0.49)
  group.add(box2, box3, box4, )
  scene.add(group,boxplace)

  // 碰撞检测box3
  boxObj = new THREE.Box3().setFromObject(box);
  boxObj2 = new THREE.Box3().setFromObject(group);
  boxHelper = new THREE.Box3Helper(boxObj, helperColor);
  boxHelper2 = new THREE.Box3Helper(boxObj2, helperColor);
  scene.add(boxHelper, boxHelper2)
}
const checkCollision = () => {
  boxObj = new threeobj.Box3().setFromObject(box);
  boxObj2 = new threeobj.Box3().setFromObject(group);
  return boxObj.intersectsBox(boxObj2);
}
const animation = ({ THREE, controls, scene, camera, renderer, stats, gridHelper }) => {
  stats?.update();
  controls?.update();
   
  if(!checkCollision()){
    movehandler();
  }else{
    helperColor = 0xff0000
  }

  boxposition.value = [box.position.x, box.position.y, box.position.z] 
  // 更新移动盒子辅助线
  boxHelper2.material.color.set(helperColor)
  scene.remove(boxHelper);
  boxHelper = new THREE.Box3Helper(boxObj, helperColor);
  scene.add(boxHelper)
  renderer?.render(scene, camera);
}


const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#333333', // 背景色
  cameraPosition: [2, 2, 6], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: false, // 辅佐线
  light: true, // 灯光
  showStats: true,
  creatMesh: init,
  animation: animation // 动画回调
})

// 移动物体控制逻辑
let speed = 0.01, height = 0.5;
let eventer = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  canJump: false
}
const onKeyDown = function (event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      eventer.forward = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      eventer.left = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      eventer.backward = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      eventer.right = true;
      break;
    case 'Space':
      eventer.canJump = true;
      break;
  }
}
const onKeyUp = function (event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      eventer.forward = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      eventer.left = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      eventer.backward = false;
      break;
    case 'ArrowRight':
    case 'KeyD':
      eventer.right = false;
      break;
    case 'Space':
      eventer.canJump = false;
      break;
  }
}
// 移动动画
const movehandler = () => {
  if (eventer.forward) {
    box.position.z -= speed;
  }
  if (eventer.backward) {
    box.position.z += speed;
  }
  if (eventer.left) {
    box.position.x -= speed;
  }
  if (eventer.right) {
    box.position.x += speed;
  }
  if (eventer.canJump) {
    box.position.y = height;
  } else {
    box.position.y = 0
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  document.getElementById('reset').onclick = () => { 
    box.position.set(getRandomNumber(-3,3),0,getRandomNumber(1,4) )
    helperColor = 0x00ff00;
  };
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
  eventer = null
  threeobj = null
})
</script>

<template>
  <Loading :loading="loading">
    <div id="canvas"></div>
    <div class="box-position">
      <p>盒子位置：x轴{{ boxposition[0] }},y轴{{ boxposition[1] }},z轴{{ boxposition[2] }}</p>
    </div>
    <div class="btn" id="reset">重置</div>
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

.box-position {
  position: absolute;
  left: 20px;
  bottom: 0;
  z-index: 1;
  color: white;
  font-size: 0.9rem;
}
.btn{
  position: absolute;
  left: 500px;
  bottom: 10px;
  z-index: 1;
  background: white;
  color: #000;
  padding: 5px 20px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.9rem;
}
</style>
