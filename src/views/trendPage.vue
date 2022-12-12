<template>
<div class="content">
    <div class="cm-content">
      <trend/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-trendPage',
  components: {
    trend: () => import('@/components/Trend.vue')
  }
}
</script>

<style>

</style>
