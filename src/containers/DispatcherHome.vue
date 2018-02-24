<template>
  <div id="container">
    <div id="sidebar">
      <div id="sidebar-container">
        <h1>Jobs</h1>
        <div>
          <!--<div v-for="order in orders">
            {{order.id}}: (Location here)
          </div>-->
        </div>

        <h1>Drivers</h1>
        <div>
          <!--<div v-for="taxi in taxis">
            {{taxi.id}}: (Info here)
          </div>-->
        </div>
      </div>
    </div>

    <Map ref="map" />
  </div>
</template>

<script>
  import Map from '../components/Map.vue'

  let isCursorOverPoint = false;
  let isDragging = false;
  let canvas;

  let currentMarker;
  let mousePos;
  let taxis = [];

  window.geojson = {
    "type": "FeatureCollection",
    "features": [{
      "id": 1,
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates": [18.01635407255256, 59.281649371543324]
      },
      "properties": {
        "title": "taxi-02304"
      }
    },
    {
      "id": 2,
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates": [18.01635407255256, 59.281649371543324]
      },
      "properties": {
        "title": "taxi-02304"
      }
    },
    {
      "id": 3,
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates": [18.01635407255256, 59.281649371543324]
      },
      "properties": {
        "title": "taxi-02304"
      }
    },
    {
      "id": 4,
      "type": "Feature",
      "geometry": {
          "type": "Point",
          "coordinates": [18.01635407255256, 59.281649371543324]
      },
      "properties": {
        "title": "taxi-02304"
      }
    }]
  }

  function onMove(e) {
    if (!isDragging) return;
    e.originalEvent.preventDefault();
    var coords = e.lngLat;
    //console.log(e)
    // Set a UI indicator for dragging.
    canvas.style.cursor = 'grabbing';

    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.
    currentMarker.geometry.coordinates = [coords.lng, coords.lat];

    map.getSource('taxis').setData(geojson);
  }

  function mouseDown(e) {
    if (!isCursorOverPoint) return;

    e.originalEvent.preventDefault();
    isDragging = true;

    // Set a cursor indicator
    canvas.style.cursor = 'grab';

    var features = map.queryRenderedFeatures(e.point);

    // Seeks out the marker with the ID of the clicked marker
    // CAUTION: markers with ID 0 are map-markers!
    currentMarker = window.geojson.features.find((elem) => {
      return elem.id == features[0].id;
    });

    // Mouse events
    map.on('mousemove', onMove);
    map.once('mouseup', onUp);
  }

  function onUp(e) {
    if (!isDragging) return;
    var coords = e.lngLat;

    canvas.style.cursor = '';
    isDragging = false;

    // Unbind mouse events
    map.off('mousemove', onMove);
  }

  export default {
    mounted() {
      console.log("HELLO!");
      this.$refs.map.$on('click', this.mapClick);
      this.$refs.map.$on('mapload', this.initMap);
    },

    components: {
      Map
    },

    data: () => {
      return {
      }
    },

    props: ['orders'],

    methods: {
      initMap () {
        /*map.on('mousemove', function (e) {
            mousePos = e.lngLat;
        })*/

        window.map.addLayer({
          "id": "taxis",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": geojson
          },
          "layout": {
            "icon-image": "car-15",
            "text-field": "{title}",
            "text-offset": [0, 0.6],
            "text-anchor": "top",
            "icon-allow-overlap": true,
            "icon-ignore-placement": true,
            "text-allow-overlap": true,
            "text-ignore-placement": true,

          }
        });

        canvas = map.getCanvasContainer();

        map.on('mouseenter', 'taxis', function() {
          canvas.style.cursor = 'move';
          isCursorOverPoint = true;
          map.dragPan.disable();
        });

        map.on('mouseleave', 'taxis', function() {
          canvas.style.cursor = '';
          isCursorOverPoint = false;
          map.dragPan.enable();
        });

        map.on('mousedown', mouseDown);
      },

      mapClick(lngLat) {

      },

      moveTaxi(e) {

      }
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

    width: 15em;
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
