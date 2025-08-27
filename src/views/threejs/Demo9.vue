<script setup>
import { onUnmounted,computed } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import { creatBoxMesh } from '../../utils/creatMesh.js'
import { useRay } from '../../mixin/useRay'

let group; // 需要监听点击元素的组
let selectobj =null,clickListener = null;

const meshfn = ({ THREE, scene,transControls, camera,renderer,}) => {
  group = new THREE.Group()
  const box =  creatBoxMesh({  color: 0xffffff, position: [0, 0, 0], size: [1, 1, 1] })
  const box2 = creatBoxMesh({ color: 0xffff00, position: [-2, -2, 0], size: [1, 1, 1] })
  const box3 = creatBoxMesh({ color: 0x00ff00, position: [2, 2,6], size: [1, 1, 1] })
  group.add(box)
  group.add(box2)
  group.add(box3)
  scene.add(group)
  // 默认控制第一个
  transControls.attach(box);

  clickListener = async (event) => {
    let rayObject = await useRay({ el: "#canvas",camera,group, event})
    if (rayObject?.object) {
      if (selectobj) {
        selectobj = null
      }
      // 选中效果
      selectobj = rayObject.object
      // 控制器移动到选中对象
      transControls.attach(selectobj);
    }
  }
  // 使用射线获取元素
  document.body.addEventListener('click',clickListener)
}

const { loading, pregress } = useThree({
  el: '#canvas', // 元素
  background: '#333333',
  cameraPosition: [0, 4, 10], // 摄像机位置
  control:true,
  controlAuto: false,  // 自动旋转
  helper: true, // 辅佐线
  light: true, // 灯光
  transformControls: true, // 变换控件
  creatMesh: meshfn,  // 回调
  // animation: animation // 动画回调
})


onUnmounted(() => {
  document.body.removeEventListener('click', clickListener)
  clickListener = null
  selectobj = null
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
