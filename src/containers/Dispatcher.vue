<template>
  <div id="dispatcher">
    <router-view v-bind:orders="this.orders" v-bind:taxis="this.taxis"></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  
  export default {
    data () {
      return {
        orders: [],
        taxis: []
      }
    },
    mounted () {
      socket.on('connect', function () {
        console.log("Connected to socket.");
      });

      socket.on('initialize', (data) => {
        this.orders = data.orders;
        this.taxis = data.taxis;
      });

      socket.on('taxiOrdered', (order) => {
        this.orders.push(order);
      });

      socket.on('taxiAdded', (taxi) => {
        this.taxis.push(taxi);
      });

      socket.on('orderAccepted', (order) => {
        Vue.set(this.orders, order.orderId, order);
      });

      socket.on('taxiMoved', (taxi) => {
        taxi.marker = this.taxis[taxi.taxiId].marker;
        taxi.marker.setLngLat(taxi.pos);
        Vue.set(this.taxis, taxi.taxiId, taxi);
      });

      socket.on('orderFinished', (orderId) => {
        let order = this.orders[orderId];
        order.status = 2;
        order.taxiId = -1;
        Vue.set(this.orders, orderId, order);
      });
    },
  }
</script>

<style scoped>
  #dispatcher {
    width: 100%;
    height: 100%;
  }
</style>
