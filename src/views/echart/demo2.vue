<script setup>
import Echart from '@/components/Echart.vue'
// 获取今天的日期
let day = new Date().getDate();
let weeks = []
for (let i = 0; i < 7; i++) {
    weeks.push(day - i)
}
weeks = weeks.sort((a, b) => a - b)

// 基础柱状图
const option1 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#fff'
            }
        }
    },
    xAxis: [
        {
            type: 'category',
            name: "日期",
            data: weeks,
            axisPointer: {
                type: 'shadow'
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: "单位（辆）",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value}'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2A384D",
                }
            },
        },
    ],
    series: [
        {
            name: '柱状图',
            type: 'bar',
            data: [20, 49, 70, 232, 200, 150, 80]
        },
    ]
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
