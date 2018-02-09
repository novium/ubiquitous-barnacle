<template>
  <div id="map"></div>
</template>

<script>
  var markers = [];
  var map;

  export default {
    mounted() {
      map = this.init();

      this.initEventListeners(map);
    },

    methods: {
      init() {
        return new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v10'
        });
      },

      initEventListeners(map) {
        map.on('click', (e) => {
          this.$emit('click', e);
        });

        map.on('mousedown', (e) => {
          this.$emit('mousedown', e);
        });

        map.on('mouseup', (e) => {
          this.$emit('mouseup', e);
        });

        map.on('mousemove', (e) => {
          this.$emit('mousemove', e);
        });
      },

      clearMarkers() {
        for(var i = 0; i < markers.length; i++) {
          markers[i].remove();
        }
        markers = [];
      },

      addMarker(lngLat) {
        markers.push(new mapboxgl.Marker().setLngLat([lngLat.lng, lngLat.lat]).addTo(map));
      },

      removeMarker(map, lngLat) {

      },

      getMarkers() {
        return markers;
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
