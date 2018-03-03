<template>
  <div id='container'>
    <!-- Main -->
    <!--<button v-on:click='testReset'>ResetResetReset</button>-->

  <Map ref="map" />

  <div class="controls">
    <div class="orderBtnContainer" v-bind:class="{ orderBtnContainerUp: specify }">
      <div class="orderBtn" v-if="destination">
        <div class="orderBtnClick" v-on:click="orderMethod">order</div>
        <div class="specifyBtnClick" v-on:click="specifyMethod">specify order</div>
      </div>
    </div>

    <div class="infoContainer" v-bind:class="{ infoContainerUp: specify }" v-if="destination">
      <p>We'll arrive in 7min and the trip will take about 19min and cost 94kr.</p>
    </div>

    <div class="specifyContainer" v-bind:class="{ specifyContainerUp: specify }">
      <div class='row specifyRow'>
              <div class='col text-right'>
                <label class='form-check-label' for='checkPet'>Pets</label>
              </div>
              <div class='col'>
                <input class='form-check-input' type='checkbox' id='checkPet' value='checkPet' v-model='profile.pets'>
              </div>
              </div>
            <div class='row specifyRow'>
              <div class='col text-right'>
                <label class='form-check-label' for='checkAllergies'>Allergies</label>
              </div>
              <div class='col'>
                <input class='form-check-input'  type='checkbox' id='checkAllergies' value='checkAllergies' v-model='profile.allergies'>
              </div>
            </div>
            <div class='row specifyRow'>
              <div class='col text-right'>
                <label class='form-check-label' for='checkWheelchair'>Wheelchair</label>
              </div>
              <div class='col'>
                <input class='form-check-input'  type='checkbox' id='checkWheelchair' value='checkWheelchair' v-model='profile.wheelchair'>
              </div>
            </div>
              <div class='row specifyRow'>
                <div class='col text-right'>
                  <label class='form-check-label' for='checkChildSeat'>Child seat</label>
                </div>
                <div class='col'>
                  <input class='form-check-input' type='checkbox' id='checkChildSeat' value='checkChildSeat' v-model='profile.childseating'>
                </div>
              </div>
              <div class='row specifyRow'>
                <div class='col text-right'>
                  <label class='form-check-label' for='checkMedicalTransport'>Medical transport</label>
                </div>
                <div class='col'>
                  <input class='form-check-input' type='checkbox' id='checkMedicalTransport' value='checkMedicalTransport' v-model='profile.medicaltransport'>
                </div>
              </div>
              <div class='row specifyRow'>
                <div class='col text-right'>
                  <label class='form-check-label' for='checkFardtjanst'>Färdtjänst</label>
                </div>
                <div class='col'>
                  <input class='form-check-input' type='checkbox' id='checkFardtjanst' value='checkFardtjanst' v-model='profile.fardtjanst'>
                </div>
              </div>
              <div class='row specifyRow'>
                <div class='col text-right'>
                  Bags
                </div>
                <div class='col'>
                  <input v-model='luggage' type='number' id='numberOfBags' name='nOB' required='required'>
                </div>
              </div>
              <div class='row specifyRow'>
                <div class='col text-right'>
                  Passengers
                </div>
                <div class='col'>
                  <input v-model='passengers' type='number' id='numberOfPassengers' name='nOP' required='required' min="3" max="8">
                </div>
              </div>
              <div class='row specifyRow'>
                <div class='col text-center'>
                  <p>3 Seats are included at the price of one!</p>
                  <button class="btn btn-outline-secondary btn-block" style="margin-left: 7.5px;" v-on:click="saveSpecify">Save to profile</button>
                </div>
              </div>
    </div>

    <div class="destination">
      <div class="input-group mb-3">
        <input type="text" placeholder="Where to?" class="form-control" v-model="whereTo">
        <div class="input-group-append">
          <button style="pointer-events: all" class="btn btn-secondary" type="button" v-on:click="search">Search</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Map from '../components/Map.vue'
import Vue from 'vue'

