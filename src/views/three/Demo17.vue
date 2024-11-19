<script setup>
import { onUnmounted, ref, computed } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import { useRay } from '../../mixin/useRay'

let meshGroup = null, clickListener = null, curve = null
let rayObject = null, cube = null,cube1 = null
const init = async ({ THREE, scene, controls, transControls, camera, renderer }) => {
  // 开启深度
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  meshGroup = new THREE.Group()
  let balls = new THREE.Group()
  let balls1 = new THREE.Group()
  // 创建小球
  const geometry2 = new THREE.SphereGeometry(0.2, 36, 18);
  cube = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ color: 0xff61ff }));
  cube.position.set(-15, 0, 0)
  balls.add(cube)
  balls.position.y = 0.2
  balls.position.z = 0.4
  scene.add(balls)

  cube1 = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ color: 0x0061ff }));
  cube1.position.set(-15, 0, 0)
  balls1.add(cube1)
  balls1.position.y = 0.2
  balls1.position.z = -0.4
  scene.add(balls1)

  // 平滑曲线
  curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-15, 0, 0), // 经过点3
    new THREE.Vector3(-5, 1, 0), // 经过点3
    new THREE.Vector3(0, 0, 0), // 经过点3
    new THREE.Vector3(0.5, 0.5, 0), // 经过点3
    new THREE.Vector3(1, 0.5, 0), // 经过点3
    new THREE.Vector3(2, 1, 0), // 经过点3
    new THREE.Vector3(3, 1.5, 0), // 经过点3
    new THREE.Vector3(5, 0, 0), // 经过点3
    new THREE.Vector3(6, 1, 0), // 经过点3
    new THREE.Vector3(10, 2, 0), // 经过点3
    new THREE.Vector3(15, 2, 5), // 经过点3
    new THREE.Vector3(8, 2, 5), // 经过点3
    new THREE.Vector3(4, 1, 6), // 经过点3
    new THREE.Vector3(0, 0, 5), // 经过点3
  ])
  /* 管道几何体-创建曲面:radialSegments=2 ，closed = false
    TubeGeometry(
          path 路径，
          tubularSegments管道的分段数-默认值为64   决定管道多弯曲程度，分段越多可弯曲程度越大，拐角越平滑
          radius 管道的半径-默认值为1 ，决定面的宽度
          radialSegments 横截面的分段数目-默认值为8，越多管道越圆，最少是2个分段形成一个面
          closed  两端是否闭合-默认值为false
    ) 
  */
  // 面1
  const tubeGeometry = new THREE.TubeGeometry(curve, 120, 0.8, 2, false);
  const material = new THREE.MeshBasicMaterial({ color: 0x565656 });
  const tubeMesh = new THREE.Mesh(tubeGeometry, material);
  meshGroup.add(tubeMesh)
  scene.add(meshGroup);


  // 面2
  const tubeGeometry2 = new THREE.TubeGeometry(curve, 120, 0.2, 2, false);
  // 自定义材质
  const customMaterial = new THREE.ShaderMaterial({
    uniforms: {
      diffuse: { value: new THREE.Color(0xffff66) },
      dashLength: { value: 0.6 },
      gapLength: { value: 2.15 }
    },
    vertexShader: `
           varying vec2 vUv;
           void main() {
               vUv = uv;
               gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
           }
       `,
    fragmentShader: `
           varying vec2 vUv;
           uniform vec3 diffuse;
           uniform float dashLength;
           uniform float gapLength;
           void main() {
               float distance = mod(vUv.x * dashLength + vUv.y * gapLength, dashLength + gapLength);
               if (distance < dashLength) {
                   gl_FragColor = vec4(diffuse, 1.0);
               } else {
                   discard;
               }
           }
       `,
  });
  const tubeMesh2 = new THREE.Mesh(tubeGeometry2, customMaterial);
  tubeMesh2.position.y = 0.01
  tubeMesh2.position.z = -0.12
  scene.add(tubeMesh2);

  // 使用射线获取元素
  clickListener = document.body.addEventListener('click', async (event) => {
    rayObject = await useRay({ el: "#canvas", camera, group: meshGroup, event, })
    if (rayObject?.object) {
      const { x, y, z } = rayObject.point
      cube1.position.set(x, y, z)
    }
  })
}

let t = 0
const animation = ({ scene, camera, renderer, stats }) => {
  stats.update();
  renderer.render(scene, camera);
  // 曲线运动动画
  if (t < 1) {
    const position = curve.getPointAt(t);
    cube.position.copy(position);

    // 相机运动
    let camerPoint = JSON.parse(JSON.stringify(cube.position))
    if (camerPoint.x > 5) {
      // 说明要反向运动了
      camera.position.set(camerPoint.x+6,camerPoint.y+2,camerPoint.z-2)
    }else{
      camera.position.set(camerPoint.x-8,camerPoint.y+2,camerPoint.z+2)
    }
    camera.lookAt(cube.position)

    t += 0.001;
  } else {
    t = 0
  }
}

const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#111', // 背景色
  cameraPosition: [-19, 2, 0], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: true, // 辅佐线
  light: true, // 灯光
  creatMesh: init,
  animation: animation
})



onUnmounted(() => {
  clickListener = meshGroup = null
  rayObject = null
  if (clickListener) {
    document.body.removeEventListener('click', clickListener)
  }
})
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
