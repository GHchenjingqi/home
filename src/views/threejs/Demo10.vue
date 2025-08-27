<script setup>
import { onUnmounted } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { creatBoxMesh, creatFlyLine, creatDashLine, creatCircleMesh, creatCircleSpread } from '../../utils/creatMesh.js'


let cameraControls = null
// 移动方向
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;


// 飞线
let index = 0; //取索引值的点的位置
let num = 20; //从曲线上获取的数量

let circleMesh = null, circleScale = 1;

let lineList = [], flyLines = [], bufferGeometries =[]

const init = ({ THREE, scene, camera, renderer }) => {
  // 创建一个原形平面
  let floor = creatCircleMesh({ r: 20, size: 20, color: 0x336699 })
  floor.position.y = -0.5;
  scene.add(floor);


  // 创建一个立方体
  const group = new THREE.Group();
  const boxlist = [
    { size: [0.5, 0.5, 0.5], position: [0, 0, 0], color: 0xff0000 },
    { size: [1, 1, 1], position: [6, 0, 0], color: 0x00ff00 },
    { size: [1, 1, 1], position: [-6, 0, 0], color: 0x00ffff },
    { size: [1, 1, 1], position: [0, 0, 6], color: 0xffff00 },
    { size: [1, 1, 1], position: [0, 0, -6], color: 0xff00ff }
  ]
  boxlist.forEach(item => {
    const box = creatBoxMesh(item)
    group.add(box)
  })
  scene.add(group);

  let flyLine1 = null, flyLine2 = null, flyLine3 = null, flyLine4 = null;
  let bufferGeometry1 = null, bufferGeometry2 = null, bufferGeometry3 = null, bufferGeometry4 = null;
  // 创建飞线
  lineList = [
    { lineArr: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 5, 0), new THREE.Vector3(6, 0, 0)], startColor: 0xff0000, endColor: 0x00ff00 },
    { lineArr: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-3, 5, 0), new THREE.Vector3(-6, 0, 0)], startColor: 0xff0000, endColor: 0x00ffff },
    { lineArr: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 5, 3), new THREE.Vector3(0, 0, 6)], startColor: 0xff0000, endColor: 0xffff11 },
    { lineArr: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 5, -3), new THREE.Vector3(0, 0, -6)], startColor: 0xff0000, endColor: 0xff00ff },
  ]
  // 创建飞线
  lineList.forEach((item, idx) => {
    let index = idx + 1
    const { line,  bufferGeometry } = creatFlyLine(item)
    scene.add(line);
    const dsline = creatDashLine({ lineArr: item.lineArr, color: item.endColor, dashSize: 0.5, gapSize: 0.2 })
    scene.add(dsline);
    // 保存飞线对象
    if (index == 1) {
      bufferGeometry1 = bufferGeometry
      flyLine1 = line; // 保存飞线对象
    }
    if (index == 2) {
      bufferGeometry2 = bufferGeometry
      flyLine2 = line; // 保存飞线对象
    }
    if (index == 3) {
      bufferGeometry3 = bufferGeometry
      flyLine3 = line; // 保存飞线对象
    }
    if (index == 4) {
      bufferGeometry4 = bufferGeometry
      flyLine4 = line; // 保存飞线对象
    }
  })
  flyLines = [flyLine1, flyLine2, flyLine3, flyLine4];
  bufferGeometries = [bufferGeometry1, bufferGeometry2, bufferGeometry3, bufferGeometry4];

  // 创建原点
  const pointCenter = creatCircleMesh({ r: 0.5, size: 20, color: 0xff0000, side: THREE.DoubleSide })
  pointCenter.position.set(0, -0.4, 0)
  scene.add(pointCenter);

  // 扩散圈
  circleMesh = new THREE.Group()
  const circleList = [
    { r: 2, circle: 12, color: '#ff0000', position: [0, -0.4, 0] },
    { r: 2, circle: 12, color: '#00ff00', position: [6, -0.4, 0] },
    { r: 2, circle: 12, color: '#00ffff', position: [-6, -0.4, 0] },
    { r: 2, circle: 12, color: '#ffff11', position: [0, -0.4, 6] },
    { r: 2, circle: 12, color: '#ff00ff', position: [0, -0.4, -6] },
  ]
  circleList.forEach((item) => {
    let circle = creatCircleSpread(item);
    circleMesh.add(circle);
  })
  scene.add(circleMesh);


  // 相机视角控制器
  cameraControls = new PointerLockControls(camera, renderer.domElement);
  scene.add(cameraControls.object);

  const blocker = document.getElementById('box');
  const clickHandle = function () {
    cameraControls.lock();
  }
  blocker.addEventListener('click', clickHandle);

  document.addEventListener('pointerlockchange', function () {
    if (document.pointerLockElement === canvas) {
      console.log('Pointer locked');
    } else {
      console.log('Pointer unlocked');
    }
  }, false);

  document.addEventListener('pointerlockerror', function () {
    console.error('Pointer lock failed');
  });
  cameraControls.addEventListener('lock', function () {
    blocker.style.display = 'none';
    blocker.removeEventListener('click', clickHandle)
  });

  cameraControls.addEventListener('unlock', function () {
    blocker.style.display = 'block';
    blocker.addEventListener('click', clickHandle);
  });

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}


