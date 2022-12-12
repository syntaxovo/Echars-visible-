<!-- 呈现图表的组件 -->
<template>
  <div class="sm-container">
    <div class="com-chart" ref="echarts"></div>
  </div>
</template>

<script>
export default {
  name: 'my-container',
  data () {
    return {
      echarts: null, // echarts图表对象
      echartsdata: null, // echarts图表对象数据
      currentPage: 1, // 当前页数
      totalPage: 1, // 总页数
      timerid: null // 定时器标识
    }
  },
  destroyed () {
    // 清除定时器
    clearTimeout(this.timerid)
    window.removeEventListener('resize', this.screenAdapter)
  },
  mounted () {
    this.initecharts()
    this.getdata()
    window.addEventListener('resize', this.screenAdapter)
    // 在页面加载完时，进行屏幕分辨率适配
    this.screenAdapter()
  },
  methods: {
    // 初始化echarts实例对象
    initecharts () {
      this.echarts = this.$echarts.init(this.$refs.echarts, 'chalk')
      // 初始化配置
      const initOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 50,
              color: '#2D3443'
            }
          }

        },
        grid: { // 坐标轴
          left: '10%',
          top: '20%',
          right: '3%',
          bottom: '3%',
          containLabel: true // 距离是否包含坐标轴上的文字
        },
        title: {
          text: '| 商家销售统计',
          textStyle: {
            fontSize: 66
          },
          left: 20,
          top: 20
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        series: [
          {
            type: 'bar',
            barWidth: 50,
            label: {
              show: true,
              position: 'right',
              color: '#fff'
            },
            itemStyle: {
              barBorderRadius: [0, 25, 25, 0],
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#5052EE'
                },
                {
                  offset: 1,
                  color: '#A86EE5'
                }
              ])
            }
          }

        ]
      }
      this.echarts.setOption(initOption)
      // 鼠标移入时停止计时器
      this.echarts.on('mouseover', () => {
        clearTimeout(this.timerid)
      })
      // 移除开启定时器
      this.echarts.on('mouseout', () => {
        this.severtime()
      })
    },
    // 获取相应图表中的数据
    async getdata () {
      const { data: res } = await this.$http.get('seller')
      this.echartsdata = res
      // 对数据进行排序显示
      this.echartsdata.sort((a, b) => a.value - b.value) // 从小到大排列
      this.totalPage = this.echartsdata.length % 5 === 0 ? this.echartsdata.length / 5 : this.echartsdata.length / 5 + 1 // 设置为每页显示5条数据\
      // 进行更新
      this.update()
      this.severtime()
    },
    // 更新数据
    update () {
      // 让每页只显示五条数据
      const start = (this.currentPage - 1) * 5
      const end = this.currentPage * 5
      const showdata = this.echartsdata.slice(start, end)
      // 遍历数组获取x、y轴的数据
      const sellerName = showdata.map((item) => item.name)
      const sellervalue = showdata.map((item) => item.value)
      /* 拆解图表option */
      const dataoption = {
        yAxis: {
          data: sellerName
        },
        series: [
          {
            data: sellervalue
          }
        ]
      }
      this.echarts.setOption(dataoption)
    },
    // 定时器，每隔一段时间更新数据
    severtime () {
      if (this.timerid) {
        clearTimeout(this.timerid)
      }
      // 定时器，每个3s页数加一
      this.timerid = setInterval(() => {
        this.currentPage++
        this.update()
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1
        }
        this.update()
      }, 3000)
    },
    // 屏幕分辨率适配
    screenAdapter () {
      const titleFontsize = this.$refs.echarts.offsetWidth / 100 * 3.6
      const adapteroption = {
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontsize
            }
          }
        },
        title: {
          text: '| 商家销售统计',
          textStyle: {
            fontSize: titleFontsize
          }
        },
        series: [
          {
            barWidth: titleFontsize,
            itemStyle: {
              barBorderRadius: [0, titleFontsize / 2, titleFontsize / 2, 0]
            }
          }
        ]
      }
      this.echarts.setOption(adapteroption)
      // 手动调用图表对象的resize
      this.echarts.resize()
    }
  }
}
</script>

<style lang="less" scoped>

</style>>
