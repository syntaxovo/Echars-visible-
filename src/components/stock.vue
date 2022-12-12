<template>
    <div class="sm-container">
    <div class="com-chart" ref="echarts"></div>
  </div>
</template>

<script>
export default {
  name: 'my-stock',
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timerId)
  },
  mounted () {
    // 页面挂载时请求数据
    this.init()
    this.getdate()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  data () {
    return {
      initecharts: null,
      echartsdata: null,
      currentindex: 0,
      timerId: null // 定时器的标识
    }
  },
  methods: {
    init () { // 初始化echarts图表实例
      this.initecharts = this.$echarts.init(this.$refs.echarts, 'chalk')
      const option = {
        title: {
          text: '| 库存和销量分析',
          top: 20,
          left: 20
        }
      }
      this.initecharts.setOption(option)
      this.initecharts.on('mouseover', () => { // 鼠标移入关闭定时器
        clearInterval(this.timerId)
      })
      this.initecharts.on('mouseout', () => { // 鼠标移入关闭定时器
        this.servertimer()
      })
    },
    async getdate () { // 获取数据
      const { data: ret } = await this.$http.get('stock')
      console.log(ret)
      this.echartsdata = ret
      this.update()
      this.servertimer() // 获取数据时开启定时器
    },
    update () { // 更新数据
      const centerArr = [
        ['18%', '40%'],
        ['50%', '40%'],
        ['82%', '40%'],
        ['34%', '75%'],
        ['66%', '75%']
      ]
      const colorArr = [
        ['#4FF778', '#0BA82C'],
        ['#E5DD45', '#E8B11C'],
        ['#E8821C', '#E55445'],
        ['#5052EE', '#AB6EE5'],
        ['#23E5E5', '#2E72BF']
      ]
      const start = this.currentindex * 5
      const end = (this.currentindex + 1) * 5
      const showdata = this.echartsdata.slice(start, end)
      const seriesarr = showdata.map((item, index) => {
        return {
          type: 'pie',
          hoverAnimation: false, // 关闭鼠标移入时的动画效果
          label: {
            position: 'center',
            color: colorArr[index][0]
          },
          labelLine: {
            show: false
          },
          center: centerArr[index],
          data: [
            {
              name: item.name + '\n' + '\n' + item.sales,
              value: item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0]
                  }, {
                    offset: 1,
                    color: colorArr[index][1]
                  }
                ])
              }
            },
            {
              value: item.stock,
              itemStyle: {
                color: '#333843'
              }
            }
          ]
        }
      })
      const updateOption = {
        series: seriesarr

      }
      this.initecharts.setOption(updateOption)
    },
    screenAdapter () {
      const titleFontsize = this.$refs.echarts.offsetWidth / 100 * 3.6
      const innerradius = titleFontsize * 2.5
      const outradius = innerradius * 1.2
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontsize * 0.5
          }
        },
        series: [
          {
            type: 'pie',
            radius: [outradius, innerradius],
            label: {
              fontSize: titleFontsize * 0.5
            }
          },
          {
            type: 'pie',
            radius: [outradius, innerradius],
            label: {
              fontSize: titleFontsize * 0.5
            }
          },
          {
            type: 'pie',
            radius: [outradius, innerradius],
            label: {
              fontSize: titleFontsize * 0.5
            }
          },
          {
            type: 'pie',
            radius: [outradius, innerradius],
            label: {
              fontSize: titleFontsize * 0.5
            }
          },
          {
            type: 'pie',
            radius: [outradius, innerradius],
            label: {
              fontSize: titleFontsize * 0.5
            }
          }
        ]
      }
      this.initecharts.setOption(adapterOption)
      this.initecharts.resize()
    },
    servertimer () { // 设计定时器，让图表数据跟新
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentindex++
        if (this.currentindex > 1) {
          this.currentindex = 0
        }
        this.update()
      }, 3000)
    }
  }

}

</script>

<style>

</style>
