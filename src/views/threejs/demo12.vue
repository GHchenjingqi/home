<script setup>
import { onUnmounted } from 'vue'
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';
import { useRay } from '../../mixin/useRay'

let selectobj =null;
let rayObject = null;
let moveobj = {
  mesh:null,
  moveListener: false
}
let clickListener,onKeyDown
const init = ({ THREE, scene, controls,camera, renderer})=>{
  // 开启投影
  renderer.shadowMap.enabled =  true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(import.meta.env.VITE_BASE_URL+"https://ghchenjingqi.github.io/resources/images/bj.webp");
  scene.background = texture;


  let k = 0.1 // 垂直高度变化
  const table = scene.children.find(item => item.name === 'table')
  table.scale.set(2,2,2)
  table.position.set(0,0.2-k,0)
  scene.getObjectByName("node_id30").castShadow= true
  scene.getObjectByName("node_id30").receiveShadow = true

  const chair = scene.children.find(item => item.name === 'chair')
  chair.scale.set(0.7,0.7,0.7)
  chair.position.set(0,0.28-k,1)
  chair.rotation.y = Math.PI/2
  chair.children[0].castShadow= true
  moveobj.mesh = chair

  const compute = scene.children.find(item => item.name === 'compute')
  compute.scale.set(0.6,0.6,0.6)
  compute.position.set(0,0.524-k,0.25)

  const bird = scene.children.find(item => item.name === 'bird')
  bird.scale.set(0.1,0.1,0.1)
  bird.position.set(-0.3,0.474-k,0.55)

  const home = scene.children.find(item => item.name === 'home')
  home.rotation.y = Math.PI/2
  home.scale.set(0.6,0.6,0.6)
  home.position.set(3.5,-0.1, 2.8)
  home.receiveShadow = true
  // 隐藏元素
  // home.visible = false
  // 位置控制器
  // transControls.attach(light);

  const lamp = scene.children.find(item => item.name === 'lamp')
  lamp.scale.set(0.4,0.4,0.4)
  lamp.position.set(-0.3711616376237567,0.5238102031262872-k,0.3548526176053807)

  // 设置控制器旋转角度, 避免视线超出室内
  controls.minPolarAngle = Math.PI * 1.4 / 4; // 最小垂直角度
  controls.maxPolarAngle = Math.PI * 1.5 / 4; // 最大垂直角度
  controls.minAzimuthAngle = - Math.PI * 1 / 6; // 最小水平角度
  controls.maxAzimuthAngle = Math.PI * 2.5 / 6; // 最大水平角度

  onKeyDown = function (event) {
    switch (event.code) {
      case 'Space':
        spaceHandeler()
        break;
    }
  }
  // 空格开灯
  document.body.addEventListener('keydown', onKeyDown);
  let light = null
  // 空格回调
  const spaceHandeler = () => {
    let box = document.getElementById('box')
    if (!light) {
      box.style.display = 'none'
      light = new THREE.PointLight(0x666666, 1.5, 60)
      light.position.set(-0.36,0.58,0.46)
      scene.add(light)
      // 设置阴影
      light.castShadow = true;
    } else {
      box.style.display = 'block'
      scene.remove(light)
      light = null
    }
  }

  let group = new THREE.Group()
  group.add(chair)
  group.add(lamp)
  // 添加到场景中
  scene.add(group)

  clickListener = async function(event){
    rayObject = await useRay({ el: "#canvas",camera,group, event})
    if (rayObject?.object) {
      if (selectobj) {
        selectobj = null
      }
      // 设置默认运动关闭标识
      if (moveobj && moveobj.moveListener) {
        moveobj.moveListener = false
      }
      // 选中效果
      selectobj = rayObject.object
      if (selectobj.name === 'node_id42' || selectobj.name === 'node_id40') {
        // 灯光随机更改颜色
        light.color = new THREE.Color(Math.random() * 0xffffff)
        //  Math.random() * 0xffffff
      } else if (selectobj.name === 'tripo_node_286c52cb-1ad1-46f0-a987-4d93f1e5ffe5') {
        // 椅子旋转
        // selectobj.rotation.y += Math.PI / 2
        moveobj.moveListener = true
      }
      camera.lookAt(selectobj.position)
      // 控制器移动到选中对象
      // transControls.attach(selectobj);
    }
  }
  // 使用射线获取元素
  document.body.addEventListener('click', clickListener)
}

const animation = ({ scene, camera, renderer, controls, stats, }) => {
  if (moveobj && moveobj?.moveListener) {
    moveobj.mesh.rotation.y += 0.01
  }
  controls?.update();
  renderer.render(scene, camera);
  stats?.update();
}
const {loading, pregress} =  useThree({
    el: '#canvas', // 元素
    background:'#111',
    cameraPosition: [0, .6, 1.5], // 摄像机位置
    modelPath: ['compute.glb','table.glb','cute_bird.glb','chair.glb','home.fbx','light.glb'], // 模型
    modelName: ['compute','table','bird','chair','home','lamp'], // 模型名称
    modelScale:[0,0,0], // 模型缩放
    control: true, // 是否开启控制器
    controlAutoSpeed: false, // 是否开启自动旋转
    transformControls: true,
    helper: false, // 辅佐线
    light: false, // 灯光
    creatMesh:init,
    animation: animation
})


onUnmounted(() => {
  moveobj = null
  selectobj =null
  rayObject = null
  document.body.removeEventListener('click', clickListener)
  document.body.removeEventListener('keydown', onKeyDown);
  clickListener= onKeyDown = null
})
</script>
<template>
  <Loading :loading="loading" :pregress="pregress">
    <canvas id="canvas"></canvas>
    <div id="box">
      <div class="box">
        <p>空格开灯</p>
        <p>点击灯，随机改变颜色</p>
        <p>点击凳子，旋转移动</p>
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
  line-height: 10vh;
  font-size: 40px;
  left: 0;
  top: 0;
  z-index: 2;
}
</style>
