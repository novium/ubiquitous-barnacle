<template>
  <div id="container">
    <Map />

    <div id="sidebar">
      <div id="sidebar-container">
        <h1>Jobs</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import Map from '../components/Map.vue'

  export default {
    components: {
      Map
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

    width: 15%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10;
  }

  #sidebar-container {
    margin: 30px 30px 30px 30px;
  }

  #map {
    z-index: -1;
    position: absolute;
  }
</style>
