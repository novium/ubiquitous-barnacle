<template>
  <div id="container">
      <div id="testtext">  {{test}}  </div>
      <div id="testtext">  {{test2}}  </div>
    <Map />

  </div>
</template>

<script>

  

  import Map from '../components/Map.vue'

  export default {
    data(){
      return{
        test: "testy",
        test2: "Testy the testicle"}
      
      },
    
    components: {
      Map 
    }
  }
</script>

<style scoped>
  #container {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }
  #testtext {
  position: absolute;  
  display: absolute;
  z-index: 1;
  


  }
</style>
