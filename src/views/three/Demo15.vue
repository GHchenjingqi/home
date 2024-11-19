<script setup>
import { onUnmounted, ref, computed } from 'vue'
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';
import { creatTextList, creatBoxMesh } from '../../utils/creatMesh';

let textGroup = null;
const stop = ref(false);

const init = async ({ THREE, scene, controls, transControls, camera, renderer }) => {
  let list = "君不见黄河之水天上来奔流到海不复回君不见高堂明镜悲白发朝如青丝暮成雪人生得意须尽欢莫使金樽空对月天生我材必有用千金散尽还复来烹羊宰牛且为乐会须一饮三百杯岑夫子丹丘生将进酒杯莫停与君歌一曲请君为我倾耳听钟鼓馔玉不足贵但愿长醉不复醒古来圣贤皆寂寞唯有饮者留其名陈王昔时宴平乐斗酒十千恣欢谑主人何为言少钱径须沽取对君酌五花马千金裘呼儿将出换美酒与尔同销万古愁";
  textGroup = await creatTextList({
    font: '/public/fonts/KaiTi_Regular.json',
    text: list,
    fontSize: 1,
    depth: 0.1,
    color: 0xffffff,
    backColor: 0xff0000,
  });
  textGroup.position.set(0, 0, 0);
  scene.add(textGroup);
  camera.lookAt(textGroup.position);

  // 世界中心添加一个立方体
  const points = creatBoxMesh({ size: [1, 1, 1], color: 0x00ff00, position: [0, 0, 0], type: "basic" })
  scene.add(points);


  // 空格开灯
  document.addEventListener('keydown', onKeyDown);
}

// 空格暂停
const spaceHandeler = () => {
  stop.value = !stop.value;
}
const onKeyDown = function (event) {
  switch (event.code) {
    case 'Space':
      spaceHandeler()
      break;
  }
}


let isMovingToZ15 = true;
let isRotatingAroundY = false;
const animation = ({ THREE, scene, controls, transControls, camera, renderer, stats }) => {
  stats.update();
  controls.update();
  renderer.render(scene, camera);

  if (stop.value) {
    return;
  }
  //拉长相机焦距
  camera.position.z += 0.1;
  if (isMovingToZ15) {
    if (camera.position.z < 15) {
      camera.position.z += 0.1;
    } else {
      isMovingToZ15 = false;
      isRotatingAroundY = true;
    }
  }

  if (isRotatingAroundY) {
    if (scene.rotation.y < Math.PI * 2) {
      camera.position.z = 15
      // 确保相机位置在 Z 轴为 15 的位置
      scene.rotation.y += 0.01;
      scene.rotation.z += 0.01;
    } else {
      // 属性还原，动画重置
      isMovingToZ15 = true
      isRotatingAroundY = false
      camera.position.z = 5;
      scene.rotation.y = 0;
      scene.rotation.z = 0;
    }
  }
  // console.log(camera.position.z);
}

const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#111', // 背景色
  cameraPosition: [0, 0, 5], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: false, // 辅佐线
  light: true, // 灯光
  creatMesh: init,
  animation: animation
})


onUnmounted(() => {
  textGroup = null;
  stop.value = null;
  document.body.removeEventListener('keydown', onKeyDown);
})
</script>
<template>
  <Loading :loading="loading">
    <canvas id="canvas"></canvas>
    <div class="text-box">
      <p>按”空格“动画暂停/继续</p>
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
