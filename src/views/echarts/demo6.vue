<script setup>
import Echart from '@/components/Echart.vue'
// 间隙空心饼图
const option1 = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    textStyle: {
      color: '#ddd' // 这里设置图例的字体颜色为红色
    },
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '短视频平台',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '抖音' },
        { value: 580, name: '头条' },
        { value: 484, name: '快手' },
        { value: 300, name: '微博' }
      ]
    }
  ]
};
</script>

<template>
  <Echart class="chart" :option="option1" />
</template>

<style scoped>
.chart {
  height: 100%;
}
</style>
