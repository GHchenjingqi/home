<script setup>
import {onMounted, onBeforeUnmount, ref} from "vue";
import * as echarts from 'echarts';
import 'echarts-gl';

// 获取下级地图
const  getJSON = async ({adcode,lastlevel}, callback)=> {
  const urls = lastlevel == 0 ? `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}` : `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full`
  const jsons =  await fetch(urls)
  if(jsons.status == 200){
    const resdata = await jsons.json()
    callback(resdata)
  }else{
    console.error("地图数据获取失败")
    callback(null)
  }
}

const setOptions = (myChart,name) => {
  const option = {
    // 鼠标经过悬浮信息
    tooltip: {
      trigger: "item",
      position: "inside",
      formatter: "{b}",
      backgroundColor: "rgba(50, 50, 50, 0.7)",
      textStyle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: "12px",
      },
    },
    series: [
      {
        type: "map3D",
        map: name,
        roam: true,
        // 标签的相关设置
        label: {
          show: true, // (地图上的城市名称)是否示标签
          distance: 5,
          formatter: function (params) {
            return params.name ? params.name : " ";
          },
          textStyle: {
            // 标签的字体样式
            color: "#fff", // 地图初始化区域字体颜色
            fontSize: 12, // 字体大小
          },
        },
        // 高亮状态下的相关样式
        emphasis: {
          label: {
            // label 高亮时的配置
            show: true,
            textStyle: {
              color: "#fff", // 高亮时标签颜色变为 白色
              fontSize: 14, // 高亮时标签字体 变大
            },
          },
          itemStyle: {
            // itemStyle 高亮时的配置
            color: "#fb5021", // 高亮时地图板块颜色改变
          },
        },
        itemStyle:{
          color: "#0b59c1", // 地图板块的颜色
          opacity: 1, // 图形的不透明度 [ default: 1 ]
          borderWidth: 0.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域
          borderColor: "#fff", // 图形描边的颜色。[ default: #333 ]
        },
        // 光照相关的设置
        light: {
          main: {
            // 场景主光源的设置，在 globe 组件中就是太阳光。
            color: "#ffffff", // 主光源的颜色。
            intensity: 1.2, // 主光源的强度。
            shadow: true, // 主光源是否投射阴影。默认关闭。���启阴影可以给场景带来更真实和有次的光照效果。会增加程序的运行开销。
            shadowQuality: "high", // 阴影的质量。可选'low', 'medium', 'high', 'ultra'
            alpha: 48, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。
            beta: 10, // 主光源绕 y 轴，即左右旋转的角度。
          },
        },
      },
    ],
  };
  myChart.setOption(option)
}

const showResetButton = ref(false); // 控制返回按钮的显示

const resetMap = () => {
  if (myChart) {
    myChart.clear();
    echarts.registerMap('china', initialGeoJson);
    setOptions(myChart, 'china');
    mapData = initialGeoJson.features;
    lastName = null;
    showResetButton.value = false; // 重置时隐藏返回按钮
  }
};

let myChart = null, mapData = null ,lastName = null, initialGeoJson = null
const init = async ()=>{
  initialGeoJson = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json').then(res => res.json())
  myChart = echarts.init(document.getElementById("chart"));
  // 注册方式一：
  echarts.registerMap('china', initialGeoJson);
  setOptions( myChart, 'china')
  mapData = initialGeoJson.features

  // 监听窗口大小变化
  const resizeChart = () => {
    if (myChart) {
      myChart.resize();
    }
  };
  window.addEventListener('resize', resizeChart);

  // 清理事件监听器
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeChart);
  });

  myChart.on("click", function (params) {
    if (params.data) {
      const { name } = params.data;
      const region = mapData.find(feature => feature.properties.name === name);
      if (region && name != lastName) {
        const adcode = region.properties.adcode;
        const lastlevel = region.properties.childrenNum
        getJSON({adcode,lastlevel},async (data)=>{
          if(data){
            myChart.clear()
            lastName = name
            echarts.registerMap(name, data);
            mapData = data.features
            // 配置option
            setOptions( myChart, name)
            showResetButton.value = true; // 下钻时显示返回按钮
          }
        })
      }
    }
  });
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="chart" id="chart"></div>
  <button v-if="showResetButton" @click="resetMap" class="reset-button">返回</button>
</template>

<style scoped>
.chart {
    width: 100%;
    height: 100%;
    background: #111;
    padding: 0;
}

.reset-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #fff;
  color: #000;
  border: none;
  cursor: pointer;
  z-index: 10;
}
</style>
