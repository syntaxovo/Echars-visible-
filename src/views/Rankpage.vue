<template>
  <div class="content">
   <div class="cm-content">
    <rank/>
   </div>
 </div>
</template>

<script>
export default {
  name: 'my-rank',
  components: {
    rank: () => import('@/components/rank.vue')
  }
}
</script>

<style>

</style>
