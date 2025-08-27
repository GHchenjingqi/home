<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useThree } from '@/mixin/useThree.js';
import Loading from '@/components/Loading.vue';
import { getRandomNumber } from '@/utils/comfun.js';
import * as CANNON from 'cannon-es';

let box = null, compoundBody = null, world = null, group = null, boxBody = null, boxplace = null;
const boxposition = ref([0, 0, 0]), allTime = ref(0), starttime = ref(0);
// box3 只能做简单碰撞检测，返回布尔值，不能获取碰撞信息（比如什么方向发生碰撞）
const init = async ({ THREE, scene, camera }) => {
  let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
  floorGeometry.rotateX(- Math.PI / 2);
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x111111 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.y = -0.5;
  scene.add(floor);

  // 创建移动盒子
  let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  let boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(getRandomNumber(-3, 3), 0, getRandomNumber(1, 4))
  scene.add(box);

  // 盒子堆障碍物
  group = new THREE.Group();
  let box2 = new THREE.Mesh(boxGeometry, boxMaterial);
  box2.position.x = 1
  box2.material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    transparent: true,
    opacity: 0.8,    // 透明度 (0-1)
    transmission: 0.9, // 光线透射效果
    roughness: 0.3,  // 表面粗糙度
    metalness: 0.1,  // 金属感
    clearcoat: 0.5,  // 表面清漆效果
    clearcoatRoughness: 0.1,
    ior: 1.3,        // 折射率（果冻约1.3-1.5）
    thickness: 0.5,  // "厚度"感
    specularColor: new THREE.Color(0xffffff)
  })
  const innerBubbles = new THREE.Group();
  for (let i = 0; i < 50; i++) {
    const bubble = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    bubble.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      .normalize().multiplyScalar(Math.random() * 0.8);
    innerBubbles.add(bubble);
  }

  box2.add(innerBubbles);
  let box3 = box2.clone()
  box3.position.x = -1
  let box4 = box2.clone()
  box4.position.x = 0
  box4.position.z = -1
  boxplace = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
  boxplace.rotateX(- Math.PI / 2).translateZ(-0.49)
  group.add(box2, box3, box4,)

  scene.add(group, boxplace)
  // cannon世界
  world = new CANNON.World()
  world.gravity.set(0, 0, 0);
  world.quatNormalizeSkip = 0;
  world.quatNormalizeFast = false;
  world.broadphase = new CANNON.NaiveBroadphase();

  // 添加地面物理体
  const groundShape = new CANNON.Plane();
  const groundBody = new CANNON.Body({ mass: 0 });
  groundBody.addShape(groundShape);
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  groundBody.position.y = -0.5;
  world.addBody(groundBody);
  // 盒子钢体
  const shape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
  boxBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3().copy(box.position),
    angularFactor: new CANNON.Vec3(0, 0, 0), // 禁止旋转
    angularDamping: 0.8,
    linearDamping: 0.8, // 添加线性阻尼
    shape: shape
  });
  boxBody.velocity.set(0, 0, 0)
  boxBody.allowSleep = false;
  // 添加碰撞事件监听
  boxBody.addEventListener('collide', (e) => {
    if (e.body === compoundBody) {
      // console.log("碰撞发生!", e);
      // 碰撞响应示例：改变颜色
      box.material.color.setHex(0x00ff00);
      // 碰撞后反弹效果（可选）
      e.contact.restitution = 0.3; // 弹性系数
    }
  });
  world.addBody(boxBody);
  // 碰撞检测复合形状,mass 0 静止
  compoundBody = new CANNON.Body({ mass: 0 });
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // 获取mesh的几何体尺寸（假设都是BoxGeometry）
      const size = child.geometry.parameters;
      const halfExtents = new CANNON.Vec3(
        size.width / 2,
        size.height / 2,
        size.depth / 2
      );
      // 创建对应的物理形状
      const shape = new CANNON.Box(halfExtents);
      // 获取mesh相对于group的位置和旋转
      const position = new CANNON.Vec3().copy(child.position);
      const quaternion = new CANNON.Quaternion().copy(child.quaternion);
      // 添加到复合体
      compoundBody.addShape(shape, position, quaternion);
    }
  });
  world.addBody(compoundBody);

  // 第三视角相机初始化
  camera.position.set(box.position.x, box.position.y + 5, box.position.z + 10);
  camera.lookAt(group.position); // 相机看向盒子
}
let isSuccess = false
// 盒子移动动画
const boxMove = () => {
  world.step(1 / 60);
  box.position.copy(boxBody.position);
  box.quaternion.copy(boxBody.quaternion);
  movehandler();
  if (boxBody.position.z > 1) {
    box.material.color.setHex(0xff0000);
  }
  box.position.y = 0;        // 固定 Y 值,不然在无重力环境下回飞上天
  boxBody.position.y = 0;    // 同步物理体 Y 值
  boxBody.velocity.y = 0;    // 清除 Y 轴速度，防止漂浮
  boxposition.value = [box.position.x, box.position.y, box.position.z]

  // 完成任务
  if (isDistanceClose(box, boxplace, 0.5)) {
    isSuccess = true
    allTime.value = ((performance.now() - starttime.value) / 1000).toFixed(3)
    isStart.value = false
    document.querySelector('.grade-box').style.display = 'block'
  }
}

