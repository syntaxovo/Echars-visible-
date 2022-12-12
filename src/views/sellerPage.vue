<!--测试使用，针对于路径/sellerpage 而展示 -->
<template>
  <div class="content">
    <div class="cm-content">
      <seller></seller>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-echarts',
  components: {
    seller: () => import('@/components/seller.vue')
  }
}
</script>

<style lang="less" scoped>

</style>
