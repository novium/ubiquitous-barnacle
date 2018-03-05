<template>
  <div id="container">
    <div id="sidebar">
      <div id="sidebar-container">
        <h1>Jobs</h1>
        <div class="btn-group-vertical jobs">
          <button type="button" class="btn btn-secondary job" 
            v-for="order in orders" v-if="order && !order.taxiId && order.status == 0"  
            v-bind:class="[(order.orderId == selectedOrder.orderId) ? 'active' : '']" 
            v-on:click="select(order, $event)">
            <b>{{order.orderId}}</b> {{order.whereTo}}
          </button>
        </div>

        <h1>Drivers</h1>
        <div class="drivers">
          <div class="btn-group-vertical">
            <button type="button" class="btn btn-secondary job" v-for="driver in taxis" 
              v-on:click="assign(driver, $event)"
              v-if="!driverHasOrder(driver)">
              {{driver.taxiId}}: {{driver.name}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="clock">
      <Clock class="time" :blink='true' />
    </div>

    <div class="logo">
      <span class="ubert">uBert</span>.trfcCTRL
    </div>

    <!-- The cool map costs lots more credits, approx. 5x as many, so use sparingly and enable during the presentation -->
    <Map ref="map" map-style="mapbox://styles/novium/cjebascmb0soj2rsvkpzs8jl0" v-on:load="addWatcher"/>
    <!-- <Map ref="map" v-on:load="addWatcher"/> -->
  </div>
</template>

<script>
  import Map from '../components/Map.vue'
  import Clock from 'vue-digital-clock'

  export default {
    components: {
      Map,
      Clock
    },

    props: ['orders', 'taxis'],
    data: () => {
      return {
        time: '',
        orderStrings: {},
        selectedOrder: { orderId: -1 }
      }
    },

    mounted() {
    },

    methods: {
      addWatcher() {
        this.$watch('orders', function() {
          this.addMarkers();
        }, {immediate: true});

        this.$watch('taxis', function() {
          this.addMarkers();
          this.$forceUpdate();
        }, {immediate: true});
      },

      addMarkers() {
        this.$refs.map.clearMarkers();
        for (let i = 0; i < this.orders.length; i++) {
          let order = this.orders[i];
          // if it's defined and not NULL
          if (order && !order.taxiId) {
            order.posMarker = this.$refs.map.addMarker(order.position);
            order.posMarker.setPopup(new mapboxgl.Popup({closeOnClick: false})
              .setHTML('<h4>From here</h4>'));
          }
        }

        for(let i = 0; i < this.taxis.length; i++) {
          this.taxis[i].marker = this.$refs.map.addMarker(this.taxis[i].pos);
        }
      },

      driverHasOrder(driver) {
        if(this.orders.length == 0)
          return false;
        
        if(this.orders.find((order) => { return (order.taxiId == driver.taxiId) && order.status != 3 })) {
          return true;
        } else {
          return false;
        }
      },

      select(order, event) {
        if (this.selectedOrder.orderId != order.orderId) {
        // event.target.innerHTML = order.orderId + ' ' + order.whereTo; // The whole text
          this.selectedOrder = order;

          this.addMarkers();
          
          order.destMarker = this.$refs.map.addMarker(order.destination);
          order.destMarker.setPopup(new mapboxgl.Popup({closeOnClick: false})
            .setHTML('<h4>To here</h4>'));

          order.posMarker.togglePopup();
          order.destMarker.togglePopup();
        } else {
          this.selectedOrder = { orderId: -1 };
          this.addMarkers();
        }
      },

      assign(driver, event) {
        console.log(this.selectedOrder.orderId);
        if(this.selectedOrder.orderId != -1) {
          this.selectedOrder.taxiId = driver.taxiId;
          this.selectedOrder.status = 1;
          this.selectedOrder.destMarker = undefined;
          this.selectedOrder.posMarker = undefined;
          socket.emit('taxiAssigned', JSON.parse(JSON.stringify(this.selectedOrder)));
          this.addMarkers();
          this.$forceUpdate();
        }
      }
    }
  }
</script>

<style scoped>
::-webkit-scrollbar {
  width: 9px;
}
::-webkit-scrollbar-track {
  background: #4a5158;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: .25rem;
    border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
::-webkit-scrollbar-thumb {
  background: #6c757d;
  border-radius: .25rem;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

  #container {
    width: 100%;
    height: 100%;
  }

  .drivers {
    pointer-events: all;
    overflow-y: scroll;
    max-height: 50%;
  }

  .jobs {
    pointer-events: all;
    overflow-y: scroll;
    max-height: 25%;
  }

  .btn-group-vertical>.btn-group:not(:first-child)>.btn, .btn-group-vertical>.btn:not(:first-child) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

.btn-group-vertical>.btn-group:not(:last-child)>.btn, .btn-group-vertical>.btn:not(:last-child):not(.dropdown-toggle) {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
}

  #sidebar {
    color: white;

    width: 22em;
    min-width: 150px;
    height: 100%;
    max-height: 100%;
    position: absolute;
    
    pointer-events: none;


    background: rgba(60,60,60,0.6);
    background: -moz-linear-gradient(left, rgba(60,60,60,0.8) 0%, rgba(60,60,60,0.6) 28%, rgba(60,60,60,0) 79%, rgba(60,60,60,0) 100%);
    background: -webkit-gradient(left top, right top, color-stop(0%, rgba(60,60,60,0.6)), color-stop(28%, rgba(29,29,29,0.6)), color-stop(79%, rgba(60,60,60,0)), color-stop(100%, rgba(60,60,60,0)));
    background: -webkit-linear-gradient(left, rgba(60,60,60,0.8) 0%, rgba(60,60,60,0.6) 28%, rgba(60,60,60,0) 79%, rgba(60,60,60,0) 100%);
    background: -o-linear-gradient(left, rgba(60,60,60,0.8) 0%, rgba(60,60,60,0.6) 28%, rgba(60,60,60,0) 79%, rgba(60,60,60,0) 100%);
    background: -ms-linear-gradient(left, rgba(60,60,60,0.8) 0%, rgba(60,60,60,0.6) 28%, rgba(60,60,60,0) 79%, rgba(60,60,60,0) 100%);
    background: linear-gradient(to right, rgba(60,60,60,0.8) 0%, rgba(60,60,60,0.6) 28%, rgba(60,60,60,0) 79%, rgba(60,60,60,0) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e1e1e', endColorstr='#1c1c1c', GradientType=1 );

    z-index: 2
  }

  #sidebar button {
    pointer-events: all;
  }

  #sidebar h1 {
    font-family: 'Catamaran';
    font-weight: 100;
    text-transform: uppercase;
  }

  #sidebar-container {
    margin-left: 30px;
    margin-right: 30px;
        height: 100%;
    max-height: 100%;
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
    height: 58px;
    padding-top: 1em;
    padding-bottom: 1em;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .clock {
    position: absolute;
    width: 5em;
    top: 0;
    right: 54%;
    left: 46%;
    background: rgba(65, 65, 65, 0.822);

    border-bottom-left-radius: 1.5em;
    border-bottom-right-radius: 1.5em;

    text-align: center;
    font-family: 'Oxygen';
    color: rgb(255, 255, 255);
    text-shadow: 0 0 20px rgb(197, 247, 195),  0 0 20px rgb(109, 233, 241);

    z-index: 1000;
  }

  /* .clock span {

  } */

  .clock .time {
    font-size: 2em;
    display: block;
  }

  .logo {
    position: absolute;
    bottom: 20px;
    right: 10px;

    font-family: 'Catamaran';
    font-weight: 700;
    font-size: 1.5em;
    text-shadow: 0 0 20px rgb(0, 0, 0);
    color: rgb(255, 255, 255);

    z-index: 1000;
  }

  .logo .ubert {
    font-weight: 100;
    font-size: 0.75em;
  }
</style>
