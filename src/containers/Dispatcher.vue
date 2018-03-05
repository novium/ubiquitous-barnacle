<template>
  <div id="dispatcher">
    <router-view v-bind:orders="this.orders" v-bind:taxis="this.taxis"></router-view>
  </div>
</template>

<script>
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
      })
      socket.on('taxiOrdered', (order) => {
        this.orders.push(order);
      })
    },
  }
</script>

<style scoped>
  #dispatcher {
    width: 100%;
    height: 100%;
  }
</style>
