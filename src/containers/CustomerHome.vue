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
        <div class="orderBtnClickShadow"></div>
        <div class="specifyBtnClickShadow"></div>
      </div>
    </div>

    <div class="infoContainer" v-bind:class="{ infoContainerUp: specify }" v-if="destination">
      <p>We'll arrive in 7min and the trip will take about {{ time }}min and cost {{ price }}.</p>
    </div>

<div class="specifyContainer" v-bind:class="{ specifyContainerUp: specify }">
  <div class='row specifyRow'>
    <div class='col text-right'>
      <label class='form-check-label' for='checkPet'>Pets</label>
      <button type="button" class="infoSpecify" data-toggle="popover" title="What does this mean?" data-content="If you want to bring any pets in the taxi, then we need to know that in advance so we can have pet free cars for those who are allergic.">i</button>
    </div>
    <div class='col'>
      <input class='form-check-input' type='checkbox' id='checkPet' value='checkPet' v-model='profile.pets'>
    </div>
  </div>
  <div class='row specifyRow'>
    <div class='col text-right'>
      <label class='form-check-label' for='checkAllergies'>Allergies</label>
            <button type="button" class="infoSpecify" data-toggle="popover" title="What does this mean?" data-content="If you are allergic then we will provide a cab that hasen't been used to transport pets and the driver won't use strong perfume.">i</button>
    </div>
    <div class='col'>
      <input class='form-check-input' type='checkbox' id='checkAllergies' value='checkAllergies' v-model='profile.allergies'>
    </div>
  </div>
  <div class='row specifyRow'>
    <div class='col text-right'>
      <label class='form-check-label' for='checkWheelchair'>Wheelchair</label>
            <button type="button" class="infoSpecify" data-toggle="popover" title="What does this mean?" data-content="If you have a wheelchair then we need to have a bigger car in order for it to fit inside.">i</button>
    </div>
    <div class='col'>
      <input class='form-check-input' type='checkbox' id='checkWheelchair' value='checkWheelchair' v-model='profile.wheelchair'>
    </div>
  </div>
  <div class='row specifyRow'>
    <div class='col text-right'>
      <label class='form-check-label' for='checkChildSeat'>Child seat</label>
            <button type="button" class="infoSpecify" data-toggle="popover" title="What does this mean?" data-content="If you have small kids that requires either a baby seat or a car pillow to ride a car we will provide that for the trip.">i</button>
    </div>
    <div class='col'>
      <input class='form-check-input' type='checkbox' id='checkChildSeat' value='checkChildSeat' v-model='profile.childseating'>
    </div>
  </div>
  <div class='row specifyRow'>
    <div class='col text-right'>
      <label class='form-check-label' for='checkMedicalTransport'>Medical transport</label>
            <button type="button" class="infoSpecify" data-toggle="popover" title="What does this mean?" data-content="The drivers will be educated for emergencies that might happen and will also be prepared to help you in and out of the car.">i</button>
    </div>
    <div class='col'>
      <input class='form-check-input' type='checkbox' id='checkMedicalTransport' value='checkMedicalTransport' v-model='profile.medicaltransport'>
    </div>
  </div>
  <div class='row specifyRow'>
    <div class='col text-right'>
      <label class='form-check-label' for='checkFardtjanst'>Färdtjänst</label>
            <button type="button" class="infoSpecify" data-toggle="popover" title="What does this mean?" data-content="The bill for the trip will be sent to the municipality and you will have to show your customer card for the ride, the drivers will also help you in and out of the car.">i</button>
    </div>
    <div class='col'>
      <input class='form-check-input' type='checkbox' id='checkFardtjanst' value='checkFardtjanst' v-model='profile.fardtjanst' v-on:click="toggleFardtjanst">
    </div>
  </div>
  <div class='row specifyRow'>
    <div class='col text-right'>
      Bags
    </div>
    <div class='col'>
      <input v-model='luggage' type='number' id='numberOfBags' name='nOB' required='required' min="0" max="6">
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

      <div class="input-group mb-3" v-if="profile.fardtjanst">
        <input type="text" placeholder="From where? (Only with Färdtjänst)" class="form-control">
        <div class="input-group-append">
          <button style="pointer-events: all" class="btn btn-secondary" type="button" v-on:click="searchFrom">Search</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Map from '../components/Map.vue'
import Vue from 'vue'

//init for the popovers in specifyContainer
$(function () {
  $('[data-toggle="popover"]').popover()
})

