<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useThree } from '@/mixin/useThree.js';
import Loading from '@/components/Loading.vue';
let THREEObject = null, obstacle = null
const init = async ({ THREE, scene, }) => {
  THREEObject = THREE
  const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
  const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xaa0000 });
  obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
  console.log(obstacle)
  scene.add(obstacle);


  // applyQuaternion 选择物体 创建一个表示绕Y轴旋转90度的四元数
  const quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle(new THREE.Vector3(0, 1.1, 0), Math.PI / 2);
  // 应用四元数旋转到对象 等同于  obstacle.quaternion.multiply(quaternion);
  obstacle.applyQuaternion(quaternion);
}
const animation = ({ controls, scene, camera, renderer, stats }) => {
  stats?.update();
  controls?.update();
  renderer?.render(scene, camera);
}

const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#333333', // 背景色
  cameraPosition: [4, 1.6, -6], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: true, // 辅佐线
  light: true, // 灯光
  showStats: true,
  creatMesh: init,
  animation: animation // 动画回调
})

onMounted(() => {
  // 重置
  let resetBTN = document.getElementById('btn-reset')
  resetBTN.onclick = () => {
    obstacle.rotation.set(0, 0, 0)
    obstacle.scale.set(1, 1, 1)
    obstacle.position.set(0, 0, 0)
  }
  // 缩放
  let scaleBTN = document.getElementById('btn-scale')
  scaleBTN.onclick = () => {
    const translationMatrix = new THREEObject.Matrix4().makeScale(1.2, 2.5, 0.3);
    obstacle.applyMatrix4(translationMatrix);
  }
  // 旋转
  let rotateBTN = document.getElementById('btn-rotate')
  rotateBTN.onclick = () => {
    const angle = Math.PI / 4; // 45度
    const axis = new THREEObject.Vector3(0, 1, 0); // 绕Y轴旋转
    const translationMatrix = new THREEObject.Matrix4().makeRotationAxis(axis, angle);
    obstacle.applyMatrix4(translationMatrix);
  }
  //  平移
  let translateBTN = document.getElementById('btn-translate')
  translateBTN.onclick = () => {
    const translationMatrix = new THREEObject.Matrix4().makeTranslation(0, 2.5, 0);
    obstacle.applyMatrix4(translationMatrix);
  }
  // 组合
  let combineBTN = document.getElementById('btn-combo')
  combineBTN.onclick = () => {
    // 创建组合矩阵：缩放、旋转然后平移
    const scale = new THREEObject.Matrix4().makeScale(0.8, 1.5, 1.2);
    const rotation = new THREEObject.Matrix4().makeRotationX(Math.PI / 3);
    const translation = new THREEObject.Matrix4().makeTranslation(0, 3, 1);

    // 组合矩阵：缩放 -> 旋转 -> 平移
    const matrix = new THREEObject.Matrix4();
    matrix.multiply(translation);  // 最后应用平移
    matrix.multiply(rotation);      // 然后旋转
    matrix.multiply(scale);         // 先应用缩放

    obstacle.applyMatrix4(matrix);
  }
})
onUnmounted(() => {
  THREEObject = null
  obstacle = null
})
</script>

<template>
  <Loading :loading="loading">
    <div id="canvas"></div>
    <div class="btngroup">
      <button class="btn" id="btn-reset">重置场景</button>
      <button class="btn" id="btn-scale">应用缩放矩阵</button>
      <button class="btn" id="btn-rotate">应用旋转矩阵</button>
      <button class="btn" id="btn-translate">应用平移矩阵</button>
      <button class="btn" id="btn-combo">应用组合矩阵</button>
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

.btngroup {
  display: flex;
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 6;
}

.btn {
  cursor: pointer;
  font-size: 14px;
}
</style>
