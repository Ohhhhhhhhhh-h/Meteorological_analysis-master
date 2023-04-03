<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
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
      this.setOptions(this.chartData)
    },
    setOptions() {
      this.chart.setOption({
        dataset: {
          source: [
            ['月', '暴雨', '大暴雨', '特大暴雨'],
            ['1月', 17, 1, 0],
            ['2月', 50, 0, 0],
            ['3月', 187, 9, 0],
            ['4月', 271, 27, 0],
            ['5月', 903, 120, 0],
            ['6月', 1318, 206, 0],
            ['7月', 967, 156, 0],
            ['8月', 908, 107, 0],
            ['9月', 588, 58, 1],
            ['10月', 337, 46, 1],
            ['11月', 111, 13, 0],
            ['12月', 14, 2, 0]
          ]
        },
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
        },
        legend: {
          data: ['暴雨', '大暴雨', '特大暴雨']
        },
        series: [{
          name: '暴雨',
          smooth: true,
          encode: {
            x: '月',
            y: '暴雨'
          },
          type: 'line'
        },
        {
          name: '大暴雨',
          smooth: true,
          type: 'line',
          encode: {
            x: '月',
            y: '大暴雨'
          }
        },
        {
          name: '特大暴雨',
          smooth: true,
          type: 'line',
          encode: {
            x: '月',
            value: '特大暴雨'
          }
        }]
      })
    }
  }
}
</script>
