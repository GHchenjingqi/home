<script setup>
import { useThree } from '../../mixin/useThree';
import Loading from '../../components/Loading.vue';

const meshfn = ({ THREE, scene, cube })=>{
    // 环境贴图：左右、上下、前后
    const cubeTexture = new THREE.CubeTextureLoader().setPath("/public/images/").load(["1.jpg", "2.jpg", "3.jpg", "4.jpg", "6.jpg", "5.jpg"]);
    scene.background = cubeTexture;

    // 贴图
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/public/images/all.jpg");
    const geometry2 = new THREE.SphereGeometry(0.5, 36, 18);
    // 材质
    const material2 = new THREE.MeshBasicMaterial({
      map: texture,
      color: 0xffffff,
    });
    cube = new THREE.Mesh(geometry2, material2);
    scene.add(cube);
}
 

const { loading, pregress } = useThree({
    el: '#canvas', // 元素
    background:'#ffeeff',
    cameraPosition: [0, 5, 10], // 摄像机位置
    controlAuto: true,  // 自动旋转
    controlAutoSpeed: -0.2, // 旋转速度
    helper: false, // 辅佐线
    light: true, // 灯光
    creatMesh: meshfn,  // 回调
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
}
</style>