function isDistanceClose(obj1, obj2, maxDistance = 0.3) {
  return obj1.position.distanceTo(obj2.position) < maxDistance;
}
const cameraMove = (THREE, camera) => {
  // 更新相机位置，使相机跟随盒子
  const followDistance = 0.2; // 相机与盒子之间的距离
  const offsetY = 8;         // 相机的高度偏移
  const targetPosition = new THREE.Vector3().copy(box.position);
  targetPosition.y += offsetY;

  // 计算相机的新位置
  camera.position.lerp(targetPosition, 0.1); // 平滑过渡
  camera.position.z += followDistance;       // 设置相机与盒子的距离

  // 确保相机始终看向盒子
  camera.lookAt(group.position);
}
const animation = ({ THREE, controls, scene, camera, renderer, stats }) => {
  stats?.update();
  controls?.update();
  if (!isSuccess) {
    boxMove()
    cameraMove(THREE, camera)
  }
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
let speed = 1, height = 0.5;
let eventer = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  canJump: false
}

// 移动动画
const movehandler = () => {
  const velocity = boxBody.velocity;
  // 允许同时按下多个方向键
  if (eventer.forward) velocity.z = -speed;
  if (eventer.backward) velocity.z = speed;
  if (eventer.left) velocity.x = -speed;
  if (eventer.right) velocity.x = speed;

  // 跳跃控制保持不变
  if (eventer.canJump && Math.abs(velocity.y) < 0.01) {
    velocity.y = height;
    eventer.canJump = false;
  }
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
      eventer.canJump = false;
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

// 游戏是否开始
let isStart = ref(false);
const usetimes = () => {
  if (isStart.value) {
    return ((performance.now() - starttime.value) / 1000).toFixed(3)
  } else {
    return 0
  }
}

const play = () => {
  document.querySelector('.playbox').style.display = 'none';
  document.querySelector('.grade-box').style.display = 'none';
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  isStart.value = true
  isSuccess = false
  starttime.value = performance.now();
  const x = getRandomNumber(-3, 3);
  const z = getRandomNumber(1, 4);

  // 同时更新可视对象和物理体
  box.position.set(x, 0, z);
  boxBody.position.set(x, 0, z);

  // 重置物理速度
  boxBody.velocity.set(0, 0, 0);
  boxBody.angularVelocity.set(0, 0, 0);

  // 重置颜色
  box.material.color.setHex(0xff0000);
}
onMounted(() => {
  document.getElementById('reset').onclick = () => {
    play()
  };
  document.getElementById('reset2').onclick = () => {
    play()
  };
  document.getElementById('help').onclick = () => {
    document.querySelector('.playbox').style.display = 'block';
    isStart.value = false
  }

})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
  eventer = null
})
</script>

<template>
  <Loading :loading="loading">
    <div id="canvas"></div>
    <div class="box-position">
      <p>盒子位置：x轴{{ boxposition[0].toFixed(2) }},y轴{{ boxposition[1].toFixed(2) }},z轴{{ boxposition[2].toFixed(2) }}</p>
      <p>用时：{{ usetimes() }}s <span v-show="allTime">，成绩{{ allTime }}s</span></p>
    </div>
    <div class="playbox">
      <div class="help">
        <h3>玩法介绍</h3>
        <p>1.按键盘“WASD”或“↑←↓→”键移动红色盒子</p>
        <p>2.将红色盒子移动到绿色区域，挑战成功</p>
      </div>

      <div class="btn-group">
        <button class="btn-paly" id="reset">开始挑战</button>
      </div>
    </div>
    <div class="grade-box" style="display: none;">
      <div class="gald">
        <h3>恭喜完成任务</h3>
        <p>成绩：{{ allTime || 0 }}s</p>
      </div>
      <div class="btn-group">
        <button class="btn-paly" id="reset2">再玩一次</button>
      </div>
    </div>
    <div class="btn" id="help">帮助</div>
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

.playbox,
.grade-box {
  display: block;
  width: 320px;
  height: 400px;
  box-sizing: border-box;
  padding: 2rem;
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, 50%);
  z-index: 1;
  background: white;
  border-radius: 30px;
}

.playbox h3 {
  color: var(--mainColor);
}

.playbox p {
  font-size: 0.9rem;
}

.gald {
  margin-top: 2rem;
}

.btn-group {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 50px;
  text-align: center;
}

.btn-paly {
  padding: 5px 20px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.9rem;
}

.btn {
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
