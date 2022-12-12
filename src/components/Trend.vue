<template>
    <div class="sm-container">
      <div class="title" :style="fontsize">
        <span>{{showtitle}}</span>
      <span class="iconfont title-icon" @click="showsel=!showsel" :style="fontsize"> &#xe6eb;</span>
        <div class="sellect" v-show="showsel">
            <div class="sel-item" v-for="(item) in selecrTypes " :key='item.key'
            @click="handle(item.key)">
              <span>{{item.text}}</span>
            </div>

        </div>
    </div>
    <div class="com-chart" ref="echarts"></div>
  </div>

</template>

<script>
export default {
  name: 'My-trend',
  data () {
    return {
      echartsinstance: null, // echarts图表实例
      echartsdata: null, // echarts图表相关数据
      showsel: false, // 是否显示可选项
      choseType: 'map', // 显示的数据类型
      titlefontsize: null // 标题文字的大小
    }
  },
  mounted () {
    this.initecharts()
    this.getdata()
    window.addEventListener('resize', this.scrennAdapter)
    this.scrennAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.scrennAdapter)
  },
  computed: {
    fontsize () {
      return {
        fontSize: this.titlefontsize + 'px'
      }
    },
    showtitle () {
      if (!this.echartsdata) {
        return ''
      } else {
        return this.echartsdata[this.choseType].title
      }
    },
    // 下拉选项的确认
    selecrTypes () {
      if (!this.echartsdata) {
        return []
      } else {
        return this.echartsdata.type.filter(item => item.key !== this.choseType)
      }
    }
  },
  methods: {
    handle (currentType) {
      this.choseType = currentType
      this.update()
      this.showsel = false
    },
    // 初始化echarts图表
    initecharts () {
      this.echartsinstance = this.$echarts.init(this.$refs.echarts, 'chalk')
      const initOption = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '35%',
          bottom: '1%',
          containLabel: true
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        }
      }
      this.echartsinstance.setOption(initOption)
    },
    // 获取echarts图表的数据
    async getdata () {
      // axios发请求获取数据
      const { data: res } = await this.$http.get('trend')
      this.echartsdata = res
      // 更新数据
      console.log(this.echartsdata)
      this.update()
    },
    // 更新数据
    update () {
    // 半透明的颜色值
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      // 获取x轴类目轴数据
      const xdata = this.echartsdata.common.month
      const ydata = this.echartsdata[this.choseType].data
      const yvalue = ydata.map((item, index) => {
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: this.choseType,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index]
              }, {
                offset: 1,
                color: colorArr2[index]
              }
            ])
          }
        }
      })
      // 获得图例信息
      const legendname = ydata.map(item => item.name)
      const dataoption = {
        xAxis: {
          data: xdata
        },
        legend: {
          data: legendname
        },
        series: yvalue
      }
      this.echartsinstance.setOption(dataoption)
    },
    scrennAdapter () {
      this.titlefontsize = this.$refs.echarts.offsetWidth / 100 * 3.6
      const adapteroption = {
        legend: {
          itemWidth: this.titlefontsize,
          itemHeight: this.titlefontsize,
          itemGap: this.titlefontsize,
          textStyle: {
            fontSize: this.titlefontsize / 1.6
          }
        }
      }
      this.echartsinstance.setOption(adapteroption)
      this.echartsinstance.resize()
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: #fff;
  .title-icon{
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>>
