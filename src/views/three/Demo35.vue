<script setup>
import { computed } from 'vue'
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';
import { creatCircleSpread, creatFlyLine, creatDashLine } from '../../utils/creatMesh.js'
import { useMap } from '../../mixin/useMap'
import { useRay } from '../../mixin/useRay'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

const init = async ({ THREE, scene, renderer, camera, control }) => {
  const loader = new SVGLoader();
  const scaleFactor = 0.01;
  // 3d 模型
  const created3d = (data) => {
    const svgGroup = new THREE.Group();
    const material = new THREE.MeshPhongMaterial({
      color: 0x00aaff,
      side: THREE.DoubleSide,
      flatShading: true
    });

    // 缩放系数（SVG坐标转Three.js坐标）
    svgGroup.scale.set(scaleFactor, scaleFactor, scaleFactor);
    svgGroup.position.set(0, 0, 0);

    data.paths.forEach((path) => {
      const shapes = path.toShapes(true);
      shapes.forEach((shape) => {
        // 4. 挤出3D形状
        const extrudeSettings = {
          depth: 50,          // 厚度（单位：Three.js单位）
          bevelEnabled: true, // 启用边缘倒角
          bevelThickness: 2,  // 倒角厚度
          bevelSize: 1,       // 倒角尺寸
          bevelSegments: 3    // 倒角分段数
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const mesh = new THREE.Mesh(geometry, material);

        svgGroup.add(mesh);
      });

    });

    // 计算中心点并居中（关键步骤）
    const box = new THREE.Box3().setFromObject(svgGroup);
    const center = box.getCenter(new THREE.Vector3());
    svgGroup.position.x = -center.x;
    svgGroup.position.y = -center.y;

    scene.add(svgGroup);
  }
  // 创建2D平面 
  const created2d = (data) => {
    const paths = data.paths;
    const group = new THREE.Group();

    group.scale.set(scaleFactor, scaleFactor, scaleFactor);
    group.position.set(0, 0, 1);

    for (let i = 0; i < paths.length; i++) {

      const path = paths[i];

      const material = new THREE.MeshBasicMaterial({
        color: path.color,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const shapes = SVGLoader.createShapes(path);

      for (let j = 0; j < shapes.length; j++) {

        const shape = shapes[j];
        const geometry = new THREE.ShapeGeometry(shape);
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);

      }

    }

    // 移动到世界中心
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.x = -center.x;
    group.position.y = -center.y;

    scene.add(group);
  }

  // 创建svg描边
  const created1d = (data) => {
    const paths = data.paths;
    const group = new THREE.Group();
    group.scale.set(scaleFactor, scaleFactor, scaleFactor);
    group.position.set(0, 0, 1.5);
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      // 使用线条材质替代网格材质
      const material = new THREE.LineBasicMaterial({
        // color: path.color, // 保持原SVG的颜色
        color: 0xff00ff,
        linewidth: 1,      // 可以调整线条宽度
      });
      const shapes = SVGLoader.createShapes(path);
      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        // 创建形状的几何体
        const geometry = new THREE.ShapeGeometry(shape);
        // 提取几何体的边缘
        const edges = new THREE.EdgesGeometry(geometry);
        // 使用线段渲染器显示边缘（描边）
        const line = new THREE.LineSegments(edges, material);
        group.add(line);
      }
    }
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.x = -center.x;
    group.position.y = -center.y;
    scene.add(group);
  }
  loader.load(
    // SVG文件路径或URL（示例使用内联SVG）
    import.meta.env.VITE_BASE_URL + '/public/svg/xuchang.svg',
    function (data) {
      created3d(data)
      created2d(data)
      created1d(data)
    },
    undefined,
    function (error) {
      console.error('SVG加载失败:', error);
    }
  );

}

const animation = ({ scene, camera, renderer, controls, stats, THREE }) => {


  controls.update();
  renderer.render(scene, camera);
  stats.update();
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#02284c',
  cameraPosition: [0, 0, 6], // 摄像机位置
  controlAuto: false,  // 自动旋转
  helper: false, // 辅佐线
  light: true, // 灯光
  creatMesh: init,
  animation: animation
})
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
    <div id="canvas"></div>
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
