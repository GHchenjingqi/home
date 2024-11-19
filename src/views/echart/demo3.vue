<script setup>
import Echart from '@/components/Echart.vue'
const option1 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                type: "dashed",
                color: "#2A384D",
            }
        },
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: '20%', // 这里变窄
        itemStyle: {
            borderRadius: [50, 50, 0, 0] // 这里设置圆角的大小
        }
    }]
}
</script>

<template>
  <Echart class="chart" :option="option1" />
</template>

<style scoped>
.chart{
  height: 100%;
}
</style>
