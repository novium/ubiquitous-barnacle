<template>
  <div id='container'>


  <Map ref="map" />

  <div class="controls">
    <div class="orderBtnContainer" v-bind:class="{ orderBtnContainerUp: specify }">
      <div class="orderBtn" v-if="destination"><div class="orderBtnClick" v-on:click="orderMethod"></div><div class="specifyBtnClick" v-on:click="specifyMethod"></div></div>
    </div>

    <div class="specifyContainer" v-bind:class="{ specifyContainerUp: specify }">
      <div class='row'>
        <div class='col text-center'>
          The estimated price is : {{price}} Kr
        </div>
      </div>
      <div class='row'>
        <div class='col text-center'>
          You will be picked up at :
        </div>
        <div class='col text-center'>
          Your destination will be :
        </div>
      </div>
      <div class='row'>
        <div class='col text-right'>
          <input v-model='from' type='string' id='from' name='from' required='required' placeholder='Current position'>
        </div>
        <div class='col'>
          <input v-model='whereTo' type='string' id='whereTo' name='whereTo' required='required' placeholder='Where to?'>
        </div>
      </div>
      <div class='row'>
        <div class='col text-center'>
          The taxi will be here in :
        </div>
        <div class='col text-center'>
          You will arrive in :
        </div>
      </div>
      <div class='row'>
        <div class='col text-right'>
          {{timeToArrival}}
        </div>
        <div class='col'>
          {{timeToDestination}}
        </div>
      </div>
      <div class='row'>
        <div class='col text-right'>
          <label class='form-check-label' for='checkPet'>Pets :</label>
        </div>
        <div class='col'>
          <input class='form-check-input' type='checkbox' id='checkPet' value='checkPet'>
        </div>
        </div>
      <div class='row'>
        <div class='col text-right'>
          <label class='form-check-label' for='checkAllergies'>Allergies :</label>
        </div>
        <div class='col'>
          <input class='form-check-input'  type='checkbox' id='checkAllergies' value='checkAllergies'>
        </div>
      </div>
      <div class='row'>
        <div class='col text-right'>
          <label class='form-check-label' for='checkWheelchair'>Wheelchair :</label>
        </div>
        <div class='col'>
          <input class='form-check-input'  type='checkbox' id='checkWheelchair' value='checkWheelchair'>
        </div>
      </div>
        <div class='row'>
          <div class='col text-right'>
            <label class='form-check-label' for='checkChildSeat'>Child seat :</label>
          </div>
          <div class='col'>
            <input class='form-check-input' type='checkbox' id='checkChildSeat' value='checkChildSeat'>
          </div>
        </div>
        <div class='row'>
          <div class='col text-right'>
            <label class='form-check-label' for='checkMedicalTransport'>Medical transport :</label>
          </div>
          <div class='col'>
            <input class='form-check-input' type='checkbox' id='checkMedicalTransport' value='checkMedicalTransport'>
          </div>
        </div>
        <div class='row'>
          <div class='col text-right'>
            Bags :
          </div>
          <div class='col'>
            <input v-model='luggage' type='number' id='numberOfBags' name='nOB' required='required'>
          </div>
        </div>
        <div class='row'>
          <div class='col text-right'>
            Seats :
          </div>
          <div class='col'>
            <input v-model='passengers' type='number' id='numberOfPassengers' name='nOP' required='required'>
          </div>
        </div>
    </div>

    <div class="destination">
      <input type="text" placeholder="Where to?" class="form-control" v-model="whereTo">
    </div>
  </div>

</div>
</template>

<script>



import Map from '../components/Map.vue'

