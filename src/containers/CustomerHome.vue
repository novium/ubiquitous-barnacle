<template>
  <div id='container'>
    <!-- Main -->
    <!--<button v-on:click='testReset'>ResetResetReset</button>-->

    <div class='Main' v-if='mainView'>
      <div class='logInButtonUp'>
        <button v-on:click='tologin'>login</button>
      </div>

      <div class='whereToUp'>
        <input v-model='whereTo'>
      </div>

      <div class='timeToArrivalUp'>
        {{timeToArrival}}
      </div>
      <div class='timeToDestinationUp'>
        {{timeToDestination}}
      </div>
      <div class='logoUp'>
        {{logoImg}}
      </div>
      <div class='flagImgUp'>
      </div>
      <button v-on:click='fromMainToEnd' class='orderButton'>Quick Buy</button>
      <button v-on:click='fromMainToSpecify' class='orderButtonSpecify'>Specify</button>
    </div>
    <!-- Specify -->

    <div class='specifyOrder' v-if='specifyView'>
      <div class='container'>
        <div>
          <div class='row'>
            <div class='col'>
              {{from}}
            </div>
            <div class='col'>
              {{whereTo}}
            </div>
          </div>
          <div class='row'>
            <div class='col'>
              {{timeToArrival}}
            </div>
            <div class='col'>
              {{timeToDestination}}
            </div>
          </div>
          <div class='row'>
            <div class='col'>
              Passengers : <input v-model='passengers' type='number' id='numberOfPassengers' name='nOP' required='required'>
            </div>
            <div class='col'>
              Price : {{price}} Kr
            </div>
          </div>
          <div class='row'>
            <div class='col'>
              Bags : <input v-model='luggage' type='number' id='numberOfBags' name='nOB' required='required'>
            </div>
            <div class='col'>
              <div class='checkboxes'>
                <div class='form-check'>
                  <input class='form-check-input' type='checkbox' id='checkPet' value='checkPet'><label class='form-check-label' for='checkPet'>Pets</label>
                </div>
                <div class='form-check form-check-inline'>
                  <input class='form-check-input'  type='checkbox' id='checkAllergies' value='checkAllergies'><label class='form-check-label' for='checkAllergies'>Allergies</label>
                </div>
                <div class='form-check'>
                  <input class='form-check-input'  type='checkbox' id='checkWheelchair' value='checkWheelchair'><label class='form-check-label' for='checkWheelchair'>Wheelchair</label>
                </div>
                <div class='form-check form-check-inline'>
                  <input class='form-check-input' type='checkbox' id='checkIgnoreThis' value='checkIgnoreThis'><label class='form-check-label' for='checkIgnoreThis'>TempCheck</label>
                </div>
              </div>

            </div>
          </div>
          <div class='row'>
            <div class='col'>

            </div>
          </div>
          <div class='row'>
            <div class='col'>

            </div>
          </div>
          <!--<div class='col'>
            <div class='orderButtonSpecify'>
              <button v-on:click='fromSpecifyToMain'>Back</button>
              <button v-on:click='fromSpecifyToSummary'>Summary</button>
              {{orderButtonImg}}
            </div>
          </div>-->

        </div>
      </div>

    </div>

    <!-- summarysummarysummarysummary -->
    <div class='summarised' v-if='summaryView'>
      <div class='summaryTitle'>
        Summary
      </div>
      <div class='backToSpecify'>
        <button v-on:click='backToSpecify'>Back</button>
      </div>
      <div class='summarisedInfo'>
        <div class='container'>
          <div class='row'>
            <div class='col-sm'>
              {{from}}
            </div>
            <div class='col-sm'>
              {{whereTo}}
            </div>
          </div>
          <div class='row'>
            <div class='col-sm'>
              {{timeToArrival}}
            </div>
            <div class='col-sm'>
              {{timeToDestination}}
            </div>
          </div>
          <div class='row'>
            <div class='col-sm'>
              {{passengers}} peeps <br>
              {{luggage}} bags
            </div>
            <div class='col-sm'>
              Pets: {{bringPet}}
              Wheelchair: {{bringWheelchair}}
              Allergies: {{gotAllergies}}

            </div>
          </div>
          <div class='row'>
            <div class='col-12'>
              {{price}} Kr
            </div>
          </div>
        </div>
      </div>
      <div class='confirm'>
        <button v-on:click='confirmSummarise'>Confirm</button>

      </div>
    </div>
    <!--  endendendendendendendendend -->
    <div class='end' v-if='endView'>
      <div class='endFromInfo'>
        {{from}}
        {{timeToArrival}}
      </div>
      <div class='endToInfo'>
        {{whereTo}}
        {{timeToDestination}}
      </div>
      <div class='confirmationCode'>
        {{confirmationCode}}

      </div>
    </div>
    <!--<div class='backButton'>
    <button v-on:click='testButton1'>1</button>
    <button v-on:click='testButton2'>2</button>
    <button v-on:click='testButton3'>3</button>
    <button v-on:click='testButton4'>4</button>
    <button v-on:click='backButtonPress'>V-model logger</button>
    <button v-on:click='loadDataCheckboxes'>check logger</button>
  </div>-->
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
      <div class='row'>
        <div class='col'>
          Bags : <input v-model='luggage' type='number' id='numberOfBags' name='nOB' required='required'>
        </div>
        <div class='col'>
          <div class='checkboxes'>
            <div class='form-check'>
              <input class='form-check-input' type='checkbox' id='checkPet' value='checkPet'><label class='form-check-label' for='checkPet'>Pets</label>
            </div>
            <div class='form-check form-check-inline'>
              <input class='form-check-input'  type='checkbox' id='checkAllergies' value='checkAllergies'><label class='form-check-label' for='checkAllergies'>Allergies</label>
            </div>
            <div class='form-check'>
              <input class='form-check-input'  type='checkbox' id='checkWheelchair' value='checkWheelchair'><label class='form-check-label' for='checkWheelchair'>Wheelchair</label>
            </div>
            <div class='form-check form-check-inline'>
              <input class='form-check-input' type='checkbox' id='checkIgnoreThis' value='checkIgnoreThis'><label class='form-check-label' for='checkIgnoreThis'>TempCheck</label>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="destination">
      <input type="text" placeholder="Where to?" class="form-control" v-model="whereTo" disabled>
    </div>
  </div>

