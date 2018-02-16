<template>
  <div id="dispatcher">
    <router-view></router-view>
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
        console.log(this.orders);
        console.log(this.taxis);
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
