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
let bufferGeometry1, points1, bufferGeometry2, points2, bufferGeometry3, points3, bufferGeometry4, points4;

let circleMesh = null, circleScale = 1;

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


  // 创建飞线
  const lineList = [
    { lineArr: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 5, 0), new THREE.Vector3(6, 0, 0)], startColor: 0xff0000, endColor: 0x00ff00 },
    { lineArr: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-3, 5, 0), new THREE.Vector3(-6, 0, 0)], startColor: 0xff0000, endColor: 0x00ffff },
    { lineArr: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 5, 3), new THREE.Vector3(0, 0, 6)], startColor: 0xff0000, endColor: 0xffff11 },
    { lineArr: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 5, -3), new THREE.Vector3(0, 0, -6)], startColor: 0xff0000, endColor: 0xff00ff },
  ]
  // 创建飞线
  lineList.forEach((item, idx) => {
    let index = idx + 1
    const { line, points, bufferGeometry } = creatFlyLine(item)
    //加入场景
    scene.add(line);

    // 创建虚线路径
    const dsline = creatDashLine({ lineArr: item.lineArr, color: item.endColor, dashSize: 0.5, gapSize: 0.2 })
    scene.add(dsline);

    if (index == 1) {
      bufferGeometry1 = bufferGeometry
      points1 = points
    }
    if (index == 2) {
      bufferGeometry2 = bufferGeometry
      points2 = points
    }
    if (index == 3) {
      bufferGeometry3 = bufferGeometry
      points3 = points
    }
    if (index == 4) {
      bufferGeometry4 = bufferGeometry
      points4 = points
    }
  })

  // 创建原点
  const pointCenter = creatCircleMesh({ r: 0.5, size: 20, color: 0xff0000, side: THREE.DoubleSide })
  pointCenter.position.set(0, -0.4, 0)
  scene.add(pointCenter);

  // 扩散圈
  circleMesh = new THREE.Group()
  const circleList =[
    { r: 2, circle: 12 ,color: '#ff0000', position:[0, -0.4, 0] },
    { r: 2, circle: 12 ,color: '#00ff00', position:[6, -0.4, 0] },
    { r: 2, circle: 12 ,color: '#00ffff', position:[-6, -0.4, 0] },
    { r: 2, circle: 12 ,color: '#ffff11', position:[0, -0.4, 6] },
    { r: 2, circle: 12 ,color: '#ff00ff', position:[0, -0.4, -6] },
  ]
  circleList.forEach((item) => {
    let circle = creatCircleSpread(item);
    circleMesh.add(circle);
  })
  scene.add(circleMesh);


  // 相机视角控制器 
  cameraControls = new PointerLockControls(camera, renderer.domElement);
  scene.add(cameraControls.getObject());

  const blocker = document.getElementById('box');

  blocker.addEventListener('click', function () {
    cameraControls.lock();
  });

  cameraControls.addEventListener('lock', function () {
    blocker.style.display = 'none';
  });

  cameraControls.addEventListener('unlock', function () {
    blocker.style.display = 'block';
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
const animation = ({ THREE, scene, camera, renderer, controls, stats, }) => {
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
  if (index <= 99) {
    index += 1
    bufferGeometry1.setFromPoints(new THREE.CatmullRomCurve3(points1.slice(index, index + num)).getSpacedPoints(100));
    bufferGeometry2.setFromPoints(new THREE.CatmullRomCurve3(points2.slice(index, index + num)).getSpacedPoints(100));
    bufferGeometry3.setFromPoints(new THREE.CatmullRomCurve3(points3.slice(index, index + num)).getSpacedPoints(100));
    bufferGeometry4.setFromPoints(new THREE.CatmullRomCurve3(points4.slice(index, index + num)).getSpacedPoints(100));
  } else {
    index = 0
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


  controls.update();
  renderer.render(scene, camera);
  stats.update();
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#333333',
  cameraPosition: [0, 4, 10], // 摄像机位置
  controlAuto: true,  // 自动旋转
  helper: false, // 辅佐线
  light: true, // 灯光
  creatMesh: init,  // 回调
  animation: animation // 动画回调
})


onUnmounted(() => {
  cameraControls = null
  bufferGeometry1 = points1 = bufferGeometry2 = points2 = bufferGeometry3 = points3 = bufferGeometry4 = points4 = null
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
        <p>请按键盘： W/A/S/D</p>
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
