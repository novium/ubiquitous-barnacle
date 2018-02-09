<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  #app {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
