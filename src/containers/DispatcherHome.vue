<template>
  <div id="container">
    <div id="sidebar">
      <div id="sidebar-container">
        <h1>Jobs</h1>
        <div class="btn-group-vertical">
          <button type="button" class="btn btn-secondary job" v-for="order in orders" v-if="order" v-on:click="select(order, $event)">
            <b>{{order.orderId}}</b> {{order.whereTo}}
          </button>
        </div>

        <h1>Drivers</h1>
        <div>
          <div v-for="driver in taxis">
            {{driver.id}}: (Info here)
          </div>
        </div>
      </div>
    </div>

    <div class="clock">
      <span class="head">current time</span>
      <span class="time">15:05</span>
    </div>

    <!-- The cool map costs lots more credits, approx. 5x as many, so use sparingly and enable during the presentation -->
    <!-- <Map ref="map" map-style="mapbox://styles/novium/cjebascmb0soj2rsvkpzs8jl0" v-on:load="addWatcher"/> -->
    <Map ref="map" v-on:load="addWatcher"/>
  </div>
</template>

<script>
  import Map from '../components/Map.vue'

  export default {
    components: {
      Map
    },

    props: ['orders', 'taxis'],
    data: () => {
      return {
        orderStrings: {}
      }
    },

    mounted() {
    },

    methods: {
      addWatcher() {
        this.$watch('orders', function() {
          this.addMarkers();
        }, {immediate: true});
      },

      addMarkers() {
        this.$refs.map.clearMarkers();
        for (let i = 0; i < this.orders.length; i++) {
          let order = this.orders[i];
          // if it's defined and not NULL
          if (order) {
            order.posMarker = this.$refs.map.addMarker(order.position);
            order.posMarker.setPopup(new mapboxgl.Popup({closeOnClick: false})
              .setHTML('<h4>From here</h4>'));
          }
        }
      },

      select(order, event) {
        if (event.target.classList.toggle("active") === true) {
          event.target.innerHTML = order.orderId + ' ' + order.whereTo; // The whole text

          order.destMarker = this.$refs.map.addMarker(order.destination);
          order.destMarker.setPopup(new mapboxgl.Popup({closeOnClick: false})
            .setHTML('<h4>To here</h4>'));

          order.posMarker.togglePopup();
          order.destMarker.togglePopup();

        }
        else {
          event.target.innerHTML = '<b>' + order.orderId + '</b>' + ' ' + order.whereTo; // I wish there was a simpler solution...
          //this.$refs.map.removeMarker(order.marker);

          order.posMarker.togglePopup();
          order.destMarker.remove();
        }
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

    width: 25%;
    min-width: 150px;
    height: 100%;
    position: absolute;
    background-color: rgba(30, 30, 30, 0.6);
    z-index: 2
  }

  #sidebar h1 {
    font-family: 'Catamaran';
    font-weight: 100;
    text-transform: uppercase;
  }

  #sidebar-container {
    margin: 30px 30px 30px 30px;
  }
  #sidebar-container>div {
    margin-bottom: 2em;
  }

  .job {
    margin-bottom: 0px;
  }

  .btn-group-vertical {
    width: 100%;
  }

  .btn-group-vertical button {
    width: 100%;
    padding-top: 1em;
    padding-bottom: 1em;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .clock {
    position: absolute;
    width: 10em;
    top: 0;
    right: 50%;
    left: 50%;
    background: rgba(30, 30, 30, 0.6);

    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;

    text-align: center;
    font-family: 'Oxygen';
    color: rgb(230,230,230);


    z-index: 1000;
  }

  .clock span {
    display: block;
  }

  .clock .time {
    font-size: 2em;
  }
</style>
