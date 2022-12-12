<template>
   <div class="content">
    <div class="cm-content">
      <mymap></mymap>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-mappage',
  components: {
    mymap: () => import('@/components/map.vue')
  }
}
</script>

<style>

</style>
