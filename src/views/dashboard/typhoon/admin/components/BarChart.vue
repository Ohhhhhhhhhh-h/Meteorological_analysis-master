<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['冬季', '春季', '夏季', '秋季'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '热带风暴',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [166, 662, 2744, 1156],
          animationDuration
        }, {
          name: '强热带风暴',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [52, 329, 1595, 793],
          animationDuration
        }, {
          name: '台风',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [38, 287, 1593, 820],
          animationDuration
        }, {
          name: '强台风',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [24, 189, 1222, 476],
          animationDuration
        }, {
          name: '超级台风',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [21, 66, 583, 334, 270],
          animationDuration
        }]
      })
    }
  }
}
</script>
