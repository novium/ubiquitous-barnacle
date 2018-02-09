<template>
  <div id="container">
    <Map ref="map" />
  </div>
</template>

<script>
  import Map from '../components/Map.vue'

  export default {
    beforeCreate() {

    },

    mounted() {
      this.$refs.map.$on('click', this.mapClick);
    },

    methods: {
      mapClick(lngLat) {
        this.$refs.map.clearMarkers();
        this.$refs.map.addMarker(lngLat.lngLat);
      }
    },

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
