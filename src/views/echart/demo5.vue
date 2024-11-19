<script setup>
import Echart from '@/components/Echart.vue'
let option = {
  title: {
    text: '',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '75%',
      data: [
        { value: 1048, name: '百度搜索' },
        { value: 735, name: '谷歌搜索' },
        { value: 580, name: '360搜索' },
        { value: 484, name: '搜狗搜索' },
        { value: 300, name: 'UC搜索' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
</script>

<template>
  <Echart class="chart" :option="option" />
</template>

<style scoped>
.chart{
  height: 100%;
}
</style>
