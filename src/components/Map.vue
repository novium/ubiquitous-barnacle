<template>
  <div id="map"></div>
</template>

<script>
  var markers = [];
  var map;

  export default {
    mounted() {
      navigator.geolocation.getCurrentPosition((pos) => {
        const position = { lng: pos.coords.longitude, lat: pos.coords.latitude };
        map = this.init(position);

        this.initEventListeners(map);
      });
    },

    props: {
      mapStyle: {
        type: String,
        default: 'mapbox://styles/mapbox/streets-v10'
      }
    },

    methods: {
      init(pos) {
        return new mapboxgl.Map({
          container: 'map',
          style: this.$props.mapStyle,
          center: pos,
          zoom: 12
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

        map.on('load', (e) => {
          this.$emit('load', e);
        });
      },

      clearMarkers() {
        for(var i = 0; i < markers.length; i++) {
          markers[i].remove();
        }
        markers = [];
      },

      addMarker(lngLat) {
        const marker = new mapboxgl.Marker().setLngLat([lngLat.lng, lngLat.lat]).addTo(map);
        markers.push(marker);
        return marker;
      },

      removeMarker(marker) {
        marker.remove();
      },

      getMarkers() {
        return markers;
      },

      flyTo(lngLat) {
        map.flyTo({
          center: lngLat
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
