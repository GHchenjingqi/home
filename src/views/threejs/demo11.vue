<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';
import { creatCircleSpread, creatFlyLine, creatDashLine } from '../../utils/creatMesh.js'
// mapJson数据 需要自己准备 https://datav.aliyun.com/portal/school/atlas/area_selector
import { useMap } from '../../mixin/useMap'
import { useRay } from '../../mixin/useRay'


let map = null
// 初始化
let labelRender = null, circleGroup = null, circleScale = 1, lineGroup = null, dslineGroup = null, mmp = null;
let rayObject = null
let flyLines = [];
let index = 0; //取索引值的点的位置
let num = 20; //从曲线上获取的数量
const mapInOut = {
  "郑州市": "13000",
  "开封市": "10000",
  "洛阳市": "12000",
  "平顶山市": "9000",
  "安阳市": "8000",
  "鹤壁市": "7000",
  "新乡市": "6000",
  "焦作市": "5000",
  "濮阳市": "4000",
  "许昌市": "3000",
  "漯河市": "2000",
  "三门峡市": "1000",
  "南阳市": "900",
  "商丘市": "800",
  "信阳市": "700",
  "周口市": "600",
  "驻马店市": "500",
  "济源市": "400",
}
// 地图中心坐标 , , 8
const centerPoints = {
  "x": 78.14521484916168,
  "y": 2.6758705717486464,
  "z": 8
}

const canvasbox = computed(() => {
  return document.querySelector('#canvas').getBoundingClientRect()
})

const init = async ({ THREE, scene, renderer, camera, control }) => {
  let res = await fetch('https://ghchenjingqi.github.io/resources/json/henan.json')
  map = await res.json()
  if (!map) return
  mmp = new THREE.Group()
  const mapData = {
    mapJson: map, // 地图json数据
    mapLabel: "map", // 地图label
    canvasbox: "canvas",
    color: "#13407d", // 地区颜色
    pointColor: "#009fff",
  }
  // 异步加载地图
  let { mapMesh, labelRenderer } = await useMap(mapData)
  mapMesh.rotation.x = -Math.PI / 2
  mapMesh.position.set(-8, 0, -2)
  mapMesh.scale.set(0.1, 0.1, 0.1)
  mmp.add(mapMesh);
  scene.add(mmp);

  // 扩散圈
  await inoutHanel(mapMesh, scene, THREE)

  labelRender = labelRenderer
  // 鼠标交互
  mouseHoverHandler(THREE, camera, scene, renderer)
}

// 根据坐标中心计算位置,并创建飞线，显示扩散圈
const inoutHanel = async (mapMesh, scene, THREE) => {
  circleGroup = new THREE.Group()
  lineGroup = new THREE.Group()
  dslineGroup = new THREE.Group()
  let listline = []
  // 遍历地图子元素，创建扩散圈和飞线
  if (mapMesh.children && mapMesh.children.length > 0) {
    for (let index = 0; index < mapMesh.children.length; index++) {
      let positions = mapMesh.children[index].pointPosition;
      if (positions) {
        const [x, y, z] = positions;
        const circle = creatCircleSpread({ r: 3, circle: 12, color: '#009fff', position: [x, y, z + 1.1] });
        circle.name = 'pointCircle'
        circle.rotation.x = Math.PI * 2
        circleGroup.add(circle);

        //飞线
        if (centerPoints.x !== x && centerPoints.y !== y) {
          const lineobj = creatLineHandler([centerPoints.x, centerPoints.y, centerPoints.z], positions, THREE)
          listline.push(lineobj)
        }
      }
    }
  }
  circleGroup.position.set(-8, 0, -2)
  circleGroup.scale.set(0.1, 0.1, 0.1)
  circleGroup.rotation.x = -Math.PI / 2
  scene.add(circleGroup)

  // 创建飞线
  listline.forEach((item, index) => {
    const { line, bufferGeometry } = creatFlyLine(item)
    //加入场景
    lineGroup.add(line);

    // 创建虚线路径
    const dsline = creatDashLine({ lineArr: item.lineArr, color: item.endColor, dashSize: 0.5, gapSize: 0.2 })
    dslineGroup.add(dsline);

    flyLines.push({ bufferGeometry, line, obj: item })
  })
  lineGroup.position.set(-8, 0, -2)
  lineGroup.scale.set(0.1, 0.1, 0.1)
  lineGroup.rotation.x = -Math.PI / 2
  dslineGroup.position.set(-8, 0, -2)
  dslineGroup.scale.set(0.1, 0.1, 0.1)
  dslineGroup.rotation.x = -Math.PI / 2
  scene.add(lineGroup);
  scene.add(dslineGroup);
}

