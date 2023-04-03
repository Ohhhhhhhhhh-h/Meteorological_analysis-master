<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  name: 'PolarBar',
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
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption(
        {
          toolbox: {
            feature: {
              dataZoom: {
                yAxisIndex: false
              },
              saveAsImage: {
                pixelRatio: 2
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            bottom: 90
          },
          dataZoom: [
            {
              type: 'inside'
            },
            {
              type: 'slider'
            }
          ],
          xAxis: {
            // data: data.categoryData,
            silent: false,
            splitLine: {
              show: false
            },
            splitArea: {
              show: false
            }
          },
          yAxis: {
            splitArea: {
              show: false
            }
          },
          series: [
            {
              type: 'bar',
              // data: data.valueData,
              // Set `large` for large data amount
              large: true
            }
          ]
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
