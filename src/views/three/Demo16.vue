<script setup>
import { onUnmounted, ref, computed } from 'vue'
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';
import { creatLineDash, creatLine } from '../../utils/creatMesh';
import { useLabel, createLabel } from '../../mixin/useLabel.js'

const stop = ref(false);
let t = 0;
let curve = null,color
let curve6 = null
let lineGroup = null
let sphere  = null
let sphere1 = null
let labelRenderer = null
const init = async ({ THREE, scene, controls, transControls, camera, renderer }) => {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

  labelRenderer = await useLabel({labelBox:'map',canvasbox:'canvas'}) 
  const labelGroup = new THREE.Group()
  lineGroup = new THREE.Group()
  // 二维贝塞尔曲线
  curve = new THREE.CubicBezierCurve(
    new THREE.Vector2( -1, 0 ), // 起点
    new THREE.Vector2( -0, 5 ), // 控制点1
    new THREE.Vector2( 2, 3 ), // 控制点2
    new THREE.Vector2( 5, 0 ) // 终点
  );
  let line = await creatLine({ point: 50, lineMater: { color: 0xff0000 }, curve: curve })
  let lineName = createLabel("二维贝塞尔曲线",'#ff0000',{x:2,y:3,z:0})
  labelGroup.add(lineName)
  lineGroup.add(line)
  // 三维贝塞尔曲线
  const curve1 = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(3, 5, 0),
    new THREE.Vector3(6, 0, 0)
  )
  line = await creatLineDash({ point: 50, lineMater: { color: 0xffff00, dashSize: 0.5, gapSize:0.2, }, curve: curve1 })
  lineName = createLabel("三维贝塞尔曲线",'#ffff00',{x:6,y:0,z:0})
  labelGroup.add(lineName)

  lineGroup.add(line)
  // 二维二次贝塞尔曲线
  const curve2 = new THREE.QuadraticBezierCurve(
    new THREE.Vector2( -5, 0 ), // 起点
    new THREE.Vector2( 2, 5 ), // 控制点1
    new THREE.Vector2( 4, 0 ) // 终点
  )
  line = await creatLineDash({ point: 50, lineMater: { color: 0xff5511, dashSize: 0.5, gapSize:0.2, }, curve: curve2 })
  lineName = createLabel("二维二次贝塞尔曲线",'#ff5511',{x:4,y:0,z:0})
  labelGroup.add(lineName)
  lineGroup.add(line)
  // 三维二次贝塞尔曲线
  const curve3 = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3( -0, 0, 0 ),
    new THREE.Vector3( 2, 4, 0 ),
    new THREE.Vector3( 8, 0, 0 )
  );
  line = await creatLineDash({ point: 50, lineMater: { color: 0x00ffff, dashSize: 0.5, gapSize:0.2, }, curve: curve3 })
  lineName = createLabel("三维二次贝塞尔曲线",'#00ffff',{x:8,y:0,z:0})
  labelGroup.add(lineName)
  lineGroup.add(line)
  // 三维点集合平滑曲线
  const  curve4 = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( -2, 0, 5 ), // 经过点1
    new THREE.Vector3( -1, 3, 5 ), // 经过点2
    new THREE.Vector3( 0, 0, 0 ), // 经过点3
    new THREE.Vector3( 2, 5, 5 ), // 经过点4
    new THREE.Vector3( 13, 3, 4 ), // 经过点5
  ])
  line = await creatLineDash({ point: 50, lineMater: { color: 0x0000ff, dashSize: 0.5, gapSize:0.2, }, curve: curve4 })
  let lineName1 = createLabel("三维点集合平滑曲线",'#0000ff',{x:2,y:5,z:5})
  labelGroup.add(lineName1)
  lineGroup.add(line)
  // 二维点集合平滑曲线
  const  curve5 = new THREE.SplineCurve( [
    new THREE.Vector2( -6, 0 ), // 途径点
    new THREE.Vector2( -3, 5 ),// 途径点
    new THREE.Vector2( 0, 0 ),// 途径点
    new THREE.Vector2( 3, -2 ),// 途径点
    new THREE.Vector2( 6, 0 ) // 途径点
  ])
  line = await creatLineDash({ point: 50, lineMater: { color: 0x00a0ff, dashSize: 0.5, gapSize:0.2, }, curve: curve5 })
  lineName = createLabel("二维点集合平滑曲线",'#00a0ff',{x:-6,y:0,z:0})
  labelGroup.add(lineName)
  lineGroup.add(line)

  // 平滑曲线
  curve6 = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( 0,0.5,-10 ), // 经过点1
    new THREE.Vector3( 10,3,0), // 经过点2
    new THREE.Vector3( 0,0.5,10 ), // 经过点3
    new THREE.Vector3( -10,-3,0), // 经过点4
    new THREE.Vector3( 0,0.5,-10), // 经过点5
  ])
  line = await creatLineDash({ point: 50, lineMater: { color: 0xff0000, dashSize: 0.5, gapSize:0.2, }, curve: curve6 })
  lineGroup.add(line)
  lineName = createLabel("三维点平滑曲线",'#ff0000',{x:10,y:1,z:0})
  labelGroup.add(lineName)

  scene.add(lineGroup)
  scene.add(labelGroup)
  
  // 创建小球绿色
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  sphere = new THREE.Mesh(geometry, material);
  sphere.castShadow = true;
  scene.add(sphere);

  // 小球红色
  sphere1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xff0000 }));
  sphere1.castShadow = true;
  sphere1.position.set(0,0.5,-10)
  scene.add(sphere1);

  curve = curve1
  color = '#ffff00'
  // 空格暂停
  const spaceHandeler = () => {
    stop.value = !stop.value;
  }
  // 
  let arr= [curve1,curve3,curve4],clr =['#ffff00','#00ffff','#0000ff'], idx = 0
  const tabHandeler = () => {
    stop.value = true
    // 生成 1 - 5 随机数
    if (idx > 2) {
      idx = 0
    }
    curve = arr[idx]
    color = clr[idx]
    idx ++
    stop.value = false
  }
  const onKeyDown = function (event) {
    switch (event.code) {
      case 'Space':
        spaceHandeler()
        break;
      case 'Escape':
        tabHandeler()
        break;  
    }
  }
  // 空格开灯
  document.addEventListener('keydown', onKeyDown);
}

const animation = ({ THREE, scene, controls, transControls, camera, renderer, stats }) => {
  stats.update();
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render( scene, camera )
  if (stop.value) {
    return;
  }
  // 曲线运动动画
  if (t < 1) {
    const position = curve.getPointAt(t);
    sphere.position.copy(position);
    sphere.material.color = new THREE.Color(color)
    // 红球
    const position2 = curve6.getPointAt(t);
    sphere1.position.copy(position2);
    t += 0.01;
  }else{
    t = 0
  }
}

const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#111', // 背景色
  cameraPosition: [0, 2, 5], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: true, // 辅佐线
  light: true, // 灯光
  creatMesh: init,
  animation: animation
})


onUnmounted(() => {
  sphere = sphere1 = curve = curve6 = null
  t = 0
  stop.value = null
  labelRenderer = null
})
</script>
<template>
  <Loading :loading="loading">
    <canvas id="canvas"></canvas>
    <div id="map"></div>
    <div class="text-box">
      <p>小球只能在3维坐标运动</p>
      <p>按”空格“动画暂停/继续, 按“Esc”切换路径</p>
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

#map {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  pointer-events: none;
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
