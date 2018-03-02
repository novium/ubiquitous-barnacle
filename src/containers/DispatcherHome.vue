<template>
  <div id="container">
    <div id="sidebar">
      <div id="sidebar-container">
        <h1>Jobs</h1>
        <div class="list-group">
          <button type="button" class="list-group-item list-group-item-action job" v-for="order in orders" v-if="order" v-on:click="select(order, $event)">
            <b>{{order.orderId}}</b> {{order.whereTo.substring(0, 20)}}...
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
          event.target.innerHTML = '<b>' + order.orderId + '</b>' + ' ' + order.whereTo.substring(0, 20) + '...'; // I wish there was a simpler solution...
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
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2
  }
  #sidebar-container {
    margin: 30px 30px 30px 30px;
  }
  #sidebar-container>div {
    margin-bottom: 20px;
  }

  .job {
    margin-bottom: 10px;
  }
</style>
