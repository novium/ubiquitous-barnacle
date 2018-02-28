<template>
  <div id="customer">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    mounted() {
      socket.on('connect', function () {
        console.log("Connected to socket.");
      });

      // right now it gets all the data, but does nothing with it
      socket.on('initialize', (data) => {
        this.taxis = data.taxis;
      })
    }

  }
</script>

<style scoped>
  #customer {
    width: 100%;
    height: 100%;
  }
</style>
