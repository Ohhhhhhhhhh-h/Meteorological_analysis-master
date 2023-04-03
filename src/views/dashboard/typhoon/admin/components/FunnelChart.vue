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
        title: {
          text: '风速'
        },
        dataset: {
          source: [[1, 8], [2, 9], [3, 10], [4, 12], [5, 13], [6, 14], [7, 15], [8, 16], [9, 17], [10, 18], [11, 20], [12, 21], [13, 23], [14, 25], [15, 28], [16, 30], [17, 33], [18, 35], [19, 38], [20, 40], [21, 42], [22, 43], [23, 45], [24, 48], [25, 50], [26, 52], [27, 53], [28, 55], [29, 58], [30, 60], [31, 62], [32, 65], [33, 68], [34, 70], [35, 72], [36, 75], [37, 78]]
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}{b}m/s'
        },
        // legend: {
        //   top: 'bottom'
        // },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        series: [
          {
            name: '风速',
            type: 'pie',
            radius: [15, 95],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            encode: {
              itemName: 1,
              value: 1
            }
          }
        ]
      })
    }
  }
}
</script>
