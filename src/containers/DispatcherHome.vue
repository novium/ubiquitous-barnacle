<template>
  <div id="container">
    <div id="sidebar">
      <div id="sidebar-container">
        <h1>Jobs</h1>
        <div>
          <div v-for="order in orders">
            {{order.id}}: (Location here)
          </div>
        </div>

        <h1>Drivers</h1>
        <div>
          <div v-for="taxi in taxis">
            {{taxi.id}}: (Info here)
          </div>
        </div>
      </div>
    </div>

    <Map v-on:click="addTaxi" v-on:load="initMap"></Map>
  </div>
</template>

<script>
  import Map from '../components/Map.vue'

  var geojson = {
    type: "FeatureCollection",
    features: []
  }

  export default {
    components: {
      Map
    },

    data: () => {
      return {
      }
    },

    props: ['orders', 'taxis'],

    methods: {
      initMap (e) {

      },
      addTaxi (e) {
        //var elem = $('<img>');
        var elem = document.createElement('img');
        elem.className = 'taxi';
        elem.src = require('../../public/img/taxi.png');

        // geojson (detta gör ingenting än men jag tror man måste använda det för att göra de draggable)
        var feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [e.lngLat.lng, e.lngLat.lat]
          },
          properties: {
            name: 'taxi'
          }
        };
        geojson.features.push(feature);


        const taxi = new mapboxgl.Marker(elem).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);
        this.taxis.push({
          x: e.lngLat.lng,
          x: e.lngLat.lat,
          elem: elem
        });

        map.on('mouseenter', 'taxi')
      }
    },

    mounted() {
    }
  }
</script>

<style scoped>
  #container {
    width: 100%;
    height: 100%;
  }

  #sidebar {
    color: white;

    width: 15%;
    min-width: 150px;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2
  }

  #sidebar-container {
    margin: 30px 30px 30px 30px;
  }
  #sidebar-container>div {
    margin-bottom: 20px;
  }
</style>

<style>
  .taxi {
    width: 40px;
    height: 40px;
  }
</style>