<template>
    <div class="sm-container">
    <div class="com-chart" ref="echarts"></div>
  </div>
</template>

<script>
export default {
  name: 'my-rank',
  data () {
    return {
      echartsinstance: null, // 初始化的图表容器
      echartsdata: [], // 图表的相关数据
      startValue: 0, // 图表数据平移的起始值
      endValue: 9, // 图表数据平移的终止值
      timer: null // 定时器的标识
    }
  },
  mounted () {
    // 页面挂载时请求数据
    this.init()
    this.getdate()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    // 清除定时器
    clearInterval(this.timer)
  },
  methods: {
    init () { // 初始化图表
      this.echartsinstance = this.$echarts.init(this.$refs.echarts, 'chalk')
      const option = {
        tooltip: {
          show: true
        },
        series: [
          { type: 'bar' }
        ],
        grid: {
          top: '40%',
          left: '5%',
          bottom: '5%',
          right: '5%',
          containLabel: true
        },
        title: {
          text: '| 地区销售排行',
          left: 20,
          top: 20
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value'
        }
      }
      this.echartsinstance.setOption(option)
      // 设置鼠标移入停止计时器，移除开启定时器事件
      this.echartsinstance.on('mouseover', () => {
        clearInterval(this.timer)
      })
      this.echartsinstance.on('mouseout', () => {
        this.severtimer()
      })
    },
    async getdate () { // 发送ajax请求获取相应图表的json数据
      const { data: ret } = await this.$http.get('rank')
      console.log(ret)
      this.echartsdata = ret
      this.echartsdata.sort((a, b) => {
        return b.value - a.value
      })
      // 对数据进行排序处理由大到小
      this.updated()
      this.severtimer()
    },
    updated () { // 更新数据
      // 对获取的数据进行处理
      const colorArr = [
        ['#0BA82C', '#4FF778'],
        ['#2E72BF', '#23E5E5'],
        ['#5052EE', '#AB6EE5']
      ]
      const xAxisdata = this.echartsdata.map(item => { return item.name })
      const yAxisdata = this.echartsdata.map(item => item.value)
      const updateOption = {
        dataZoom: {
          show: false,
          startVlaue: this.startValue,
          endValue: this.endValue
        },
        xAxis: {
          data: xAxisdata
        },
        series: [
          {
            type: 'bar',
            data: yAxisdata,
            itemStyle: {
              color: (arg) => {
                let targetColorArr = null
                // console.log(arg)
                if (arg.vlaue > 300) {
                  targetColorArr = colorArr[0]
                } else if (arg.value > 200) {
                  targetColorArr = colorArr[1]
                } else {
                  targetColorArr = colorArr[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0]
                  }, {
                    offset: 1,
                    color: targetColorArr[1]
                  }
                ])
              }
            }
          }
        ]
      }
      this.echartsinstance.setOption(updateOption)
    },
    screenAdapter () { // 实现屏幕自适应
      const titleFontsize = this.$refs.echarts.offsetWidth / 100 * 3.6
      const adapteroption = {
        title: {
          textStyle: {
            fontSize: titleFontsize
          }
        },
        series: [
          {
            barWidth: titleFontsize,
            itemStyle: {
              barBorderRadius: [titleFontsize / 2, titleFontsize / 2, 0, 0]
            }
          }
        ]
      }
      this.echartsinstance.setOption(adapteroption)
      this.echartsinstance.resize()
    },
    severtimer () { // 定时器实现按时平移
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endvalue > this.echartsdata - 1) {
          this.startValue = 0
          this.endValue = 9
        }
        this.updated()
      }, 1000)
    }
  }
}
</script>

<style>

</style>
