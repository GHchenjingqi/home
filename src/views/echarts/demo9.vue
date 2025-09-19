<script setup>
import Echart from '@/components/Echart.vue'
// 球体贴图 + 大气层
const option1 = {
  backgroundColor: '#000', // 背景色
  // 球
  globe: {
    // 地球贴图
    baseTexture:  import.meta.env.VITE_BASE_URL + 'https://ghchenjingqi.github.io/resources/images/world.jpg',
    // 环境贴图
    environment: import.meta.env.VITE_BASE_URL + "https://ghchenjingqi.github.io/resources/images/sky.png",
    // 兰伯特投影： 等角圆锥投影
    shading: 'lambert',
    // 开启大气层
    atmosphere: {
      show: true
    },
    // 光
    light: {
      // 环境光
      ambient: {
        intensity: 0.2
      },
      // 点光
      main: {
        intensity: 2.5
      }
    }
  },
  series: []
}

// 球体缩放 + 凹凸效果 + 后期效果
const option2 = {
  backgroundColor: '#000', // 背景色
  // 球
  globe: {
    // 地球缩放，注意会影响到环境贴图一起缩放
    width: 300,
    height: 300,
    top:'center',
    left:'center',
    // 地球贴图
    baseTexture: import.meta.env.VITE_BASE_URL +  'https://ghchenjingqi.github.io/resources/images/world.jpg',
    // 凹凸
    heightTexture:import.meta.env.VITE_BASE_URL + 'https://ghchenjingqi.github.io/resources/images/world.jpg',
    // 置换比例，凹凸大小
    displacementScale: 0.04,
    displacementQuality: 'medium',
    // 真实感材质
    realisticMaterial: {
      // 粗糙度，0为完全光滑，1完全粗糙
      roughness: 0.9,
      // 金属度，0为完全非金属，1完全金属
      metalness: 0,
    },
    // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果
    postEffect: {
      enable: true
    },
    // 真实投影
    shading: 'realistic',
    // 开启大气层
    atmosphere: {
      show: true
    },
    // 光
    light: {
      // 环境光
      ambient: {
        intensity: 0.2
      },
      // 点光
      main: {
        intensity: 2.5
      }
    }
  },
  series: []
}

// layer叠加纹理
const option3 = {
  backgroundColor: '#000', // 背景色
  // 球
  globe: {
    // 地球缩放，注意会影响到环境贴图一起缩放
    width: 300,
    height: 300,
    top:'center',
    left:'center',
    // 地球贴图
    baseTexture: import.meta.env.VITE_BASE_URL + 'https://ghchenjingqi.github.io/resources/images/world.jpg',
    // 凹凸
    heightTexture: import.meta.env.VITE_BASE_URL +'https://ghchenjingqi.github.io/resources/images/world.jpg',
    // 置换比例，凹凸大小
    displacementScale: 0.02,
    displacementQuality: 'medium',
    // 真实感材质
    realisticMaterial: {
      // 粗糙度，0为完全光滑，1完全粗糙
      roughness: 0.9,
      // 金属度，0为完全非金属，1完全金属
      metalness: 0,
    },
    layers: [
      {
        type: 'blend',
        blendTo: 'emission',
        texture: import.meta.env.VITE_BASE_URL+ 'https://ghchenjingqi.github.io/resources/images/earth2.jpg',
      },
      {
        type: 'overlay',
        texture:import.meta.env.VITE_BASE_URL+ 'https://ghchenjingqi.github.io/resources/images/clouds.png',
        shading: 'lambert',
        distance: 5
      }
    ],
    // 真实投影
    shading: 'lambert',
    // 光
    light: {
      // 环境光
      ambient: {
        intensity: 0.2
      },
      // 点光
      main: {
        intensity: 2.5
      }
    }
  },
  series: []
}

// 球面网格+暂停自动旋转
const option4 = {
  backgroundColor: '#000', // 背景色
  // 球
  globe: {
    width: 300,
    height: 300,
    top:'center',
    left:'center',
    // 地球贴图
    baseTexture: import.meta.env.VITE_BASE_URL + 'https://ghchenjingqi.github.io/resources/images/world.jpg',
    // 兰伯特投影： 等角圆锥投影
    shading: 'lambert',
    viewControl: {
      autoRotate: false
    },
    debug: {
      // 曲面图的网格线
      wireframe: {
        show: true
      }
    },
    // 光
    light: {
      // 环境光
      ambient: {
        intensity: 0.5
      },
      // 点光
      main: {
        intensity: 2.5
      }
    }
  },
  series: []
}
</script>

<template>
  <Echart class="chart" :option="option1" />
  <Echart class="chart" :option="option2" />
  <Echart class="chart" :option="option3" />
  <Echart class="chart" :option="option4" />
  <div class="tip">
    <p class="lt">球体贴图 + 大气层</p>
    <p class="rt">球体缩放 + 凹凸效果 + 后期效果</p>
    <p class="lb">layer叠加纹理</p>
    <p class="rb">球面网格 + 暂停自动旋转</p>
  </div>
</template>

<style scoped>
.chart {
    width: 50%;
    height: 50%;
    float: left;
    padding: 0;
}
.tip{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
  pointer-events: none;
  color: #fff;
  .lt{
    position: absolute;
    left: 1rem;
    top: 1rem;
  }
  .rt{
    position: absolute;
    right: 3rem;
    top: 1rem;
  }
  .lb{
    position: absolute;
    left: 1rem;
    bottom: 2rem;
  }
  .rb{
    position: absolute;
    right:3rem;
    bottom: 2rem
  }
}

</style>