// From https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
// Since I'm too lazy to redo the trigonometry I did in excel a few years ago :)
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

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
      this.$data.distance = distance(this.$data.destination.lat, this.$data.destination.lng, this.$data.position.lat, this.$data.position.lng);
      this.$data.price = Math.floor(20 * this.$data.distance + 50);
      this.$data.time = Math.floor(5 * this.$data.distance);
    },

    mapLoad() {
      $(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');
    },

    specifyMethod() {
      this.$data.specify = !this.$data.specify;
    },

    orderMethod() {
      socket.on('orderId', (orderId) => {
        localStorage.setItem('orderId', orderId);
      });
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

      if (this.$data.distance && this.$data.destination) {
        this.$data.distance = distance(this.$data.destination.lat, this.$data.destination.lng, this.$data.position.lat, this.$data.position.lng);
      }
      this.$data.price = Math.floor(20 * this.$data.distance + 50);
      this.$data.time = Math.floor(5 * this.$data.distance);
    },

    searchFrom() {
      $.get("https://maps.googleapis.com/maps/api/geocode/json?address="
      + this.$data.from
      + "&key=AIzaSyDPs9zgpdfe7ZhmVm71EjFTs3IgQZjbm1w", (data, status) => {
        this.$data.from = data.results[0].formatted_address;
        this.$data.position = data.results[0].geometry.location;
        this.$refs.map.clearMarkers();
        $(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');
        if(this.$data.destination) {
          this.$refs.map.addMarker(this.$data.destination);
        }
      });

      if (this.$data.distance && this.$data.destination) {
        this.$data.distance = distance(this.$data.destination.lat, this.$data.destination.lng, this.$data.position.lat, this.$data.position.lng);
      }
      this.$data.price = Math.floor(20 * this.$data.distance + 50);
      this.$data.time = Math.floor(5 * this.$data.distance);
    },

    saveSpecify() {
      localStorage.setItem("profile", JSON.stringify(this.profile));
    },

    toggleFardtjanst() {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.$data.position = { lng: pos.coords.longitude, lat: pos.coords.latitude };

        this.$refs.map.clearMarkers();
        $(this.$refs.map.addMarker(this.$data.position).getElement()).html('<div class="customer">you</div>');
        if(this.$data.destination) {
          this.$refs.map.addMarker(this.$data.destination);
        }
      });
    }
  },

  data(){
    return{
      whereTo: '',
      from: '',
      passengers: 3,
      luggage: 0,
      price: 250,
      status: 0,

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
      distance: undefined,
      time: undefined,
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

  bottom: 1em;
  left: 52%;
  right: 10%;
  border-radius: .1em;

  height: 4em;
  
  background: rgba(255, 177, 72, 0.57);
  /* box-shadow: 0 0 20px rgb(161, 91, 0); */
  /* border-top: 5px solid rgb(245, 139, 3); */
  color: rgb(49, 42, 27);
  backdrop-filter: blur(10px);
  z-index: 101;
}

.orderBtnClickShadow {
  position: absolute;
  
  bottom: 1em;
  left: 52%;
  right: 10%;
  border-radius: .1em;

  height: 4em;
  box-shadow: 0 5px 15px rgba(87, 46, 0, 0.25);
    z-index: 100;
}

.specifyBtnClick {
  position: absolute;

  bottom: 1em;
  left: 10%;
  right: 52%;
  border-radius: .1em;

  height: 4em;
  background: rgba(242, 242, 242, 0.57);
  color: rgb(44, 44, 44);
  backdrop-filter: blur(10px);
  z-index: 101;
}

.specifyBtnClickShadow {
  position: absolute;
  
  bottom: 1em;
  left: 10%;
  right: 52%;
  border-radius: .1em;

  height: 4em;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
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
  background: rgba(242, 242, 242, 0.75);;

  /* box-shadow: 0 0 15px rgba(0,0,0,0.75); */
  backdrop-filter: blur(30px);
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
  bottom: 5em;
  width: 100%;
  height: 6em;
  pointer-events: none;

  /*background: rgb(234, 234, 234);
  border-top: 5px solid rgb(214, 214, 214);*/

  font-family: "Catamaran", sans-serif;
  text-transform: uppercase;
  font-size: 1em;
  font-weight: 900;
  color: rgb(240, 240, 240);
  text-shadow: 0 0 17px rgb(0, 0, 0), 0 0 2px rgb(0, 0, 0);

  text-align: center;
  line-height: 1em;
  padding-left: 10%;
  padding-right: 10%;

  z-index: 200;
}

.infoSpecify {
  border-radius: 50%;
  font-weight: Bold;
}

.infoContainer p {
  word-wrap: normal;
  padding-top: 1.5em;
}

.infoContainerUp {
  bottom: 33em;
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