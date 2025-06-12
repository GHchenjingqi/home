<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { useThree } from '../../mixin/useThree.js';
import Loading from '../../components/Loading.vue';

// 顶点着色器
// projectionMatrix: 投影矩阵   modelViewMatrix: 模型视图矩阵  position: 顶点位置
let vertexShader = `
void main(){
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
} `;
// 片元着色器
let fragmentShader = `
void main()
{
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); // 这里改变颜色
}`


let ver2 = `
varying vec2 vUv;
void main() {
  vUv = uv; // 将 uv 值传递给片段着色器
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`

let frag2 = `
varying vec2 vUv;
void main() {
    // 从左到右渐变
    // gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
    // 从上到下渐变
    // gl_FragColor = vec4(vUv.y, 0.0, 0.0, 1.0);
    // 左右黑白灰
    // gl_FragColor = vec4(vec3(vUv.x), 1.0);
    // 上下黑白灰
    // gl_FragColor = vec4(vec3(vUv.y), 1.0);
    // 青色红色
    // gl_FragColor = vec4(vUv, 0.0, 1.0);
    // 蓝色紫色
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // 颜色突变,左黑右白
    // float color = step(0.5, vUv.x);
    // gl_FragColor = vec4(vec3(color), 1.0);
    // 颜色突变,左白右黑
    // float color = step(vUv.x,0.5);
    // gl_FragColor = vec4(vec3(color), 1.0);
    // 重复条纹。 fract重复次数
    // gl_FragColor = vec4(vec3(fract(vUv.x * 3.0)), 1.0);
    // 重复条纹,颜色突变
    gl_FragColor = vec4(vec3(step(0.5, fract(vUv.y * 3.0))), 1.0);
}`
let maters =null, clocks = null
const init = async ({ THREE, scene, controls, canvas, camera, renderer, clock }) => {
    clocks = clock
    // 仅用顶点着色器绘制
    const geomtry = new THREE.PlaneGeometry(2,2)
    const ball = new THREE.SphereGeometry(1)
    const rect = new THREE.BoxGeometry(1)

    const group = new THREE.Group()

    const materal = new THREE.ShaderMaterial({
        vertexShader: vertexShader,// 顶点着色器
    })
    const mesh = new THREE.Mesh(geomtry, materal)
    mesh.position.set(-9, 0, 0)
    group.add(mesh)

    // 顶点着色器+片元着色器
    const materal2 = new THREE.ShaderMaterial({
        vertexShader: vertexShader,// 顶点着色器
        fragmentShader: fragmentShader,// 片元着色器
        side: THREE.DoubleSide
    })
    const mesh2 = new THREE.Mesh(geomtry, materal2)
    mesh2.position.set(3, 0, 0)
    group.add(mesh2)

    // 平面重复突变
    const materal1 = new THREE.ShaderMaterial({
        vertexShader: ver2,// 顶点着色器
        fragmentShader: frag2,// 片元着色器
        side: THREE.DoubleSide
    })
    const mesh1 = new THREE.Mesh(geomtry, materal1)
    mesh1.position.set(-3,0,-3)
    group.add(mesh1)

    // 平面重复 mod取模
    const mesh5 = new THREE.Mesh(geomtry, new THREE.ShaderMaterial({
        vertexShader: ver2,// 顶点着色器
        fragmentShader: `varying vec2 vUv;
        void main() {
            float strength = mod(vUv.y * 10.0,1.0);
            gl_FragColor = vec4(vec3(strength), 1.0);
        }`,// 片元着色器
        side: THREE.DoubleSide
    }))
    mesh5.position.set(-6,0,-3)
    group.add(mesh5)

    const mesh6 = new THREE.Mesh(geomtry, new THREE.ShaderMaterial({
        vertexShader: ver2,// 顶点着色器
        fragmentShader: `varying vec2 vUv;
        void main() {
            gl_FragColor = vec4(vUv, 1.0, 1.0);
        }`,// 片元着色器
        side: THREE.DoubleSide
    }))
    mesh6.position.set(0,0,0)
    group.add(mesh6)

    const mesh7 = new THREE.Mesh(geomtry, new THREE.ShaderMaterial({
        vertexShader: ver2,// 顶点着色器
        fragmentShader: `varying vec2 vUv;
        void main() {
           gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
        }`,// 片元着色器
        side: THREE.DoubleSide
    }))
    mesh7.position.set(-6,0,0)
    group.add(mesh7)

    const mesh8 = new THREE.Mesh(geomtry, new THREE.ShaderMaterial({
        vertexShader: ver2,// 顶点着色器
        fragmentShader: `varying vec2 vUv;
        void main() {
           gl_FragColor = vec4(vUv.y, 0.0, 0.0, 1.0);
        }`,// 片元着色器
        side: THREE.DoubleSide
    }))
    mesh8.position.set(-3,0,0)
    group.add(mesh8)

    maters =  new THREE.ShaderMaterial({
        vertexShader: ver2,// 顶点着色器
        fragmentShader: `varying vec2 vUv;
        uniform vec2 u_resolution;
        uniform float u_time;
        void main() {
           gl_FragColor = vec4(vUv, 0.5 + 0.5 * sin(u_time), 1.0);
        }`,// 片元着色器
        uniforms: {
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_time: { value: 0.0 }
        },
        side: THREE.DoubleSide
    })
    const mesh9 = new THREE.Mesh(geomtry,maters)
    mesh9.position.set(0,0,3)
    group.add(mesh9)

    const mesh10 = new THREE.Mesh(rect,maters)
    mesh10.position.set(-3,0,3)
    group.add(mesh10)

    const mesh11 = new THREE.Mesh(ball,maters)
    mesh11.position.set(3,0,3)
    group.add(mesh11)

    // 平面重复突变
    const materal4 = new THREE.ShaderMaterial({
        vertexShader: ver2,// 顶点着色器
        fragmentShader: frag2,// 片元着色器
        side: THREE.DoubleSide
    })
    const mesh4 = new THREE.Mesh(rect, materal4)
    mesh4.position.set(0,0,-3)
    group.add(mesh4)


    // 球体花纹-篮球
    const materal3 = new THREE.ShaderMaterial({
        vertexShader: ver2,// 顶点着色器
        fragmentShader: `
        varying vec2 vUv;
        void main() {
         gl_FragColor = vec4(vec3(step(0.5, fract(vUv.x * 8.0))), 1.0);
        }`,// 片元着色器
        side: THREE.DoubleSide
    })
    const mesh3 = new THREE.Mesh(ball, materal3)
    mesh3.position.set(3,0,-3)
    group.add(mesh3)


    scene.add(group)
}

const animation = ({ THREE, scene, camera, renderer, stats, controls })=>{
    stats.update();
    if (controls) {
        controls.update();
    }
    // 按秒
    const time = clocks.getElapsedTime();
    // 更新时间
    maters.uniforms.u_time.value = time;
    renderer.render(scene, camera);
}

const { loading } = useThree({
  el: '#canvas', // 元素
  background: '#010826', // 背景色
  cameraPosition: [0, 3, 8], // 摄像机位置
  control: true, // 是否开启控制器
  controlAutoSpeed: false, // 是否开启自动旋转
  helper: true, // 辅佐线
  light: true, // 灯光
  creatMesh: init,
  animation: animation
})

onBeforeUnmount(() => {
    // 清理资源
    vertexShader = null
    fragmentShader = null
    maters =null
    clocks = null
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