// 创建飞线空中坐标：坐标 => 中心点
//  { lineArr: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 5, 0), new THREE.Vector3(6, 0, 0)], startColor: 0xff0000, endColor: 0x00ff00 },
const creatLineHandler = (center, positions, THREE) => {
  const [x, y, z] = positions;
  const [cx, cy, cz] = center;
  const start = new THREE.Vector3(x, y, z);
  // 计算中间点
  const mindle = new THREE.Vector3((x + cx) / 2, (y + cy) / 2, 20);
  const end = new THREE.Vector3(cx, cy, cz);
  return { lineArr: [start, mindle, end], startColor: 0x00ff00, endColor: 0x009fff }
}

let onPointerMove = null
// 鼠标放上去 改变颜色 显示地区名字
const mouseHoverHandler = (camera, renderer) => {
  const tip = document.getElementById('tip')
  //鼠标放上去 改变颜色 显示地区名字
  let activeIntersects = []; //鼠标滑过数据

  onPointerMove = async (event) => {
    // 判断数组是否有数据，有数据全部设置为原始数据
    if (activeIntersects.length) {
      for (let i = 0; i < activeIntersects.length; i++) {
        activeIntersects[i].object.material.color.set(activeIntersects[i].object.material.oldcolor);
      }
    }
    activeIntersects = []
    // 获取鼠标选中元素
    rayObject = await useRay({ el: "#canvas", camera, group: mmp, event })
    if (rayObject?.object) {
      if (rayObject.object.type === 'Mesh') {
        if (!rayObject.object.material.hasOwnProperty('oldcolor')) {
          rayObject.object.material.oldcolor = JSON.parse(JSON.stringify(rayObject.object.material.color))
        }
        if (rayObject.object.name != 'point') {
          rayObject.object.material.color.set(0x009fff);
          activeIntersects.push(rayObject)
        }
        // 鼠标经过气泡
        tip.style.left = event.clientX - canvasbox.value.left + 'px'
        tip.style.top = event.clientY - canvasbox.value.top + 'px'
        showTip(tip, rayObject.object)
      }
    } else {
      tip.style.visibility = 'hidden'
    }

    // 鼠标移出时 隐藏
    if (activeIntersects.length === 0) {
      tip.style.visibility = 'hidden'
    }
  }
  if (onPointerMove) {
    renderer.domElement?.addEventListener('pointermove', onPointerMove);
  }
}

const showTip = (tip, object) => {
  if (object.parent && object.parent.properties) {
    tip.textContent = object.parent.properties + '：' + mapInOut[object.parent.properties];
    tip.style.visibility = 'visible'
  } else {
    tip.style.visibility = 'hidden'
  }
}

const animation = ({ scene, camera, renderer, controls, stats, THREE }) => {
  if (!map) return
  // 扩散圈动画
  if (circleGroup?.children?.length > 0) {
    circleGroup.children.forEach((elmt) => {
      if (elmt.material.opacity <= 0) {
        elmt.material.opacity = 1;
        circleScale = 1;
      } else {
        //大小变大，透明度减小
        elmt.material.opacity += -0.008;
        circleScale += 0.0003;
      }
      elmt.scale.x = circleScale;
      elmt.scale.y = circleScale;
    });
  }


  if (index <= 99) {
    index += 1

    flyLines.forEach(({ obj, line, bufferGeometry }, idx) => {
      const { bufferGeometry: newGeo } = creatFlyLine({ ...obj, index, num })
      if (flyLines[idx]) {
        // 释放旧几何体
        bufferGeometry?.dispose();
        // 更新新几何体
        line.geometry = newGeo;
        // 更新引用
        bufferGeometry = newGeo;
      }
    });

  } else {
    index = 0;
  }


  controls.update();

  renderer.render(scene, camera);
  stats.update();
  // label更新
  if (labelRender) labelRender.render(scene, camera);
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#02284c',
  cameraPosition: [0, 8, 5], // 摄像机位置
  controlAuto: false,  // 自动旋转
  helper: false, // 辅佐线
  light: true, // 灯光
  creatMesh: init,
  animation: animation
})

onUnmounted(() => {
  if (flyLines.length > 0) {
    flyLines.forEach(item => {
      item.bufferGeometry.dispose?.()
      item.bufferGeometry = null
    })
  }
  if (labelRender) {
    labelRender.dispose?.()
    labelRender = null
  }
  flyLines = null
  circleGroup = null, circleScale = 1, lineGroup = null, dslineGroup = null, mmp = null;
})
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
    <div id="canvas"></div>
    <div id="map"></div>
    <div id="tip"></div>
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

#tip {
  background: #fff;
  color: #111;
  padding: 0.5vw 1vw;
  border-radius: 0.2vw;
  position: absolute;
  z-index: 2;
  visibility: hidden;
}
</style>
