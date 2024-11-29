<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'
// gui 控制参数
const gui = new GUI()
gui.domElement.style.top = '2rem'
gui.domElement.style.right = '2rem'

let clocks = null,uniforms3 = null
const init = async ({ THREE, scene, controls, canvas, camera, renderer,clock }) => {
    clocks = clock
    let uniforms = {
        vTime: { value:0},
        vColor: { value: new THREE.Color(0x00ff00) },
        vPow: { value: 2.0 }
    }

    const vertexShader  = `varying vec2 vUv;
        void main(){
            vUv = vec2(uv.x,uv.y);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`
    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader:`varying vec2 vUv;
        uniform float vTime;
        uniform float vPow;
        uniform vec3 vColor;
        void main(){
            float vy = 1.0 - vUv.y;
            vy = pow(vy,vPow - abs(sin(vTime)));
            gl_FragColor = vec4(vColor,vy);
        }`,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.y = 2.5;
    scene.add(plane);

    const plane1 = plane.clone()
    plane1.position.set( 2.5, 2.5 ,2.5);
    plane1.rotation.y = Math.PI / 2;
    scene.add(plane1);

    const plane2 = plane1.clone()
    plane2.position.set( -2.5, 2.5 ,2.5);
    plane2.rotation.y = Math.PI / 2;
    scene.add(plane2);

    // 画圆着色器
    const uniforms2 = {
        iPower:{value:10.0}, // 扩散力度
        iRadius:{value:0.2} // 半径
    }
    const material3 = new THREE.ShaderMaterial({
        uniforms: uniforms2,
        vertexShader,
        fragmentShader:`
        uniform float iPower;
        uniform float iRadius;
        float sdCircle( vec2 p, float r ){
            return length(p) - r;
        }
        varying vec2 vUv;
        void main(){
            float r = sdCircle(vUv - 0.5,iRadius);
            r = pow(1.0 - r,iPower);

            gl_FragColor = vec4(r,0.5,0.8,r);
        }`,
        side: THREE.DoubleSide
    });
    const plane5 = new THREE.Mesh(geometry, material3);
    plane5.position.set(5,0,2.5)
    plane5.rotation.x = Math.PI / 2;
    scene.add(plane5);


    // 动感光波~
    uniforms3 = {
        vTime: { value:0},
        vFreq: {value:10}, // 圈数
        vSpeed:{ value: 0.5}, // 速度
        vColor: { value: new THREE.Color(0x00ff00) },
        vPower:{value: 2.0} // 强度
    }
    // fract只取小数部分，可以作为周期函数来使用
    const material4 = new THREE.ShaderMaterial({
        uniforms: uniforms3,
        vertexShader,
        fragmentShader:`varying vec2 vUv;
        uniform float vTime;
        uniform vec3 vColor;
        uniform float vSpeed;
        uniform float vPower;
        uniform float vFreq;
        float sdCircle( vec2 p, float r ){
            return length(p) - r;
        }
        void main(){
            vec2 aUv = (vUv - 0.5) * vFreq;
            float alp = fract(sdCircle(aUv, 0.5) - vTime * vSpeed);
            alp = pow(alp,vPower);
            gl_FragColor = vec4(vColor,alp);
        }`,
        side: THREE.DoubleSide
    });
    const plane6 = new THREE.Mesh(geometry, material4);
    plane6.position.z = 2.5
    plane6.rotation.x = Math.PI / 2;
    scene.add(plane6);

    // GUI配置
    let guiObj = {
        color: '00ff00'
    }
    gui.addColor(guiObj, 'color').name('颜色').onChange((value) => {
        uniforms.vColor.value = new THREE.Color(value) ;
    })
    gui.add(uniforms.vPow, 'value', 0, 10).name('颜色高度')

    const gl = gui.addFolder("圆")
    gl.add(uniforms2.iPower, 'value', 0, 10).name('圆扩散')
    gl.add(uniforms2.iRadius, 'value', 0, 1).name('圆半径')

    const gl1 = gui.addFolder("动感光波")
    gl1.add(uniforms3.vPower, 'value', 0, 10).name('扩散力度')
    gl1.add(uniforms3.vFreq, 'value', 5, 20).name('光波圈数')
    gl1.add(uniforms3.vSpeed, 'value', 0, 10).name('光波速度')
    gl1.addColor(uniforms3.vColor, 'value').name('光波颜色').onChange((value) => {
        uniforms3.vColor.value = new THREE.Color(value) ;
    })
}

const animation = ({ THREE, scene, camera, renderer, controls})=>{
    if (controls) {
        controls.update();
    }
    const time = clocks.getElapsedTime();
    uniforms3.vTime.value += 0.01;
    renderer.render(scene, camera);
}

const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#fff', // 背景色
  cameraPosition: [0, 8,10], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: false, // 辅佐线
  light: false, // 灯光
  showStats:false,
  creatMesh: init,
  animation: animation // 动画回调
})

onBeforeUnmount(() => {
    uniforms3 = null
    gui.destroy()
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
  height:100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
</style>
