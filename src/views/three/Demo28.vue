<script setup>
import { onUnmounted } from 'vue';
import { useThree } from '@/mixin/useThree.js';
import Loading from '@/components/Loading.vue';
import * as THREE from 'three'
import { useKey } from '@/mixin/useKey.js';
import { KEYCODE } from '@/utils/keyCodes.js'
import CameraControls from "camera-controls";

/*
* cameraControls 用法
* cameraControls.dolly( distance, enableTransition )  推拉 in/out 摄像机位置。
* cameraControls.dollyTo( distance, enableTransition )  将摄像机位置推拉入/推出到给定距离。
* cameraControls.dollyInFixed( distance, enableTransition )  推拉，但不改变目标和摄像机之间的距离
* cameraControls.zoom( zoomStep, enableTransition ) 放大/缩小相机。该值将添加到相机缩放,zoom缩放比例。 cameraControls.zoom(   camera.zoom / 2, true )
* cameraControls.zoomTo( zoom, enableTransition ) 将摄像机放大/缩小到给定的比例。该值将覆盖相机缩放。zoom缩放比例
* cameraControls.truck( x, y, enableTransition ) 使用当前方位角的卡车和基座相机。 x水平平移量 y垂直平移量
* cameraControls.forward( distance, enableTransition )  向前/向后移动。
* cameraControls.moveTo( x, y, z, enableTransition ) 将位置移动到给定点。
* cameraControls.elevate( height, enableTransition ) 向上/向下移动。
* cameraControls.setLookAt( positionX, positionY, positionZ, targetX, targetY, targetZ, enableTransition ) 从指定位置看目标位置
* cameraControls.setPosition( positionX, positionY, positionZ, enableTransition )  按给定位置设置角度和距离
* cameraControls.saveState() 将当前摄像机位置设置为默认位置
* cameraControls.reset( enableTransition ) 将摄像机位置重置为默认位置
* cameraControls.update( delta )  更新摄像机位置和方向
* */

let Camera = null, cameraControls = null, mesh = null, clearKeysHandle = null;
const init = async ({ scene, camera, renderer, THREE ,stats })=>{
  CameraControls.install({THREE: THREE});
  const { keyEvent,clearKeys } = await useKey();
  clearKeysHandle = clearKeys;
  Camera = camera
  camera.position.set(0, 8, 5)
  // 添加一个立方体到场景中
  mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true})
  );
  scene.add(mesh);

  // 初始化 CameraControls
  cameraControls = new CameraControls(camera, renderer.domElement);
  // cameraControls.verticalDragToForward = false
  // cameraControls.dollyToCursor = false
  // cameraControls.dollyDragInverted = false
  // 关键
  cameraControls.enableTransition = true;
  cameraControls.transitionTime = 1; // 单位是秒
  cameraControls.update(); // 更新控制状态

  const wKey = keyEvent(KEYCODE.W, 16.666);
  const aKey = keyEvent(KEYCODE.A, 16.666);
  const sKey = keyEvent(KEYCODE.S, 16.666);
  const dKey = keyEvent(KEYCODE.D, 16.666);

  aKey.addEventListener('holding', function(event) {
    cameraControls.truck(-0.01, 0, false);
  });

  dKey.addEventListener('holding', function(event) {
    cameraControls.truck(0.01, 0, false);
  });

  wKey.addEventListener('holding', function(event) {
    cameraControls.forward(0.01, false);
  });

  sKey.addEventListener('holding', function(event) {
    cameraControls.forward(-0.01, false);
  });

}

const animation=({ renderer,scene,clock,camera,stats, })=>{
  const delta = clock.getDelta();
  const updated = cameraControls.update(delta);
  stats?.update();
  // 自动旋转
  // cameraControls.azimuthAngle += 2 * delta * THREE.MathUtils.DEG2RAD;
  if (updated) {
    renderer.render(scene, camera);
  }
}

const zoom = (val) => {
  if (val == 1) {
    cameraControls.zoom(Camera.zoom / 2, true);
  } else {
    cameraControls.zoom(-Camera.zoom / 2, true);
  }
}
const fitToBox = () => {
  cameraControls.fitToBox(mesh, true)
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#111111',
  control: false,  // 关闭控制器，使用cameraControls
  helper: true, // 辅佐线
  light: true, // 灯光
  creatMesh: init,  // 回调
  animation: animation // 动画回调
})

onUnmounted(() => {
  clearKeysHandle()
  if(cameraControls){
    cameraControls.dispose()
  }
  Camera = null
  cameraControls = null
  mesh = null
  clearKeysHandle = null
})
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
    <canvas id="canvas"></canvas>
    <div class="btns">
      <button @click="cameraControls.rotate( 45 * THREE.MathUtils.DEG2RAD, 0, true )">x轴 rotate theta 45deg</button>
      <button @click="cameraControls.rotate( 0, 20 * THREE.MathUtils.DEG2RAD, true )">Y轴 rotate phi 20deg</button>
      <button @click="cameraControls.truck(   1,   0, true)">x,y平移( 1, 0 )</button>
      <button @click="cameraControls.truck(   1,   -1, true)">x,y平移( 1, -1 )</button>
      <button @click="cameraControls.dolly(   1, true )">推近相机1</button>
      <button @click="cameraControls.dolly( - 1, true )">拉远相机-1</button>
      <button @click="zoom(1)">放大相机</button>
      <button @click="zoom(2)">缩小相机</button>
      <button @click="cameraControls.moveTo( 3, 5, 2, true )">移动到( 3, 5, 2 )</button>
      <br>
      <button @click="fitToBox">屏幕适应mesh边界</button>
      <button @click="cameraControls.setPosition( - 5, 2, 1, true )">移动到 ( -5, 2, 1 )</button>
      <button @click="cameraControls.setTarget( 0, 0, 0, true )">看向 ( 0, 0, 0 )</button>
      <button @click="cameraControls.setLookAt( 1, 2, 3, 1, 1, 0, true )">移动到 ( 1, 2, 3 ), 看向 ( 1, 1, 0 )</button>
      <br>
      <button @click="cameraControls.reset( true )">重置</button>
      <button @click="cameraControls.saveState()">状态存储</button>
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

.btns {
  padding-left: 8rem;
  z-index: 6;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}
</style>
