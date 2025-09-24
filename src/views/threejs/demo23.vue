<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import { creatPointsMesh, lon2xyz, createSpriteText } from '../../utils/creatMesh.js'
import gsap from "gsap";

// 着色器
let vertexShader = `
      precision highp float;
      uniform float time;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
        vNormal = normalize(normalMatrix * normal);
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

let fragmentShader = `
      precision highp float;
      uniform vec3 glowColor;
      uniform float scale;
      uniform float bias;
      uniform float power;
      uniform float time;
      uniform bool isHover;
      uniform sampler2D map;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;

      void main() {
        vec3 worldCameraToVertex = vPosition - cameraPosition;
        vec3 viewCameraToVertex = (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
        viewCameraToVertex = normalize(viewCameraToVertex);
        float intensity = pow(bias + dot(vNormal, viewCameraToVertex), power);

        // 计算扫描效果
        float scanProgress = mod(time * 0.45, 1.0); // 增加时间变量的系数以加快扫描速度
        float scanWidth = 0.08; // 扫描宽度
        float scanStart = scanProgress - scanWidth;
        float scanEnd = scanProgress + scanWidth;

        // 使用两个 smoothstep 函数来创建中间部分有颜色、上下部分透明的效果
        float scanIntensity = smoothstep(scanStart, scanProgress, 1.0 - vUv.y) * (1.0 - smoothstep(scanProgress, scanEnd, 1.0 - vUv.y));
        scanIntensity = pow(scanIntensity, 2.0); // 使用 pow 函数增强渐变效果
        scanIntensity *= 0.15;// 降低透明度
        vec4 textureColor = texture2D(map, vUv);
        vec4 glowColorFinal = vec4(glowColor, scanIntensity);
        gl_FragColor = mix(textureColor, glowColorFinal, scanIntensity);
      }
    `;
let clocks = null, earthGroup = null
const init = async ({ THREE, scene, controls, canvas, camera, renderer, clock }) => {
  clocks = clock
  // 创建地球组
  const group = new THREE.Group();
  group.name = "group";
  group.scale.set(0, 0, 0);

  earthGroup = new THREE.Group();
  const startGroup = new THREE.Group();
  group.add(earthGroup)
  group.add(startGroup)
  scene.add(group)


  // 星星配置
  let starList = [
    { nubmer: 600, color: 0x9c9c9c, size: 1.5 },
    { nubmer: 300, color: 0xffeeff, size: 2.2 },
    { nubmer: 100, color: 0xffff00, size: 0.5 },
    { nubmer: 500, color: 0x00ffff, size: 2 },
    { nubmer: 50, color: 0x00ffff, size: 4 },
  ]

  for (let index = 0; index < starList.length; index++) {
    const stars = creatPointsMesh(starList[index]);
    stars.rotation.x = Math.random() * 60;
    stars.rotation.y = Math.random() * 60;
    stars.rotation.z = Math.random() * 60;
    stars.matrixAutoUpdate = false;
    stars.updateMatrix();
    startGroup.add(stars)
  }

  // 加载贴图
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(import.meta.env.VITE_BASE_URL+'https://fastly.jsdelivr.net/gh/GHchenjingqi/resources/images/earth2.jpg');
  const glowTexture = textureLoader.load(import.meta.env.VITE_BASE_URL+'https://fastly.jsdelivr.net/gh/GHchenjingqi/resources/images/glow.png'); // 加载大气层纹理

  // 创建地球几何体
  const earth_geometry = new THREE.SphereGeometry(4, 50, 50);
  // 创建地球边界几何体
  const earth_border = new THREE.SphereGeometry(4.5, 60, 60);
  // 创建点材质
  const pointMaterial = new THREE.PointsMaterial({
    color: 0x4390d1, // 设置颜色，默认 0xFFFFFF
    transparent: true,
    sizeAttenuation: true,
    opacity: 0.5,
    vertexColors: false, // 定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
    size: 0.01, // 定义粒子的大小。默认为1.0
  });

  // 创建点集合
  const points = new THREE.Points(earth_border, pointMaterial);
  earthGroup.add(points);

  // 设置纹理包裹方式
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  // 创建自定义着色器材料
  const uniforms = {
    map: { value: texture },
    glowColor: {
      value: new THREE.Color(0x98deff),
    },
    scale: {
      type: "f",
      value: -1.0,
    },
    bias: {
      type: "f",
      value: 1.0,
    },
    power: {
      type: "f",
      value: 3.3,
    },
    time: {
      type: "f",
      value: 100,
    },
    isHover: {
      value: false,
    },
  };
  const earthMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    blending: THREE.NormalBlending,
    transparent: true,
    depthWrite: false,
    fragmentShader: fragmentShader
  });

  // 创建地球网格
  const earth = new THREE.Mesh(earth_geometry, earthMaterial);
  earth.name = "earth";
  earthGroup.add(earth);


  // 地球外大气辉光效果
  const createEarthGlow = (radius, glowTexture) => {
    // 创建精灵材质对象SpriteMaterial
    const spriteMaterial = new THREE.SpriteMaterial({
      map: glowTexture, // 设置精灵纹理贴图
      color: 0x4390d1,
      transparent: true, // 开启透明
      opacity: 0.7, // 可以通过透明度整体调节光圈
      depthWrite: false, // 禁止写入深度缓冲区数据
    });

    // 创建表示地球光圈的精灵模型
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(radius * 3.0, radius * 3.0, 1); // 适当缩放精灵
    return sprite;
  }
  // 创建大气层效果
  const glowSprite = createEarthGlow(4.5, glowTexture); // 地球半径为4
  earthGroup.add(glowSprite);

  // 地球外蓝色辉光
  const createEarthAperture = (radius) => {
    const vertexShader = [
      "varying vec3	vVertexWorldPosition;",
      "varying vec3	vVertexNormal;",
      "varying vec4	vFragColor;",
      "void main(){",
      "	vVertexNormal	= normalize(normalMatrix * normal);", //将法线转换到视图坐标系中
      "	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;", //将顶点转换到世界坐标系中
      "	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
      "}",
    ].join("\n");

    const AeroSphere = {
      uniforms: {
        coeficient: {
          type: "f",
          value: 1.0,
        },
        power: {
          type: "f",
          value: 3,
        },
        glowColor: {
          type: "c",
          value: new THREE.Color(0x4390d1),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: [
        "uniform vec3	glowColor;",
        "uniform float	coeficient;",
        "uniform float	power;",
        "varying vec3	vVertexNormal;",
        "varying vec3	vVertexWorldPosition;",
        "varying vec4	vFragColor;",
        "void main(){",
        "	vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;", //世界坐标系中从相机位置到顶点位置的距离
        "	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;", //视图坐标系中从相机位置到顶点位置的距离
        "	viewCameraToVertex= normalize(viewCameraToVertex);", //规一化
        "	float intensity	= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);",
        "	gl_FragColor = vec4(glowColor, intensity);",
        "}",
      ].join("\n"),
    };
    const material1 = new THREE.ShaderMaterial({
      uniforms: AeroSphere.uniforms,
      vertexShader: AeroSphere.vertexShader,
      fragmentShader: AeroSphere.fragmentShader,
      blending: THREE.NormalBlending,
      transparent: true,
      depthWrite: false,
    });

    const sphere = new THREE.SphereGeometry(radius + 0.01, 50, 50);
    const mesh = new THREE.Mesh(sphere, material1);
    return mesh;
  }
  const apertureMesh = createEarthAperture(4); // 地球半径为4
  earthGroup.add(apertureMesh);

  // 定位到北京：圆锥+文字
  const r = 4.001
  const zblist = [
    { l: 116.322056, n: 39.89491, name: "中国", color: 0xff0000 },
    { l: 261.7431640625, n: 35.125447565116126, name: "美国" },
    { l: 133.857421875, n: -23.68477416688374, name: "澳大利亚" },
    { l: 359.82421875, n: 51.508742458803326, name: "英国" },
  ]
  zblist.forEach(async item => {
    const planes = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.8, 4), new THREE.MeshBasicMaterial({ color: item.color ? item.color : 0xffffff }));
    // 经纬度转 3维坐标
    const coord = lon2xyz(r, item.l, item.n);
    // 获取坐标法线（垂直于物体表面）
    const normal = calculateNormal(coord)
    planes.position.copy(coord);
    // 垂直与法线
    planes.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    earthGroup.add(planes)

    const planesName = createSpriteText(item.name, { x: coord.x, y: coord.y, z: coord.z }, '#ffffff')
    earthGroup.add(planesName)
  })


  // 圆环
  const ringGeometry = new THREE.RingGeometry(5, 5.01, 64, 1, 0, 2* Math.PI);
  const material = new THREE.MeshBasicMaterial({
    color: 0x4390d1,
    side: THREE.DoubleSide
  });
  const torus = new THREE.Mesh(ringGeometry, material);
  const torus1 = new THREE.Mesh(ringGeometry, material);
  torus.position.set(0, 0, 0);

  torus.rotation.x = Math.PI / 4 ;
  torus.rotation.y = Math.PI ;
  earthGroup.add(torus);
  torus1.rotation.x = Math.PI / 2 ;
  earthGroup.add(torus1);

  // 缩放动画
  gsap.to(group.scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: 2,
    ease: "Quadratic",
  })
}

/**
* 计算法线方向
* @param {球面坐标} position
* @returns {THREE.Vector3} 法线方向
*/
function calculateNormal(position) {
  return position.clone().normalize();
}

const animation = ({ THREE, scene, camera, renderer, stats, controls }) => {
  stats.update();
  if (controls) {
    controls.update();
  }
  // 更新时间变量 地球扫描动画
  const time = clocks.getElapsedTime();
  const earth = earthGroup.getObjectByName('earth');
  if (earth && earth.material.uniforms.time) {
    earth.material.uniforms.time.value = time;
  }
  renderer.render(scene, camera);

}

const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#010826', // 背景色
  cameraPosition: [0, 3, 8], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: true, // 是否开启自动旋转
  helper: false, // 辅佐线
  light: false, // 灯光
  creatMesh: init,
  animation: animation
})

onBeforeUnmount(() => {
  // 清理资源
  vertexShader = fragmentShader = clocks = earthGroup = null
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