export default {
  mounted() {
    this.$refs.map.$on('click', this.mapClick);
  },

  methods: {
    fromSpecifyToSummary(){
      this.specifyView = false;
      this.summaryView = true;
      this.loadDataCheckboxes();
      this.checkboxesToText();
    },
    backButtonPress(){
      console.log('YEEET')
      console.log(this.whereTo)
      console.log(this.checkboxes)
      this.checkboxesToText();
    },
    backToSpecify(){
      this.summaryView = false;
      this.specifyView = true;
    },
    fromSpecifyToMain(){
      this.specifyView = false;
      this.mainView = true;
    },
    loadDataCheckboxes(){
      var listAux = []
      if (document.getElementById('checkPet').checked){
        listAux.push('pet');
      }
      if (document.getElementById('checkAllergies').checked){
        listAux.push('allergies');
      }
      if (document.getElementById('checkWheelchair').checked){
        listAux.push('wheelchair');
      }
      if (document.getElementById('checkChildSeat').checked){
        listAux.push('childseat')
      }
      if (document.getElementByID('checkMedicalTransport').checked){
        listAux.push('medical')
      }
      console.log(listAux);
      this.checkboxes = listAux;

    },
    checkboxesToText(){
      if (document.getElementById('checkPet').checked){
        this.bringPet = 'yes'

      }
      if (document.getElementById('checkAllergies').checked){
        this.gotAllergies = 'yes'
      }
      if (document.getElementById('checkWheelchair').checked){
        this.bringWheelchair = 'yes'
      }
      if (document.getElementById('checkChildSeat').checked){
        this.childSeat = 'yes'
      }
      if (document.getElementById('checkMedicalTransport').checked){
        this.medicalTransport = 'yes'
      }
    },

    mapClick(lngLat) {
      this.$refs.map.clearMarkers();
      this.$refs.map.addMarker(lngLat.lngLat);

      $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="
      + lngLat.lngLat.lat + ","
      + lngLat.lngLat.lng + "&key=AIzaSyDPs9zgpdfe7ZhmVm71EjFTs3IgQZjbm1w", (data, status) => {
        console.log(data);
        this.$data.whereTo = data.results[0].formatted_address;
      });

      this.$data.destination = lngLat.lngLat;
      this.randomTimeGenerator();
    },

    specifyMethod() {
      this.$data.specify = !this.$data.specify;
      console.log("Specify!");
    },

    orderMethod() {
      if(window.isLoggedIn) {

      } else {
        window.router.push('login');
      }
    },
    randomTimeGenerator(){
      this.timeToArrival = Math.floor((Math.random() * 20) + 1);
      this.timeToDestination = this.timeToArrival + Math.floor((Math.random() * 150) + 1);
      this.timeToDestinationMinutes = this.timeToDestination%60 
      this.timeToDestinationHours = Math.round(this.timeToDestination/60);
      this.price = Math.floor((Math.random() * 200) + 1);
      this.confirmationCode = Math.random().toString(36).substring(7).toUpperCase();
      console.log(this.timeToDestinationMinutes);
      console.log(this.timeToDestinationHours);

    }
  },
  data(){
    return{
      whereTo: '',
      from: '',
      timeToArrival: 10,
      timeToDestination: 0,
      logoImg: 'logoIMG',
      orderButtonImg: 'Button Img',
      flagImg: 'if we are to use a flag place it here drop down box?',
      passengers: 0,
      luggage: 0,
      price: 0,
      checkBoxesToText: 'nothing',
      checkboxes: [],
      confirmationCode: 'random Code',
      endView: false,
      summaryView: false,
      specifyView: false,
      mainView: false,
      notEndView: false,
      bringWheelchair: 'no',
      gotAllergies: 'no',
      bringPet: 'no',
      childSeat: 'no',
      medicalTransport: 'no',
      confirmationCode: '',


      summary: true,


      destination: undefined,
      specify: false
    }

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
  z-index: -1;
}

#map {
  pointer-events: all;
}

.controls {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.orderBtn {
  width: 120px;
  height: 200px;

  bottom: 0;

  margin: 0 auto;

  background: url("/public/img/Order.png");
  pointer-events: all;
  z-index: 100;
}

.destination {
  position: absolute;
  top: 5%;
  left: 10%;
  right: 10%;
}

.destination input {
  pointer-events: all;
  width: 100%;
}

.orderBtnContainer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  pointer-events: none;
}

.orderBtnContainerUp {
  bottom: 40%;
}

.orderBtnClick {
  position: relative;
  top: 10px;
  left: 0;
  right: 0;
  bottom: 50%;
  height: 100px;
}

.specifyBtnClick {
  position: relative;
  top: 10px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 90px;
}

.specifyContainer {
  visibility: hidden;
  display: none;
  pointer-events: none;

  position: absolute;
  height: 40%;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  background: rgb(242, 242, 242);
  font-size: 2em;
  border-color: rgb(222, 222, 222);
  border-style: solid;

}

.specifyContainer .row {
  margin-right: 0 !important;
}

.specifyContainerUp {
  visibility: visible;
  display: block;
  pointer-events: all;
}
input[type='checkbox'] {
    -webkit-appearance:none;
    width:30px;
    height:30px;
    background:white;
    border-radius:5px;
    border:2px solid #555;
}
input[type='checkbox']:checked {
    background: #abd;
}



</style>

<!-- 
-->


