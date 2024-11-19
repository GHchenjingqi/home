<script setup>
import { onUnmounted } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import { creatLightMesh,findMesh } from '../../utils/creatMesh.js'
import { Water } from 'three/addons/objects/Water.js';

let water = null, boat = null;
const meshfn = ({ THREE, scene, renderer}) => {
  // 真实渲染
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;

  scene.background = new THREE.Color( 0xdef6ff );

  // 水
  const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
  water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load( '/public/images/waternormals.jpg', function ( texture ) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      } ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );
  water.rotation.x = - Math.PI / 2;
  scene.add( water );

  // 灯光
  let light = creatLightMesh({type: 'point', color: 0xffffff, intensity: 600, position: [2, 4, -3],})
  scene.add(light)

  boat = findMesh(scene.children,'boat')
  boat.position.y = 0.5
  boat.position.z = 12
  boat.rotation.y = Math.PI

  let lighthouse = findMesh(scene.children,'lighthouse')
  lighthouse.scale.set(50,50,60)
  lighthouse.position.set(-28,9,-200)
  lighthouse.rotation.y = Math.PI / 2

}


// 回调动画
const animation = ({ scene, camera, renderer, controls, stats,  }) => {
  // 波浪
  const time = performance.now() * 0.001;
  if (water) {
	  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  }
  if(boat){
    //小船晃动
    boat.position.x = Math.sin(time) * 2
  }

  controls.update();
  renderer.render(scene, camera);
  stats.update();
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#333333',
  modelPath:  ['/public/glbs/boat.glb','/public/glbs/lighthouse.glb'], // 模型
  modelName: ['boat','lighthouse'], // 模型名称
  modelScale:[10,10,10], // 模型缩放
  cameraPosition: [0, 4, 10], // 摄像机位置
  controlAuto: false,  // 自动旋转
  helper: false, // 辅佐线
  light: false, // 灯光
  creatMesh: meshfn,  // 回调
  animation: animation // 动画回调
})


onUnmounted(() => {
  water = null
  boat = null
})
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
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

.msgbox {
  width: 100%;
  height: 10vh;
  line-height: 10vh;
  font-size: 20px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>
