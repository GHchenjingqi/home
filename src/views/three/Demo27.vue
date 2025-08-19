<script setup>
import {onBeforeUnmount, ref} from 'vue'
import {useThree} from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import {staticImg} from "@/utils/staticImg.js";
import {findMesh, creatCirclePlane, creatPointsMesh} from '../../utils/creatMesh.js'
import {useRay} from '../../mixin/useRay'
import {useKey} from '@/mixin/useKey.js';
import {KEYCODE} from '@/utils/keyCodes.js'
import CameraControls from "camera-controls";
import Zoomtastic from 'zoomtastic';
import {Water} from "three/examples/jsm/objects/Water.js";

let cameraControls = null
// 调试模式
const debug = false
// 变量定义
let placeLev = -1, clickListener = null, selectobj = null, clearKeysHandle = null , water =null, michelle = null
// 初始化
const init = async ({THREE, scene, transControls, renderer, camera, gridHelper, axesHelper}) => {
  CameraControls.install({THREE: THREE});
  Zoomtastic.mount();
  const {keyEvent, clearKeys, getKeyTime} = await useKey();
  clearKeysHandle = clearKeys;
  // 可控物体集合
  const group = new THREE.Group()
  // 相机初始看的物体坐标
  let lookPotion = staticImg[0].position
  // 基础配置
  const plane = creatCirclePlane({
    size: [10, 64],
    position: [0, 0, 0],
    shadow: true,
    type: 'standard',
    color: 0xcf9d69,
  })
  plane.rotation.x = -Math.PI / 2
  plane.position.y = placeLev - 0.05
  plane.name = 'plane'
  group.add(plane)
  const home = findMesh(scene.children, 'home')
  // 物体转正
  home.rotation.y = -Math.PI / 8
  home.scale.set(15, 15, 15)
  home.position.set(0, 2.8, -4)

  const tree = findMesh(scene.children, 'tree')
  tree.scale.set(15, 15, 15)
  tree.position.set(5.55, 2.707, -2.471)

  michelle = findMesh(scene.children, 'michelle')
  michelle.scale.set(1.2, 1.2, 1.2)
  michelle.position.set(3.8736, -1.00, 4.935)

  const lightGroup = new THREE.Group()
  const lightMesh = findMesh(scene.children, 'light')
  lightMesh.scale.set(3, 3, 3)
  lightGroup.add(lightMesh)
  // 灯泡
  const pointLight = new THREE.PointLight(0xffffff, 80, 0);
  pointLight.position.set(0, placeLev, 0.7);
  pointLight.lookAt(0, -3, 0.7);
  pointLight.castShadow = true;

  // 球体
  const geometry = new THREE.SphereGeometry(20, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0xe6a23c, // 白色
    emissive: 0xe6a23c, // 自发光颜色
    emissiveIntensity: 1000.0, // 自发光强度
    roughness: 0.5, // 粗糙度
    metalness: 0.0 // 金属度
  });
  const moon = new THREE.Mesh(geometry, material);
  moon.position.set(0,250,1000)
  scene.background = new THREE.Color(0x040e34);
  scene.add(moon);
  // 环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  // 星星
  let starList = [
    { nubmer: 1850, color: 0xffffff, size: 1.5 ,scalar: 1,multiple:1000}
  ]

  for (let index = 0; index < starList.length; index++) {
    const stars = creatPointsMesh(starList[index]) ;
    stars.rotation.x = Math.random() * 6;
    stars.rotation.y = Math.random() * 6;
    stars.rotation.z = Math.random() * 6;

    stars.matrixAutoUpdate = false;
    stars.updateMatrix();
    stars.position.set(0, 0, 0);
    scene.add(stars);
  }


  // 海水
  const waterGeometry = new THREE.PlaneGeometry( 1000, 1000 );
  water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load( import.meta.env.VITE_BASE_URL+'/public/images/waternormals.jpg', function ( texture ) {
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
  water.position.y = placeLev - 0.25;
  scene.add( water );


  // 相机控制器
  cameraControls = new CameraControls(camera, renderer.domElement);
  cameraControls.enableTransition = true;
  cameraControls.transitionTime = 1; // 单位是秒
  cameraControls.minZoom = 0.5; // 鼠标滑轮最小缩放视距
  cameraControls.maxZoom = 1; // 鼠标滑轮最大缩放视距
  cameraControls.mouseButtons.wheel = CameraControls.ACTION.ZOOM; // 开启鼠标滑轮控制缩放
  cameraControls.saveState();
  cameraControls.update(); // 更新控制状态

  // 调试线条辅助
  if(debug) {
    gridHelper.position.y = placeLev
    axesHelper.position.y = placeLev + 0.01

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
    pointLightHelper.visible = false
    lightGroup.add(pointLightHelper);

    //2个控制器同时生效有冲突 transControls 生效时禁用 cameraControls
    transControls.addEventListener('mouseDown', function (event) {
      cameraControls.enabled = false;
    })
    transControls.addEventListener('mouseUp', function (event) {
      cameraControls.enabled = true;
    })
  }

  lightGroup.position.set(-2.08090, 4.78445, -1.37862)
  lightGroup.add(pointLight)
  scene.add(lightGroup)
  // 按键交互
  const wKey = keyEvent(KEYCODE.W, 16.666);
  const aKey = keyEvent(KEYCODE.A, 16.666);
  const sKey = keyEvent(KEYCODE.S, 16.666);
  const dKey = keyEvent(KEYCODE.D, 16.666);

  aKey.addEventListener('holding', function (event) {
    cameraControls.truck(-0.001, 0, false);
  });

  dKey.addEventListener('holding', function (event) {
    cameraControls.truck(0.001, 0, false);
  });

  wKey.addEventListener('holding', function (event) {
    cameraControls.forward(0.001, false);
  });

  sKey.addEventListener('holding', function (event) {
    cameraControls.forward(-0.001, false);
  });


  const textureLoader = new THREE.TextureLoader();
  const MaxHeight = 1.0, MaxWidth = 1.5

  staticImg.forEach(item => {
    textureLoader.load(import.meta.env.VITE_BASE_URL+item.url, (texture) => {
      const {width, height} = texture.image
      if (texture.image.width > MaxWidth) {
        item.width = MaxWidth;
        item.height = (MaxWidth / width) * height;
      } else {
        item.height = MaxHeight;
        item.width = (MaxWidth / height) * width;
      }

      const geometry = new THREE.BoxGeometry(item.width, item.height, 0.05);
      // 创建材质
      const material = new THREE.MeshLambertMaterial({
        map: texture,
        color: 0xffffff
      })
      const materialBorder = new THREE.MeshBasicMaterial({
        color: "#ffffff",
      });
      const mesh = new THREE.Mesh(geometry, [materialBorder, materialBorder, materialBorder, materialBorder, materialBorder, material]);
      mesh.name = "pic"
      mesh.rotation.set(item.rotation.x, item.rotation.y, item.rotation.z);
      mesh.scale.set(item.scale.x, item.scale.y, item.scale.z);
      mesh.position.set(item.position.x, item.position.y, item.position.z);
      // 原始数据item
      mesh.orginData = item
      lookPotion = mesh.position
      group.add(mesh)
    })
  })

  scene.add(group)
  // 相机位置看物体
  cameraControls.setLookAt(1, 1, 1, lookPotion.x, lookPotion.y, lookPotion.z, true)

  // 位置移动
  const moveTo = (position, lookat, duration) => {
    if(!cameraControls) return
    cameraControls.saveState();
    const EPS = 0.01
    const lookatV3 = new THREE.Vector3(position.x, position.y, position.z);
    lookatV3.lerp(new THREE.Vector3(lookat.x, lookat.y, lookat.z), EPS);

    // 获取当前的lookAt参数
    const fromPosition = new THREE.Vector3();
    const fromLookAt = new THREE.Vector3();
    cameraControls.getPosition(fromPosition);
    cameraControls.getTarget(fromLookAt);

    const lookatV32 = new THREE.Vector3(position.x, position.y, position.z);
    lookatV32.lerp(new THREE.Vector3(lookat.x, lookat.y, lookat.z), EPS);

    cameraControls.setLookAt(
        position.x,
        position.y,
        position.z,
        lookatV3.x,
        lookatV3.y,
        lookatV3.z,
        true
    );
  }
  // 点击事件
  let starXY = []
  // 使用射线获取元素
  document.body.addEventListener('mousedown', (event) => {
    starXY = [event.clientX, event.clientY]
  })
  document.body.addEventListener('mouseup', async (event) => {
    const [sx, sy] = starXY
    // 避免滑动触发点击事件
    if (Math.abs(sx - event.clientX) > 2 || Math.abs(sy - event.clientY) > 2) {
      return
    }
    let rayObject = await useRay({el: "#canvas", camera, group, event})
    if (rayObject?.object) {
      if (selectobj) {
        selectobj = null
      }
      // 选中效果
      selectobj = rayObject.object
      if (selectobj.name == 'plane') {
        // 点击地板，获取点击位置
        const v3 = rayObject.point
        // 处理点击边界
        if ((v3.x < 1.64 && v3.x > -5.04) && (v3.z > -3.96 && v3.z < 1.977)) {
          const position = {x: v3.x, y: 0.5, z: v3.z}
          moveTo(position, lookPotion, true)
        }
      }
      if (selectobj.name == 'pic') {
        // 控制器移动到选中对象
        if(debug){
          transControls.attach(selectobj);
        }
        let {x, y, z} = selectobj.position
        lookPotion = {x, y, z}
        let pt = cameraControls.getPosition();
        cameraControls.setLookAt(pt.x, pt.y, pt.z, x, y, z, true)
      }
      if(selectobj?.orginData){
        Zoomtastic.show( import.meta.env.VITE_BASE_URL+selectobj?.orginData.url);
      }
    }
  })
}


const animation = ({renderer, scene, clock, camera, stats,mixer}) => {
  const delta = clock.getDelta();
  const updated = cameraControls?.update(delta);
  stats?.update();
  if (water) {
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  }
  if (mixer) {
    mixer.update(delta);
  }
  // 自动旋转
  // cameraControls.azimuthAngle += 2 * delta * THREE.MathUtils.DEG2RAD;
  renderer.render(scene, camera);
}

const {loading, pregress} = useThree({
  el: '#canvas', // 元素
  background: '#111111', // 背景色
  cameraPosition: [0, 1.5, 1], // 摄像机位置
  modelPath: ['home.glb', 'light2.glb','tree.glb','michelle.glb'], // 模型
  modelName: ['home', 'light','tree','michelle'], // 模型名称
  control: false, // 是否开启控制器
  transformControls: debug, // 位置控制器
  helper: debug, // 辅佐线
  light:false,
  showStats: false,
  creatMesh: init,
  animation: animation // 动画回调
})

onBeforeUnmount(() => {
  clearKeysHandle()
  document.body.removeEventListener('click', clickListener)
  clickListener = null
  cameraControls = null
});
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
    <canvas id="canvas"></canvas>
    <div class="tips">
      <p>鼠标点击相册，预览图片，点击地面相机视角移动！</p>
      <p>cameraControls相机控制：</p>
      <ul>
        <li>W 前进</li>
        <li>S 后退</li>
        <li>A 向左</li>
        <li>D 向右</li>
      </ul>
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
.tips{
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  text-shadow: 1px 2px 4px #111;
  padding:1rem 3rem;
  box-sizing: border-box;
  z-index: 6;
}
</style>
