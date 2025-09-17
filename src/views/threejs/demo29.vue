<script setup>
import { onUnmounted } from 'vue';
import { useThree } from '@/mixin/useThree.js';
import Loading from '../../components/Loading.vue';
// 合并几何体
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const vShader = `
        varying vec2 vUv;
        void main()
        {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
      `;
const fShader = `
        uniform sampler2D map;
        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;
        varying vec2 vUv;
        void main()
        {
          float depth = gl_FragCoord.z / gl_FragCoord.w;
          float fogFactor = smoothstep( fogNear, fogFar, depth );
          gl_FragColor = texture2D(map, vUv );
          gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );
          gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );
        }
      `;

const StartTime = Date.now();
let cameraPositionZ = 0;
const init = ({ THREE, scene, camera, }) => {
  const CloudCount = 5000;
  // 每个云所占z轴的长度
  const perCloudZ = 15;
  // 所有的云一共的Z轴长度
  cameraPositionZ = CloudCount * perCloudZ;
  // X轴和Y轴平移的随机参数
  const RandomPositionX = 80;
  const RandomPositionY = 120;

  // 相机的位置，平移下左右平衡
  camera.position.x = Math.floor(RandomPositionX / 2);
  // 最初在最远处
  camera.position.z = cameraPositionZ;

  // 可以改变雾的颜色，发现远处的云的颜色有所变化
  const fog = new THREE.Fog('#1e4877', 1, 1000);
  const geometry = new THREE.PlaneGeometry(64, 64);
  const geometries = [];
  const texture = new THREE.TextureLoader().load(import.meta.env.VITE_BASE_URL+'/public/images/cloud.png');

  // 贴图材质
  const material = new THREE.ShaderMaterial({
    // 这里的值是给着色器传递的
    uniforms: {
      map: {
        type: 't',
        value: texture
      },
      fogColor: {
        type: 'c',
        value: fog.color
      },
      fogNear: {
        type: 'f',
        value: fog.near
      },
      fogFar: {
        type: 'f',
        value: fog.far
      }
    },
    vertexShader: vShader,
    fragmentShader: fShader,
    transparent: true
  })

  for (var i = 0; i < CloudCount; i++) {
    const instanceGeometry = geometry.clone();

    // 把这个克隆出来的云，通过随机参数，做一些位移，达到一堆云彩的效果，每次渲染出来的云堆都不一样
    // X轴偏移后，通过调整相机位置达到平衡
    // Y轴想把云彩放在场景的偏下位置，所以都是负值
    // Z轴位移就是：当前第几个云*每个云所占的Z轴长度
    instanceGeometry.translate(Math.random() * RandomPositionX, -Math.random() * RandomPositionY, i * perCloudZ);

    geometries.push(instanceGeometry);
  }

  // 把这些形状合并
  const mergedGeometry = mergeGeometries(geometries);
  // 把上面合并出来的形状和材质，生成一个物体
  let mesh = new THREE.Mesh(mergedGeometry, material);
  // 添加进场景
  scene.add(mesh);

  let mesh2 = new THREE.Mesh(geometry, material);
  mesh2.position.x = 5;  // 将其放置在场景中心
  mesh2.position.z = cameraPositionZ - 100;  // 确保它在相机前方
  scene.add(mesh2);
}

const animation = ({ scene, camera, renderer }) => {
  camera.position.z = cameraPositionZ - (((Date.now() - StartTime) * 0.08) % cameraPositionZ);
  renderer.render(scene, camera);
}
const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#1e4877', // 背景色
  cameraPosition: [0, 0, 0], // 摄像机位置
  control: false, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: true, // 辅佐线
  light: false, // 灯光
  showStats: false,
  creatMesh: init,
  animation: animation // 动画回调
})


onUnmounted(() => {
  console.log('销毁');
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
