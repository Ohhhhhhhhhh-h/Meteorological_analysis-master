<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { RainScatter } from '@/api/get_data'

let rain_scatter_data

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
      RainScatter().then(response => {
        rain_scatter_data = [['year', 'precipitation', 'temperature']].concat(response.data)
        this.initChart()
      })
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
      this.chart = echarts.init(this.$el, 'macarons', { renderer: 'canvas' })
      this.chart.setOption({
        dataset: [
          {
            source: rain_scatter_data
          }
        ],
        title: {
          text: '气温-降水量分布图',
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {}
          }
        },
        legend: {
          orient: 'vertical',
          right: 10
        },
        xAxis: {
          min: 2005,
          type: 'value',
          splitNumber: 18
        },
        yAxis: {
        },
        series: [
          {
            name: '降水量',
            type: 'scatter',
            dimensions: ['x', 'y'],
            symbolSize: 18,
            itemStyle: {
              opacity: 0.9
            },
            large: true
          },
          {
            name: '气温',
            type: 'line',
            encode: {
              x: 'year',
              y: 'temperature'
            }
          }
        ]
      })
    }
  }
}
</script>
