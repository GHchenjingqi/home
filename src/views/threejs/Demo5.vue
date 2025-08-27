<script setup>
import { ref, watch ,onUnmounted} from 'vue'
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';
import { useRay } from '../../mixin/useRay'

let msg = ref("")
let group; // 需要监听点击元素的组
let selectobj =null,clickListener = null,rayObject = null
const init = ({ THREE, scene,camera,renderer })=>{
  group = new THREE.Group()
  // 阴影
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const geometry = new THREE.BoxGeometry(3, 3, 3)
	const material1 = new THREE.MeshBasicMaterial({
		color: 0xff00a2d7,
	})
	const material2 = new THREE.MeshBasicMaterial({
		color: 0xffd3e3fd,
	})
	const cube1 = new THREE.Mesh(geometry, material1)
	const cube2 = new THREE.Mesh(geometry, material2)
  cube1.position.set(0, 0, 0)
	cube1.name = '方块1'
	cube2.position.set(2, 0, 0)
	cube2.name = '方块2'
	cube1.position.x = -2
  cube1.position.y = 1.5
  cube2.position.y = 1.5
	cube1.castShadow = true
  cube2.castShadow = true
  cube1.receiveShadow = true
	cube2.receiveShadow = true

  group.add(cube1)
  group.add(cube2)
	scene.add(group)

  // 光
  let lightDirect = new THREE.DirectionalLight(0xffffff, 1);
  lightDirect.position.set(50, 50, -50);
  lightDirect.castShadow = true;
  lightDirect.shadow.mapSize.width = 1024;
  lightDirect.shadow.mapSize.height = 1024;
  lightDirect.shadow.camera.near = 1;
  lightDirect.shadow.camera.far = 100;
  scene.add(lightDirect);

  // 辅助线
  var boxHelper = new THREE.BoxHelper(camera, 0xff0000);
  boxHelper.visible = false;
  scene.add(boxHelper);

  // 使用射线
  clickListener = renderer.domElement.addEventListener('click',async (event) => {
    rayObject = await useRay({ el: "#canvas",camera,group, event})
    if (rayObject?.object) {
      if (selectobj) {
        selectobj.material.color = new THREE.Color(0xd3e3fd)
      }
      // 选中效果
      rayObject.object.material.color = new THREE.Color(0xff0000)
      selectobj = rayObject.object
      msg.value = rayObject.object.name
    }
  })

  addGround()
  function addGround() {
      var geometry = new THREE.PlaneGeometry(200, 200, 2);
      var material = new THREE.MeshPhongMaterial({ color: '#C7DAFF', side: THREE.DoubleSide });
      var plane = new THREE.Mesh(geometry, material);
      plane.rotateX(-Math.PI / 2);
      plane.receiveShadow = true;
      plane.position.z = -1;
      plane.name = '地面'
      scene.add(plane);
  }
}

const { loading, pregress } = useThree({
    el: '#canvas', // 元素
    background:'#3e3e3a',
    cameraPosition: [0,5, 10], // 摄像机位置
    controlAuto: false,  // 自动旋转
    helper: false, // 辅佐线
    light: true, // 灯光
    creatMesh: init,  // 回调
})

onUnmounted(()=>{
  msg = null
  group= null
  rayObject = null
})
</script>
<template>
    <Loading :loading="loading" :pregress="pregress">
      <canvas id="canvas"></canvas>
      <div class="msgbox">{{ msg }}</div>
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
.msgbox{
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
