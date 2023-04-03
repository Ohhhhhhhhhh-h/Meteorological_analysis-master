<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { RainScatter } from '@/api/get_data'

let rain_square_data

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
        rain_square_data = response.data
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        dataset: [
          {
            source: rain_square_data
          }
        ],
        title: {
          text: '84个测站2005-2023年平均降水量',
          left: 'center',
          top: 16
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          // min: 2005,
          type: 'category',
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            symbolSize: 20,
            name: '年平均降水量',
            type: 'bar',
            encode: {
              x: 3,
              y: 1
            }
          }
        ]
      })
    }
  }
}
</script>
