<template>
  <div class="screen-container"  style="containerStyle">
    <header  class="screen-header">
      <div>
        <img src="../../public/static/img/header_border_dark.png" alt="">
      </div>
      <span class="logo">
        <img src="../../public/static/img/logo_dark.png" alt="" />
      </span>
      <span class="title">电商平台实时监控系统</span>
      <div class="title-right">
        <img  src="../../public/static/img/qiehuan_dark.png" class="qiehuan"  >
        <span class="datetime">2049-01-01 00:00:00</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top"  :class="fullScreenStatus.hot?'fullscreen' :''">
          <!-- 销量趋势图表 -->
          <hot ref="hot"></hot>
          <div class="resize" >
              <span @click="changeitem('hot')" :class="['iconfont' ,fullScreenStatus.hot?'icon-compress-alt':'icon-expand-alt' ]"></span>
          </div>
        </div>
        <div id="left-bottom"  :class="fullScreenStatus.mymap?'fullscreen' :''" >
          <!-- 商家销售金额图表 -->
          <mymap ref="mymap"></mymap>
          <div class="resize">
              <span @click="changeitem('mymap')" :class="['iconfont' ,fullScreenStatus.mymap?'icon-compress-alt':'icon-expand-alt' ]"></span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top" :class="fullScreenStatus.trend?'fullscreen' :''"  >
          <!-- 商家分布图表 -->
          <trend ref="trend"></trend>
          <div class="resize">
              <span @click="changeitem('trend')" :class="['iconfont' ,fullScreenStatus.trend?'icon-compress-alt':'icon-expand-alt' ]"></span>
          </div>
        </div>
        <div id="middle-bottom"  :class="fullScreenStatus.seller?'fullscreen' :''" >
          <!-- 地区销量排行图表 -->
          <seller ref="seller"></seller>
          <div class="resize">
              <span @click="changeitem('seller')" :class="['iconfont' ,fullScreenStatus.seller?'icon-compress-alt':'icon-expand-alt' ]"></span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top" :class="fullScreenStatus.rank?'fullscreen' :''" >
          <!-- 热销商品占比图表 -->
          <rank ref="rank"/>
          <div class="resize">
              <span @click="changeitem('rank')" :class="['iconfont' ,fullScreenStatus.rank?'icon-compress-alt':'icon-expand-alt' ]"></span>
          </div>
        </div>
        <div id="right-bottom" :class="fullScreenStatus.stock?'fullscreen' :''" >
            <stock ref="stock"/>
            <div class="resize">
              <span @click="changeitem('stock')" :class="['iconfont' ,fullScreenStatus.stock?'icon-compress-alt':'icon-expand-alt' ]"></span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'my-screen',
  components: {
    hot: () => import('@/views/hotproduction.vue'),
    mymap: () => import('@/views/mappage.vue'),
    trend: () => import('@/views/trendPage.vue'),
    seller: () => import('@/views/sellerPage.vue'),
    rank: () => import('@/views/Rankpage.vue'),
    stock: () => import('@/views/Stockpage.vue')
  },
  data () {
    return {
      fullScreenStatus: { // 全屏状态数据的定义
        hot: false,
        mymap: false,
        trend: false,
        seller: false,
        rank: false,
        stock: false
      }
    }
  },
  methods: {
    changeitem (chartname) {
      // 1 需要改变fullScreenStatus的数据
      this.fullScreenStatus[chartname] = !this.fullScreenStatus[chartname]
      // 2 需要调用每一个图表组件的sreenAdapter方法
      console.log(this.$refs[chartname])
      this.$nextTick(() => {
        this.$refs[chartname].screenAdapter()
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 全屏样式的定义
.fullscreen {
  position: fixed!important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

.screen-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
      img {
        width: 100%;
      }
    }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position:absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
