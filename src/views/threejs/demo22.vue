<script setup>
import { onBeforeUnmount } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import { useRay } from '../../mixin/useRay'
// 选中插件
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
// 动画效果
import * as TWEEN from '@tweenjs/tween.js'

let rayObject = null, composer = null,tween = null
const init = async ({ THREE, scene, controls, canvas, camera, renderer }) => {
  // 后期处理
  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  // 轮廓
  const outlinePass = new OutlinePass(new THREE.Vector2(canvas.clientWidth, canvas.clientHeight), scene, camera);
  // 自定义轮廓光效果
  // outlinePass.selectedObjects = [cube]; // 指定哪些对象需要添加轮廓
  outlinePass.visibleEdgeColor.set(0xff0000); // 设置轮廓颜色
  // outlinePass.hiddenEdgeColor.set(0xff0000); // 设置隐藏边缘颜色
  outlinePass.edgeThickness = 5; // 设置轮廓厚度
  outlinePass.edgeGlow = 2; // 设置轮廓发光强度
  outlinePass.usePatternTexture = true; // 使用图案纹理（可选）
  composer.addPass(outlinePass);
  // 色彩校正
  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  // 盒子模型
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  // 长方体（参数：长宽高）
  const boxGeometry1 = new THREE.BoxGeometry(1, 5, 1);
  // 球体（参数：大小）
  const sphereGeometry = new THREE.SphereGeometry(1);
  // 圆柱体（参数：上大小，下大小，高度）
  const cylinderGeometry = new THREE.CylinderGeometry(1, 2, 5);
  // 圆锥体（参数：大小，高度，棱边数）
  const coneGeometry = new THREE.ConeGeometry(1, 3, 3);
  // 胶囊体（参数：半径大小，高度，圆角，棱边数）
  const capsule = new THREE.CapsuleGeometry(1, 1, 4, 8);
  // 平面体（参数：宽、高, 宽细分，高细分）
  const plane = new THREE.PlaneGeometry(2, 6);

  // 添加到场景
  const box = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xff0000 }));
  const box1 = new THREE.Mesh(boxGeometry1, new THREE.MeshPhongMaterial({ color: 0xffff00 }));
  box1.position.x = 3
  const geo = new THREE.Mesh(sphereGeometry, new THREE.MeshPhongMaterial({ color: 0xff00ff }));
  geo.position.x = -3
  const cyl = new THREE.Mesh(cylinderGeometry, new THREE.MeshPhongMaterial({ color: 0x0000ff }));
  cyl.position.z = -3
  const cone = new THREE.Mesh(coneGeometry, new THREE.MeshPhongMaterial({ color: 0x00ff00 }));
  cone.position.z = 3
  const cap = new THREE.Mesh(capsule, new THREE.MeshPhongMaterial({ color: 0x0ff0ff }));
  cap.position.z = -6
  cap.position.x = 4
  const planes = new THREE.Mesh(plane, new THREE.MeshPhongMaterial({ color: 0xf00f0f }));
  planes.position.z = -6
  planes.position.x = -4
  const group = new THREE.Group()
  group.add(box)
  group.add(box1)
  group.add(geo)
  group.add(cyl)
  group.add(cone)
  group.add(cap)
  group.add(planes)
  scene.add(group)

  // 相机朝向元素动画
  const lookAtWithTransition = (camera, targetPosition, duration) => {
    const initialPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    const targetPositionObj = { x: targetPosition.x, y: targetPosition.y, z: targetPosition.z };

    // 创建Tween动画,会改变相机的位置到目标位置
    tween = new TWEEN.Tween(camera.position)
      .to(targetPositionObj, duration*1000) // 在2000毫秒内过渡到新目标点
      .onUpdate(function () {
        // 每帧更新相机的朝向
        camera.lookAt(targetPosition);
      }).onComplete(function () {
        // 动画完成后的回调
        console.log('Camera animation complete');
        let timer = setTimeout(()=>{
          camera.position.set(0, 3, 8);
          camera.lookAt(targetPosition);
          clearTimeout(timer)
        },10)

      }).easing(TWEEN.Easing.Quadratic.Out); // 使用缓动函数使动画更平滑

    // 启动动画
    tween.start();
  }


  // 交互效果
  let activeIntersects = []; //鼠标点击数据
  const onPointerMove = async (event) => {
    // 判断数组是否有数据，有数据全部设置为原始数据
    if (activeIntersects.length) {
      for (let i = 0; i < activeIntersects.length; i++) {
        activeIntersects[i].object.material.color.set(activeIntersects[i].object.material.oldcolor);
        // activeIntersects[i].object.visible = true
      }
      // 取消所有选中的盒子边框效果
      outlinePass.selectedObjects = []
    }
    activeIntersects = []
    // 获取鼠标选中元素
    rayObject = await useRay({ el: "#canvas", camera, group, event })
    if (rayObject?.object) {
      if (rayObject.object.type === 'Mesh') {
        rayObject.object.material.oldcolor = JSON.parse(JSON.stringify(rayObject.object.material.color))
        rayObject.object.material.color = new THREE.Color(0.5, 0.5, 0.5)
        // rayObject.object.visible = false
        outlinePass.selectedObjects = [rayObject.object]
        // 获取相机和物体中间的位置
        const middle = new THREE.Vector3().copy(rayObject.object.position).add(camera.position).multiplyScalar(0.5)
        // 相机看向选中物体
        lookAtWithTransition(camera, middle, 2.0)
        activeIntersects.push(rayObject)
      }
    }
  }
  renderer.domElement.addEventListener('click', onPointerMove);
}


const animation = ({ THREE, scene, camera, renderer, stats, controls }) => {
  stats.update();
  renderer.render(scene, camera);
  if (tween) {
    tween.update();
  }
  if (controls) {
    controls.update();
  }
  composer.render();
}

const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#333', // 背景色
  cameraPosition: [0, 3, 8], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: true, // 是否开启自动旋转
  helper: true, // 辅佐线
  light: true, // 灯光
  creatMesh: init,
  animation: animation
})

onBeforeUnmount(() => {
  // 清理资源
  if (composer) {
    composer.dispose();
  }
});
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
