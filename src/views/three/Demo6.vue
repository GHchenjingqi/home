<script setup>
import { onUnmounted } from 'vue'
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';
import { creatBoxMesh, creatTextMap ,creatPlaneMesh, creatLightMesh} from '../../utils/creatMesh.js'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'
// gui 控制参数
const gui = new GUI()
gui.domElement.style.top = 'calc(2rem + 60px)'
gui.domElement.style.right = '2rem'
gui.domElement.style.zIndex = '60'
// 滑块： gui.add(obj,'key',min,max,step).name('显示名称')
// 检查框：gui.add(obj,'key').name('显示名称')
// 下拉框：gui.add(obj,'key',arr).name('显示名称')
// 按钮：gui.add(obj,'key').name('显示名称').onChange(callback)
// 文本框：gui.add(obj,'key').name('显示名称')
// 颜色：gui.addColor(obj,'key').name('显示名称')
// 事件：gui.add(obj,'key').name('显示名称').onChange(callback)
// 分组：gui.addFolder('分组名称')
// 移除：gui.remove(obj)
// 清空：gui.destroy()
// 打开：gui.open()
// 关闭：gui.close()
// 保存：gui.save()
// 加载：gui.load()
// 监听：gui.on('change',callback)
// 取消监听：gui.off('change',callback)

const meshfn = ({ THREE, scene,camera,renderer,controls,stats })=>{
  // 创建正方体
  const boxList =[
    { size: [2,2,2], color: 0x049ef4,type: 'basic', position: [-5,0.5,0],shadow:true},
    { size: [2,2,2], color: 0x049ef4,type: 'lambert', position: [-2,0.5,0],shadow:true},
    { size: [2,2,2], color: 0x049ef4,type: 'phong', position: [2,0.5,0],shadow:true},
    { size: [2,2,2], color: 0x049ef4,type: 'standard', position: [5,0.5,0],shadow:true}
  ]
  for (let index = 0; index < boxList.length; index++) {
    const cube = creatBoxMesh(boxList[index]);
    scene.add(cube);
  }

  // 创建平面
  const planeList = [
    { size: [40, 40], color: 0x999999,type: 'standard', position: [0, -0.51, 0 ],rotation:[ Math.PI / 2,0,0],side: THREE.DoubleSide,shadow:true},
    { size: [2, 0.5], color: 0x000000,type: 'basic', position: [-5, 1.8, 0 ], map: creatTextMap('网格材质',70),side: THREE.DoubleSide, transparent: true},
    { size: [2, 0.5], color: 0x000000,type: 'lambert', position: [-2, 1.8, 0 ], map: creatTextMap('漫反射'),side: THREE.DoubleSide, transparent: true},
    { size: [2, 0.5], color: 0x000000,type: 'phong', position: [2, 1.8, 0 ], map: creatTextMap('漫反镜面',70),side: THREE.DoubleSide,transparent: true},
    { size: [2, 0.5], color: 0x000000,type: 'standard', position: [5, 1.8, 0 ], map: creatTextMap('物体材质',70),side: THREE.DoubleSide,transparent: true},
  ]
  for(let index = 0; index < planeList.length; index++){
    const plane = creatPlaneMesh(planeList[index]);
    scene.add(plane);
  }

  // 创建光源
  const lightList = [
    { type: 'point', color: 0xffffff, intensity: 600,  position: [2, 4, -3], shadow:true},
    { type: 'directional', color: 0xffffff, intensity: 2,distance: 4, position: [0, 2, 1.5],shadow:true},
  ]
  let pointGui ={
    position:{
      x:2,
      y:4,
      z:-1
    },
    intensity:600,
    color:'ffffff'
  }
  let directionalGui ={
    position:{
      x:0,
      y:2,
      z:1.5
    },
    intensity:2,
    color:'ffffff'
  }
  for(let index = 0; index < lightList.length; index++){
    const light = creatLightMesh(lightList[index]);
    scene.add(light);
    if (light.type == 'PointLight') {
      let pl = gui.addFolder('点光')
      pl.add(pointGui.position, 'x', -10, 10, 0.1).name('光源x').onChange((value) => {
        light.position.x = value;
      })
      pl.add(pointGui.position, 'y', -10, 10, 0.1).name('光源y').onChange((value) => {
        light.position.y = value;
      })
      pl.add(pointGui.position, 'z', -10, 10, 0.1).name('光源z').onChange((value) => {
        light.position.z = value;
      })
      pl.add(pointGui,'intensity', 0,800, 0.1).name('点光强度').onChange((value) => {
        light.intensity = value;
      })
      pl.addColor(pointGui, 'color').name('点光颜色').onChange((value) => {
        light.color.set(value);
      })
    }
    if(light.type == 'DirectionalLight'){
      let dl = gui.addFolder('环境光')
      dl.add(directionalGui.position, 'x', -10, 10, 0.1).name('光源x').onChange((value) => {
        light.position.x = value;
      })
      dl.add(directionalGui.position, 'y', -10, 10, 0.1).name('光源y').onChange((value) => {
        light.position.y = value;
      })
      dl.add(directionalGui.position, 'z', -10, 10, 0.1).name('光源z').onChange((value) => {
        light.position.z = value;
      })
      dl.add(directionalGui,'intensity', 0,2, 0.1).name('平行光强度').onChange((value) => {
        light.intensity = value;
      })
      dl.addColor(directionalGui, 'color').name('点光颜色').onChange((value) => {
        light.color.set(value);
      })
      dl.close()
    }
  }


  // 开启投影
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
}


// 回调动画
const animation = ({ scene,camera,renderer,controls,stats}) => {
    controls.update();
    renderer.render(scene, camera);
    stats.update();
}

const { loading, pregress } = useThree({
    el: '#canvas', // 元素
    background:'#333333',
    cameraPosition: [0, 4, 10], // 摄像机位置
    controlAuto: false,  // 自动旋转
    helper: false, // 辅佐线
    light: false, // 灯光
    creatMesh: meshfn,  // 回调
    animation: animation // 动画回调
})


onUnmounted(()=>{
    gui.destroy()
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
