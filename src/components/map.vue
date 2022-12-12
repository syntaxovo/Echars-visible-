<template>
    <div class="sm-container" @dblclick="reversemap">
    <div class="com-chart" ref="echarts"></div>
  </div>
</template>

<script>
import { getProvinceMapInfo } from '@/utils/map_utils.js'
import axios from 'axios'
export default {
  name: 'my-map',
  data () {
    return {
      echartsinstance: null, // 图表实例
      echartsdata: null, // 图表数据
      provinceInfodata: [] // 省级地图数据
    }
  },
  mounted () {
    this.init()
    this.getdata()
    window.addEventListener('resize', this.sreeenAdapter)
    this.sreeenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.sreeenAdapter)
  },
  methods: { // 双击回到中国地图
    reversemap () {
      const reverseOption = {
        geo: {
          map: 'china'
        }
      }
      this.echartsinstance.setOption(reverseOption)
    },
    async init () {
      this.echartsinstance = this.$echarts.init(this.$refs.echarts, 'chalk')
      // http://127.0.0.1:9000/static/map/china.json
      const ret = await axios.get('http://127.0.0.1:8999/static/map/china.json')
      console.log(ret)
      this.$echarts.registerMap('china', ret.data)
      const initOption = {
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        },
        title: {
          text: '| 商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '6%',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        }
      }
      this.echartsinstance.setOption(initOption)
      // 获得省级地图数据
      this.echartsinstance.on('click', async (arg) => {
      //  console.log(arg.name)
        const provinceInfo = getProvinceMapInfo(arg.name)
        console.log(provinceInfo)
        // 如果省级地图没有获取到，发送请求
        if (!this.provinceInfodata[provinceInfo.key]) {
          const ret = await axios.get('http://127.0.0.1:8999' + provinceInfo.path)
          this.provinceInfodata[provinceInfo.key] = ret.data
          this.$echarts.registerMap(provinceInfo.key, ret.data)
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.echartsinstance.setOption(changeOption)
      }
      )
    },
    async getdata () {
      const { data: ret } = await this.$http.get('map')
      this.echartsdata = ret
      console.log(ret)
      this.update()
    },
    update () {
      const seriesarr = this.echartsdata.map(item => {
        /*
        这个对象代表的是一个类别下的所有散点数据
        如果想要在地图中显示散点的数据，所以我们需要增加一个配置
        coordinateSystem:geo
        */
        return {
          type: 'effectScatter', // 配置闪点图
          name: item.name,
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          data: item.children,
          coordinateSystem: 'geo'
        }
      })
      const legendarr = this.echartsdata.map((item) => item.name)
      const updateoption = {
        series: seriesarr,
        legend: {
          data: legendarr
        }
      }
      this.echartsinstance.setOption(updateoption)
    },
    sreeenAdapter () {
      const titleFontsize = this.$refs.echarts.offsetWidth / 100 * 3.6
      const adapteroption = {
        title: {
          textStyle: {
            fontSize: titleFontsize
          }
        },
        legend: {
          itemWidth: titleFontsize / 2,
          itemHeight: titleFontsize / 2,
          itemGap: titleFontsize / 2,
          textStyle: {
            fontSize: titleFontsize / 2
          }
        }
      }
      this.echartsinstance.setOption(adapteroption)
      this.echartsinstance.resize()
    }
  }
}
</script>

<style>

</style>
