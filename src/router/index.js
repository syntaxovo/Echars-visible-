import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [

  {
    path: '/',
    redirect: '/screen'

  },
  {
    path: '/screen',
    component: () => import('@/views/screen.vue')
  },
  {
    path: '/sellerpage',
    component: () => import('@/views/sellerPage.vue')
  }, {
    path: '/trendpage',
    component: () => import('@/views/trendPage.vue')
  }, {
    path: '/mappage',
    component: () => import('@/views/mappage.vue')
  }, {
    path: '/rankpage',
    component: () => import('@/views/Rankpage.vue')
  }, {
    path: '/hotpage',
    component: () => import('@/views/hotproduction.vue')
  }, {
    path: '/stockpage',
    component: () => import('@/views/Stockpage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
