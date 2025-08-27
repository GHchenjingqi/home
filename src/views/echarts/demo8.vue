<script setup>
import Echart from '@/components/Echart.vue'
import * as echarts from 'echarts';
// 间隙空心饼图
const option1 = {
    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ["1月", "2月","3月","4月","5月","6月","7月","8月"],
        axisLabel: {
            fontSize: 12,
            color: '#7AADFF' // 设置 X 轴刻度文字的颜色
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#BAE7FF' // 设置 X 轴线的颜色
            }
        }
    },
    yAxis: {
        name: '万吨',
        type: 'value',
        nameGap: 30, // 名称与轴线之间的距离
        nameTextStyle: {
            align: 'left', // 设置 Y 轴名称的文字对齐方式为左对齐
            color: '#ddd', // 设置 Y 轴名称的文字颜色
            fontSize: 12, // 设置 Y 轴名称的文字大小
            padding: [0, 0, 0, -28] // 调整名称文字的位置，[top, right, bottom, left]
        },
        splitLine: {
            show: true,
            lineStyle: {
                width: 2,
                color: "#0E294C",
            }
        },
        axisLabel: {
            fontSize: 12,
            color: '#ddd' // 设置 X 轴刻度文字的颜色
        }
    },
    series: [
        {
            data: [50,80,40,120,110,80,60,180],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: '#02A6FF',
            },
            lineStyle: {
                color: '#02A6FF',
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#1B4386'
                    },
                    {
                        offset: 1,
                        color: '#0A1A3D'
                    }
                ])
            },
        }
    ]
}
</script>

<template>
  <Echart class="chart" :option="option1" />
</template>

<style scoped>
.chart {
    height: 100%;
    background: rgb(10,25,61);
}
</style>