export default {
  created() {
    let profile = JSON.parse(localStorage.getItem("profile"));
    if(profile != undefined)
      this.$data.profile = profile;
  },

  mounted() {
    this.$refs.map.$on('click', this.mapClick);
    this.$refs.map.$on('load', this.mapLoad);

    navigator.geolocation.getCurrentPosition((pos) => {
      this.$data.position = { lng: pos.coords.longitude, lat: pos.coords.latitude };
    });
  },

  methods: {
    mapClick(lngLat) {
      this.$refs.map.clearMarkers();
      this.$refs.map.addMarker(lngLat.lngLat);
      $(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');

      $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="
      + lngLat.lngLat.lat + ","
      + lngLat.lngLat.lng + "&key=AIzaSyDPs9zgpdfe7ZhmVm71EjFTs3IgQZjbm1w", (data, status) => {
        console.log(data);
        this.$data.whereTo = data.results[0].formatted_address;
      });

      this.$data.destination = lngLat.lngLat;
      console.log(lngLat.lngLat);
    },

    mapLoad() {
      $(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');
    },

    specifyMethod() {
      this.$data.specify = !this.$data.specify;
      console.log("Specify!");
    },

    orderMethod() {
      socket.emit('orderTaxi', this.$data, null);

      if(window.isLoggedIn) {
        window.router.push("confirmed");
      } else {
        window.router.push('login');
      }
    },

    search() {
      $.get("https://maps.googleapis.com/maps/api/geocode/json?address="
      + this.$data.whereTo
      + "&key=AIzaSyDPs9zgpdfe7ZhmVm71EjFTs3IgQZjbm1w", (data, status) => {
        this.$data.whereTo = data.results[0].formatted_address;
        this.$refs.map.clearMarkers();
        $(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');
        this.$refs.map.addMarker(data.results[0].geometry.location);
        this.$refs.map.flyTo(data.results[0].geometry.location);
        this.$data.destination = data.results[0].geometry.location;
      });
    },

    saveSpecify() {
      localStorage.setItem("profile", JSON.stringify(this.profile));
    }
  },

  data(){
    return{
      whereTo: '',
      passengers: 3,
      luggage: 0,
      price: 250,

      profile: {
        pets: false,
        allergies: false,
        wheelchair: false,
        childseating: false,
        medicaltransport: false,
        fardtjanst: true
      },

      destination: undefined,
      position: undefined,
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

/* Main (ingore the Up it was part of an old View swapping Method) */
.logInButtonUp{
  position: absolute;
  z-index: inherit;
  right: 0px;
  z-index: 1;

}
.whereToUp{
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 30%;
  transform: translate(-50%,-50%);

}
.timeToArrivalUp{
  position: absolute;
  z-index: 1;
  left: 20%;
  bottom: 30%;

}
.timeToDestinationUp{
  position: absolute;
  z-index: 1;
  right: 20%;
  bottom: 30%;

}
.logoUp{
  position: absolute;
  z-index: 1;

}
.orderButtonSpecify{
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%,-50%);

}
.orderButton{
  position:absolute;
  z-index: 1;
  left:50%;
  bottom: 40px;
  transform: translate(-50%,-50%);
}


/* specify up/down */

.specifyOrder {
  position: absolute;
  z-index: 1;
  width: 60%;
  left: 20%;
  background-color: White;
  bottom:0px;

}

input[type='checkbox'] {
    -webkit-appearance:none;
    -moz-appearance: none;
    width: 25px;
    height: 25px;
    background:transparent;
    border-radius:5px;
    border:2px solid #555;
}
input[type='checkbox']:checked {
    background: #ffa023;
}

.specifyRow {
  margin-bottom: 15px;
}


.container {
  background-color: aqua;
}

.orderButtonSpecify{
  text-align: center;
}
.leftCheckboxes {
  text-align: left;
}
.rightCheckboxes {
  text-align: right;
}
/* order summarise up/down*/
.summarised  {
  left:-200%;

}

.summarisedInfo {
  position: absolute;
  z-index: 1;
  width: 100%;
  bottom: 20%;
}
.backToSpecify {
  position: absolute;
  z-index: 1;
  bottom: 0px;
}
.confirm {
  position: absolute;
  z-index: 1;
  bottom: 0px;
  right: 0px;
}
.summaryTitle {
  position: absolute;
  z-index: 1;
  text-align: center;
  width: 100%;
  top: 50%;
}
/* end */
.end  {
  left:-200%;
}
.endFromInfo{
  position: absolute;
  z-index:1;
  bottom:0px;
}
.endToInfo{
  position: absolute;
  z-index:1;
  bottom:0px;
  right:0px;

}
.confirmationCode{
  position: absolute;
  z-index:1;
  bottom:0px;
  width:100%;
  text-align: center;

}
.backButton{
  z-index:1;
  position:absolute;
  bottom:50%;
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
  width: 100%;

  bottom: 0;

  margin: 0 auto;

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
}

.orderBtnContainer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 6em;
  pointer-events: none;

  font-family: "Catamaran", sans-serif;
  text-transform: uppercase;
  font-size: 1.25em;
  font-weight: 900;

  text-align: center;
  line-height: 4em;

  z-index: 201;
}

.orderBtnContainerUp {
  bottom: 22em;
}

.orderBtnClick {
  position: absolute;
  bottom: 0;
  left: 50%;
  right: 0;
  height: 4em;
  background: rgb(255, 149, 13);
  border-top: 5px solid rgb(245, 139, 3);
  color: rgb(215, 119, 3);
}

.specifyBtnClick {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 50%;
  height: 4em;
  background: rgb(242, 242, 242);
  border-top: 5px solid rgb(222, 222, 222);
  color: rgb(182, 182, 182);
}

.specifyContainer {
  visibility: hidden;
  display: none;
  pointer-events: none;
  font-family: 'Oxygen';

  position: absolute;
  height: 27.5em;
  padding-top: 1em;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  background: rgb(242, 242, 242);
}

.specifyContainer .row {
  margin-right: 0 !important;
}

.specifyContainerUp {
  visibility: visible;
  display: block;
  pointer-events: all;
}

.infoContainer {
  position: absolute;
  bottom: 4em;
  width: 100%;
  height: 6em;
  pointer-events: none;

  background: rgb(234, 234, 234);
  border-top: 5px solid rgb(214, 214, 214);

  font-family: "Catamaran", sans-serif;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 900;
  color: rgb(150,150,150);

  text-align: center;
  line-height: 1em;
  padding-left: 10%;
  padding-right: 10%;

  z-index: 200;
}

.infoContainer p {
  word-wrap: normal;
  padding-top: 1.5em;
}

.infoContainerUp {
  bottom: 31em;
}



</style>

<style>
.customer {
  background-image: linear-gradient(-60deg, rgb(255, 80, 0) 0%, rgb(255, 114, 4) 100%);
  border-radius: 100%;
  box-shadow: 0 0 10px rgb(255, 80, 0);
  width: 42px;
  height: 42px;
  color: rgb(240, 240, 240);
  font-family: "Oxygen";
  text-align: center;
  padding-top: 8px;
  font-size: 16px;
}
</style>