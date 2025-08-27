<script setup>
import { ref } from 'vue'
import Echart from '@/components/Echart.vue'

// 数据格式
let data3 = [
  ['类别', '超长', '超高', '超宽'],
  ['7/10', 43, 85, 93],
  ['7/11', 83, 73, 55],
  ['7/12', 86, 65, 82],
  ['7/13', 86, 65, 82],
  ['7/14', 86, 65, 82],
  ['7/15', 86, 65, 82],
  ['7/16', 72, 53, 39]
]

// 多频柱状图
 const option1 = {
  legend: {
    textStyle: {
      color: '#ddd' // 这里设置图例的字体颜色为红色
    }
  },
  tooltip: {},
  dataset: {
    source: data3
  },
  xAxis: [
    {
      type: 'category',
      name: "日期",
    }
  ],
  yAxis: {
    name: "单位（辆）",
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#2A384D",
      }
    },
  },
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
</script>

<template>
  <Echart class="chart" :option="option1" />
</template>

<style scoped>
.chart{
  height: 100%;
}
</style>
