<script setup>
import Echart from '@/components/Echart.vue'
// 间隙空心饼图
const option1 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        data: ['抖音', '快手'],
        left: '80%',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 30,
        textStyle: {
            color: '#ddd', // 这里设置图例的字体颜色为红色
            fontSize: 12,
        },
    },
    xAxis: [
        {
            type: 'category',
            data: ["6月","7月","8月","9月","10月"],
            axisPointer: {
                type: 'shadow'
            },
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
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '万吨',
            min: 0,
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "transparent",
                }
            },
            nameGap: 30, // 名称与轴线之间的距离
            nameTextStyle: {
                align: 'left', // 设置 Y 轴名称的文字对齐方式为左对齐
                color: '#ddd', // 设置 Y 轴名称的文字颜色
                fontSize: 12, // 设置 Y 轴名称的文字大小
                padding: [0, 0, 0, -28] // 调整名称文字的位置，[top, right, bottom, left]
            },
            axisLabel: {
                fontSize: 12,
                color: '#ddd' // 设置 X 轴刻度文字的颜色
            }
        },
    ],
    series: [
        {
            name: '抖音',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' 万吨';
                }
            },
            data: [100,150,63,88,71],
            barWidth: '20px',
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: '#1EE7E7' }, // 起始颜色
                        { offset: 1, color: '#11657D' }  // 结束颜色
                    ],
                    global: false // 缺省为 false
                }
            }
        },
        {
            name: '快手',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' 万吨';
                }
            },
            barWidth: '20px',
            data: [45,89,55,102,80],
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: '#1890FF' }, // 起始颜色
                        { offset: 1, color: '#0E4685' }  // 结束颜色
                    ],
                    global: false // 缺省为 false
                }
            }
        },
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
