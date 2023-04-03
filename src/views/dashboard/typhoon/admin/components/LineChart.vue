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
    // eslint-disable-next-line vue/require-prop-types
    chartData: {
      // type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
    setOptions({ TS, STS, TY, STY, SuperTY } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
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
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['热带低压', '热带风暴', '强热带风暴', '台风', '强台风', '超强台风']
        },
        series: [{
          name: '热带风暴',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              }
            }
          },
          data: TS,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '强热带风暴',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#008000',
              lineStyle: {
                color: '#008000',
                width: 2
              }
            }
          },
          data: STS,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '台风',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#FFA500',
              lineStyle: {
                color: '#FFA500',
                width: 2
              }
            }
          },
          data: TY,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        },
        {
          name: '强台风', itemStyle: {
            normal: {
              color: '#FFC0CB',
              lineStyle: {
                color: '#FFC0CB',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: STY,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '超强台风', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: SuperTY,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>