</div>
</template>

<script>



import Map from '../components/Map.vue'

export default {
  mounted() {
    this.$refs.map.$on('click', this.mapClick);

    navigator.geolocation.getCurrentPosition((pos) => {
      const position = { lng: pos.coords.longitude, lat: pos.coords.latitude };
      this.$refs.map.addMarker(position);
    });
  },

  methods: {
    testButton4(){
      this.endView = true;
      this.summaryView = false;
      this.specifyView = false;
      this.mainView = false;
    },
    testButton3(){
      this.endView = false;
      this.summaryView = true;
      this.specifyView = false;
      this.mainView = false;
    },
    testButton2(){
      this.endView = false;
      this.summaryView = false;
      this.specifyView = true;
      this.mainView = false;
    },
    testButton1(){
      this.endView = false;
      this.summaryView = false;
      this.specifyView = false;
      this.mainView = true;
    },
    testReset(){
      this.endView = true;
      this.summaryView = true;
      this.specifyView = true;
      this.mainView = true;
    },
    tologin(){
      console.log(this.testTrue)
      this.mainView = false;
      this.summaryView = false;
      this.specifyView = false;
      this.endView = false;
    },
    fromMainToSpecify(){
      this.mainView = false;
      this.summaryView = false;
      this.specifyView = true;
      this.endView = false;
    },
    confirmSummarise(){
      this.mainView = false;
      this.summaryView = false;
      this.specifyView = false;
      this.endView = true;
    },
    fromMainToEnd(){
      this.mainView = false;
      this.endView = true;
    },
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
    },

    specifyMethod() {
      this.$data.specify = !this.$data.specify;
      console.log("Specify!");
    },

    orderMethod() {
      if(window.isLoggedIn) {
        window.router.push("confirmed");
      } else {
        window.router.push('login');
      }
    }
  },
  data(){
    return{
      whereTo: '',
      from: 'current position',
      timeToArrival: 'Taxi @ your position',
      timeToDestination: 'Taxi @ Destination',
      logoImg: 'logoIMG',
      orderButtonImg: 'Button Img',
      flagImg: 'if we are to use a flag place it here drop down box?',
      passengers: 0,
      luggage: 0,
      price: 250,
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
  width: 100%;
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
  bottom: 20em;
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

  position: absolute;
  height: 25em;
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
  bottom: 29em;
}

</style>

<!-- Add button Design. Design the info boxes more checkboxes? -->
