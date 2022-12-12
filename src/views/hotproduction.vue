<template>
  <div class="content">
   <div class="cm-content">
      <hot/>
   </div>
 </div>
</template>

<script>
export default {
  name: 'my-mappage',
  components: {
    hot: () => import('@/components/hot.vue')
  }
}
</script>

<style>

</style>
