<template>


  <Map />
</template>

<script>
  import Map from '../components/Map.vue'

  export default {
    components: {
      Map
    },

    props: ['orders']
  }
</script>

<style scoped>

</style>