const onKeyDown = function (event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveForward = true;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = true;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveBackward = true;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveRight = true;
      break;
  }
}

const onKeyUp = function (event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveForward = false;
      break;
    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = false;
      break;
    case 'ArrowDown':
    case 'KeyS':
      moveBackward = false;
      break;
    case 'ArrowRight':
    case 'KeyD':
      moveRight = false;
      break;
  }
}


// 回调动画
const animation = ({ THREE, scene, camera, renderer, stats, }) => {
  // 控制相机移动
  const speed = 0.1;
  if (cameraControls.isLocked) {
    const direction = new THREE.Vector3();
    // 前进
    if (moveForward) {
      direction.z += 1;
    }
    // 退后
    if (moveBackward) {
      direction.z -= 1;
    }
    if (moveLeft) {
      direction.x -= 1;
    }
    if (moveRight) {
      direction.x += 1;
    }

    cameraControls.moveForward(speed * direction.z);
    cameraControls.moveRight(speed * direction.x);
  }


  // 飞线运动
  // 飞线运动 - 修复部分
  if (index <= 99) {
    index += 1

    lineList.forEach((item, idx) => {
      const { bufferGeometry: newGeo } = creatFlyLine({...item, index, num})
      if (flyLines[idx]) {
        // 释放旧几何体
        bufferGeometries[idx]?.dispose();
        // 更新新几何体
        flyLines[idx].geometry = newGeo;
        // 更新引用
        bufferGeometries[idx] = newGeo;
      }
    });

  } else {
    index = 0;
  }

  // 扩散圈动画
  if (circleMesh?.children?.length > 0) {
    circleMesh.children.forEach((elmt) => {
      if (elmt.material.opacity <= 0) {
        elmt.material.opacity = 1;
        circleScale = 1;
      } else {
        //大小变大，透明度减小
        elmt.material.opacity += -0.01;
        circleScale += 0.003;
      }
      elmt.scale.x = circleScale;
      elmt.scale.y = circleScale;
    });
  }

  renderer.render(scene, camera);
  stats.update();
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#333333',
  cameraPosition: [0, 4, 10], // 摄像机位置
  control: false, // 关闭OrbitControls
  helper: false, // 辅佐线
  light: true, // 灯光
  creatMesh: init,  // 回调
  animation: animation // 动画回调
})


onUnmounted(() => {
  cameraControls = null
  lineList = [], flyLines = []
  if( bufferGeometries.length > 0){
    bufferGeometries.forEach(item => {
      item.dispose()
    })
  }
  bufferGeometries = null
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
})
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
    <canvas id="canvas"></canvas>
    <div id="box">
      <div class="box">
        <p><b>开始体验</b></p>
        <p>请按键盘： W/A/S/D，配合鼠标控制方向哦！</p>
        <p>ESC 退出</p>
      </div>
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

#box {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, .75);
  color: #fff;
  text-align: center;
  line-height: 20vh;
  font-size: 40px;
  left: 0;
  top: 0;
  z-index: 2;
}
</style>
