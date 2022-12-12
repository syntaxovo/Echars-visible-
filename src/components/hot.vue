<template>
  <div class="sm-container">
  <div class="com-chart" ref="echarts"></div>
  <span class="iconfont icon-arrow-down arr-left" @click="goleft" :style="comstyle"></span>
  <span class="iconfont icon-arrow-up arr-right" @click="goright" :style="comstyle" ></span>
  <span class='itemname'>{{catname}}</span>
</div>
</template>

<script>
export default {
  name: 'my-rank',
  data () {
    return {
      echartsinstance: null, // 初始化的图表容器
      echartsdata: null, // 图表的相关数据
      currentindex: 0, // 当前图表的索引值
      titleFontsize: 0
    }
  },
  computed: {
    catname () {
      if (!this.echartsdata) {
        return ''
      } else {
        return this.echartsdata[this.currentindex].name
      }
    },
    comstyle () {
      return {
        fontSize: this.titleFontsize + 'px'
      }
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
  },
  methods: {
    goleft () {
      // 点击实现currentindex--
      this.currentindex--
      if (this.currentindex < 0) {
        this.currentindex = this.echartsdata.length - 1
      }
      this.updated()
    },
    goright () {
      this.currentindex++
      if (this.currentindex > this.echartsdata.length - 1) {
        this.currentindex = 0
      }
      this.updated()
    },
    init () { // 初始化图表
      this.echartsinstance = this.$echarts.init(this.$refs.echarts, 'chalk')
      const option = {
        tooltip: {
          show: true,
          formatter: (arg) => {
            const thirdCategory = arg.data.children
            // 计算出总数据值
            let total = 0
            thirdCategory.forEach(item => {
              total += item.value
            })
            let retstr = ''
            thirdCategory.forEach(item => {
              retstr += `
                ${item.name}:${parseInt(item.value / total * 100) + '%'}
                </br>
              `
            })
            return retstr
          }
        },
        legend: {
          top: '15%',
          icon: 'circle'
        },
        title: {
          text: '| 热销商品的占比',
          top: 20,
          left: 20
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false
            },
            emphasis: { // 高亮情况下的样式
              label: {
                show: true
              },
              labelLine: {
                show: false
              }
            }
          }
        ]
      }
      this.echartsinstance.setOption(option)
    },
    async getdate () { // 发送ajax请求获取相应图表的json数据
      const { data: ret } = await this.$http.get('hotproduct')
      console.log(ret)
      this.echartsdata = ret
      this.updated()
    },
    updated () { // 更新数据
    // 对获取的数据进行处理
      const legendarr = this.echartsdata[this.currentindex].children.map(item => item.name)
      const seriesarr = this.echartsdata[this.currentindex].children.map(item => {
        return {
          name: item.name,
          value: item.value,
          children: item.children
        }
      })
      const updateOption = {
        legend: {
          data: legendarr
        },
        series: [
          {
            data: seriesarr
          }
        ]
      }
      this.echartsinstance.setOption(updateOption)
    },
    screenAdapter () { // 实现屏幕自适应
      this.titleFontsize = this.$refs.echarts.offsetWidth / 100 * 3.6
      const adapteroption = {
        title: {
          textStyle: {
            fontSize: this.titleFontsize
          }
        },
        legend: {
          itemWidth: this.titleFontsize / 2,
          itemHeight: this.titleFontsize / 2,
          itemGap: this.titleFontsize / 2,
          textStyle: {
            fontSize: this.titleFontsize / 2
          }
        },
        series: [
          {
            radius: this.titleFontsize * 4.5,
            center: ['50%', '60%']
          }
        ]
      }
      this.echartsinstance.setOption(adapteroption)
      this.echartsinstance.resize()
    }
  }
}
</script>

 <style lang="less" scoped>
  .arr-left{
    position: absolute;
    top:50%;
    left: 10%;
    translate: transformY(-50%);
    cursor: pointer;
    color: #fff;
  }
  .arr-right{
    position: absolute;
    top:50%;
    right: 10%;
    translate: transformY(-50%);
    cursor: pointer;
    color: #fff;
  }
  .itemname{
    position: absolute;
    bottom: 30px;
    right: 150px;
  }
 </style>
