<template>
  <div id="container">
    <Map />
  </div>
</template>

<script>
  import Map from '../components/Map.vue'

  export default {
    components: {
      Map
    }
  }
</script>

<style scoped>
  #container {
    width: 100%;
    height: 100%;
  }
</style>
