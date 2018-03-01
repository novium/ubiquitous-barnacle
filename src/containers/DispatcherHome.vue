<template>
  <div id="container">
    <div id="sidebar">
      <div id="sidebar-container">
        <h1>Jobs</h1>
        <div>
          <div v-for="order in orders" v-if="order">
            {{order.orderId}}: {{order.whereTo}}
          </div>
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
        counter: 0
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
            this.$refs.map.addMarker(order.position);
          }
        }

        console.log(this.orders);
        console.log(this.$refs.map.getMarkers());
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
</style>
