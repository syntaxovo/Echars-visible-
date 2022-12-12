import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入css全局样式
import '@/assets/css/babel.css'
// 引入字体图标
import '../public/font/iconfont.css'
// 将全局echarts挂载到vue原型上
Vue.prototype.$echarts = window.echarts
// 配置基准路径配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到vue原型
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
