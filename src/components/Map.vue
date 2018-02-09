<template>
  <div id="map"></div>
</template>

<script>
  export default {
    mounted() {
      const map = this.init();
    },

    methods: {
      init() {
        return new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v10'
        });
      }
    }
  }
</script>

<style scoped>
  #map {
    height: 100%;
    width: 100%;
  }
</style>
