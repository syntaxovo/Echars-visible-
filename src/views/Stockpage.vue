<!--测试使用，针对于路径/sellerpage 而展示 -->
<template>
  <div class="content">
    <div class="cm-content">
      <stock/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-stockpage',
  components: {
    stock: () => import('@/components/stock.vue')
  }
}
</script>

<style lang="less" scoped>

</style>
